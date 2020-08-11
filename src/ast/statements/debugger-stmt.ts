import { SyntaxNode } from '../syntax-node';

/**
 * Debugger statement.
 */
export type DebuggerStatement = SyntaxNode;

export function createDebuggerStatement(): DebuggerStatement {
  return {
    type: 'DebuggerStatement'
  };
}
