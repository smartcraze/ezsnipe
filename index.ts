#!/usr/bin/env node

import axios from "axios";
import fs from "fs-extra";
import path from "path";
import inquirer from "inquirer";
import chalk from "chalk";
import { Command } from "commander";

const program = new Command();
const REGISTRY_URL =
  "https://raw.githubusercontent.com/smartcraze/ui-component-registry/main/registry.json";

// Function to fetch components from the registry
async function fetchRegistry() {
  try {
    const response = await axios.get(REGISTRY_URL);
    return response.data;
  } catch (error) {
    console.error(chalk.red("Failed to fetch registry!"));
    process.exit(1);
  }
}

// Function to install a component
async function installComponent(componentName: string) {
  const registry = await fetchRegistry();
  const component = registry[componentName];

  if (!component) {
    console.log(chalk.red(`Component "${componentName}" not found!`));
    process.exit(1);
  }

  console.log(chalk.blue(`Installing ${component.title}...`));

  for (const file of component.files) {
    const filePath = path.join(process.cwd(), file.target);
    const fileContent = await axios.get(file.url);

    // Ensure directory exists
    fs.ensureDirSync(path.dirname(filePath));

    // Write file
    fs.writeFileSync(filePath, fileContent.data);
    console.log(chalk.green(`✅ Installed ${file.target}`));
  }

  console.log(chalk.green(`🎉 ${component.title} installed successfully!`));
}

// Function for interactive CLI if no arguments are provided
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
