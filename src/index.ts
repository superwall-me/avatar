import { IncomingMessage, ServerResponse } from "http"
import { lookupApplication } from "./itunes"

const url = require('url')
const crypto = require('crypto')
const image = require('./image')
const svgExt = /\.svg$/
const pngExt = /\.png$/
const sizePat = /^\d+x\d+$/

module.exports = async (req: IncomingMessage, res: ServerResponse) => {
  let { pathname, query } = url.parse(req.url, true)
  console.log(`yoooo`)
  if (pathname === '/favicon.ico') {
    return ''
  }
  if (pathname === '/') {
    res.setHeader('Location', 'https://superwall.com')
    res.statusCode = 301
  } else {
    res.setHeader('Cache-Control', 'max-age=2592000, public')
    res.setHeader('Last-Modified', 'Mon, 03 Jan 2011 17:45:57 GMT')
  }
  let height
  if (sizePat.test(query.size)) {
    height = query.size.slice(query.size.indexOf('x') + 1)
    query.size = query.size.slice(0, query.size.indexOf('x'))
  } else {
    height = query.size
  }
  let text = (pathname.replace('/', '')[0] || '').toUpperCase()
  console.log('pathnae', pathname)
  if (pathname.split(".").length >= 2) {
    console.log('pathname', pathname)
    // Guessing bundle id
    const app: any = await lookupApplication(undefined, pathname.replace('/', ''))
    console.log(app)
    if (app && app.results && app.results.length >= 1) {
      let url = app.results[0]?.artworkUrl100
      if (url) {
        res.setHeader('Location', url)
        res.statusCode = 301
        return ''
      }
    }
  } else if (pathname.replace("id", "").replace("/", "").match(/^[0-9]+$/)) {
    const app: any = await lookupApplication(pathname.replace("id", "").replace("/",""))
    if (app && app.results && app.results.length >= 1) {
    let url = app.results[0].artworkUrl100
      if (url) {
        res.setHeader('Location', url)
        res.statusCode = 301
        return ''
      }
    }
    text = ''
  }

  if (query.type === 'svg' || svgExt.test(pathname)) {
    res.setHeader('Content-Type', 'image/svg+xml')
    return image.generateSVG(pathname.replace(svgExt, ''), text, query.size, height || '')
  }
  res.setHeader('Content-Type', 'image/png')
  return image.generatePNG(pathname.replace(pngExt, ''), text, query.size, height || '')
}
