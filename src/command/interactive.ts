import inquirer from "inquirer";
import chalk from "chalk";
import { fetchRegistry } from "../services/fetchregistry.js";
import { installComponent } from "../services/installComponents.js";

export async function interactiveMode() {
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
