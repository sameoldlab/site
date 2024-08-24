import { execSync } from "child_process";

export function remarkModifiedTime() {
  return function(tree, file) {
    // console.log(file.history)
    const filepath = file.history[0];
    if (!filepath) return
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    file.data.astro.frontmatter.modified = result.toString();
  };
}
