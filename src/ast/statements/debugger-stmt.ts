import { Node } from '../node';

/**
 * Debugger statement
 */
export type DebuggerStatement = Node<'DebuggerStatement'>;

export function createDebuggerStatement(): DebuggerStatement {
  return {
    type: 'DebuggerStatement'
  };
}
