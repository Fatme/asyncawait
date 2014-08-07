﻿import references = require('references');
import jointProtocol = require('../src/jointProtocol');
export = yield_;


var yield_: AsyncAwait.Yield = <any> function yield_(value?: any) {

    // Ensure this function is executing inside a fiber.
    var fi = jointProtocol.currentFiber();
    if (!fi) throw new Error('yield: may only be called inside a suspendable function.');

    // Delegate to the appropriate protocol-specific behaviour.
    fi.suspend(null, value);
};
