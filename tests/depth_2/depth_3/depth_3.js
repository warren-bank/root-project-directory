const root = require('../../../')

const absolute = root.absolute_root
const relative = root.get_relative_root(__dirname)

console.log('absolute path to root of project directory:', absolute)
console.log('relative path to root of project directory:', relative)
