---
title: Web as smalltalk
date: 2023-05-05
tags: ["software"]
draft: false
---
Found [this article](https://web.archive.org/web/20160624013455/https://zacharyvoase.com/2013/02/10/smallweb/) from 2013 by Zachary Voase, expressing the idea of browsers becoming the new Small Talk. The missing piece that still does not exist today is Small Talk's image persistence. He ends with:

> So if we’re moving into a world of treating the browser as a VM, the manager of a long-lived application state, we need the other parts of the Smalltalk model: live-editing and persistence. The Chrome Web Inspector is great for modifying CSS rules on-the-fly (it’s a declarative language, DOM redraws are cheap on a human timescale, go figure). Editing JS is trickier due to its functional, callback-based nature; the average JS object tree is much more nested than that of the average Smalltalk VM. But Chrome is again showing that it is possible. So the final piece of the puzzle is persistence: this bundle of HTML, JavaScript and CSS needs to be written _back_ to the server.
>
> I have a hunch that WebDAV combined with standard HTTP authentication could be the answer. I’m not 100% sure on it, but I can easily envision a world where you fix bugs in your website by opening it up in a browser, reading a stack trace, fixing the JS in that same browser and persisting your changes back to the server.
This hasn't happened for the most part in 2023. Live editing JavaScript is harder because websites are more frequently "compiled" from some framework code. 

This is very different from the properties I believed Andy Matuschak was looking for [here](https://www.are.na/block/19911143). It's worth mentioning that there are specific places where something similar happens, but on the web these are still relegated to developer environments and WYSIWYG editors.Maybe the real issue isn't html and javascipt, but that there isn't an expectation of development **environment** as often when creating a language. 
