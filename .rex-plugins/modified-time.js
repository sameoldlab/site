import { execSync } from 'child_process'

export function modifiedTime(filepath) {
	const result = new Date(execSync(`git log -1 --pretty="format:%cI" "${filepath}"`).toString()).valueOf()
	return result
}
