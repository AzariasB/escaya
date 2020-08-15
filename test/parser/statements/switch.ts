import * as t from 'assert';
import { parseScript, recovery, parseModule } from '../../../src/escaya';

describe('Statements - Switch', () => {
  // Invalid cases
  for (const arg of [
    'switch/("',
    'switch\nx;',
    'switch\n/x/g',
    'switch\n',
    'switch',
    'switch catch',
    'switch(x) { case y: {...x} }',
    'switch(x) { case y: foo /a/ }',
    'switch(x) { case y:{ class { x() {} } }}',
    'switch(x/',
    'switch (x) {',
    'switch(x) { case',
    'switch(x) { case y',
    'switch(x) { case y:',
    'switch(x/b[(c)]) { case',
    'switch (x) { case foo: function *',
    'switch(x) { case y: (foo',
    'switch(x) { case y: (foo, '
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { loc: true });
      });
    });
    it(`${arg}`, () => {
      t.throws(() => {
        parseModule(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }

  // Valid cases. Testing random cases to verify we have no issues with bit masks
  for (const arg of [
    'switch(x) /* comment */ { case y: foo }',
    'switch([x = y]) { case y: foo }',
    'switch([/a/]) { case y: !x }',
    'switch(x) { case y: {x = b} }',
    'switch(x) { case y: [a / b] }',
    'switch (x) { case 42: y(); break; default: break }',
    'switch (answer) { case 42: let t = 42; break; }',
    'switch(x) { case y: [a / b, c, (d)] }',
    'switch(x) { case y: a }',
    'switch(x) { case y: x(foo) }',
    'switch(x) { case y: foo=b; }',
    'switch(x) { case y: foo?.b?.c }',
    'switch(x) { case y: foo?.b?.[x] }',
    'switch(x) { case y: foo?.b?.c }',
    'switch(x) { case y: /a/ }',
    'switch(x) { case y: {x} }',
    'switch(x) { case y: x = {...x} }',
    'switch(x) { case y: foo / bar ? 1 : (x) }',
    'switch(x) { case y: foo / bar ? 1 : (x) => {}}',
    'switch(x) { case y: foo ? 1 : (x) => {}}',
    'switch({x:y}) { case y: [...a] }',
    'switch({x:y}) { case y: [...a] = b }',
    'switch(x/b(c)) { case y: foo }',
    'switch(x/b[c]) { case y: foo }',
    'switch(x/b[(c)]) { case y: foo }',
    'switch (x) { case foo: function *f(){} }',
    'switch(x) { case y: (foo) }',
    'switch(x) { case y: (foo, bar) }',
    'switch(x) { case y: (foo) = (foo) /* comment */ - b }',
    'switch(x) { case y: foo } // comment',
    '// should be ignored - switch(x) { case y: foo }',
    'switch(x/a) { case y: foo }',
    'switch(a+b) { case y: foo }',
    'switch(x=y?!a:b++) { case y: foo }',
    'switch(x) { case y:{ foo }}',
    'switch(x) { case y:{ foo + b }}',
    'switch(x) { case y:{ foo(bar) }}',
    'switch(x) { case y:{ x = class { x() {} } } }',
    'switch(x) { case y:{ x = function  a(a){}  }}',
    'switch(x) { case y:{ x = async function  a(a) { await x;  }  }}',
    `switch (x) { default: function *f(){} function *f(){} }`,
    `switch (x) { default: async function *f(){} async function *f(){} }`,
    `switch (x) { case c: async function f(){} async function f(){} }`,
    `switch (x) { case a: var foo; break; default: var foo; break; }`,
    `switch (x) { case a: var foo; break; default: var foo; break; }`,
    `switch (x) {case a: function f(){}; break; case b: function f(){}; break; }`,
    `switch (x) { case c: function *f(){} function *f(){} }`,
    `switch (0) { case 1: let f = 0; default: [f] }`,
    `switch (0) { case 1: let f = 0; default: [f] }
    switch (0) { case 1: let f = 0; default: [f] }`,
    `switch (0) { case 1: var f; default: var f; }`,
    `switch (x) { case c: function f(){} function f(){} }`,
    `switch (x) { case c: async function *f(){} async function *f(){} }`,
    `switch (0) { case 1: var f; default: var f; }
    switch (0) { case 1: var f; default: var f; }`,
    'switch (x) { case x: function * f() {} }',
    'switch (x) { case x: function * f() {} }',
    'switch(a){case 1:}',
    'switch (a) { case b: let [x] = y }',
    'switch (answer) { case 0: let a; }',
    'switch (x) { case y: this.x; }',
    'switch (x) { case y: this[z]; }',
    'switch (answer) { case 0: hi(); break; default: break }',
    'switch(a){case 1:}',
    'switch (a) { case b: let [x] = y }',
    'switch (answer) { case 0: let a; }',
    'switch (x) { case y: this.x; }',
    'switch (x) { case y: this(x,z); }',
    'switch (x) { case y: this[z]; }',
    'switch (x) { case y:  a(); }',
    'switch (x) { default: b("c"); }',
    'switch (x) { case a: var foo; break; default: var foo; break; }',
    'switch (0) { case 1: let f = 0; default: [f] }',
    'switch (0) { case 1: var f = 0; x; default: var {f} = x; } var {f} = f',
    'switch (x) {case a: function f(){}; break; case b: function f(){}; break; }',
    `switch (0) { case 1: var f = 0; x; default: var {f} = x; } var {f} = f
    switch (0) { case 1: var f = 0; x; default: var {f} = x; } var {f} = f`,
    'switch (0) { case 1: let f = 0; x; default: let x; } var {f} = f',
    'switch (x) { case a: var foo; break; case b: var foo; break; }',
    'switch (0) { case 1: function f() {} default: async function f() {} }',
    'switch (0) { case 1: async function f() {} default: function f() {} }',
    `let f = 123; switch (1) { default: function f() {  }  }`,
    'switch (x) { default: function *f(){} function *f(){} }',
    'switch (x) { case c: function *f(){} function *f(){} }'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`, { loc: true });
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseModule(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        recovery(`${arg}`, 'recovery.js');
      });
    });
  }

  it('switch (0) { case 1: var f; default: var f }', () => {
    t.deepEqual(parseScript('switch (0) { case 1: var f; default: var f }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'NumericLiteral',
            value: 0,
            start: 8,
            end: 9
          },
          clauses: [
            {
              type: 'CaseClause',
              expression: {
                type: 'NumericLiteral',
                value: 1,
                start: 18,
                end: 19
              },
              leafs: [
                {
                  type: 'VariableStatement',
                  declarations: [
                    {
                      type: 'VariableDeclaration',
                      binding: {
                        type: 'BindingIdentifier',
                        name: 'f',
                        start: 25,
                        end: 26
                      },
                      initializer: null,
                      start: 25,
                      end: 26
                    }
                  ],
                  start: 21,
                  end: 27
                }
              ],
              start: 13,
              end: 27
            },
            {
              type: 'DefaultClause',
              leafs: [
                {
                  type: 'VariableStatement',
                  declarations: [
                    {
                      type: 'VariableDeclaration',
                      binding: {
                        type: 'BindingIdentifier',
                        name: 'f',
                        start: 41,
                        end: 42
                      },
                      initializer: null,
                      start: 41,
                      end: 42
                    }
                  ],
                  start: 37,
                  end: 42
                }
              ],
              start: 28,
              end: 42
            }
          ],
          start: 0,
          end: 44
        }
      ],
      start: 0,
      end: 44
    });
  });

  it('switch (x) { case a: var foo; break; default: var foo; break; }', () => {
    t.deepEqual(parseScript('switch (x) { case a: var foo; break; default: var foo; break; }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 8,
            end: 9
          },
          clauses: [
            {
              type: 'CaseClause',
              expression: {
                type: 'IdentifierReference',
                name: 'a',
                start: 18,
                end: 19
              },
              leafs: [
                {
                  type: 'VariableStatement',
                  declarations: [
                    {
                      type: 'VariableDeclaration',
                      binding: {
                        type: 'BindingIdentifier',
                        name: 'foo',
                        start: 25,
                        end: 28
                      },
                      initializer: null,
                      start: 25,
                      end: 28
                    }
                  ],
                  start: 21,
                  end: 29
                },
                {
                  type: 'BreakStatement',
                  label: null,
                  start: 30,
                  end: 36
                }
              ],
              start: 13,
              end: 36
            },
            {
              type: 'DefaultClause',
              leafs: [
                {
                  type: 'VariableStatement',
                  declarations: [
                    {
                      type: 'VariableDeclaration',
                      binding: {
                        type: 'BindingIdentifier',
                        name: 'foo',
                        start: 50,
                        end: 53
                      },
                      initializer: null,
                      start: 50,
                      end: 53
                    }
                  ],
                  start: 46,
                  end: 54
                },
                {
                  type: 'BreakStatement',
                  label: null,
                  start: 55,
                  end: 61
                }
              ],
              start: 37,
              end: 61
            }
          ],
          start: 0,
          end: 63
        }
      ],
      start: 0,
      end: 63
    });
  });

  it('switch (x) {case a: function f(){}; break; case b: function f(){}; break; }', () => {
    t.deepEqual(
      parseScript('switch (x) {case a: function f(){}; break; case b: function f(){}; break; }', { loc: true }),
      {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'SwitchStatement',
            expression: {
              type: 'IdentifierReference',
              name: 'x',
              start: 8,
              end: 9
            },
            clauses: [
              {
                type: 'CaseClause',
                expression: {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 17,
                  end: 18
                },
                leafs: [
                  {
                    type: 'FunctionDeclaration',
                    name: {
                      type: 'BindingIdentifier',
                      name: 'f',
                      start: 29,
                      end: 30
                    },
                    generator: false,
                    async: false,
                    params: [],
                    contents: {
                      type: 'FunctionBody',
                      directives: [],
                      leafs: [],
                      start: 32,
                      end: 34
                    },
                    start: 20,
                    end: 34
                  },
                  {
                    type: 'EmptyStatement',
                    start: 34,
                    end: 35
                  },
                  {
                    type: 'BreakStatement',
                    label: null,
                    start: 36,
                    end: 42
                  }
                ],
                start: 12,
                end: 42
              },
              {
                type: 'CaseClause',
                expression: {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 48,
                  end: 49
                },
                leafs: [
                  {
                    type: 'FunctionDeclaration',
                    name: {
                      type: 'BindingIdentifier',
                      name: 'f',
                      start: 60,
                      end: 61
                    },
                    generator: false,
                    async: false,
                    params: [],
                    contents: {
                      type: 'FunctionBody',
                      directives: [],
                      leafs: [],
                      start: 63,
                      end: 65
                    },
                    start: 51,
                    end: 65
                  },
                  {
                    type: 'EmptyStatement',
                    start: 65,
                    end: 66
                  },
                  {
                    type: 'BreakStatement',
                    label: null,
                    start: 67,
                    end: 73
                  }
                ],
                start: 43,
                end: 73
              }
            ],
            start: 0,
            end: 75
          }
        ],
        start: 0,
        end: 75
      }
    );
  });

  it('switch (x) { case c: function *f(){} function *f(){} }', () => {
    t.deepEqual(parseScript('switch (x) { case c: function *f(){} function *f(){} }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 8,
            end: 9
          },
          clauses: [
            {
              type: 'CaseClause',
              expression: {
                type: 'IdentifierReference',
                name: 'c',
                start: 18,
                end: 19
              },
              leafs: [
                {
                  type: 'FunctionDeclaration',
                  name: {
                    type: 'BindingIdentifier',
                    name: 'f',
                    start: 31,
                    end: 32
                  },
                  generator: true,
                  async: false,
                  params: [],
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 34,
                    end: 36
                  },
                  start: 21,
                  end: 36
                },
                {
                  type: 'FunctionDeclaration',
                  name: {
                    type: 'BindingIdentifier',
                    name: 'f',
                    start: 47,
                    end: 48
                  },
                  generator: true,
                  async: false,
                  params: [],
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 50,
                    end: 52
                  },
                  start: 37,
                  end: 52
                }
              ],
              start: 13,
              end: 52
            }
          ],
          start: 0,
          end: 54
        }
      ],
      start: 0,
      end: 54
    });
  });

  it(`switch (0) { case 1: let f = 0; default: [f] }
                  switch (0) { case 1: let f = 0; default: [f] }`, () => {
    t.deepEqual(
      parseScript(
        `switch (0) { case 1: let f = 0; default: [f] }
                    switch (0) { case 1: let f = 0; default: [f] }`,
        { loc: true }
      ),
      {
        type: 'Script',
        directives: [],
        leafs: [
          {
            type: 'SwitchStatement',
            expression: {
              type: 'NumericLiteral',
              value: 0,
              start: 8,
              end: 9
            },
            clauses: [
              {
                type: 'CaseClause',
                expression: {
                  type: 'NumericLiteral',
                  value: 1,
                  start: 18,
                  end: 19
                },
                leafs: [
                  {
                    type: 'LexicalDeclaration',
                    isConst: false,
                    declarations: [
                      {
                        type: 'LexicalBinding',
                        binding: {
                          type: 'BindingIdentifier',
                          name: 'f',
                          start: 25,
                          end: 26
                        },
                        initializer: {
                          type: 'NumericLiteral',
                          value: 0,
                          start: 29,
                          end: 30
                        },
                        start: 25,
                        end: 30
                      }
                    ],
                    start: 21,
                    end: 31
                  }
                ],
                start: 13,
                end: 31
              },
              {
                type: 'DefaultClause',
                leafs: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'ArrayLiteral',

                      elements: [
                        {
                          type: 'IdentifierReference',
                          name: 'f',
                          start: 42,
                          end: 43
                        }
                      ],
                      start: 41,
                      end: 44
                    },
                    start: 41,
                    end: 44
                  }
                ],
                start: 32,
                end: 44
              }
            ],
            start: 0,
            end: 46
          },
          {
            type: 'SwitchStatement',
            expression: {
              type: 'NumericLiteral',
              value: 0,
              start: 75,
              end: 76
            },
            clauses: [
              {
                type: 'CaseClause',
                expression: {
                  type: 'NumericLiteral',
                  value: 1,
                  start: 85,
                  end: 86
                },
                leafs: [
                  {
                    type: 'LexicalDeclaration',
                    isConst: false,
                    declarations: [
                      {
                        type: 'LexicalBinding',
                        binding: {
                          type: 'BindingIdentifier',
                          name: 'f',
                          start: 92,
                          end: 93
                        },
                        initializer: {
                          type: 'NumericLiteral',
                          value: 0,
                          start: 96,
                          end: 97
                        },
                        start: 92,
                        end: 97
                      }
                    ],
                    start: 88,
                    end: 98
                  }
                ],
                start: 80,
                end: 98
              },
              {
                type: 'DefaultClause',
                leafs: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'ArrayLiteral',

                      elements: [
                        {
                          type: 'IdentifierReference',
                          name: 'f',
                          start: 109,
                          end: 110
                        }
                      ],
                      start: 108,
                      end: 111
                    },
                    start: 108,
                    end: 111
                  }
                ],
                start: 99,
                end: 111
              }
            ],
            start: 67,
            end: 113
          }
        ],
        start: 0,
        end: 113
      }
    );
  });

  it('switch (0) { default: let f; if (false) ; else function f() {  } }', () => {
    t.deepEqual(parseScript('switch (0) { default: let f; if (false) ; else function f() {  } }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'NumericLiteral',
            value: 0,
            start: 8,
            end: 9
          },
          clauses: [
            {
              type: 'DefaultClause',
              leafs: [
                {
                  type: 'LexicalDeclaration',
                  isConst: false,
                  declarations: [
                    {
                      type: 'LexicalBinding',
                      binding: {
                        type: 'BindingIdentifier',
                        name: 'f',
                        start: 26,
                        end: 27
                      },
                      initializer: null,
                      start: 26,
                      end: 27
                    }
                  ],
                  start: 22,
                  end: 28
                },
                {
                  type: 'IfStatement',
                  expression: {
                    type: 'BooleanLiteral',
                    value: false,
                    start: 33,
                    end: 38
                  },
                  consequent: {
                    type: 'EmptyStatement',
                    start: 40,
                    end: 41
                  },
                  alternate: {
                    type: 'FunctionDeclaration',
                    name: {
                      type: 'BindingIdentifier',
                      name: 'f',
                      start: 56,
                      end: 57
                    },
                    generator: false,
                    async: false,
                    params: [],
                    contents: {
                      type: 'FunctionBody',
                      directives: [],
                      leafs: [],
                      start: 60,
                      end: 64
                    },
                    start: 47,
                    end: 64
                  },
                  start: 29,
                  end: 64
                }
              ],
              start: 13,
              end: 64
            }
          ],
          start: 0,
          end: 66
        }
      ],
      start: 0,
      end: 66
    });
  });

  it('switch (0) { case 1: var f; default: var f; }', () => {
    t.deepEqual(parseScript('switch (0) { case 1: var f; default: var f; }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'NumericLiteral',
            value: 0,
            start: 8,
            end: 9
          },
          clauses: [
            {
              type: 'CaseClause',
              expression: {
                type: 'NumericLiteral',
                value: 1,
                start: 18,
                end: 19
              },
              leafs: [
                {
                  type: 'VariableStatement',
                  declarations: [
                    {
                      type: 'VariableDeclaration',
                      binding: {
                        type: 'BindingIdentifier',
                        name: 'f',
                        start: 25,
                        end: 26
                      },
                      initializer: null,
                      start: 25,
                      end: 26
                    }
                  ],
                  start: 21,
                  end: 27
                }
              ],
              start: 13,
              end: 27
            },
            {
              type: 'DefaultClause',
              leafs: [
                {
                  type: 'VariableStatement',
                  declarations: [
                    {
                      type: 'VariableDeclaration',
                      binding: {
                        type: 'BindingIdentifier',
                        name: 'f',
                        start: 41,
                        end: 42
                      },
                      initializer: null,
                      start: 41,
                      end: 42
                    }
                  ],
                  start: 37,
                  end: 43
                }
              ],
              start: 28,
              end: 43
            }
          ],
          start: 0,
          end: 45
        }
      ],
      start: 0,
      end: 45
    });
  });

  it('switch (x) { case c: function f(){} function f(){} }', () => {
    t.deepEqual(parseScript('switch (x) { case c: function f(){} function f(){} }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 8,
            end: 9
          },
          clauses: [
            {
              type: 'CaseClause',
              expression: {
                type: 'IdentifierReference',
                name: 'c',
                start: 18,
                end: 19
              },
              leafs: [
                {
                  type: 'FunctionDeclaration',
                  name: {
                    type: 'BindingIdentifier',
                    name: 'f',
                    start: 30,
                    end: 31
                  },
                  generator: false,
                  async: false,
                  params: [],
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 33,
                    end: 35
                  },
                  start: 21,
                  end: 35
                },
                {
                  type: 'FunctionDeclaration',
                  name: {
                    type: 'BindingIdentifier',
                    name: 'f',
                    start: 45,
                    end: 46
                  },
                  generator: false,
                  async: false,
                  params: [],
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 48,
                    end: 50
                  },
                  start: 36,
                  end: 50
                }
              ],
              start: 13,
              end: 50
            }
          ],
          start: 0,
          end: 52
        }
      ],
      start: 0,
      end: 52
    });
  });

  it('switch (x) { case c: async function *f(){} async function *f(){} }', () => {
    t.deepEqual(parseScript('switch (x) { case c: async function *f(){} async function *f(){} }', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'x',
            start: 8,
            end: 9
          },
          clauses: [
            {
              type: 'CaseClause',
              expression: {
                type: 'IdentifierReference',
                name: 'c',
                start: 18,
                end: 19
              },
              leafs: [
                {
                  type: 'FunctionDeclaration',
                  name: {
                    type: 'BindingIdentifier',
                    name: 'f',
                    start: 37,
                    end: 38
                  },
                  generator: true,
                  async: true,
                  params: [],
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 40,
                    end: 42
                  },
                  start: 21,
                  end: 42
                },
                {
                  type: 'FunctionDeclaration',
                  name: {
                    type: 'BindingIdentifier',
                    name: 'f',
                    start: 59,
                    end: 60
                  },
                  generator: true,
                  async: true,
                  params: [],
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 62,
                    end: 64
                  },
                  start: 43,
                  end: 64
                }
              ],
              start: 13,
              end: 64
            }
          ],
          start: 0,
          end: 66
        }
      ],
      start: 0,
      end: 66
    });
  });

  it('switch (X) {}', () => {
    t.deepEqual(parseScript('switch (X) {}', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'X',
            start: 8,
            end: 9
          },
          clauses: [],
          start: 0,
          end: 13
        }
      ],
      start: 0,
      end: 13
    });
  });

  it('switch (A) {default: B;}', () => {
    t.deepEqual(parseScript('switch (A) {default: B;}', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'A',
            start: 8,
            end: 9
          },
          clauses: [
            {
              type: 'DefaultClause',
              leafs: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'B',
                    start: 21,
                    end: 22
                  },
                  start: 21,
                  end: 23
                }
              ],
              start: 12,
              end: 23
            }
          ],
          start: 0,
          end: 24
        }
      ],
      start: 0,
      end: 24
    });
  });

  it('switch (A) {case B: C; default: D;}', () => {
    t.deepEqual(parseScript('switch (A) {case B: C; default: D;}', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'A',
            start: 8,
            end: 9
          },
          clauses: [
            {
              type: 'CaseClause',
              expression: {
                type: 'IdentifierReference',
                name: 'B',
                start: 17,
                end: 18
              },
              leafs: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'C',
                    start: 20,
                    end: 21
                  },
                  start: 20,
                  end: 22
                }
              ],
              start: 12,
              end: 22
            },
            {
              type: 'DefaultClause',
              leafs: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'D',
                    start: 32,
                    end: 33
                  },
                  start: 32,
                  end: 34
                }
              ],
              start: 23,
              end: 34
            }
          ],
          start: 0,
          end: 35
        }
      ],
      start: 0,
      end: 35
    });
  });

  it('switch (A) {case B: C; break; case D: E; break;}', () => {
    t.deepEqual(parseScript('switch (A) {case B: C; break; case D: E; break;}', { loc: true }), {
      type: 'Script',
      directives: [],
      leafs: [
        {
          type: 'SwitchStatement',
          expression: {
            type: 'IdentifierReference',
            name: 'A',
            start: 8,
            end: 9
          },
          clauses: [
            {
              type: 'CaseClause',
              expression: {
                type: 'IdentifierReference',
                name: 'B',
                start: 17,
                end: 18
              },
              leafs: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'C',
                    start: 20,
                    end: 21
                  },
                  start: 20,
                  end: 22
                },
                {
                  type: 'BreakStatement',
                  label: null,
                  start: 23,
                  end: 29
                }
              ],
              start: 12,
              end: 29
            },
            {
              type: 'CaseClause',
              expression: {
                type: 'IdentifierReference',
                name: 'D',
                start: 35,
                end: 36
              },
              leafs: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'IdentifierReference',
                    name: 'E',
                    start: 38,
                    end: 39
                  },
                  start: 38,
                  end: 40
                },
                {
                  type: 'BreakStatement',
                  label: null,
                  start: 41,
                  end: 47
                }
              ],
              start: 30,
              end: 47
            }
          ],
          start: 0,
          end: 48
        }
      ],
      start: 0,
      end: 48
    });
  });
});
