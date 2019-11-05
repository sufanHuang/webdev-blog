const parameters = process.argv
const inputFile = parameters[2]
const fs = require('fs')

console.log(parameters)
console.log('Working with', inputFile)

let template = fs.readFileSync('pages/template.html').toString()
let contents = fs.readFileSync(inputFile).toString()

let contentsToSave = template.replace('#CONTENTS#', contents)

fs.writeFileSync(inputFile, contentsToSave)

console.log('Saved modified', inputFile)
