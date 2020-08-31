import { BindingType, Context, ParserState, Flags } from '../common';
import { ScopeKind } from './common';
import { addEarlyDiagnostic, addDiagnostic, DiagnosticKind, DiagnosticSource } from '../diagnostic';
import { DiagnosticCode } from '../diagnostic/diagnostic-code';
import { Constants } from '../constants';

/**
 * Lexical scope interface
 */
export interface ScopeState {
  parent: ScopeState | undefined;
  type: ScopeKind;
  scopeError?: ScopeError | null;
}

/** Scope error interface */
export interface ScopeError {
  code: DiagnosticCode;
  start: number;
}

export function createScope(): ScopeState {
  return {
    parent: void 0,
    type: ScopeKind.Block
  };
}

export function createParentScope(parent: ScopeState | undefined, type: ScopeKind): ScopeState {
  return {
    parent,
    type,
    scopeError: void 0
  };
}
export function addVarOrBlock(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  name: string,
  bindingType: BindingType
  // origin: Origin
) {
  if (bindingType & BindingType.Var) {
    addVarName(parser, context, scope, name, bindingType);
  } else {
    addBlockName(parser, context, scope, name, bindingType /*, origin*/);
  }
}

export function addVarName(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  name: string,
  type: BindingType
): void {
  if (scope) {
    let currentScope: any = scope;
    while (currentScope && (currentScope.type & ScopeKind.FunctionRoot) === 0) {
      if (currentScope['#' + name] & (BindingType.Let | BindingType.Const | BindingType.FunctionLexical)) {
        addEarlyDiagnostic(state, context, DiagnosticCode.DupLexBind, name);
      } else if (currentScope['#' + name] & (BindingType.CatchIdentifier | BindingType.CatchPattern)) {
        if (context & Constants.StrictOrNoWebCompat || (currentScope['#' + name] & BindingType.CatchIdentifier) === 0) {
          addEarlyDiagnostic(state, context, DiagnosticCode.BoundClause, name);
        }
      }

      currentScope['#' + name] = type;
      currentScope = currentScope.parent;
    }
  }
}

export function addBlockName(state: ParserState, context: Context, scope: any, name: string, type: BindingType): void {
  if (scope === void 0) return;
  const value = scope['#' + name];

  if (value) {
    if ((value & BindingType.Empty) === 0) {
      if (type & BindingType.ArgumentList) {
        scope.scopeError = { start: state.startIndex, name, code: DiagnosticCode.DuplicateIdentifier };
      } else if (
        context & Context.OptionsDisableWebCompat ||
        (value & BindingType.FunctionLexical) === 0 ||
        (context & Context.InBlock) === 0
      ) {
        addEarlyDiagnostic(state, context, DiagnosticCode.DupBind, name);
      }
    }
  } else {
    const parent = scope.parent;
    if (scope.type & ScopeKind.FunctionBody && parent['#' + name] && (parent['#' + name] & BindingType.Empty) === 0) {
      addEarlyDiagnostic(state, context, DiagnosticCode.DupBind, name);
    }

    if (scope.type & ScopeKind.ArrowParams && value && (value & BindingType.Empty) === 0) {
      if (type & BindingType.ArgumentList) {
        scope.scopeError = { start: state.startIndex, name, code: DiagnosticCode.DuplicateIdentifier };
      }
    }

    if (scope.type & ScopeKind.CatchBlock) {
      if (parent['#' + name] & (BindingType.CatchIdentifier | BindingType.CatchPattern)) {
        addEarlyDiagnostic(state, context, DiagnosticCode.ShadowClause, name);
      }
    }
  }
  scope['#' + name] = type;
}

export function declareUnboundVariable(state: ParserState, context: Context, name: string): void {
  if (state.exportedNames !== void 0 && name !== '') {
    if (state.exportedNames['#' + name]) {
      addEarlyDiagnostic(state, context, DiagnosticCode.RedeclareVar, name);
      //report(parser, Errors.DuplicateExportBinding, name);
    }
    state.exportedNames['#' + name] = 1;
  }
}

/**
 * Appends a name to the `ExportedBindings` of the `ExportsList`,
 *
 * @see [Link](https://tc39.es/ecma262/$sec-exports-static-semantics-exportedbindings)
 *
 * @param parser Parser object
 * @param name Exported binding name
 */
export function addBindingToExports(state: ParserState, name: string): void {
  if (state.exportedBindings !== void 0 && name !== '') {
    state.exportedBindings['#' + name] = 1;
  }
}
