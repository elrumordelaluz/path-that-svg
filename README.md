<p align="center">
  <img alt="Path that SVG!" title="Path that SVG!" src="https://cdn.rawgit.com/elrumordelaluz/path-that-svg/32de7c4d/logo.svg" width="450">
</p>

<p align="center">
  Sometimes is useful to have an <code>svg</code> done with <code>path</code>s instead of elements <br />
  such as <code>rect</code>, <code>circle</code>, <code>ellipse</code>, <code>line</code>, <code>polyline</code> or <code>polygon</code>. <br/>
  Like when you apply <em>Compound Path</em> in <em>Adobe Illustrator</em>.
</p>

## Install

```zsh
yarn add path-that-svg
```

## Usage

`String|Buffer` svg

```js
const svgToPath = require('path-that-svg')

fs.readFile('./elements.svg', (err, input) => {
  svgToPath(input).then(convertedFromBuffer => {
    console.log({ convertedFromBuffer })
  })
})

svgToPath(`<svg viewBox="0 0 500 200">
  <rect 
    x="200" 
    y="50" 
    fill="#F16362" 
    stroke="#30456B" 
    stroke-width="5" 
    stroke-linecap="round" 
    stroke-linejoin="round" 
    width="100" height="100"/>
</svg>`).then(convertedFromString => console.log({ convertedFromString }))
```

## Related

[element-to-path](https://github.com/elrumordelaluz/element-to-path) Convert SVG element into `path`
