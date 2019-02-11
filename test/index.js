module.exports = {
    async test_basic(test) {
        try {
            const {InfinteDataStream} = require("../index");
            const stream = new InfinteDataStream("abc");

            let x = 0;
            const out = await (
                stream
                    .while(() => x++ < 1000)
                    .toArray()
            );

            test.equals(out.length, 1000, "Should read a number of items");
            test.equals(out[999], "abc*\\", "Should contain the required data");

            test.ok(await stream.whenRead(), "Should not end");

            test.done();
        } catch(e) {
            console.error(e.stack); // eslint-disable-line
            test.fail(e);
            test.done();
        }
    }
};
