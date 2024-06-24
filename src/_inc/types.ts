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
	}
}