import { execSync } from 'child_process'

export function remarkModifiedTime(filepath) {
	const result = new Date(execSync(`git log -1 --pretty="format:%cI" "${filepath}"`).toString()).valueOf()
	console.log({ result, filepath })
	return result
	// file.data.frontmatter.modified = result.toString()
}
