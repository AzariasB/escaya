import { Node } from '../node';
import { Binding } from '../expressions';
import { BlockStatement } from './block-stmt';

/**
 * Try statement.
 */
export interface TryStatement extends Node<'TryStatement'> {
  readonly block: BlockStatement;
  readonly catchClause: CatchClause | null;
  readonly finalizer: BlockStatement | null;
}

/**
 * CatchClause.
 */
export interface CatchClause extends Node<'CatchClause'> {
  readonly binding: Binding | null;
  readonly block: BlockStatement;
}

export function createTryStatement(
  block: BlockStatement,
  catchClause: CatchClause | null,
  finalizer: BlockStatement | null
): TryStatement {
  return {
    type: 'TryStatement',
    block,
    catchClause,
    finalizer
  };
}

export function createCatchClause(binding: Binding | null, block: BlockStatement): CatchClause {
  return {
    type: 'CatchClause',
    binding,
    block
  };
}
