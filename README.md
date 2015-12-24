# promise-stream-data
[![Build Status](https://api.travis-ci.org/inikulin/promise-stream-data.svg)](https://travis-ci.org/inikulin/promise-stream-data)

*Create promises for the ReadableStream data.*

## Install
```
npm install promise-stream-data
```

## Usage
```js
const http      = require('http');
const fetchData = require('promise-stream-data');

http.get('http://google.com', res => {
    fetchData(res)
        .then(data => console.log(data))
        .catch(err => console.error(err));
});
```

## Author
[Ivan Nikulin](https://github.com/inikulin) (ifaaan@gmail.com)
