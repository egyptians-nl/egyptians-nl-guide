#!/usr/bin/env node

import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const venvDir = path.join(repoRoot, ".venv");
const venvBinDir = path.join(venvDir, "bin");
const pythonBin = path.join(venvBinDir, "python");
const pipBin = path.join(venvBinDir, "pip");
const mkdocsBin = path.join(venvBinDir, "mkdocs");

function printHelp() {
  console.log(`
Available commands:

  npm run setup
    Create .venv if needed and install Python requirements.

  npm run install:python
    Install or refresh Python dependencies in the existing .venv.

  npm run serve
    Run mkdocs serve using the local virtualenv.

  npm run build
    Build the site with mkdocs build --strict.

  npm run check
    Alias for the strict build check.

  npm run clean
    Remove generated folders such as site/.

  npm run help
    Show this command list.
`);
}

function ensureVenvExists() {
  if (!existsSync(mkdocsBin)) {
    console.error(
      "Local virtualenv tools were not found. Run `npm run setup` first."
    );
    process.exit(1);
  }
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: repoRoot,
      stdio: "inherit",
      ...options
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} exited with code ${code}`));
    });
  });
}

async function setup() {
  // Create the Python virtualenv once, then reuse it for all project commands.
  if (!existsSync(pythonBin)) {
    await run("python3", ["-m", "venv", ".venv"]);
  }

  await installPython();
}

async function installPython() {
  if (!existsSync(pythonBin) || !existsSync(pipBin)) {
    console.error("The local .venv does not exist yet. Run `npm run setup` first.");
    process.exit(1);
  }

  await run(pipBin, ["install", "-r", "requirements.txt"]);
}

async function serve() {
  ensureVenvExists();
  await run(mkdocsBin, ["serve"]);
}

async function build() {
  ensureVenvExists();
  await run(mkdocsBin, ["build", "--strict"]);
}

async function clean() {
  // Keep cleanup intentionally narrow so we do not remove user content by mistake.
  await rm(path.join(repoRoot, "site"), { force: true, recursive: true });
}

const commands = {
  setup,
  "install:python": installPython,
  serve,
  build,
  check: build,
  clean,
  help: async () => {
    printHelp();
  }
};

async function main() {
  const command = process.argv[2] ?? "help";
  const handler = commands[command];

  if (!handler) {
    console.error(`Unknown command: ${command}`);
    printHelp();
    process.exit(1);
  }

  try {
    await handler();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

await main();
