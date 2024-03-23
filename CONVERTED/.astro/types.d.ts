declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"md": {
"README.md": {
	id: "README.md";
  slug: "readme";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part0.md": {
	id: "part0.md";
  slug: "part0";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part0a.md": {
	id: "part0a.md";
  slug: "part0a";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part0b.md": {
	id: "part0b.md";
  slug: "part0b";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part1.md": {
	id: "part1.md";
  slug: "part1";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part1a.md": {
	id: "part1a.md";
  slug: "part1a";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part1b.md": {
	id: "part1b.md";
  slug: "part1b";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part1c.md": {
	id: "part1c.md";
  slug: "part1c";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part1d.md": {
	id: "part1d.md";
  slug: "part1d";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part2.md": {
	id: "part2.md";
  slug: "part2";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part2a.md": {
	id: "part2a.md";
  slug: "part2a";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part2b.md": {
	id: "part2b.md";
  slug: "part2b";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part2c.md": {
	id: "part2c.md";
  slug: "part2c";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part2d.md": {
	id: "part2d.md";
  slug: "part2d";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part2e.md": {
	id: "part2e.md";
  slug: "part2e";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part3.md": {
	id: "part3.md";
  slug: "part3";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part3a.md": {
	id: "part3a.md";
  slug: "part3a";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part3b.md": {
	id: "part3b.md";
  slug: "part3b";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part3c.md": {
	id: "part3c.md";
  slug: "part3c";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part3d.md": {
	id: "part3d.md";
  slug: "part3d";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part4.md": {
	id: "part4.md";
  slug: "part4";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part4a.md": {
	id: "part4a.md";
  slug: "part4a";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part4b.md": {
	id: "part4b.md";
  slug: "part4b";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part4c.md": {
	id: "part4c.md";
  slug: "part4c";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part4d.md": {
	id: "part4d.md";
  slug: "part4d";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part5.md": {
	id: "part5.md";
  slug: "part5";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part5a.md": {
	id: "part5a.md";
  slug: "part5a";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part5b.md": {
	id: "part5b.md";
  slug: "part5b";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part5c.md": {
	id: "part5c.md";
  slug: "part5c";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part5d.md": {
	id: "part5d.md";
  slug: "part5d";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part6.md": {
	id: "part6.md";
  slug: "part6";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part6a.md": {
	id: "part6a.md";
  slug: "part6a";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part6b.md": {
	id: "part6b.md";
  slug: "part6b";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part6c.md": {
	id: "part6c.md";
  slug: "part6c";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part7.md": {
	id: "part7.md";
  slug: "part7";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part7a.md": {
	id: "part7a.md";
  slug: "part7a";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part7b.md": {
	id: "part7b.md";
  slug: "part7b";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part7c.md": {
	id: "part7c.md";
  slug: "part7c";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part7d.md": {
	id: "part7d.md";
  slug: "part7d";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part7e.md": {
	id: "part7e.md";
  slug: "part7e";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part7f.md": {
	id: "part7f.md";
  slug: "part7f";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part8.md": {
	id: "part8.md";
  slug: "part8";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part8a.md": {
	id: "part8a.md";
  slug: "part8a";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part8b.md": {
	id: "part8b.md";
  slug: "part8b";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part8c.md": {
	id: "part8c.md";
  slug: "part8c";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part8d.md": {
	id: "part8d.md";
  slug: "part8d";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
"part8e.md": {
	id: "part8e.md";
  slug: "part8e";
  body: string;
  collection: "md";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"partnavigation": {
};
"seo": {
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
