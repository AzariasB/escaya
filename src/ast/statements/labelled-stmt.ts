import { SyntaxNode } from '../syntax-node';
import { Statement } from '.';
import { LabelIdentifier } from '../expressions/labelIdentifier-expr';

/**
 * Labelled statement.
 */
export interface LabelledStatement extends SyntaxNode {
  readonly label: LabelIdentifier;
  readonly labelledItem: Statement;
}

export function createLabelledStatement(label: LabelIdentifier, labelledItem: Statement): LabelledStatement {
  return {
    type: 'LabelledStatement',
    label,
    labelledItem
  };
}
