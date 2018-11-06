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
    /**
     * Adds items to DataStream
     * 
     * @chainable
     * @memberof module:scramjet.DataStream#
     * @param {String|Function} func A function that assigns the id to the stream chunk or key under which to assign the infinite id.
     * @param {String} [prefix]
     */
    addId(func, prefix = defaultPrefix.next.value()) {
        if (typeof func !== 'function') {
            const key = func;
            func = (obj, id) => obj[key] = id;
        }

        const fin = fini(prefix);
        return this.pipe(new this.constructor({
            parallelTransform: (chunk) => func(chunk, fin.next().value)
        }));
    }
};

module.exports = {
    InfinteDataStream,
    DataStream
};
