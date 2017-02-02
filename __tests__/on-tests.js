'use strict';

jest.autoMockOff();
const defineTest = require('jscodeshift/dist/testUtils').defineTest;

defineTest(__dirname, 'transform', null, 'replaces-with-lifecycle');
defineTest(__dirname, 'transform', null, 'leaves-observer-alone');
