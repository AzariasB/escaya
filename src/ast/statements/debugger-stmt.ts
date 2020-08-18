import { Node } from '../node';

/**
 * Debugger statement
 */
export type DebuggerStatement = Node;

export function createDebuggerStatement(): DebuggerStatement {
  return {
    type: 'DebuggerStatement'
  };
}
