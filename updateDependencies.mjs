import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

const API_ENDPOINT = 'https://data.jsdelivr.com/v1/package/npm'
const CDN_ENDPOINT = 'https://cdn.jsdelivr.net/npm'

const getLatestPackageVersion = async (packageName) => {
  const response = await fetch(API_ENDPOINT + `/${packageName}`)
  const json = await response.json()
  return json.tags.latest
}

const getPackageFile = async (packageName, version, path) => {
  const response = await fetch(CDN_ENDPOINT + `/${packageName}@${version}/${path}`)
  return response.text()
}

const saveFile = async (path, text) => {
  fs.writeFile(path, text, (err) => {
    if (err) throw err
  })
}

const downloadPackage = async (name, version, remotePath, localPath) => {
  const file = await getPackageFile(name, version, remotePath)
  await saveFile(localPath, file)
}

const readDependenciesInfo = (path) => {
  return JSON.parse(fs.readFileSync(path, 'utf8'))
}

const deps = readDependenciesInfo('dependencies.json')
const LOCAL_BASE_PATH = deps.localBasePath

deps.dependencies.forEach(async dependency => {
  const packageName = dependency.name
  const version = dependency.version
  const files = dependency.files
  const latestVersion = await getLatestPackageVersion(packageName)
  if (latestVersion === version) return
  files.forEach(async file => {
    await downloadPackage(packageName, latestVersion, file.remote, path.join(LOCAL_BASE_PATH, file.local))
  })
})
