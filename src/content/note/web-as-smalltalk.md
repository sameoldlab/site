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

This hasn't happened for the most part in 2023. Live editing JavaScript is harder because websites are more frequently "compiled" from some framework code. The web has view source like HyperCard. Runs everywhere like Flash and Java. With object capabilities and sandboxing to explicitly define what it can connect and interact with. We have tools to distribute and safely reuse software through browsers. But the authoring process is much further behind. Live editing in Dev Tools is harder because most websites tend to be compiled output of some framework's code. To author new content the options tend to be either complex development environments or restrained SaaS WYSIWYG editors. 

## Hope?
Val.town and Replit or Webflow and Framer have different approaches to lowering the barrier while still providing a high degree of control. By being online they solve section of the write back problem. Developer browsers currently get sold as an aid to the text editor, but what would it look like if they were the same thing? Write your content, have it save to a version control system in the background and sync with your server. Maybe the reasons this hasn't happened yet are commercial? My website makes no moneys and I write this from a terminal text editor instead of Polypane or Web Storm. And with the frequency of changes in the javascipt's ecosystem and to Browser APIs a reliable replica might be... "challenging" to maintain.
