import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

const API_ENDPOINT = 'https://data.jsdelivr.com/v1/package/npm'
const CDN_ENDPOINT = 'https://cdn.jsdelivr.net/npm'

/**
 * Get the lastest package version from API
 * @param {string} packageName the name of the package
 * @returns the latest version of the package in a string
 */
const getLatestPackageVersion = async (packageName) => {
  const response = await fetch(API_ENDPOINT + `/${packageName}`)
  const json = await response.json()
  return json.tags.latest
}

/**
 * Get a file within a package
 * @param {string} packageName the name of the package
 * @param {string} version the version of the package
 * @param {string} path the path to the file in the package
 * @returns the file as plain text
 */
const getPackageFile = async (packageName, version, path) => {
  const response = await fetch(CDN_ENDPOINT + `/${packageName}@${version}/${path}`)
  return response.text()
}

/**
 * Save plain text to disk
 * @param {string} path the path to the destination
 * @param {string} text plain text to be saved
 */
const saveFile = (path, text) => {
  fs.writeFileSync(path, text, (err) => {
    if (err) throw err
  })
}

/**
 * Download a package file and save to the disk
 * @param {string} name the name of the package
 * @param {string} version the version of the package
 * @param {string} remotePath the remote file path
 * @param {string} localPath the local file path
 */
const downloadPackageFile = async (name, version, remotePath, localPath) => {
  const file = await getPackageFile(name, version, remotePath)
  saveFile(localPath, file)
}

/**
 * Read the dependencies.json from the disk
 * @param {string} path to dependencies.json
 * @returns an object contains the dependencies
 */
const readDependenciesInfo = (path) => {
  return JSON.parse(fs.readFileSync(path, 'utf8'))
}

// load dependencies.json
const deps = readDependenciesInfo('dependencies.json')
// configure local bask path
const LOCAL_BASE_PATH = deps.localBasePath

const updatedDependencies = await Promise.all(deps.dependencies.map(async dependency => {
  const packageName = dependency.name
  const version = dependency.version
  const files = dependency.files
  const latestVersion = await getLatestPackageVersion(packageName)
  if (latestVersion === version) return dependency
  files.forEach(async file => {
    await downloadPackageFile(packageName, latestVersion, file.remote, path.join(LOCAL_BASE_PATH, file.local))
  })
  dependency.version = latestVersion
  return dependency
}))

// save the updated dependencies to disk
deps.dependencies = updatedDependencies
saveFile('./dependencies.json', JSON.stringify(deps, null, 4))
