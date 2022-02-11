import fetch from 'node-fetch'

export async function lookupApplication(id?: string, bundleId?: string) {
  if (id) {
    return fetch(`https://itunes.apple.com/lookup?id=${id}`).then((x: any) => x.json())
  } else if (bundleId) {
    return fetch(`https://itunes.apple.com/lookup?country=us&bundleId=${bundleId}`).then((x:any) => x.json())
  }
  return null
}

export function letterFromBundleIdOrName(bundleId?: string, name?: string) {
  return (bundleId?.split(".").reverse()[0] || '')[0] || name || ''
}