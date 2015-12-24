var assert         = require('assert');
var noop           = require('noop-fn');
var ReadableStream = require('stream').Readable;
var promiseData    = require('../');

it('Should resolve promise with the stream data buffer', function () {
    var stream = new ReadableStream();

    stream._read = noop;

    process.nextTick(function () {
        stream.push('Hey ');
        stream.push('ya');
        stream.push('!');
        stream.push(null);
    });

    return promiseData(stream)
        .then(function (data) {
            assert(Buffer.isBuffer(data));
            assert.strictEqual(stream.listeners('data').length, 0);
            assert.strictEqual(data.toString(), 'Hey ya!');
        });
});

it('Should resolve promise with the stream data string', function () {
    var stream = new ReadableStream();

    stream._read = noop;

    stream.setEncoding('utf8');

    process.nextTick(function () {
        stream.push('Hey ');
        stream.push('ya');
        stream.push('!');
        stream.push(null);
    });

    return promiseData(stream)
        .then(function (data) {
            assert(typeof data === 'string');
            assert.strictEqual(stream.listeners('data').length, 0);
            assert.strictEqual(data, 'Hey ya!');
        });
});


it('Should reject promise with the stream error', function () {
    var stream = new ReadableStream();
    var error  = new Error('Oops!');

    stream._read = noop;

    process.nextTick(function () {
        stream.push('Hey ');
        stream.push('ya');
        stream.emit('error', error);
        stream.push('!');
        stream.push(null);
    });

    return promiseData(stream)
        .then(function () {
            throw 'Promise rejection expected';
        })
        .catch(function (err) {
            assert.strictEqual(stream.listeners('data').length, 0);
            assert.strictEqual(err, error);
        });
});
