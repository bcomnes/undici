const fs = require('node:fs')
const path = require('node:path')
const childProcess = require('node:child_process')

const otp = process.env.npm_config_otp;

if (!otp) {
  throw new Error('Missing otp');
}

const packageJSONPath = path.join(__dirname, '..', 'package.json')
const packageJSONRaw = fs.readFileSync(packageJSONPath, 'utf-8')
const packageJSON = JSON.parse(packageJSONRaw)

const temporaryRename = path.join(__dirname, '..', '_package.json')
fs.renameSync(packageJSONPath, temporaryRename)

const packageTypesJSONPath = path.join(__dirname, 'package.types.json')
const packageTypesJSONRaw = fs.readFileSync(packageTypesJSONPath, 'utf-8')
const packageTypesJSON = JSON.parse(packageTypesJSONRaw)
packageTypesJSON.version = packageJSON.version

fs.writeFileSync(packageJSONPath, JSON.stringify(packageTypesJSON, null, 2))

try {
  console.log('publishing!')
  // childProcess.execSync(`npm publish --otp=${otp}`, { cwd: path.join(__dirname, '..') })
} finally {
  fs.rmSync(packageJSONPath)
  fs.renameSync(temporaryRename, packageJSONPath)
}
