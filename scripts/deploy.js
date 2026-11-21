// Uploads the production build/ folder to the web host over FTP(S).
// Usage: npm run deploy         (builds, then uploads)
//        npm run deploy:only    (uploads the existing build/ without rebuilding)
//
// The password is never stored: you are prompted for it each run.
// Optionally set FTP_PASSWORD in the environment to skip the prompt (e.g. CI).

const path = require("path");
const fs = require("fs");
const readline = require("readline");
const ftp = require("basic-ftp");

// Optional: load FTP_* settings (including FTP_PASSWORD) from a git-ignored
// .env.deploy file in the project root. Create it with `npm run deploy:setup`.
// Real environment variables take precedence over the file.
(function loadEnvFile() {
  const file = path.resolve(__dirname, "..", ".env.deploy");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2];
  }
})();

const config = {
  // ftp.restorativecarehhs.com has no DNS record, so connect by the server IP
  // shown in hPanel > FTP Accounts.
  host: process.env.FTP_HOST || "46.202.182.15",
  // Hostinger's FTPS certificate is issued for *.hstgr.io, not the IP, so
  // verify it against that name instead of disabling certificate checks.
  tlsServerName: process.env.FTP_TLS_SERVERNAME || "hstgr.io",
  user: process.env.FTP_USER || "u700592427.kevin",
  // The FTP account's root is already the site's public_html folder.
  remoteDir: process.env.FTP_REMOTE_DIR || "/",
  // "true" = explicit FTPS (recommended). Set FTP_SECURE=false for plain FTP.
  secure: process.env.FTP_SECURE !== "false",
};

// BUILD_DIR lets another app (e.g. the /careers app) reuse this script together
// with FTP_REMOTE_DIR; by default it uploads this project's build/ folder.
const buildDir = process.env.BUILD_DIR
  ? path.resolve(process.env.BUILD_DIR)
  : path.resolve(__dirname, "..", "build");

function askHidden(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
    });
    // Suppress echo of typed characters, but still print the prompt.
    rl._writeToOutput = (s) => {
      if (s.includes(question)) rl.output.write(s);
    };
    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    });
  });
}

// Every deploy uploads new hashed JS/CSS/image files but never removes the old
// ones, so they pile up on the server. This deletes files in the three build
// folders that are not part of the build just uploaded. It touches only those
// folders (static/js, static/css, static/media), never the rest of the site,
// so the separate /careers app and anything else on the host is left alone.
// Pass --keep-old to skip it.
async function removeStaleBuildFiles(client) {
  const remoteBase = config.remoteDir.replace(/\/$/, "");
  let removed = 0;
  for (const folder of ["js", "css", "media"]) {
    const localDir = path.join(buildDir, "static", folder);
    if (!fs.existsSync(localDir)) continue;
    const keep = new Set(fs.readdirSync(localDir));
    const remoteDir = `${remoteBase}/static/${folder}`;
    let listing;
    try {
      listing = await client.list(remoteDir);
    } catch (e) {
      continue; // folder doesn't exist on the server yet
    }
    for (const entry of listing) {
      if (entry.isFile && !keep.has(entry.name)) {
        await client.remove(`${remoteDir}/${entry.name}`);
        removed += 1;
      }
    }
  }
  console.log(
    `Removed ${removed} old build file${removed === 1 ? "" : "s"} from the server.`
  );
}

async function main() {
  if (!fs.existsSync(path.join(buildDir, "index.html"))) {
    throw new Error("build/index.html not found. Run `npm run build` first.");
  }

  const password =
    process.env.FTP_PASSWORD ||
    (await askHidden(`FTP password for ${config.user}@${config.host}: `));
  if (!password) throw new Error("No password provided.");

  const client = new ftp.Client(30000);
  client.ftp.verbose = false;
  client.trackProgress((info) => {
    if (info.name) process.stdout.write(`\r  uploading ${info.name}`.padEnd(70));
  });

  try {
    console.log(`Connecting to ${config.host} (${config.secure ? "FTPS" : "FTP"})...`);
    await client.access({
      host: config.host,
      user: config.user,
      password,
      secure: config.secure,
      secureOptions: { servername: config.tlsServerName },
    });

    await client.ensureDir(config.remoteDir);
    console.log(`Uploading build/ to ${await client.pwd()} ...`);
    await client.uploadFromDir(buildDir);
    process.stdout.write("\n");

    if (!process.argv.includes("--keep-old")) {
      await removeStaleBuildFiles(client);
    }
    console.log(
      `Deploy complete: https://restorativecarehhs.com${
        config.remoteDir === "/" ? "/" : config.remoteDir + "/"
      }`
    );
  } finally {
    client.close();
  }
}

main().catch((err) => {
  console.error(`\nDeploy failed: ${err.message}`);
  process.exit(1);
});
