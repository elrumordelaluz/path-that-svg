import pathThatSvg from './index'

async function pts(input) {
  const svg = Buffer.isBuffer(input) ? input.toString() : input
  return await pathThatSvg(svg)
}
export default pts

export { pts as pathThatSvg }
