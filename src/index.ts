#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { Command } from "commander";
import { fetchRegistry, installComponent } from "./utils.js";

const program = new Command();

async function interactiveMode() {
  const registry = await fetchRegistry();
  const componentNames = Object.keys(registry);

  if (componentNames.length === 0) {
    console.log(chalk.red("No components available!"));
    process.exit(1);
  }

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "component",
      message: "Which component do you want to install?",
      choices: componentNames,
    },
  ]);

  await installComponent(answers.component);
}

// Setup CLI Commands
program
  .name("ezsnipe")
  .description("A CLI tool to install UI components from the registry")
  .version("1.0.0");

program
  .command("add <component>")
  .description("Add a UI component from the registry")
  .action((component) => {
    installComponent(component);
  });

// If no arguments are passed, run interactive mode

if (!process.argv.slice(2).length) {
  interactiveMode();
} else {
  program.parse(process.argv);
}
