export function rehypeLinks() {
  return function (tree) {
    tree.children.forEach((node) => {
      traverseLinks(node)
    })
  }
}

function traverseLinks(node) {
  //   console.log(node)
  if (node.tagName === "p") {
    node.children.forEach((n) => traverseLinks(n))
  } else if (node.tagName === "a") {
    const url = node.properties.href
    // console.log(url)
    if(url.startsWith('/')) return
    node.properties.target = "_blank"
    node.properties.rel = "noopener"
  }
}
