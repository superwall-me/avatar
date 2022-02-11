import crypto from "crypto"

const sharp = require('sharp')
const Color = require('color')

const svg = require('./svg')
const helper = require('./helper')

function generateGradient(username: string, text: string, width: number, height: number, pngAdjustment: boolean = false) {
  const hash = crypto.createHash('md5').update(username).digest('hex')

  let firstColor = helper.hashStringToColor(hash)
  firstColor = new Color(firstColor).saturate(0.5)

  const lightning = firstColor.hsl().color[2]
  if (lightning < 25) {
    firstColor = firstColor.lighten(3)
  }
  if (lightning > 25 && lightning < 40) {
    firstColor = firstColor.lighten(0.8)
  }
  if (lightning > 75) {
    firstColor = firstColor.darken(0.4)
  }

  let avatar = svg.replace('$FIRST', firstColor.hex())
  avatar = avatar.replace('$SECOND', helper.getMatchingColor(firstColor).hex())

  avatar = avatar.replace(/(\$WIDTH)/g, width)
  avatar = avatar.replace(/(\$HEIGHT)/g, height)

  avatar = avatar.replace(/(\$TEXT)/g, text.replace(/[^\x00-\x7F]/g, "").replace("\"", ""))
  // Hack for https://github.com/lovell/sharp/issues/1996
  if (pngAdjustment) {
    avatar = avatar.replace(/(\$DY)/g, (height * 0.9) / text.length * .35)
  }
  avatar = avatar.replace(/(\$FONTSIZE)/g, (height * 0.9) / text.length)

  return avatar
}

function parseSize(size: string) {
  const maxSize = 1000
  if (size && size.match(/^-?\d+$/) && parseInt(size, 10) <= maxSize) {
    return parseInt(size, 10)
  }
  return 100
}

exports.generateSVG = function(username: string, text: string, widthString: string, heightString:string) {
  let width = parseSize(widthString)
  let height = parseSize(heightString)
  return generateGradient(username, text, width, height)
}

exports.generatePNG = function(username: string, text: string, widthString: string, heightString: string) {
  let width = parseSize(widthString)
  let height = parseSize(heightString)
  const svg = generateGradient(username, text, width, height, true)
  console.log(`svg`, svg)
  return sharp(new Buffer(svg)).png()
}
