var expect = require('chai').expect,
  through = require('through2'),
  ReadableStream = require('readable-stream/readable'),
  multistreamMerge = require('./');



describe('multistream-merge', function() {
  
  it('should merge 2 readable streams (buffer)', function(done) {
    var stream1 = new ReadableStream();
    stream1._read = function() {
      var self = this;
      setTimeout(function() {
        self.push('astring1');
      }, 50);
      setTimeout(function() {
        self.push(null);
      }, 100);
      this._read = function(){};
    };
    var stream2 = new ReadableStream();
    stream2._read = function() {
      var self = this;
      setTimeout(function() {
        self.push('astring2');
      }, 30);
      setTimeout(function() {
        self.push(null);
      }, 70);
      this._read = function(){};
    };
    
    var buffer = [];
    multistreamMerge(stream1, stream2)
      .pipe(through(function(chunk, enc, cb) {
        buffer.push(String(chunk));
        cb();
      }))
      .on('finish', function() {
        expect(buffer).to.have.length(2);
        expect(buffer).to.contain('astring1');
        expect(buffer).to.contain('astring2');
        done();
      });
  });


  it('should merge 2 readable streams (objectMode)', function(done) {
    var stream1 = new ReadableStream({objectMode: true});
    stream1._read = function() {
      var self = this;
      setTimeout(function() {
        self.push({obj1: true});
      }, 50);
      setTimeout(function() {
        self.push(null);
      }, 100);
      this._read = function(){};
    };
    var stream2 = new ReadableStream({objectMode: true});
    stream2._read = function() {
      var self = this;
      setTimeout(function() {
        self.push({obj2: true});
      }, 30);
      setTimeout(function() {
        self.push(null);
      }, 70);
      this._read = function(){};
    };

    var buffer = [];
    multistreamMerge.obj(stream1, stream2)
      .pipe(through.obj(function(chunk, enc, cb) {
        buffer.push(chunk);
        cb();
      }))
      .on('finish', function() {
        expect(buffer).to.have.length(2);
        expect(buffer[0].obj1 || buffer[0].obj2).to.be.true;
        expect(buffer[1].obj1 || buffer[1].obj2).to.be.true;
        done();
      });
  });
});
