// One-time setup: saves the FTP password to a git-ignored .env.deploy file so
// `npm run deploy` no longer prompts. Run: npm run deploy:setup
// The password is typed here, in your own terminal, and is never printed.

const path = require("path");
const fs = require("fs");
const readline = require("readline");

const file = path.resolve(__dirname, "..", ".env.deploy");

function askHidden(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
    });
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

(async () => {
  const password = await askHidden("FTP password for u700592427.kevin: ");
  if (!password) {
    console.error("No password entered. Nothing saved.");
    process.exit(1);
  }
  fs.writeFileSync(file, `FTP_PASSWORD=${password}\n`, { mode: 0o600 });
  console.log(`Saved to ${file} (git-ignored). \`npm run deploy\` will now run without a prompt.`);
})();
