import { Node } from '../node';
import { Statement } from '.';
import { LabelIdentifier } from '../expressions/labelIdentifier-expr';

/**
 * Labelled statement.
 */
export interface LabelledStatement extends Node<'LabelledStatement'> {
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
