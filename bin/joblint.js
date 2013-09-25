#!/usr/bin/env node
'use strict';

var joblint = require('../lib/joblint');

console.log(joblint('This is some text which is part of a job spec'));
