import axios from "axios";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { fetchRegistry } from "./fetchregistry.js";


export async function installComponent(componentName: string) {
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
