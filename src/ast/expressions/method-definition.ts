import { Expression, Parameter } from '.';
import { BindingElement } from './binding-element';
import { BindingIdentifier } from './binding-identifier';
import { IdentifierName } from './identifiername';
import { FunctionBody } from './function-body';
import { SyntaxNode } from '../syntax-node';

/**
 * Method definition.
 */
export interface MethodDefinition extends SyntaxNode {
  readonly async: boolean;
  readonly generator: boolean;
  readonly propertySetParameterList: (BindingIdentifier | BindingElement)[];
  readonly uniqueFormalParameters: Parameter[];
  readonly name: Expression | IdentifierName;
  readonly contents: FunctionBody;
}

export function createMethodDefinition(
  async: boolean,
  generator: boolean,
  propertySetParameterList: (BindingIdentifier | BindingElement)[],
  uniqueFormalParameters: Parameter[],
  name: Expression | IdentifierName,
  contents: FunctionBody
): MethodDefinition {
  return {
    type: 'MethodDefinition',
    async,
    generator,
    propertySetParameterList,
    uniqueFormalParameters,
    name,
    contents
  };
}
