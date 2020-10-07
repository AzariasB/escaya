import * as t from 'assert';
import { recovery } from '../../../src/escaya';

// Reconstruct AST based on human language

describe('Recovery - Human', () => {
  for (const arg of [
    'I ran into infite loop while try to develop this {',
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

  it('Transform Romantic poetry to ECMA script', () => {
    t.deepStrictEqual(
      recovery(
        `Romantic poetry is the poetry of the Romantic era, an artistic, literary, musical and intellectual movement that originated in Europe towards the end of the 18th century. It involved a reaction against prevailing Enlightenment ideas of the 18th century,[1] and lasted approximately from 1800 to 1850`,
        'recovery.js'
      ),
      {
        type: 'RootNode',
        webCompat: true,
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'Romantic',
              start: 0,
              end: 8,

              flags: 0
            },
            start: 0,
            end: 8,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'poetry',
              start: 8,
              end: 15,

              flags: 0
            },
            start: 8,
            end: 15,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'is',
              start: 15,
              end: 18,

              flags: 0
            },
            start: 15,
            end: 18,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'the',
              start: 18,
              end: 22,

              flags: 0
            },
            start: 18,
            end: 22,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'poetry',
              start: 22,
              end: 29,

              flags: 0
            },
            start: 22,
            end: 29,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'of',
              start: 29,
              end: 32,

              flags: 0
            },
            start: 29,
            end: 32,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'the',
              start: 32,
              end: 36,

              flags: 0
            },
            start: 32,
            end: 36,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'Romantic',
              start: 36,
              end: 45,

              flags: 0
            },
            start: 36,
            end: 45,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CommaOperator',
              expressions: [
                {
                  type: 'IdentifierReference',
                  name: 'era',
                  start: 45,
                  end: 49,

                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'an',
                  start: 50,
                  end: 53,

                  flags: 0
                }
              ],
              start: 45,
              end: 53,

              flags: 0
            },
            start: 45,
            end: 53,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CommaOperator',
              expressions: [
                {
                  type: 'IdentifierReference',
                  name: 'artistic',
                  start: 53,
                  end: 62,

                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'literary',
                  start: 63,
                  end: 72,

                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'musical',
                  start: 73,
                  end: 81,

                  flags: 0
                }
              ],
              start: 53,
              end: 81,

              flags: 0
            },
            start: 53,
            end: 81,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'and',
              start: 81,
              end: 85,

              flags: 0
            },
            start: 81,
            end: 85,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'intellectual',
              start: 85,
              end: 98,

              flags: 0
            },
            start: 85,
            end: 98,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'movement',
              start: 98,
              end: 107,

              flags: 0
            },
            start: 98,
            end: 107,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'that',
              start: 107,
              end: 112,

              flags: 0
            },
            start: 107,
            end: 112,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'IdentifierReference',
                name: 'originated',
                start: 112,
                end: 123,

                flags: 0
              },
              operator: 'in',
              right: {
                type: 'IdentifierReference',
                name: 'Europe',
                start: 126,
                end: 133,

                flags: 0
              },
              start: 112,
              end: 133,

              flags: 0
            },
            start: 112,
            end: 133,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'towards',
              start: 133,
              end: 141,

              flags: 0
            },
            start: 133,
            end: 141,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'the',
              start: 141,
              end: 145,

              flags: 0
            },
            start: 141,
            end: 145,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'end',
              start: 145,
              end: 149,

              flags: 0
            },
            start: 145,
            end: 149,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'of',
              start: 149,
              end: 152,

              flags: 0
            },
            start: 149,
            end: 152,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'the',
              start: 152,
              end: 156,

              flags: 0
            },
            start: 152,
            end: 156,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NumericLiteral',

              value: 18,
              start: 156,
              end: 159,

              flags: 0
            },
            start: 156,
            end: 159,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'th',
              start: 159,
              end: 161,

              flags: 0
            },
            start: 159,
            end: 161,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              member: {
                type: 'IdentifierReference',
                name: 'century',
                start: 161,
                end: 169,

                flags: 0
              },
              expression: {
                type: 'IdentifierName',
                name: 'It',
                start: 170,
                end: 173,

                flags: 0
              },
              computed: false,
              start: 161,
              end: 173,

              flags: 0
            },
            start: 161,
            end: 173,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'involved',
              start: 173,
              end: 182,

              flags: 0
            },
            start: 173,
            end: 182,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'a',
              start: 182,
              end: 184,

              flags: 0
            },
            start: 182,
            end: 184,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'reaction',
              start: 184,
              end: 193,

              flags: 0
            },
            start: 184,
            end: 193,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'against',
              start: 193,
              end: 201,

              flags: 0
            },
            start: 193,
            end: 201,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'prevailing',
              start: 201,
              end: 212,

              flags: 0
            },
            start: 201,
            end: 212,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'Enlightenment',
              start: 212,
              end: 226,

              flags: 0
            },
            start: 212,
            end: 226,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'ideas',
              start: 226,
              end: 232,

              flags: 0
            },
            start: 226,
            end: 232,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'of',
              start: 232,
              end: 235,

              flags: 0
            },
            start: 232,
            end: 235,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'the',
              start: 235,
              end: 239,

              flags: 0
            },
            start: 235,
            end: 239,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NumericLiteral',

              value: 18,
              start: 239,
              end: 242,

              flags: 0
            },
            start: 239,
            end: 242,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'th',
              start: 242,
              end: 244,

              flags: 0
            },
            start: 242,
            end: 244,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CommaOperator',
              expressions: [
                {
                  type: 'IdentifierReference',
                  name: 'century',
                  start: 244,
                  end: 252,

                  flags: 0
                },
                {
                  type: 'ArrayLiteral',
                  elements: [
                    {
                      type: 'NumericLiteral',

                      value: 1,
                      start: 254,
                      end: 255,

                      flags: 0
                    }
                  ],
                  start: 253,
                  end: 256,
                  flags: 0
                }
              ],
              start: 244,
              end: 256,

              flags: 0
            },
            start: 244,
            end: 256,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'and',
              start: 256,
              end: 260,

              flags: 0
            },
            start: 256,
            end: 260,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'lasted',
              start: 260,
              end: 267,

              flags: 0
            },
            start: 260,
            end: 267,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'approximately',
              start: 267,
              end: 281,

              flags: 0
            },
            start: 267,
            end: 281,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'from',
              start: 281,
              end: 286,

              flags: 0
            },
            start: 281,
            end: 286,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NumericLiteral',

              value: 1800,
              start: 286,
              end: 291,

              flags: 0
            },
            start: 286,
            end: 291,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'to',
              start: 291,
              end: 294,

              flags: 0
            },
            start: 291,
            end: 294,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NumericLiteral',

              value: 1850,
              start: 294,
              end: 299,

              flags: 0
            },
            start: 294,
            end: 299,

            flags: 0
          }
        ],
        text:
          'Romantic poetry is the poetry of the Romantic era, an artistic, literary, musical and intellectual movement that originated in Europe towards the end of the 18th century. It involved a reaction against prevailing Enlightenment ideas of the 18th century,[1] and lasted approximately from 1800 to 1850',
        fileName: 'recovery.js',
        context: 0,
        mutualFlags: 0,
        diagnostics: [
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 9,
            length: 6
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 16,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 19,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 23,
            length: 6
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 30,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 33,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 37,
            length: 8
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 46,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 54,
            length: 8
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 82,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 86,
            length: 12
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 99,
            length: 8
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 108,
            length: 4
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 113,
            length: 10
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 134,
            length: 7
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 142,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 146,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 150,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 153,
            length: 3
          },
          {
            kind: 2,
            source: 0,
            message: 'An identifier or keyword cannot immediately follow a numeric literal',
            code: 58,
            start: 159,
            length: 0
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 157,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 159,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 162,
            length: 7
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 174,
            length: 8
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 183,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 185,
            length: 8
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 194,
            length: 7
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 202,
            length: 10
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 213,
            length: 13
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 227,
            length: 5
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 233,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 236,
            length: 3
          },
          {
            kind: 2,
            source: 0,
            message: 'An identifier or keyword cannot immediately follow a numeric literal',
            code: 58,
            start: 242,
            length: 0
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 240,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 242,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 245,
            length: 7
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 257,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 261,
            length: 6
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 268,
            length: 13
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 282,
            length: 4
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 287,
            length: 4
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 292,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 295,
            length: 4
          }
        ],
        detached: false,
        incremental: false,
        parent: null,
        children: [],
        start: 0,
        length: 299,
        end: 299
      }
    );
  });

  it('Transform Basic math formulas ECMA script', () => {
    t.deepStrictEqual(
      recovery(`Let a1,a2,a3,......,an be a set of numbers, average = (a1 + a2 + a3,+......+ an)/n`, 'recovery.js'),
      {
        directives: [],
        leafs: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'Let',
              start: 0,
              end: 3,

              flags: 0
            },
            start: 0,
            end: 3,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CommaOperator',
              expressions: [
                {
                  type: 'IdentifierReference',
                  name: 'a1',
                  start: 3,
                  end: 6,

                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'a2',
                  start: 7,
                  end: 9,

                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'a3',
                  start: 10,
                  end: 12,

                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: '',
                  start: 13,
                  end: 13,

                  flags: 2
                }
              ],
              start: 3,
              end: 13,

              flags: 0
            },
            start: 3,
            end: 13,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'an',
              start: 20,
              end: 22,

              flags: 0
            },
            start: 20,
            end: 22,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'be',
              start: 22,
              end: 25,

              flags: 0
            },
            start: 22,
            end: 25,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'a',
              start: 25,
              end: 27,

              flags: 0
            },
            start: 25,
            end: 27,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'set',
              start: 27,
              end: 31,

              flags: 0
            },
            start: 27,
            end: 31,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'of',
              start: 31,
              end: 34,

              flags: 0
            },
            start: 31,
            end: 34,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CommaOperator',
              expressions: [
                {
                  type: 'IdentifierReference',
                  name: 'numbers',
                  start: 34,
                  end: 42,

                  flags: 0
                },
                {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'IdentifierReference',
                    name: 'average',
                    start: 43,
                    end: 51,

                    flags: 0
                  },
                  operator: '=',
                  right: {
                    type: 'ParenthesizedExpression',
                    expression: {
                      type: 'CommaOperator',
                      expressions: [
                        {
                          type: 'BinaryExpression',
                          left: {
                            type: 'BinaryExpression',
                            left: {
                              type: 'IdentifierReference',
                              name: 'a1',
                              start: 55,
                              end: 57,

                              flags: 0
                            },
                            operator: '+',
                            right: {
                              type: 'IdentifierReference',
                              name: 'a2',
                              start: 59,
                              end: 62,

                              flags: 0
                            },
                            start: 55,
                            end: 62,

                            flags: 0
                          },
                          operator: '+',
                          right: {
                            type: 'IdentifierReference',
                            name: 'a3',
                            start: 64,
                            end: 67,

                            flags: 0
                          },
                          start: 55,
                          end: 67,

                          flags: 0
                        },
                        {
                          type: 'UnaryExpression',
                          operator: '+',
                          operand: {
                            type: 'IdentifierReference',
                            name: '',
                            start: 69,
                            end: 69,

                            flags: 2
                          },
                          start: 68,
                          end: 69,
                          flags: 0
                        }
                      ],
                      start: 53,
                      end: 69,

                      flags: 0
                    },
                    start: 53,
                    end: 69,
                    flags: 0
                  },
                  start: 43,
                  end: 69,

                  flags: 0
                }
              ],
              start: 34,
              end: 69,

              flags: 0
            },
            start: 34,
            end: 69,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: '+',
              operand: {
                type: 'IdentifierReference',
                name: 'an',
                start: 76,
                end: 79,

                flags: 0
              },
              start: 75,
              end: 79,
              flags: 0
            },
            start: 75,
            end: 79,

            flags: 0
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'RegularExpressionLiteral',
              pattern: '',
              flag: '',
              start: 80,
              end: 82,
              flags: 0
            },
            start: 80,
            end: 82,

            flags: 0
          }
        ],
        text: 'Let a1,a2,a3,......,an be a set of numbers, average = (a1 + a2 + a3,+......+ an)/n',
        fileName: 'recovery.js',
        context: 0,
        mutualFlags: 0,
        diagnostics: [
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 4,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: 'Expression expected',
            code: 7,
            start: 13,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: 'Statement expected',
            code: 8,
            start: 16,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: 'Statement expected',
            code: 8,
            start: 19,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 23,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 26,
            length: 1
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 28,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 32,
            length: 2
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 35,
            length: 7
          },
          {
            kind: 2,
            source: 2,
            message: 'Expression expected',
            code: 7,
            start: 69,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: 'Statement expected',
            code: 8,
            start: 72,
            length: 3
          },
          {
            kind: 2,
            source: 2,
            message: '`;` expected',
            code: 92,
            start: 79,
            length: 1
          },
          {
            kind: 2,
            source: 0,
            message: 'Unterminated regular expression',
            code: 12,
            start: 80,
            length: 2
          }
        ],
        detached: false,
        incremental: false,
        parent: null,
        children: [],
        start: 0,
        length: 82,
        type: 'RootNode',
        webCompat: true,
        end: 82
      }
    );
  });
});
