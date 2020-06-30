import { ParserState, Context } from '../common';
import { Chars } from './chars';
import { unicodeLookup } from './unicode';
import { addDiagnostic, DiagnosticKind, DiagnosticSource, DiagnosticCode } from '../diagnostics';
import { LexerState } from './common';

export function skipSingleHTMLComment(parser: ParserState, context: Context, state: LexerState): LexerState {
  if ((context & (Context.OptionsDisableWebCompat | Context.Strict)) > 0) {
    addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.HtmlCommentInModule, DiagnosticKind.Error);
  }
  return skipSingleLineComment(parser, state);
}

export function skipSingleLineComment(parser: ParserState, state: LexerState): LexerState {
  let char = parser.source.charCodeAt(parser.index);
  while (parser.index < parser.length && ((unicodeLookup[(char >>> 5) + 69632] >>> char) & 31 & 1) === 0) {
    char = parser.source.charCodeAt(++parser.index);
  }
  return state;
}

export function skipMultiLineComment(parser: ParserState, context: Context, state: LexerState): LexerState | void {
  let lastIsCR = 0;
  let char = parser.source.charCodeAt(parser.index);

  while (parser.index < parser.length) {
    if (char < 0b00000000000000000000000000101011) {
      if (char === Chars.Asterisk) {
        state &= ~LexerState.LastIsCR;
        while (char === Chars.Asterisk) {
          char = parser.source.charCodeAt(parser.index++);
        }
        if (char === Chars.Slash) return state;
      }

      if (char === Chars.CarriageReturn || char === Chars.LineFeed) {
        if (char === Chars.CarriageReturn) lastIsCR = 2;
        state |= LexerState.NewLine | LexerState.LastIsCR;
        parser.columnOffset = parser.index;

        if ((state & LexerState.LastIsCR) === 0) parser.index++;
        parser.index++;
        parser.line++;
        parser.hasLineTerminator = true;
      }
    }

    if ((char & ~0b00000000000000000000000000000001) === Chars.LineSeparator) {
      parser.columnOffset = parser.index;
      state |= LexerState.NewLine | LexerState.LastIsCR;
      parser.index++;
      parser.line++;
      parser.hasLineTerminator = true;
    }
    char = parser.source.charCodeAt(parser.index++);
  }
  addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.UnknownToken, DiagnosticKind.Error);
}
