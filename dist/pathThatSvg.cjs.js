'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var svgson = require('svgson-next');
var svgson__default = _interopDefault(svgson);
var copy = _interopDefault(require('fast-copy'));
var toPath = _interopDefault(require('element-to-path'));

const elemToPath = node => {
  let o = copy(node);

  if (/(rect|circle|ellipse|polygon|polyline|line|path)/.test(o.name)) {
    o.attributes = Object.assign({}, o.attributes, {
      d: toPath(o)
    });
    for (const attr in o.attributes) {
      if (!/fill|stroke|opacity|d/.test(attr)) {
        delete o.attributes[attr];
      }
    }
    o.name = 'path';
  } else if (o.children && Array.isArray(o.children)) {
    o.children = o.children.map(elemToPath);
  }

  return o;
};

module.exports = async (svg, { scale = 1 } = {}) => {
  const input = Buffer.isBuffer(svg) ? svg.toString() : svg;
  const parsed = await svgson__default(input);
  const convertedToPath = elemToPath(parsed);
  return svgson.stringify(convertedToPath);
};
