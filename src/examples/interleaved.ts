﻿import _refs = require('_refs');
import fs = require('fs');
import Promise = require('bluebird');
import async = require('../async');
import await = require('../await');

// A slow asynchronous function, written in async/await style
var longCalculation = async (function(seconds: number, result) {
    await(Promise.delay(seconds * 1000));
    return result;
});

// A pair of synchronous-looking compound operations, written in async/await style
var compoundOperationA = async (function() {
    console.log('A: zero');
    console.log(await (longCalculation(1, 'A: one')));
    console.log(await (longCalculation(1, 'A: two')));
    console.log(await (longCalculation(1, 'A: three')));
    return 'A: Finished!';
});
var compoundOperationB = async (function() {
    await (longCalculation(0.5, '')); // Fall half a second behind A
    console.log('B: zero');
    console.log(await (longCalculation(1, 'B: one')));
    console.log(await (longCalculation(1, 'B: two')));
    console.log(await (longCalculation(1, 'B: three')));
    return 'B: Finished!';
});

// Start both compound operations
compoundOperationA().then(function(result) { console.log(result); });
compoundOperationB().then(function(result) { console.log(result); });
