#!/usr/bin/env node
import { Command } from "commander";
import { installComponent } from "./services/installComponents.js";
import { interactiveMode } from "./command/interactive.js";
import { NAME, VERSION } from "./config/config.js";
export const program = new Command();

// Setup CLI Commands
program
  .name(NAME)
  .description("A CLI tool to install UI components from the registry")
  .version(VERSION);

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
