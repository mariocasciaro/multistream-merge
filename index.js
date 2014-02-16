var through = require('through2'),
  isPlainObject = require('lodash.isplainobject');


module.exports = function mergeStreams() {
  var closedStreams = 0;
  var args = arguments;
  var options = {};
  if(isPlainObject(args[0])) {
    options = args[0];
    args = Array.prototype.slice.call(args, 1);
  }

  args = Object.prototype.toString.call(args[0]) === '[object Array]' ?
    args[0] : args;

  if(args.length === 0) {
    return through({objectMode: options.objectMode});
  }
  
  if(args.length === 1) {
    return args[0];
  }
  
  //infer mode - doesn't work with old streams
  //var objectMode = (args[0]._readableState && args[0]._readableState.objectMode) ||
  //  (args[0]._writeableState && args[0]._writeableState.objectMode);
  
  var mergeStream = through({objectMode:  options.objectMode});
  
  Array.prototype.forEach.call(args, function(stream) {
    stream.pipe(mergeStream, {end: false});
    stream.once('end', function() {
      if(++closedStreams >= args.length) {
        mergeStream.end();
      }
    });
    stream.on('error', function(err) {
      mergeStream.emit('error', err);
    });
  });

  return mergeStream;
};


module.exports.obj = function() {
  var args = Array.prototype.slice.call(arguments, 0);
  args.unshift({objectMode: true});
  return module.exports.apply(null, args);
};
