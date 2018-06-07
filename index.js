import svgson, { stringify } from 'svgson-next'
import toPath from 'element-to-path'

const elemToPath = node => {
  let o = Object.assign({}, node)

  if (/(rect|circle|ellipse|polygon|polyline|line|path)/.test(o.name)) {
    o.attributes = Object.assign({}, o.attributes, {
      d: toPath(o),
    })
    for (const attr in o.attributes) {
      if (!/fill|stroke|opacity|d/.test(attr)) {
        delete o.attributes[attr]
      }
    }
    o.name = 'path'
  } else if (o.children && Array.isArray(o.children)) {
    o.children = o.children.map(elemToPath)
  }

  return o
}

export default async svg => {
  const parsed = await svgson(svg)
  const convertedToPath = elemToPath(parsed)
  return stringify(convertedToPath)
}
