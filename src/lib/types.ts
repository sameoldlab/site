export interface MetaProps {
	title?: string
	description?: string
	type?:
	| 'website'
	| {
		published_time: Date
		modified_time: Date
		tags: string[]
	}
	image?: {
		url: string
		type: string
		url_fallback?: string
		width: number
		height: number
	} | undefined
}
export type Entry<T> = {
	slug: string
	path: string
} & T
export type Note = {
	metadata: {
		title: string,
		date: string | Date,
		draft?: boolean,
		tags?: string[]
	},
	raw: string
	links: string[]
}

export type Log = {
	metadata: {
		date: string | Date,
		tags?: string[]
	}
}
export type Page = {
	body: string,
	title: string,
	slug: string
}
