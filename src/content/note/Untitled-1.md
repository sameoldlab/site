---
title: untitled
date: 2024-01-29
draft: true
tags:
  - software
  - gpui
  - hyperpads
---
A lot of software today feels like it's **de**augmenting human intellect. So much so that staying neutral is now revolutionary---not to mention improving it. A, not even pessimistic, explanation might be: having users rely on you creates a very secure business model for the creators. Open is much harder to successfully monetise.  

- Applications are indeed hard to make when people expect it works everywhere, loads quickly, and can be accessed through a web browser
- Teams like figma and linear figured out some of the 1000x productivity and performance unlocks to make those kinds of apps. 
- In Figma's case, gpu rendered canvases, and with linear, local-first caching. Having those kinds of things puts you in a different market category than most would be competition. Of course, you still need to make a compelling product on top of your glass chewing engineering.
- What's interesting this year, is you no longer need to be Evan Wallace shifting bits with butterfly flaps in Emscripten to get Figma's level of performance. And while it's still complicated, popular libraries have reduced the need for a concentration in distributed systems to create local-first applications. 
- 

This was already a popular stack before I noticed it. Current identified players and research: 
- [The Web Assembly App Gap](https://paulbutler.org/2020/the-webassembly-app-gap/) and [GPU-backed User Interfaces](https://digest.browsertech.com/archive/gpu-backed-user-interfaces/)
- Rust GUI space: Zed which recently opensourced it's codebase and toolkit, Makepad by Rik Arends, warp.dev (closed), 
- CRDTs: Yjs and various hosted services. Interesting even newer popular players above still roll their own
The road is still pretty rough,
- the syncing/CRDT section
- While Rust is popular for it's compile pipeline to Web Assembly, actual use of the language for creating user interfaces is still in open exploration [Advice for the next dozen Rust GUI's](https://raphlinus.github.io/rust/gui/2022/07/15/next-dozen-guis.html) 
	- Accessibility needs to be redone nearly from scratch if you render directly to the GPU
	- We lose a lot of the open hackability of HTML's inspect element and view source (which Electron with all it's warts brought to the desktop). Although some options like Gnome Toolkit have something similar
	- Rust in itself is a more complicated language to learn. If there's a critical mass of people who think it's worth it for safety, maybe that doesn't matter? Else we'll get a second wave of libraries and toolkits from Zig as it matures.
Only adjacently related while we remain in garbage collected javascript land. Moore's Law is dead for memory, still going for CPU and GPU (assuming we have resources to make them). Maybe Data-driven Design ans ECS-architecture makes a jump out of gaming to general sofware? tbd
There's a widening gap between "state of the art" web frontend architecure and what you'd need for a lot of rich *applications* HTMX, Astro, and Qwik make a lot of sense to reduce load on the client with islands and resumability. Significantly less so when your goal is to make the client self reliant, or remove central servers all together. This doesn't mean their bad, just suited to a particular niche.