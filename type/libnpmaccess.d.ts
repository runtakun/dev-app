interface LsPackagesResults {
	readonly [key: string]: 'read-write' | 'read-only'
}

declare module 'libnpmaccess' {
	export function lsPackages (username: string, {
		token: string
	}): Promise<LsPackagesResults>
}
