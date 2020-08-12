import { DiagnosticCode } from './diagnostic-code';
import { Context, ParserState, lastOrUndefined } from '../common';
import { diagnosticMap } from './diagnostic-map';

/**
 * Types of diagnostics which can be generated.
 */
export enum DiagnosticKind {
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

export function addLexerDiagnostic(
  state: ParserState,
  context: Context,
  start: number,
  end: number,
  code: DiagnosticCode,
  ...args: string[]
): void {
  let message = diagnosticMap[code];

  if (arguments.length > 4) {
    message = formatStringFromArgs(message, args);
  }

  const lastError = lastOrUndefined(state.diagnostics);
  const length = end - start;

  if ((context & Context.ErrorRecovery) === 0) {
    throw new SyntaxError(`line:${state.line}, column:${end - start} - ${message}`);
  }

  if (!lastError || start !== lastError.start) {
    state.diagnostics.push({
      kind: DiagnosticKind.Error,
      source: DiagnosticSource.Lexer,
      message,
      code,
      start,
      length
    });
  }
}

export function addEarlyDiagnostic(
  state: ParserState,
  context: Context,
  code: DiagnosticCode,
  ...args: string[]
): void {
  let message = diagnosticMap[code];

  if (arguments.length > 4) {
    message = formatStringFromArgs(message, args);
  }

  const lastError = lastOrUndefined(state.diagnostics);
  const start = state.positionBeforeToken;
  const length = state.index - start;

  if ((context & Context.ErrorRecovery) === 0) {
    throw new SyntaxError(
      `line:${state.line + 1}, column:${state.positionBeforeToken - state.columnOffset} - ${message}`
    );
  }

  if (!lastError || start !== lastError.start) {
    state.diagnostics.push({
      kind: DiagnosticKind.Early,
      source: DiagnosticSource.Parser,
      message,
      code,
      start,
      length
    });
  }
}

export function addDiagnostic(
  state: ParserState,
  context: Context,
  source: DiagnosticSource,
  code: DiagnosticCode,
  kind: DiagnosticKind,
  ...args: string[]
): void {
  let message = diagnosticMap[code];

  if (arguments.length > 4) {
    message = formatStringFromArgs(message, args);
  }

  const lastError = lastOrUndefined(state.diagnostics);
  const start = state.positionBeforeToken;
  const length = state.index - start;

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
