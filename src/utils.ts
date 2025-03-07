import axios from "axios";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";

export const REGISTRY_URL =
  "https://raw.githubusercontent.com/smartcraze/ui-component-registry/main/registry.json";

export async function fetchRegistry() {
  try {
    const response = await axios.get(REGISTRY_URL);
    return response.data;
  } catch (error) {
    console.error(chalk.red("Failed to fetch registry!"));
    process.exit(1);
  }
}

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
