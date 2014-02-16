[![Build Status](https://secure.travis-ci.org/mariocasciaro/multistream-merge.png?branch=master)](https://travis-ci.org/mariocasciaro/multistream-merge) 
[![NPM version](https://badge.fury.io/js/multistream-merge.png)](http://badge.fury.io/js/multistream-merge) 
[![Dependency Status](https://gemnasium.com/mariocasciaro/multistream-merge.png)](https://gemnasium.com/mariocasciaro/multistream-merge)

# multistream-merge

> Merge multiple streams into one, using Streams2.

The order of the emitted chunks/objects is random in the sense that this module does not enforce any ordering on the emitted data.

## Install

Install with [npm](https://npmjs.org/package/multistream-merge).

```
npm install multistream-merge
```

## Examples

### Buffer mode
```js
var multistreamMerge = require('multistream-merge');

multistreamMerge(childProcess.stdout, childProcess.stderr)
    .pipe(fs.createWriteStream('output.log'));
```

### Object mode
```js
var gulp = require('gulp');
var multistreamMerge = require('multistream-merge');

multistreamMerge.obj(gulp.src('assets/**'), gulp.src('src/**'))
    .pipe(gulp.dest('out/'));
```

## Documentation

### multistreamMerge([options], readableStreams)

#### options
Type: `Object`

Available options:
* `objectMode`: `false`. Set the objectMode options for the merge stream.

#### readableStreams
Type: `...ReadableStream` | `ReadableStream[]`

The input streams to merge

### multistreamMerge.obj(readableStreams)

Convenience method to create a merge stream with object mode enabled.

## License

[MIT](http://en.wikipedia.org/wiki/MIT_License) @ Mario Casciaro

-----

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/mariocasciaro/multistream-merge/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

