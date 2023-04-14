# Squarespace Hamburgers

## Build

- Patch: update `node_module/gulp-sass/index.js` to append `data` into file content `opts.data = file.contents.toString() + opts.data;`
- In terminal run `gulp watch` to generate the files
- Find the URL at `http://localhost:3001/dist/example.html` to get the corresponding .css file to effect
- Get the latest version of the repo using [API](https://api.github.com/repos/BeyondspaceStudio/sqs-hamburgers/releases/latest) and [cdn](https://cdn.jsdelivr.net/gh/BeyondspaceStudio/sqs-hamburgers@1.0.2/dist/hamburgers-3dx-r.min.css)

## Attribution

- This is a forked version of [jonsuh/hamburgers](https://github.com/jonsuh/hamburgers)
- Origin README can be found https://github.com/jonsuh/hamburgers/blob/master/README.md
