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

const config = {
  host: process.env.FTP_HOST || "ftp.restorativecarehhs.com",
  user: process.env.FTP_USER || "u700592427.kevin",
  // The FTP account's root is already the site's public_html folder.
  remoteDir: process.env.FTP_REMOTE_DIR || "/",
  // "true" = explicit FTPS (recommended). Set FTP_SECURE=false for plain FTP.
  secure: process.env.FTP_SECURE !== "false",
};

const buildDir = path.resolve(__dirname, "..", "build");

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
      secureOptions: { servername: config.host },
    });

    await client.ensureDir(config.remoteDir);
    console.log(`Uploading build/ to ${await client.pwd()} ...`);
    await client.uploadFromDir(buildDir);
    process.stdout.write("\n");
    console.log("Deploy complete: https://restorativecarehhs.com/");
  } finally {
    client.close();
  }
}

main().catch((err) => {
  console.error(`\nDeploy failed: ${err.message}`);
  process.exit(1);
});
