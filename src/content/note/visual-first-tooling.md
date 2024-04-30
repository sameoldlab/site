---
title: Visual First Tooling 
date: 2023-06-16
tags: 
  - software
  - data
  - protocol
draft: true
---
https://twitter.com/mattdesl/status/1668597442806272004
Recently, I've been more optimistic about visualizations on top existing general purpose text-based languages than purely visual languages. With things like Houdini, Blender, or TouchDesigner you have can get started much more quickly. There's no need to worry about setting up an environment or learning a new syntax and language. But picking one of those is kind of like choosing an operating system. You can make a lot of progress *inside*, but very little can go in or out. Even if your tool, like Blender, is free and open-source the requirements for building a nicely wrapped software package mean the dynamic, living system you make on the inside can generally only leave as a baked obj or a video. 

OpenMFX is an attempt to unite the nodes in Blender, Houdini, and other tools, but it seems to be a single guy taking it all on. And his challenges are legal as well, because one group's license for Gaussian blur is proprietary and the other's implementation of subdivision is GPL. You see the same story with every A/V editing tool repackaging ffmpeg as a subscription. 

I am thankful for all these tools which I have been able to use at different times. But I also wish there were ways to benefit from them without so strictly needing to pick an ecosystem (and have years of work inaccessible after switching). The benefits I get from visual tools are liveness, feedback, and an expanded library. A lot of that (not all though) could fit in a . And for the rest? There's GUIs like @nodes_io and @theatre_js that just sit on top.  Right now there's a whole minefield picking tools now because you don't want to get work stuck an abandoned format, but imagine if C4D was like Sublime Text, Houdini was JetBrains, Blender was neovim. 

(accidentally did another modular maxing, Data as a Protocol pitch)