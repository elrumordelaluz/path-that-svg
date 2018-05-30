const svgson = require('svgson-next').default
const stringify = require('svgson-next').stringify
const copy = require('fast-copy').default
const toPath = require('element-to-path')

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

module.exports = async svg => {
  const input = Buffer.isBuffer(svg) ? svg.toString() : svg
  const parsed = await svgson(input)
  return stringify(elemToPath(parsed))
}
