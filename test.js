import { promises as fs } from 'fs'
import test from 'ava'
import svgToPath from './dist/pathThatSvg.cjs'
import parse from 'svgson'

test('Converts element into paths', async (t) => {
  const input = await fs.readFile('./test.svg')
  const converted = await svgToPath(input)
  const parsed = await parse(converted)
  parsed.children.forEach((child) => t.is(child.name, 'path'))
})

const testAttrs = ['class', 'id', 'data-test', 'transform']

test('Mantain attributes', async (t) => {
  const input = await fs.readFile('./test.svg')
  const converted = await svgToPath(input)
  const inputParsed = await parse(input.toString())
  const convertedParsed = await parse(converted)

  inputParsed.children.forEach((child, index) => {
    testAttrs.forEach((attr) => {
      if (child.attributes[attr]) {
        t.is(
          child.attributes[attr],
          convertedParsed.children[index].attributes[attr]
        )
      }
    })
  })
})
