### [root-project-directory](https://github.com/warren-bank/root-project-directory)

#### Description:

This is a tiny library to help when importing modules (ES6/CommonJS) with paths relative to the root of the project directory.

#### Installation:

```bash
npm install --save '@warren-bank/root-project-directory'
```

#### Usage (tl;dr):

```javascript
const root     = require('@warren-bank/root-project-directory').absolute_root
const module_A = require(root + '/foo/bar/baz/A')
```

#### Usage (verbose):

```javascript
const root = require('@warren-bank/root-project-directory')

const absolute = root.absolute_root
const relative = root.get_relative_root(__dirname)

console.log('absolute path to root of project directory:', absolute)
console.log('relative path to root of project directory:', relative)

const module_A = require(absolute + '/foo/bar/baz/A')
const module_B = require(relative + '/foo/bar/baz/B')

// reminder: ES6 modules currently require a transpiler
import * as module_C from (absolute + '/foo/bar/baz/C')
import {d}, module_D from (relative + '/foo/bar/baz/D')
```

#### Console Logs (from verbose usage example):

```text
absolute path to root of project directory: /path/to/project
relative path to root of project directory: ../../..
```

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPLv2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
