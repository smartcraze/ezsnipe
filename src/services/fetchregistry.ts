import axios from "axios";
import chalk from "chalk";

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
