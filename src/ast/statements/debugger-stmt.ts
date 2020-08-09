import { SyntaxKind, SyntaxNode } from '../syntax-node';

/**
 * Debugger statement.
 */
export interface DebuggerStatement extends SyntaxNode {}

export function createDebuggerStatement(): DebuggerStatement {
  return {
    type: 'DebuggerStatement'
  };
}
