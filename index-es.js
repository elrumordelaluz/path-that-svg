import pathThatSvg from './index'

export default async input => {
  const svg = Buffer.isBuffer(input) ? input.toString() : input
  return await pathThatSvg(svg)
}
