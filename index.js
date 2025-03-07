#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const program = new commander_1.Command();
const REGISTRY_URL = "https://raw.githubusercontent.com/smartcraze/ui-component-registry/main/registry.json";
// Function to fetch components from the registry
function fetchRegistry() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(REGISTRY_URL);
            return response.data;
        }
        catch (error) {
            console.error(chalk_1.default.red("Failed to fetch registry!"));
            process.exit(1);
        }
    });
}
// Function to install a component
function installComponent(componentName) {
    return __awaiter(this, void 0, void 0, function* () {
        const registry = yield fetchRegistry();
        const component = registry[componentName];
        if (!component) {
            console.log(chalk_1.default.red(`Component "${componentName}" not found!`));
            process.exit(1);
        }
        console.log(chalk_1.default.blue(`Installing ${component.title}...`));
        for (const file of component.files) {
            const filePath = path_1.default.join(process.cwd(), file.target);
            const fileContent = yield axios_1.default.get(file.url);
            // Ensure directory exists
            fs_extra_1.default.ensureDirSync(path_1.default.dirname(filePath));
            // Write file
            fs_extra_1.default.writeFileSync(filePath, fileContent.data);
            console.log(chalk_1.default.green(`✅ Installed ${file.target}`));
        }
        console.log(chalk_1.default.green(`🎉 ${component.title} installed successfully!`));
    });
}
// Function for interactive CLI if no arguments are provided
function interactiveMode() {
    return __awaiter(this, void 0, void 0, function* () {
        const registry = yield fetchRegistry();
        const componentNames = Object.keys(registry);
        if (componentNames.length === 0) {
            console.log(chalk_1.default.red("No components available!"));
            process.exit(1);
        }
        const answers = yield inquirer_1.default.prompt([
            {
                type: "list",
                name: "component",
                message: "Which component do you want to install?",
                choices: componentNames,
            },
        ]);
        yield installComponent(answers.component);
    });
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
}
else {
    program.parse(process.argv);
}
