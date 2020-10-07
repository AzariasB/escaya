import { Context, ParserState } from '../common';
import { addDiagnostic, DiagnosticSource, DiagnosticKind } from '../diagnostic';
import { DiagnosticCode } from '../diagnostic/diagnostic-code';
import { Char } from './char';
import { unicodeLookup } from './unicode';
import { ScannerState } from './common';

// SingleLineComment :
//  // SingleLineCommentChars
export function skipSingleLine(parser: ParserState, source: string, state: ScannerState): ScannerState {
  let cp = source.charCodeAt(parser.index);
  while (parser.index < parser.length && ((unicodeLookup[(cp >>> 5) + 139264] >>> cp) & 31 & 1) === 0) {
    cp = source.charCodeAt(++parser.index);
  }

  return (state | ScannerState.LineStart) ^ ScannerState.LineStart;
}

// MultiLineComment:
//  /* MultiLineCommentCharsopt */
//
// MultiLineCommentChars :
//
//   MultiLineNotAsteriskCharMultiLineCommentChars
//   * PostAsteriskCommentChars

export function skipBlockComment(
  parser: ParserState,
  context: Context,
  source: string,
  state: ScannerState
): ScannerState {
  while (parser.index < parser.length) {
    let cp = source.charCodeAt(parser.index);
    if (cp === Char.Asterisk) {
      while (cp === Char.Asterisk) {
        cp = source.charCodeAt(++parser.index);
      }
      if (cp === Char.Slash) {
        parser.index++;
        return (state | ScannerState.LineStart) ^ ScannerState.LineStart;
      }
    }

    parser.index++;

    if (cp === Char.CarriageReturn) {
      state |= ScannerState.NewLine | ScannerState.LastIsCR;
      parser.columnOffset = parser.index;
      parser.line++;
    } else if (cp === Char.LineFeed || (cp & ~1) === Char.LineSeparator) {
      if ((state & ScannerState.LastIsCR) === 0) parser.line++;
      parser.columnOffset = parser.index;
      state = (state | 0b00000000000000000000000000001101) ^ 0b00000000000000000000000000001100;
    } else {
      state = (state | ScannerState.LastIsCR) ^ ScannerState.LastIsCR;
    }
  }
  addDiagnostic(parser, context, DiagnosticSource.Lexer, DiagnosticCode.UnclosedComment, DiagnosticKind.Error);
  return state;
}

// Skip initial BOM and/or shebang.
export function skipHashbang(parser: ParserState, source: string): void {
  if (source.charCodeAt(parser.index + 1) === Char.Exclamation && source.charCodeAt(parser.index) === Char.Hash) {
    parser.index = parser.index += 2;
    skipSingleLine(parser, source, ScannerState.None);
  }
}
