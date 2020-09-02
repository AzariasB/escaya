import { DiagnosticCode } from './diagnostic-code';
import { Context, ParserState, lastOrUndefined } from '../common';
import { diagnosticMap } from './diagnostic-map';

/**
 * Types of diagnostics which can be generated.
 */
export const enum DiagnosticKind {
  Message,
  Warning,
  Error,
  Early,
  AnnexB,
  Hint
}
/**
 * Sources of diagnostic messages.
 */
export const enum DiagnosticSource {
  Lexer = 0,
  Parser = 1 << 1,
  Recovery = 1 << 2
}

/**
 * The base type of all types which represent some kind of diagnostic.
 */
export interface Diagnostic {
  kind: DiagnosticKind;
  source: DiagnosticSource;
  code: DiagnosticCode;
  message: string;
  start: number;
  length: number;
}

export function addScopeDiagnostic(state: ParserState, context: Context, scope: any, code: DiagnosticCode): void {
  if (scope.scopeError) {
    const err: any = scope.scopeError;
    createDiagnostic(
      state,
      context,
      DiagnosticSource.Parser,
      code,
      DiagnosticKind.Early,
      err.start,
      state.index,
      err.name
    );
  }
}

export function addparserDiagnostic(
  state: ParserState,
  context: Context,
  start: number,
  code: DiagnosticCode,
  ...args: string[]
): void {
  createDiagnostic(state, context, DiagnosticSource.Parser, code, DiagnosticKind.Early, start, state.index, ...args);
}

export function addLexerDiagnostic(
  state: ParserState,
  context: Context,
  start: number,
  end: number,
  code: DiagnosticCode,
  ...args: string[]
): void {
  createDiagnostic(state, context, DiagnosticSource.Lexer, code, DiagnosticKind.Error, start, end, ...args);
}

export function addEarlyDiagnostic(
  state: ParserState,
  context: Context,
  code: DiagnosticCode,
  ...args: string[]
): void {
  createDiagnostic(
    state,
    context,
    DiagnosticSource.Parser,
    code,
    DiagnosticKind.Early,
    state.positionBeforeToken,
    state.index,
    ...args
  );
}

export function addDiagnostic(
  state: ParserState,
  context: Context,
  source: DiagnosticSource,
  code: DiagnosticCode,
  kind: DiagnosticKind,
  ...args: string[]
) {
  createDiagnostic(state, context, source, code, kind, state.positionBeforeToken, state.index, ...args);
}

export function createDiagnostic(
  state: ParserState,
  context: Context,
  source: DiagnosticSource,
  code: DiagnosticCode,
  kind: DiagnosticKind,
  start: number,
  end: number,
  ...args: string[]
): void {
  let message = diagnosticMap[code];

  if (arguments.length > 4) {
    message = formatStringFromArgs(message, args);
  }

  const lastError = lastOrUndefined(state.diagnostics);
  const length = end - start;

  if ((context & Context.ErrorRecovery) === 0) {
    throw new SyntaxError(`line:${state.line}, column:${state.positionBeforeToken - state.columnOffset} - ${message}`);
  }

  if (!lastError || start !== lastError.start) {
    state.diagnostics.push({ kind, source, message, code, start, length });
  }
}

export function formatStringFromArgs(message: string, args: string[]): string {
  return message.replace(/%(\d+)/g, (__match: string, i: number) => args[i]);
}
