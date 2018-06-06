import fs from 'fs'
import { promisify } from 'util'
import test from 'ava'
import svgToPath from './dist/pathThatSvg.cjs'
const readFileAsync = promisify(fs.readFile)

test('Path that SVG!', async t => {
  const input = await readFileAsync('./test.svg')
  const expected = await readFileAsync('./converted.svg')
  const converted = await svgToPath(input)
  t.is(converted, expected.toString())
})

test.cb('Path that SVG2!', t => {
  fs.readFile('./test.svg', (err, input) => {
    fs.readFile('./converted.svg', (err, expected) => {
      svgToPath(input).then(converted => {
        t.is(converted, expected.toString())
        t.end()
      })
    })
  })
})
