const {StringStream} = require("scramjet");
const fini = require("infinite-sequence-generator");

const defaultPrefix = fini("IDS");

/**
 * Exports an infinite stream with an infinite sequence of items.
 */
class InfinteDataStream extends StringStream {

    /**
     * Constructor
     *
     * @param {String} [prefix] an optional prefix for all chunks
     */
    constructor(prefix) {
        if (typeof prefix === "object") {
            super("utf8", prefix);
        } else {
            return StringStream.from(fini(prefix || defaultPrefix.next().value));
        }
    }
}

/**
 * DataStream plugin for scramjet
 */
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
        if (typeof func !== "function") {
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
