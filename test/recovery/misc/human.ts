import * as t from 'assert';
import { recovery } from '../../../src/escaya';

// Reconstruct AST based on human language

describe('Recovery - Human', () => {
  for (const arg of [
    'while wait for the train i run for my life',
    'i switch then to my jacket to be protected',
    'try as much as you can for tomorrow it is too late',
    'I try and try and try, but soon to give up. I switch to better code!',
    'with this I am happy',
    'if I can run for this I will switch shoes',
    'if ever I run into a {, then this is a brace and I switch or try to switch to [',
    'human touch. ! me !',
    'switch then run !',
    'for yesterday was bad so I switch to summer for this clothes or I try ',
    'true is not false, maybe I switch to a boolean',
    'while wait for the train I sleep or try to sleep.',
    'what is a function?',
    'function or class? I try class or maybe a function ???!',
    'if I catch some sleep, I try to switch position',
    'this is not fun. I return home!',
    'semicolon - ; - or end of {. Error prawn. I try switch to something with clothes',
    'still going string! No infinite loops! No need to switch to Babel. I will not try !!!',
    'I will not try this with Babel parser',
    'statements! Lots of them. Or maybe this one? I switch to expression :)',
    'emojis I try!  :)  :( @(  != ',
    'foo bar || baz? I try zoo',
    'Endless parens should I try? ((((((((((((((((((((((((((((((((((((( or closing paren ))))))) I swithc to a bracket [',
    'I try, and it seems good. No need to switch!'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js', { disableWebCompat: true });
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js', { module: true, next: true });
      });
    });
  }
});
