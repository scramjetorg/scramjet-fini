Scramjet Infinite Stream
==========================

A readable stream and a Scramjet plugin that never ends and always returns consequent id's.

Installation
--------------

    npm install scramjet-fini

Usage as a plugin
-------------------

You can use this module as a scramjet plugin - it will add a new method to all the streams: `addId`

```javascript
    const scramjet = require('scramjet')
        .plugin(require("scramjet-fini"));

    fs.createReadStream("mydata.log")
        .pipe(new scramjet.StringStream())
        .split("\n")
        .parse(logParser)
        .addId((logline, id) => logline.id = id)
```

All the logs in the above example will have a sequential id.

Usage as Readable stream
--------------------------

```javascript
    const {InfinteDataStream} = require("scramjet-infinite");

    new InfiniteDataStream()
        .pipe(myStream);
```

Oh... if you think of piping this to disk - this actually **never ends** and it will eventually **use all your disk space**.
