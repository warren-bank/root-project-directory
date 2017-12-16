const path = require('path')

const absolute = ((cwd) => {
  let {sep} = path
  let up1   = `${sep}..`
  let upN   = (cfg => {let N = (typeof cfg !== undefined) ? parseInt(cfg, 10) : 2; return up1.repeat(N)})(process.env.root_project_directory_script_depth)
  let root  = `${cwd}${upN}`

  /*
   * in:  /path/to/project-directory/node_modules/root-project-directory/../..
   * out: /path/to/project-directory
   */
  root = path.normalize(root)

  return root
})(__dirname)

const relative = descendant => {
  /*
   * intended use case:
   *   "descendant" is the "__dirname" of calling script
   * error:
   *   root project directory must be an ancestor of "descendant"
   */

  if (typeof descendant !== 'string')
    throw new Error(`[root-project-directory.relative(descendant)]: "descendant" parameter is not a string`)

  // sanity check: ensure path separators are correct for OS
  descendant = descendant.replace(/[\/\\]/g, path.sep)

  // sanity check: ensure "descendant" path doesn't include a trailing path separator
  if (descendant[descendant.length - 1] === path.sep)
    descendant = descendant.substr(0, (descendant.length - 1))

  if (descendant.indexOf(absolute) !== 0)
    throw new Error(`[root-project-directory.relative(descendant)]: "descendant" parameter is not a path that descends from the root project directory`)

  let relative_path  = descendant.substr((absolute.length))
  let relative_depth = (relative_path.match(new RegExp(`\\${path.sep}`, 'g')) || []).length

  if (relative_depth === 0)
    return '.'
  if (relative_depth === 1)
    return '..'
  else
    return (`..${path.sep}`).repeat(relative_depth - 1) + '..'
}

module.exports = {
  absolute_root:     absolute,
  get_relative_root: relative
}
