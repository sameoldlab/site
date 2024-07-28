import { getCollection, type CollectionEntry } from "astro:content";
import { readFileSync } from "fs";
import { html } from "satori-html";
import { ImageResponse } from "@vercel/og";

interface Props {
  params: { slug: string };
  props: {
    post: CollectionEntry<"note">;
  };
}

export async function GET({ props }: Props) {
  const { post } = props;

  const Literata = readFileSync(
    `${process.cwd()}/public/fonts/Literata_60pt-LightItalic.ttf`,
  );

  const markup = html(`
		<div
			class="w-full h-full flex items-center justify-center relative px-22 bg-[#141414]"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" fill="#1d1d1d" viewBox="0 0 1080 540">
				<path d="m77 695-6-11c-2-5-2-10 1-16l11-22a1212 1212 0 0 1 44-68 496 496 0 0 1 40-45c5-2 10-2 17 0 7 3 11 5 13 9 3 4 2 9-2 16-3 7-11 16-23 29l-11 10-8 9c-2 2-2 4 0 4l14-9a243 243 0 0 1 72-20c8-1 17 0 25 4 9 3 13 8 14 13-1 3-1 5 1 7a15744 15744 0 0 1 3 4v2c0 2-4 5-9 7-6 3-11 4-16 3s-9-2-12-1l-13 1-39 8c-11 2-24 7-38 15l-9 5-11 7a419 419 0 0 0-22 32l-2 4-8 7c-5 4-10 6-15 6-3 0-7-3-11-10Zm-136 3c-15-6-24-13-26-23-1-10 1-21 7-33l9-15c2-5 4-8 7-8l1-2v-3l10-15 5-6 3-4c-1-3 0-5 2-6l6-3c2-1 3-3 2-5 0-2 2-4 5-8l13-12a79 79 0 0 0 14-16 882 882 0 0 1 27-31c4 0 3-2-2-4l-18-7-24-9-13-8c-2-6-1-12 4-17s10-7 17-5l10 2 9 3 20 4 25 5 4-7 8-7 3-3 4-8 7-6c5-4 8-9 11-15a758 758 0 0 0 24-22c7-7 14-9 19-8 6 1 11 4 15 8l6 9 2 11c-1 4-4 8-9 12l-5 7-6 7c-2 2-6 4-10 9a715 715 0 0 1-21 23c-1 3 0 5 3 6l16 4 13 2c3 0 6 1 9 4 1 2 0 6-1 11-1 4-3 8-6 11-2 4-5 6-7 6h-11l-19-3-26-6-14 14a202 202 0 0 0-20 22l-10 10-12 13a646479 646479 0 0 0-8 8c0 4-1 7-4 8l-6 3-2 2c1 1 0 3-1 5l-5 5-6 10-9 12-2 11c0 2 0 3 2 3l6 2 7 2c5-1-1 9-18 31l-21 15c-7 4-11 5-13 5Zm939-160c0-3-2-7-6-11-3-3-5-6-4-7l-1-7-1-7c-1-3 0-7 5-14l21-24a676 676 0 0 1 38-35l8-6 3-3 4-1 6-6 8-6a239 239 0 0 1 50-23c9-2 16-2 23 1 7 2 13 7 16 12a216 216 0 0 0 13 21l9 14 12 21-15 21a70 70 0 0 0-13 60c0 4 1 8 3 11l10 7c3 1 5 3 6 5 2 2 2 5 1 9-2 7-5 13-9 15-4 3-7 4-11 3-11-2-20-6-29-13-8-6-14-18-17-35a82 82 0 0 1-2-24 196 196 0 0 1-15 9c-30 16-54 24-73 26-18 2-31-3-40-13Zm39-31h12l24-8 34-15c9-3 18-9 28-16l16-14c-1-9-2-14-4-17s-4-5-7-6c-4-2-10 0-17 3a596 596 0 0 0-79 64l-7 9Zm-184-16-6-2a135 135 0 0 1-13-9l-3-9v-15c2-6 7-12 15-18 3-2 6-7 10-12a776 776 0 0 0 38-58c0-3-3-5-7-7-3-1-5-3-7-6 0-2 0-7 2-12l7-11c3-3 6-5 10-6s8 0 13 1l15 4c5 2 8 4 9 6 2 2 3 6 3 11a91 91 0 0 1-2 24l14-7 17-9a161 161 0 0 1 38-6c4 1 8 4 12 10 4 4 6 8 7 11l1 20c0 6-3 11-8 14s-10 6-17 8-15 1-23-3c-2-2-3-5-4-9v-11l-6 2-12 6-14 8a3559 3559 0 0 0-90 86Zm-169-38c-5-1-8-2-10-4l-8-8c-5-8-9-16-11-26-2-9-2-17 0-22l2-8 1-3c-1-2-2-3-1-4l2-2c3 0 4-1 3-5 0-3 2-8 7-17a161 161 0 0 1 44-48l15-11 25-14a62 62 0 0 1 43-3c6 3 12 7 15 13 7 4 13 10 18 17 4 6 6 14 6 23 0 10-3 21-8 34-5 12-15 26-32 43a174 174 0 0 1-56 39c-7 4-17 5-27 6h-28Zm64-59 15-13a123 123 0 0 0 20-33l4-14c1-5 1-7-1-8-4-3-8-5-13-4-4 0-11 2-18 6l-18 13-14 15-16 24c-6 9-9 18-8 25 0 7 4 10 12 10 8-1 21-8 37-21Zm-260-11c-6-3-11-6-14-10-2-4-4-8-4-13l-3-8 1-4 5 1 3-1 2-1 4 1c6 2 14 2 24 1a617 617 0 0 0 75-26 372 372 0 0 0 34-29v-9c0-3-3-5-7-7-5-1-14 0-26 3a180 180 0 0 0-72 31 717 717 0 0 1-33 20h-10l-4-5-2-8-5-8v-10l4-10a1352 1352 0 0 1 45-68l3-4c3-2 4-5 5-9 2-4 4-7 7-9l4-6a1241 1241 0 0 0 48-57 1673 1673 0 0 0 32-37l14-14c5-4 9-7 11-7l8 4 10 10c4 4 6 8 6 11v5l-4 8a4060 4060 0 0 1-77 85 1407 1407 0 0 0-40 52l-6 10 17-10a143 143 0 0 1 54-15h10l10 1 17 4c7 2 12 6 16 13s7 14 9 22a72 72 0 0 1-21 51l-7 4-4 4a535 535 0 0 1-35 25l-27 11a376 376 0 0 1-54 11 172 172 0 0 0-23-3Zm-214-72-10-3-11-5-3-4c0-1 0-2-2-3l-4-5-7-10c-2-5-2-11-1-17s6-16 16-30c3-10 9-19 18-29s20-19 32-27a239 239 0 0 1 65-32c6-3 12-3 20-1a35 35 0 0 1 26 23 197 197 0 0 1 10 36 220 220 0 0 1-2 20c-1 4-3 10-7 17l-10 16-7 18c-2 5-3 10-2 13 2 3 5 5 10 4 4-1 8 0 12 3 3 3 5 6 6 10s-1 9-6 14l-13 9-17 5c-6 1-11 0-16-1l-9-8c-3-4-5-8-6-14l-2-18 1-12-23 10a240 240 0 0 1-26 14c-2 2-6 4-12 5l-20 2Zm28-42 17-7 17-11a1027 1027 0 0 1 35-29c4-3 8-7 11-12l-2-13c-1-5-3-7-5-9-4-1-10 0-19 3a154 154 0 0 0-48 36l-8 8a185 185 0 0 0-13 22l-2 6c0 2 1 4 4 6h13ZM25 292c-3-3-6-6-7-11-2-4-2-9 0-16l6-18a232 232 0 0 1 16-32l3-7c1-2 2-2 1 0l7-12a495 495 0 0 1 25-38l3-5 7-10a497 497 0 0 1 70-82l4-5a314 314 0 0 1 22-23l9-8c4-3 8-5 12-5v-1c2-2 6-3 11-3h12c4 2 7 4 9 7 2 4 2 7 0 12l-4 10c0 2-2 4-5 6 1 0 1 1-1 3l-4 4a73 73 0 0 1-8 8l-12 11a625 625 0 0 0-63 65l-4 7-2 2-5 6-4 5-17 27-6 9-7 10-6 8-4 6-3 4-1 2-14 20a134 134 0 0 0-16 30v1c-3 6-7 10-11 13s-8 3-13 0Zm1069-101c-2-3-3-8-2-13l3-15 6-11 3-5 3-4 3-7a325 325 0 0 1 19-25l17-22a1675 1675 0 0 0 21-30c1-4 4-5 10-4 4 0 8 3 12 9s7 12 8 19c2 3 2 7 0 11l-12 15a102 102 0 0 0-17 25 158 158 0 0 0-28 42c-2 4-4 7-7 9-7 12-14 18-23 18-7 0-13-4-16-12Zm112-175-5-12 1-11c0-3 1-4 2-5 5-2 9-6 13-11a153 153 0 0 1 17-16c1-2 3-2 4-2 5-2 10 0 16 5s10 11 12 17c0 7-1 14-4 19-3 7-8 12-16 17-7 5-15 7-23 7-7-1-13-3-17-8Zm-203 171c-3-3-6-6-7-11-2-4-2-9 0-15l6-18a236 236 0 0 1 16-33l3-7h1l7-12a495 495 0 0 1 25-38l3-5 8-10a498 498 0 0 1 70-82l3-5a309 309 0 0 1 22-22l9-9c4-3 8-5 12-5 2-3 6-4 11-4h12c5 2 8 4 9 7 2 4 2 8 0 12l-3 11-6 5h1l-2 3-4 5a74 74 0 0 1-8 8l-12 11a624 624 0 0 0-62 64l-5 7-2 2-5 6-4 5-17 27-5 10-8 9-6 9-3 5-4 4-1 2v1l-14 19a134 134 0 0 0-16 30v1c-3 6-7 11-11 13-4 3-8 3-13 0Zm-163-75c-5 0-10-3-16-7l-17-16c-5-5-8-10-9-13-2-3-2-5 0-7s4-2 6-2c1 1 4 0 7-2 4-2 7-6 10-13l6-11 5-6 3-8c2-4 4-8 7-10a415 415 0 0 1 29-45 2288 2288 0 0 1 31-41 641 641 0 0 1 53-61 1325 1325 0 0 1 41-42c4-2 8-2 14 1 5 2 9 6 11 10l5 14c1 5-1 9-6 12a721 721 0 0 1-19 16l-17 20A1176 1176 0 0 0 898 6l6-4 16-8c17-9 31-16 44-20 12-4 22-4 30-2 5 1 9 4 14 8l11 14c4 5 6 10 6 15 1 6-1 14-3 23a101 101 0 0 1-34 48 114 114 0 0 1-35 22l-12 5a324 324 0 0 1-22 8l-11 1c-9 2-19 3-32 1l-36-5Zm23-33 13 3a163 163 0 0 0 63-16c12-6 21-13 28-22 7-8 11-15 13-23 1-7-2-11-10-10-8 0-22 5-41 15a256 256 0 0 0-46 26l-9 6-6 6c-5 10-7 15-5 15Zm-117-2-8-10c-4-5-6-11-8-20-1-8 0-17 4-28l8-20c3-4 3-6 1-7s-5 0-11 1L708 3a591 591 0 0 0-53 26l-17 6c-5 1-9-1-12-5l-3-6c-2-3-3-6-3-10-1-3 0-6 1-8l25-33a212 212 0 0 0 18-23l-2-1c-2-1-5 0-10 2l-9 5-7 2-8 5-13 8a6378 6378 0 0 1-70 40c-6-2-10-6-14-11-3-5-5-10-5-16-1-4 1-10 6-19a1161 1161 0 0 1 31-54l7-9a2397 2397 0 0 0 26-36l2-11c2-5 5-8 8-10 4-2 9-3 13-2 4 0 7 0 9 2 9 3 14 9 15 15 2 6 2 12 0 18l-6 12-7 8-9 11a1244 1244 0 0 1-18 23h5l12-5a220 220 0 0 1 36-14 226 226 0 0 1 42-10c5 3 9 7 12 13l6 15c0 5-2 9-4 13a240 240 0 0 0-10 16l-6 9-3 4 4-2 10-4 12-5c19-7 34-11 45-11 10 0 18 5 22 16 2 5 3 10 2 17-1 6-2 15-6 25a1026 1026 0 0 1-6 28l1 8c0 1 1 3 4 5l6 5c4 4 5 9 3 15-1 6-5 9-11 11h-17l-16-4Z"/>
			</svg>
			<div style="
				font-family: Literata;
				font-size: 81;
				display: flex;
				color: white;
				opacity: 0.88;
				position: absolute;
				margin-top: 40;
				width: 1000px;
				bottom: 2.5rem;
				left: 3rem;
			">
				${post.data.title}
			</div>
		</div>
		`);

  return new ImageResponse(markup, {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: "Literata",
        data: Literata.buffer,
        style: "italic",
      },
    ],
  });
}

export async function getStaticPaths() {
  const notes = await getCollection("note");
  return notes.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}
