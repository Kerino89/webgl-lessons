import { resolve, parse } from "node:path";
import { glob } from "glob";
import { defineConfig } from "vite";

/**
 *
 * @param  {...Array<string>} path
 * @returns {string}
 */
const resolveApp = (...path) => resolve(process.cwd(), ...path);

const generateInput = async () => {
  try {
    const htmlFiles = await glob("src/**/*.html", {
      ignore: {
        ignored(path) {
          return path.parent?.name === "src" && path.name === "index.html";
        },
      },
    });

    return htmlFiles.reduce(
      (obj, path) => {
        const { dir } = parse(path);
        const key = dir.match(/[^\\\/\*\(\)]+/g).at(-1);

        if (key) {
          obj[key] = resolveApp(path);
        }

        return obj;
      },
      { main: resolveApp("src", "index.html") }
    );
  } catch (error) {
    throw new Error("Failed to generate entry points", { case: error });
  }
};

export default defineConfig({
  root: resolveApp("src"),
  appType: "mpa",
  build: {
    outDir: resolveApp("dist"),
    rollupOptions: {
      input: await generateInput(),
    },
  },
});
