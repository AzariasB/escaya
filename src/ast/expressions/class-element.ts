import { MethodDefinition } from './method-definition';
import { SyntaxNode } from '../syntax-node';

/**
 * Class element.
 */
export interface ClassElement extends SyntaxNode {
  // True if `IsStatic` of ClassElement is true.
  readonly static: boolean;
  readonly method: MethodDefinition;
}

export function createClassElement(_static: boolean, method: MethodDefinition): ClassElement {
  return {
    type: 'ClassElement',
    static: _static,
    method
  };
}
