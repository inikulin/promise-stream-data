var Promise = require('pinkie-promise');

module.exports = function promiseStreamData (stream) {
    return new Promise(function (resolve, reject) {
        var chunks   = [];
        var addChunk = chunks.push.bind(chunks);

        stream
            .on('data', addChunk)
            .once('error', function (err) {
                stream.removeListener('data', addChunk);
                reject(err);
            })
            .once('end', function () {
                stream.removeListener('data', addChunk);
                resolve(Buffer.isBuffer(chunks[0]) ? Buffer.concat(chunks) : chunks.join(''));
            });
    });
};
