
## **1️⃣ Add Documentation to README.md (Recommended)**
NPM automatically picks up the `README.md` from your package root and displays it on the npm package page.

- If you **don’t have a README**, create a `README.md` file in your project root:
  ```md
  # ezsnipe

  ezsnipe is a CLI tool for managing UI components and backend files.

  ## Installation

  ```sh
  npm install -g ezsnipe
  ```

  ## Usage

  ```sh
  ezsnipe add <component-name>
  ```

  ## Features
  - Install UI components easily
  - Supports backend files too
  ```

- If you **already have a README.md**, make sure it's in the **root folder** and has useful instructions.

- **Re-publish your package** after adding the README:
  ```sh
  npm version patch
  npm publish
  ```

---

## **2️⃣ Add a Homepage & Repository Link**
In `package.json`, add:
```json
{
  "homepage": "https://github.com/yourusername/ezsnipe",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/ezsnipe.git"
  }
}
```
Then republish:
```sh
npm version patch
npm publish
```
Now, the npm page will **show a link** to your GitHub repo.

---

## **3️⃣ Publish Documentation on GitHub Pages**
If your repo is on GitHub, you can:
1. Create a **docs folder** and add documentation inside.
2. Go to **Settings > Pages** on GitHub.
3. Set GitHub Pages to deploy from `/docs`.
4. Add the GitHub Pages link to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/ezsnipe"
   ```
5. Update the README with:
   ```md
   📖 Read full docs at [here](https://yourusername.github.io/ezsnipe)
   ```

---

## **Final Steps**
After adding docs, **update and publish**:
```sh
npm version patch
npm publish
```

Now, your package will have proper documentation! 🚀 Let me know if you need help.