import { ObjectLiteral } from './object-literal';
import { ObjectBindingPattern } from './object-binding-pattern';
import { ObjectAssignmentPattern } from './object-assignment-pattern';
import { ClassDeclaration } from './../declarations/class-declaration';
import { ClassExpression } from './class-expr';
import { MethodName, Parameter } from '.';
import { BindingElement } from './binding-element';
import { BindingIdentifier } from './binding-identifier';
import { FunctionBody } from './function-body';
import { Node } from '../node';

/**
 * Method definition.
 */
export interface MethodDefinition extends Node {
  readonly async: boolean;
  readonly generator: boolean;
  readonly propertySetParameterList: (BindingIdentifier | BindingElement)[];
  readonly uniqueFormalParameters: Parameter[];
  readonly name: MethodName;
  readonly contents: FunctionBody;
  /* @internal*/
  readonly parent?: ClassExpression | ClassDeclaration | ObjectAssignmentPattern | ObjectBindingPattern | ObjectLiteral;
}

export function createMethodDefinition(
  async: boolean,
  generator: boolean,
  propertySetParameterList: (BindingIdentifier | BindingElement)[],
  uniqueFormalParameters: Parameter[],
  name: MethodName,
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
