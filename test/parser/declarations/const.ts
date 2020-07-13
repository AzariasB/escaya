import * as t from 'assert';
import { parseScript, recovery } from '../../../src/escaya';

describe('Declarations - Const', () => {
  // Invalid cases
  for (const arg of [
    //'let y = typeof async x => await x',
    //'const {let} = 1;',
    'const ...a = 1;',
    'const a = 2, ...b = 1;',
    'const [.x] = obj;',
    'const [..x] = obj;',
    'const foo, bar;',
    'const {(x)} = v;',
    'const {[a]} = v;',
    'const foo;',
    'const {[a]: b.c} = v;',
    'const {[a]: b.c} = v',
    //'const [(x)] = v',
    'const foo =x, bar;',
    'const {typeof} = x;',
    'const [foo=a];',
    'const [foo];',
    'const [foo] = x, b;',
    'const [foo], bar;',
    'const {do} = x;',
    'const {else} = x;',
    'const [...] = obj;',
    'const [...,] = obj;',
    'const [... ...foo] = obj;',
    'const [...bar = foo] = obj;',
    'const [...foo,,] = obj;',
    'const [...foo, bar] = obj;',
    'const foo, [bar];',
    'const x, [foo] = y;',
    'const [foo] = arr, bar;',
    'const {x}, y;',
    'const {x:y=z} = obj, {a:b=c};',
    'const {[x]};',
    'const a = 2,',
    'const {};',
    'const foo',
    'const [...[foo + bar]] = obj;',
    'const [...[foo, bar],] = obj;',
    'const {,,} = obj;',
    'const {x,, y} = obj;',
    'const {[x] = y} = z;',
    'const {[x]: y};',
    'const {[x]} = z;',
    'const {...{a}} = x',
    'const {...a+b} = x',
    'const [[(a)], ((((((([b])))))))] = [[],[]];',
    'const [++a] = [];',
    'const [a--] = [];',
    'const [...a, b] = [];',
    'const {a.b} = v;',
    // 'const o = { C: class {} }; new o?.C();',
    // 'const o = { C: class {} }; new o?.["C"]();',
    'const o = { tag() {} }; o?.tag``;',
    'const [a, let, b] = [1, 2, 3];',
    'const foo, bar = x;',
    'const {x}, y;',
    'const {a:=c} = z;',
    'const x, {y} = obj;',
    'const {x,,} = obj;',
    'const {,x} = obj;'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }

  // Valid cases
  for (const arg of [
    'const [,,] = x;',
    'const [...bar] = ob',
    'const {x,} = obj;',
    'const [,,foo] = x;',
    'const [x, ...[a, b]] = obj;',
    'const [a=[...b], ...c] = obj;',
    'const [foo=a] = c;',
    'const [foo=a,bar] = x;',
    'const [foo,bar] = x;',
    'const { [i]: val, ...rest } = a',
    'const { ["1"]: number2, ...rest2 } = obj',
    'const { 1: value } = obj;',
    'const a = { 1: 0, 2: 1, 3: 2 }',
    'const i = 1',
    'const [foo=a,bar] = x;',
    'const [foo,bar=b] = x;',
    'const [foo=a,bar=b] = x;',
    'const [...bar] = obj;',
    'for (const [,] of x);',
    'for (const {a, [x]: y} in obj);',
    'for (const {x : y, z, a : b = c} in obj);',
    'const [foo, ...bar] = obj;',
    'const {foo,} = x;',
    'const {foo} = x, {bar} = y;',
    'const {foo} = x, b = y;',
    'const [foo, bar=b] = arr;',
    'const a = {b: {c: Function()}}',
    'const {c} = a.b',
    'const [foo=a, bar] = arr;',
    'const [foo=a] = arr;',
    'const [foo] = arr;',
    'const oo = {c: 23, ...o}',
    'const o = {a: 1, b: 2, e: 4}',
    '({a, b, ...other} = oo)',
    'const oo = {c: 23, ...o}({a, b, ...other} = oo)',
    'const o = {a: 1, b: 2, e: 4}',
    'const {a, b, ...other} = oo;',
    'const [] = x;',
    'const { data: { courses: oldCourses = [] } = {} } = getState();',
    'const { [(() => 1)()]: a, ...rest } = { 1: "a" };',
    'const [foo,bar] = arr;',
    'const [,foo] = arr;',
    'const x = y, {foo} = z;',
    'const {foo=a} = x;',
    'const { [eval]: []} = a;',
    'const {foo=a,bar} = x;',
    'const {foo,bar=b} = x;',
    'const {foo=a,bar=b} = x;',
    'const {foo:a} = x;',
    'const foo = bar',
    '"use strict"; const foo = bar',
    'const [a = 1] = [];',
    'const [[a]] = [[]];',
    'const {foo:a,bar} = x;',
    'const {foo,bar:b} = x;',
    'const a = Infinity;',
    'const b = -Infinity;',
    'const c = +Infinity;',
    'const d = /abc/;',
    'const e = /abc/g;',
    'const f = /abc/gi;',
    'const [] = x;',
    'const [,] = x;',
    'const [,,] = x;',
    'const key = 2;',
    'const {[a]: c} = v;',
    'const {x} = v;',
    'const {[a.b]: c} = v;',
    `const {
    [({ ...rest }) => {
      let { ...b } = {};
    }]: a,
    [({ ...d } = {})]: c,
  } = {};`,
    `const {
    a = ({ ...rest }) => {
      let { ...b } = {};
    },
    c = ({ ...d } = {}),
  } = {};`,
    'const { a: { ...bar }, b: { ...baz }, ...foo } = obj;',
    `var z = {};
            var { ...x } = z;
            var { ...a } = { a: 1 };
            var { ...x } = a.b;
            var { ...x } = a();
            var {x1, ...y1} = z;
            x1++;
            var { [a]: b, ...c } = z;
            var {x1, ...y1} = z;
            let {x2, y2, ...z2} = z;
            const {w3, x3, y3, ...z4} = z;
            let {
              x: { a: xa, [d]: f, ...asdf },
              y: { ...d },
              ...g
            } = complex;
            let { x4: { ...y4 } } = z;`,
    `let {
              a: [b, ...arrayRest],
              c = function(...functionRest){},
              ...objectRest
            } = {
              a: [1, 2, 3, 4],
              d: "oyez"
            };`,
    'const state = { [key]: "foo", bar: "baz" };',
    'const { [a]: b, ...c } = d;',
    'const { [String(a)]: b, ...c } = d;',
    'const [foo] = x;',
    'const [foo,] = x;',
    'const [foo,,] = x;',
    'const [,foo] = x;',
    'const [,,foo] = x;',
    'const [foo,bar] = x;',
    'const { [i]: val, ...rest } = a',
    'const { ["1"]: number2, ...rest2 } = obj',
    'const { 1: value } = obj;',
    'const a = { 1: 0, 2: 1, 3: 2 }',
    'const i = 1',
    'const foo = () => { return bar, baz; };',
    'const val = (function f(a, b = (() => a)) {})',
    'const { a, b, ...c } = { a: 1, b: 2, c: 3 };',
    'const xg = (xxes -= ((((true)) ** (/[^[-|-]/gim)))((((v = ((("")))))), ...(h), (((false)[(2e308)]))))',
    'const [foo] = x;',
    'const [foo] = x, b = y;',
    'const [foo,,] = x;',
    'const 𝑚 = 4;',
    'const 𝑀 = 5',
    'const [foo,bar=b] = x;',
    'const [foo,,bar] = x;',
    'const [foo, ...bar] = obj;',
    `const value = true ?.30 : false;`,
    'const x = y, [foo] = z;',
    'const [foo] = x, [foo] = y;',
    'const [foo,,] = arr;',
    'const [] = x;',
    'const [,foo] = arr;',
    'const [foo=a, bar=b] = arr;',
    'const [foo] = arr;',
    'const {[x]: y = z} = a;',
    'const {[x]: y} = z;',
    'const {x = y, z = a} = obj;',
    'const {x : y, z : a} = obj;',
    'const {x : y, z, a : b = c} = obj;',
    'const {x, y = z} = obj;',
    'const {x, y} = obj;',
    'const {x = y} = obj;',
    'const arguments = x;'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }

  it('const [foo=a,bar=b] = x;', () => {
    t.deepEqual(parseScript('const [foo=a,bar=b] = x;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ArrayBindingPattern',
                leafs: [
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'BindingIdentifier',
                      name: 'foo'
                    },
                    right: {
                      type: 'BindingIdentifier',
                      name: 'a'
                    }
                  },
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'BindingIdentifier',
                      name: 'bar'
                    },
                    right: {
                      type: 'BindingIdentifier',
                      name: 'b'
                    }
                  }
                ]
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'x'
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('const x = y, {foo} = z;', () => {
    t.deepEqual(parseScript('const x = y, {foo} = z;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'BindingIdentifier',
                name: 'x'
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'y'
              }
            },
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'BindingIdentifier',
                    name: 'foo'
                  }
                ]
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'z'
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('const { a: { ...bar }, b: { ...baz }, ...foo } = obj;', () => {
    t.deepEqual(parseScript('const { a: { ...bar }, b: { ...baz }, ...foo } = obj;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'BindingIdentifier',
                      name: 'a'
                    },
                    value: {
                      type: 'ObjectBindingPattern',
                      properties: [
                        {
                          type: 'BindingRestProperty',
                          argument: {
                            type: 'BindingIdentifier',
                            name: 'bar'
                          }
                        }
                      ]
                    },
                    computed: false
                  },
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'BindingIdentifier',
                      name: 'b'
                    },
                    value: {
                      type: 'ObjectBindingPattern',
                      properties: [
                        {
                          type: 'BindingRestProperty',
                          argument: {
                            type: 'BindingIdentifier',
                            name: 'baz'
                          }
                        }
                      ]
                    },
                    computed: false
                  },
                  {
                    type: 'BindingRestProperty',
                    argument: {
                      type: 'BindingIdentifier',
                      name: 'foo'
                    }
                  }
                ]
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'obj'
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('const [ a, ...bar ] = foo;', () => {
    t.deepEqual(parseScript('const [ a, ...bar ] = foo;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ArrayBindingPattern',
                leafs: [
                  {
                    type: 'BindingIdentifier',
                    name: 'a'
                  },
                  {
                    type: 'BindingRestElement',
                    argument: {
                      type: 'BindingIdentifier',
                      name: 'bar'
                    }
                  }
                ]
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'foo'
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('const { [eval]: []} = a;', () => {
    t.deepEqual(parseScript('const { [eval]: []} = a;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'IdentifierReference',
                      name: 'eval'
                    },
                    value: {
                      type: 'ArrayBindingPattern',
                      leafs: []
                    },
                    computed: true
                  }
                ]
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'a'
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('const {foo=a,bar=b} = x;', () => {
    t.deepEqual(parseScript('const {foo=a,bar=b} = x;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'BindingElement',
                    binding: {
                      type: 'BindingIdentifier',
                      name: 'foo'
                    },
                    initializer: {
                      type: 'IdentifierReference',
                      name: 'a'
                    }
                  },
                  {
                    type: 'BindingElement',
                    binding: {
                      type: 'BindingIdentifier',
                      name: 'bar'
                    },
                    initializer: {
                      type: 'IdentifierReference',
                      name: 'b'
                    }
                  }
                ]
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'x'
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('const {x} = a, {y} = obj;', () => {
    t.deepEqual(parseScript('const {x} = a, {y} = obj;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'BindingIdentifier',
                    name: 'x'
                  }
                ]
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'a'
              }
            },
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'BindingIdentifier',
                    name: 'y'
                  }
                ]
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'obj'
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('const [x, ...[foo, bar]] = obj;', () => {
    t.deepEqual(parseScript('const [x, ...[foo, bar]] = obj;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ArrayBindingPattern',
                leafs: [
                  {
                    type: 'BindingIdentifier',
                    name: 'x'
                  },
                  {
                    type: 'BindingRestElement',
                    argument: {
                      type: 'ArrayBindingPattern',
                      leafs: [
                        {
                          type: 'BindingIdentifier',
                          name: 'foo'
                        },
                        {
                          type: 'BindingIdentifier',
                          name: 'bar'
                        }
                      ]
                    }
                  }
                ]
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'obj'
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('const {[a.b]: c} = v;', () => {
    t.deepEqual(parseScript('const {[a.b]: c} = v;'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'ObjectBindingPattern',
                properties: [
                  {
                    type: 'PropertyName',
                    key: {
                      type: 'MemberExpression',
                      member: {
                        type: 'IdentifierReference',
                        name: 'a'
                      },
                      expression: {
                        type: 'IdentifierName',
                        name: 'b'
                      },
                      computed: false
                    },
                    value: {
                      type: 'BindingIdentifier',
                      name: 'c'
                    },
                    computed: true
                  }
                ]
              },
              initializer: {
                type: 'IdentifierReference',
                name: 'v'
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });

  it('const x = class x {};', () => {
    t.deepEqual(parseScript('const x = class x {};'), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'LexicalDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'LexicalBinding',
              binding: {
                type: 'BindingIdentifier',
                name: 'x'
              },
              initializer: {
                type: 'ClassExpression',
                name: {
                  type: 'BindingIdentifier',
                  name: 'x'
                },
                super: null,
                leafs: []
              }
            }
          ]
        }
      ],
      webCompat: true
    });
  });
});
