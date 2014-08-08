﻿import references = require('references');
import assert = require('assert');
import _ = require('../../util');
export = mod;


/** Provides an async builder for producing suspendable functions accept node-style callbacks. */
var mod = {

    /** Used for diagnostic purposes. */
    name: 'cps',

    /** Used only for automatic type interence at TypeScript compile time. */
    type: <AsyncAwait.Async.CPSBuilder> null,

    /** Provides appropriate handling for callback-accepting suspendable functions. */
    overrideProtocol: (base, options) => ({

        /** Remembers the given callback and synchronously returns nothing. */
        begin: (fi, callback: AsyncAwait.Callback<any>) => {
            assert(_.isFunction(callback), 'Expected final argument to be a callback');
            fi.context = callback;
            fi.resume();
        },

        /** Invokes the callback with a result or an error, depending on whether the function returned or threw. */
        end: (fi, error?, value?) => {
            if (error) fi.context(error); else fi.context(null, value);
        }
    })
};
