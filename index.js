import svgson, { stringify } from 'svgson-next'
import copy from 'fast-copy'
import toPath from 'element-to-path'

const elemToPath = node => {
  let o = copy(node)

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

export default async (svg, { scale = 1 } = {}) => {
  const input = Buffer.isBuffer(svg) ? svg.toString() : svg
  const parsed = await svgson(input)
  const convertedToPath = elemToPath(parsed)
  return stringify(convertedToPath)
}
