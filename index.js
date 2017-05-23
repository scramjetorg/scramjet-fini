const {StringStream} = require('scramjet');
const fini = require("infinite-sequence-generator");

const defaultPrefix = fini("IDS");

class InfinteDataStream extends StringStream {
    constructor(prefix) {
        super("utf8");
        this.fini = fini(prefix || defaultPrefix.next().value);
    }

    _read() {
        const read = this.fini.next();
        if (read.done) {
            this.push(null);
        } else {
            this.push(read.value);
        }
    }
}

const DataStream = {
    addId(func, prefix) {
        const fin = fini(prefix || defaultPrefix.next().value);
        return this.pipe(new this.constructor({
            parallelTransform: (chunk) => func(chunk, fin.next().value)
        }));
    }
};

module.exports = {
    InfinteDataStream,
    DataStream
};
