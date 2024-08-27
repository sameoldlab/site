---
title: test page
date: 2024-02-21
tags: ['meta']
draft: true
---

I just found out today,
```html 
<button onClick={handleClick}>Expand</button>
```
does not work in Astro. Instead I needed to do this: 
```js
<button id="button">Click Me</button>
<script>
  function handleClick () {
    console.log("button clicked!");
  }
  document.getElementById("button").addEventListener("click", handleClick);
</script>

```


Despite the lot of talk around protocols, but I think there is also a strong argument for data rather than an open platform (aka protocol) acting as "the" base layer. It's such a basic level I never thought about this before. On blockchains tokens, rather than Uniswap/Sushi or OpenSea/Zora. Or in other spheres .obj, .svg, .pdf, .jpeg, and .mp3. These are all forms of structured information, arranged for a generalized set of applications. 

Perhaps the reason why the value of data's value is not so prominent, is the dance between data and platforms. A large enough platform can force new standards into existence even without them being open--*coughs* Adobe. Otherwise several parties might need to cooperate to get meaningful adoption. The data format needs platform support to grow, until it becomes a standard. At which point, platform users demand data support to continue business. When it works... fun, fun, fun. [Maxim Leyzerovich](https://round.is) has an inspiring thread of [the forms this could take.](https://twitter.com/round/status/1207192277656821760)

But at it's worst, we get monopolies; one entity defines the standard and its use. So how do we keep standards open and innovative without falling to the control of a single party? Most of my earlier examples already have improved versions. One way I can see is making the improvement so good it outweighs pain of transition. 

No pain would be nicer though. Maybe this is where protocols are important? 🤷 They can lower the switching cost for products built on top, allowing us to migrate between open standards as they evolve and grow. Platforms might also realize its in their best interest to work together, in a similar process to [Market-Protocol Fit](https://otherinter.net/research/market-protocol-fit/)

[[media-test-2]]
Most things do eventually become irrelevant or break down so the goal should rarely be to make the perfect standard or protocol. The interesting part in my opinion is the dance. From the spread and growth of new standards, dominance, ossification, and eventually a better model for replacement.

