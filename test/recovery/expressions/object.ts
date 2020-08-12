import * as t from 'assert';
import { recovery } from '../../../src/escaya';

describe('Recovery - Expressions - Object', () => {
  it('({', () => {
    t.deepEqual(recovery('({', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [],
              start: 1,
              end: 2,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 2,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 2,
          kind: 122,
          flags: 0
        }
      ],
      text: '({',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`}` expected',
          code: 5,
          start: 1,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 2,
      end: 2
    });
  });

  it('({[', () => {
    t.deepEqual(recovery('({[', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'ComputedPropertyName',
                  expression: {
                    type: 'IdentifierReference',
                    name: '',
                    start: 3,
                    end: 3,
                    kind: 13,
                    flags: 2
                  },
                  start: 2,
                  end: 3,
                  kind: 171,
                  flags: 0
                }
              ],
              start: 1,
              end: 3,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 3,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 3,
          kind: 122,
          flags: 0
        }
      ],
      text: '({[',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expression expected',
          code: 7,
          start: 2,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 3,
      end: 3
    });
  });

  it('({[yield = await', () => {
    t.deepEqual(recovery('({[yield = await', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'ComputedPropertyName',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'IdentifierReference',
                      name: 'yield',
                      start: 3,
                      end: 8,
                      kind: 13,
                      flags: 0
                    },
                    operator: '=',
                    right: {
                      type: 'IdentifierReference',
                      name: 'await',
                      start: 10,
                      end: 16,
                      kind: 13,
                      flags: 0
                    },
                    start: 3,
                    end: 16,
                    kind: 152,
                    flags: 0
                  },
                  start: 2,
                  end: 16,
                  kind: 171,
                  flags: 0
                }
              ],
              start: 1,
              end: 16,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 16,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 16,
          kind: 122,
          flags: 0
        }
      ],
      text: '({[yield = await',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`]` expected',
          code: 5,
          start: 11,
          length: 5
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 16,
      end: 16
    });
  });

  it('({ a b c d', () => {
    t.deepEqual(recovery('({ a b c d', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'IdentifierReference',
                  name: 'a',
                  start: 2,
                  end: 4,
                  kind: 13,
                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'b',
                  start: 4,
                  end: 6,
                  kind: 13,
                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'c',
                  start: 6,
                  end: 8,
                  kind: 13,
                  flags: 0
                },
                {
                  type: 'IdentifierReference',
                  name: 'd',
                  start: 8,
                  end: 10,
                  kind: 13,
                  flags: 0
                }
              ],
              start: 1,
              end: 10,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 10,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 10,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ a b c d',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
          code: 5,
          start: 5,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
          code: 5,
          start: 7,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
          code: 5,
          start: 9,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 10,
      end: 10
    });
  });

  it('({ a b c d } = x', () => {
    t.deepEqual(recovery('({ a b c d } = x', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'AssignmentElement',
              left: {
                type: 'ObjectAssignmentPattern',
                properties: [
                  {
                    type: 'IdentifierReference',
                    name: 'a',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  {
                    type: 'IdentifierReference',
                    name: 'b',
                    start: 4,
                    end: 6,
                    kind: 13,
                    flags: 0
                  },
                  {
                    type: 'IdentifierReference',
                    name: 'c',
                    start: 6,
                    end: 8,
                    kind: 13,
                    flags: 0
                  },
                  {
                    type: 'IdentifierReference',
                    name: 'd',
                    start: 8,
                    end: 10,
                    kind: 13,
                    flags: 0
                  }
                ],
                start: 1,
                end: 14,
                kind: 211,
                flags: 0
              },
              right: {
                type: 'IdentifierReference',
                name: 'x',
                start: 14,
                end: 16,
                kind: 13,
                flags: 0
              },
              start: 1,
              end: 16,
              kind: 213,
              flags: 0
            },
            start: 0,
            end: 16,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 16,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ a b c d } = x',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
          code: 5,
          start: 5,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
          code: 5,
          start: 7,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`:` expected',
          code: 5,
          start: 9,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 15,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 16,
      end: 16
    });
  });

  it('({ x( {}', () => {
    t.deepEqual(recovery('({ x( {}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'MethodDefinition',
                  async: false,
                  generator: false,
                  propertySetParameterList: [],
                  uniqueFormalParameters: [
                    {
                      type: 'BindingElement',
                      left: {
                        type: 'ObjectBindingPattern',
                        properties: [],
                        start: 5,
                        end: 8,
                        kind: 169,
                        flags: 0
                      },
                      right: null,
                      start: 5,
                      end: 8,
                      kind: 172,
                      flags: 0
                    }
                  ],
                  name: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 8,
                    end: 8,
                    kind: 184,
                    flags: 0
                  },
                  start: 4,
                  end: 8,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 8,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 8,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 8,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ x( {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 7,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 8,
      end: 8
    });
  });

  it('({ async x( {}', () => {
    t.deepEqual(recovery('({ async x( {}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'MethodDefinition',
                  async: true,
                  generator: false,
                  propertySetParameterList: [],
                  uniqueFormalParameters: [
                    {
                      type: 'BindingElement',
                      left: {
                        type: 'ObjectBindingPattern',
                        properties: [],
                        start: 11,
                        end: 14,
                        kind: 169,
                        flags: 0
                      },
                      right: null,
                      start: 11,
                      end: 14,
                      kind: 172,
                      flags: 0
                    }
                  ],
                  name: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 8,
                    end: 10,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 14,
                    end: 14,
                    kind: 184,
                    flags: 0
                  },
                  start: 10,
                  end: 14,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 14,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 14,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 14,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ async x( {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 13,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 14,
      end: 14
    });
  });

  it('({ x(! {}', () => {
    t.deepEqual(recovery('({ x(! {}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'MethodDefinition',
                  async: false,
                  generator: false,
                  propertySetParameterList: [],
                  uniqueFormalParameters: [
                    {
                      type: 'BindingIdentifier',
                      name: '',
                      start: 5,
                      end: 6,
                      kind: 168,
                      flags: 0
                    },
                    {
                      type: 'BindingElement',
                      left: {
                        type: 'ObjectBindingPattern',
                        properties: [],
                        start: 6,
                        end: 9,
                        kind: 169,
                        flags: 0
                      },
                      right: null,
                      start: 6,
                      end: 9,
                      kind: 172,
                      flags: 0
                    }
                  ],
                  name: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 9,
                    end: 9,
                    kind: 184,
                    flags: 0
                  },
                  start: 4,
                  end: 9,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 9,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 9,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ x(! {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 5,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 7,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 8,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 9,
      end: 9
    });
  });

  it('({ x(++! {}', () => {
    t.deepEqual(recovery('({ x(++! {}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'MethodDefinition',
                  async: false,
                  generator: false,
                  propertySetParameterList: [],
                  uniqueFormalParameters: [
                    {
                      type: 'BindingIdentifier',
                      name: '',
                      start: 5,
                      end: 7,
                      kind: 168,
                      flags: 0
                    },
                    {
                      type: 'BindingIdentifier',
                      name: '',
                      start: 7,
                      end: 8,
                      kind: 168,
                      flags: 0
                    },
                    {
                      type: 'BindingElement',
                      left: {
                        type: 'ObjectBindingPattern',
                        properties: [],
                        start: 8,
                        end: 11,
                        kind: 169,
                        flags: 0
                      },
                      right: null,
                      start: 8,
                      end: 11,
                      kind: 172,
                      flags: 0
                    }
                  ],
                  name: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 11,
                    end: 11,
                    kind: 184,
                    flags: 0
                  },
                  start: 4,
                  end: 11,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 11,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 11,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 11,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ x(++! {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 5,
          length: 2
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 7,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 9,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 10,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 11,
      end: 11
    });
  });

  it('({ get x( {}', () => {
    t.deepEqual(recovery('({ get x( {}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'MethodDefinition',
                  async: false,
                  generator: false,
                  propertySetParameterList: [],
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 6,
                    end: 8,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 9,
                    end: 12,
                    kind: 184,
                    flags: 0
                  },
                  start: 8,
                  end: 12,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 12,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 12,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 12,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ get x( {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 10,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 11,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 12,
      end: 12
    });
  });

  it('({ x(', () => {
    t.deepEqual(recovery('({ x(', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'MethodDefinition',
                  async: false,
                  generator: false,
                  propertySetParameterList: [],
                  uniqueFormalParameters: [],
                  name: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 5,
                    end: 5,
                    kind: 184,
                    flags: 0
                  },
                  start: 4,
                  end: 5,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 5,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 5,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 5,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ x(',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`)` expected',
          code: 5,
          start: 4,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 5,
      end: 5
    });
  });

  it('({ x( !}', () => {
    t.deepEqual(recovery('({ x( !}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'MethodDefinition',
                  async: false,
                  generator: false,
                  propertySetParameterList: [],
                  uniqueFormalParameters: [
                    {
                      type: 'BindingIdentifier',
                      name: '',
                      start: 5,
                      end: 7,
                      kind: 168,
                      flags: 0
                    }
                  ],
                  name: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 7,
                    end: 7,
                    kind: 184,
                    flags: 0
                  },
                  start: 4,
                  end: 7,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 8,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 8,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 8,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ x( !}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 6,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 7,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 8,
      end: 8
    });
  });

  it('({ x(! a = b {}', () => {
    t.deepEqual(recovery('({ x(! a = b {}', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'MethodDefinition',
                  async: false,
                  generator: false,
                  propertySetParameterList: [],
                  uniqueFormalParameters: [
                    {
                      type: 'BindingIdentifier',
                      name: '',
                      start: 5,
                      end: 6,
                      kind: 168,
                      flags: 0
                    },
                    {
                      type: 'BindingElement',
                      left: {
                        type: 'BindingIdentifier',
                        name: 'a',
                        start: 6,
                        end: 8,
                        kind: 168,
                        flags: 0
                      },
                      right: {
                        type: 'IdentifierReference',
                        name: 'b',
                        start: 10,
                        end: 12,
                        kind: 13,
                        flags: 0
                      },
                      start: 6,
                      end: 12,
                      kind: 172,
                      flags: 0
                    },
                    {
                      type: 'BindingElement',
                      left: {
                        type: 'ObjectBindingPattern',
                        properties: [],
                        start: 12,
                        end: 15,
                        kind: 169,
                        flags: 0
                      },
                      right: null,
                      start: 12,
                      end: 15,
                      kind: 172,
                      flags: 0
                    }
                  ],
                  name: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 15,
                    end: 15,
                    kind: 184,
                    flags: 0
                  },
                  start: 4,
                  end: 15,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 15,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 15,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 15,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ x(! a = b {}',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: 'Expected an binding identifier',
          code: 19,
          start: 5,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 7,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 13,
          length: 1
        },
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 14,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 15,
      end: 15
    });
  });

  it('({ x( {}!', () => {
    t.deepEqual(recovery('({ x( {}!', 'recovery.js'), {
      kind: 209,
      directives: [],
      leafs: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ParenthesizedExpression',
            expression: {
              type: 'ObjectLiteral',
              properties: [
                {
                  type: 'MethodDefinition',
                  async: false,
                  generator: false,
                  propertySetParameterList: [],
                  uniqueFormalParameters: [
                    {
                      type: 'BindingElement',
                      left: {
                        type: 'ObjectBindingPattern',
                        properties: [],
                        start: 5,
                        end: 8,
                        kind: 169,
                        flags: 0
                      },
                      right: null,
                      start: 5,
                      end: 8,
                      kind: 172,
                      flags: 0
                    },
                    {
                      type: 'BindingIdentifier',
                      name: '',
                      start: 8,
                      end: 9,
                      kind: 168,
                      flags: 0
                    }
                  ],
                  name: {
                    type: 'IdentifierName',
                    name: 'x',
                    start: 2,
                    end: 4,
                    kind: 13,
                    flags: 0
                  },
                  contents: {
                    type: 'FunctionBody',
                    directives: [],
                    leafs: [],
                    start: 9,
                    end: 9,
                    kind: 184,
                    flags: 0
                  },
                  start: 4,
                  end: 9,
                  kind: 182,
                  flags: 0
                }
              ],
              start: 1,
              end: 9,
              kind: 179,
              flags: 0
            },
            start: 0,
            end: 9,
            kind: 189,
            flags: 0
          },
          start: 0,
          end: 9,
          kind: 122,
          flags: 0
        }
      ],
      text: '({ x( {}!',
      fileName: 'recovery.js',
      context: 0,
      mutualFlags: 0,
      diagnostics: [
        {
          kind: 2,
          source: 2,
          message: '`,` expected',
          code: 5,
          start: 8,
          length: 1
        }
      ],
      detached: false,
      incremental: false,
      parent: null,
      children: [],
      start: 0,
      length: 9,
      end: 9
    });
  });
});
