import { SyntaxNode } from '../syntax-node';
import { Binding } from './';

/**
 * Function rest parameter
 */
export interface FunctionRestParameter extends SyntaxNode {
  readonly argument: Binding;
}

export function createFunctionRestParameter(argument: Binding): FunctionRestParameter {
  return { type: 'FunctionRestParameter', argument };
}
