import { Context, ParserState, Flags } from '../common';
import { Char } from './char';
import { ScannerState } from './common';
import { skipSingleLine, skipBlockComment } from './comments';
import { unicodeLookup } from './unicode';
import { Comment } from '../ast/comments';

export const whitespaceTbl = [
  /*   0 - Null               */ Char.Unknown,
  /*   1 - Start of Heading   */ Char.Unknown,
  /*   2 - Start of Text      */ Char.Unknown,
  /*   3 - End of Text        */ Char.Unknown,
  /*   4 - End of Transm.     */ Char.Unknown,
  /*   5 - Enquiry            */ Char.Unknown,
  /*   6 - Acknowledgment     */ Char.Unknown,
  /*   7 - Bell               */ Char.Unknown,
  /*   8 - Backspace          */ Char.Unknown,
  /*   9 - Horizontal Tab     */ Char.Tab,
  /*  10 - Line Feed          */ Char.LineFeed,
  /*  11 - Vertical Tab       */ Char.VerticalTab,
  /*  12 - Form Feed          */ Char.FormFeed,
  /*  13 - Carriage Return    */ Char.CarriageReturn,
  /*  14 - Shift Out          */ Char.Unknown,
  /*  15 - Shift In           */ Char.Unknown,
  /*  16 - Data Line Escape   */ Char.Unknown,
  /*  17 - Device Control 1   */ Char.Unknown,
  /*  18 - Device Control 2   */ Char.Unknown,
  /*  19 - Device Control 3   */ Char.Unknown,
  /*  20 - Device Control 4   */ Char.Unknown,
  /*  21 - Negative Ack.      */ Char.Unknown,
  /*  22 - Synchronous Idle   */ Char.Unknown,
  /*  23 - End of Transmit    */ Char.Unknown,
  /*  24 - Cancel             */ Char.Unknown,
  /*  25 - End of Medium      */ Char.Unknown,
  /*  26 - Substitute         */ Char.Unknown,
  /*  27 - Escape             */ Char.Unknown,
  /*  28 - File Separator     */ Char.Unknown,
  /*  29 - Group Separator    */ Char.Unknown,
  /*  30 - Record Separator   */ Char.Unknown,
  /*  31 - Unit Separator     */ Char.Unknown,
  /*  32 - Space              */ Char.Space,
  /*  33 - !                  */ Char.Unknown,
  /*  34 - "                  */ Char.Unknown,
  /*  35 - #                  */ Char.Unknown,
  /*  36 - $                  */ Char.Unknown,
  /*  37 - %                  */ Char.Unknown,
  /*  38 - &                  */ Char.Unknown,
  /*  39 - '                  */ Char.Unknown,
  /*  40 - (                  */ Char.Unknown,
  /*  41 - )                  */ Char.Unknown,
  /*  42 - *                  */ Char.Unknown,
  /*  43 - +                  */ Char.Unknown,
  /*  44 - ,                  */ Char.Unknown,
  /*  45 - -                  */ Char.Hyphen,
  /*  46 - .                  */ Char.Unknown,
  /*  47 - /                  */ Char.Slash,
  /*  48 - 0                  */ Char.Unknown,
  /*  49 - 1                  */ Char.Unknown,
  /*  50 - 2                  */ Char.Unknown,
  /*  51 - 3                  */ Char.Unknown,
  /*  52 - 4                  */ Char.Unknown,
  /*  53 - 5                  */ Char.Unknown,
  /*  54 - 6                  */ Char.Unknown,
  /*  55 - 7                  */ Char.Unknown,
  /*  56 - 8                  */ Char.Unknown,
  /*  57 - 9                  */ Char.Unknown,
  /*  58 - :                  */ Char.Unknown,
  /*  59 - ;                  */ Char.Unknown,
  /*  60 - <                  */ Char.LessThan,
  /*  61 - =                  */ Char.Unknown,
  /*  62 - >                  */ Char.Unknown,
  /*  63 - ?                  */ Char.Unknown,
  /*  64 - @                  */ Char.Unknown,
  /*  65 - A                  */ Char.Unknown,
  /*  66 - B                  */ Char.Unknown,
  /*  67 - C                  */ Char.Unknown,
  /*  68 - D                  */ Char.Unknown,
  /*  69 - E                  */ Char.Unknown,
  /*  70 - F                  */ Char.Unknown,
  /*  71 - G                  */ Char.Unknown,
  /*  72 - H                  */ Char.Unknown,
  /*  73 - I                  */ Char.Unknown,
  /*  74 - J                  */ Char.Unknown,
  /*  75 - K                  */ Char.Unknown,
  /*  76 - L                  */ Char.Unknown,
  /*  77 - M                  */ Char.Unknown,
  /*  78 - N                  */ Char.Unknown,
  /*  79 - O                  */ Char.Unknown,
  /*  80 - P                  */ Char.Unknown,
  /*  81 - Q                  */ Char.Unknown,
  /*  82 - R                  */ Char.Unknown,
  /*  83 - S                  */ Char.Unknown,
  /*  84 - T                  */ Char.Unknown,
  /*  85 - U                  */ Char.Unknown,
  /*  86 - V                  */ Char.Unknown,
  /*  87 - W                  */ Char.Unknown,
  /*  88 - X                  */ Char.Unknown,
  /*  89 - Y                  */ Char.Unknown,
  /*  90 - Z                  */ Char.Unknown,
  /*  91 - [                  */ Char.Unknown,
  /*  92 - \                  */ Char.Unknown,
  /*  93 - ]                  */ Char.Unknown,
  /*  94 - ^                  */ Char.Unknown,
  /*  95 - _                  */ Char.Unknown,
  /*  96 - `                  */ Char.Unknown,
  /*  97 - a                  */ Char.Unknown,
  /*  98 - b                  */ Char.Unknown,
  /*  99 - c                  */ Char.Unknown,
  /* 100 - d                  */ Char.Unknown,
  /* 101 - e                  */ Char.Unknown,
  /* 102 - f                  */ Char.Unknown,
  /* 103 - g                  */ Char.Unknown,
  /* 104 - h                  */ Char.Unknown,
  /* 105 - i                  */ Char.Unknown,
  /* 106 - j                  */ Char.Unknown,
  /* 107 - k                  */ Char.Unknown,
  /* 108 - l                  */ Char.Unknown,
  /* 109 - m                  */ Char.Unknown,
  /* 110 - n                  */ Char.Unknown,
  /* 111 - o                  */ Char.Unknown,
  /* 112 - p                  */ Char.Unknown,
  /* 113 - q                  */ Char.Unknown,
  /* 114 - r                  */ Char.Unknown,
  /* 115 - s                  */ Char.Unknown,
  /* 116 - t                  */ Char.Unknown,
  /* 117 - u                  */ Char.Unknown,
  /* 118 - v                  */ Char.Unknown,
  /* 119 - w                  */ Char.Unknown,
  /* 120 - x                  */ Char.Unknown,
  /* 121 - y                  */ Char.Unknown,
  /* 122 - z                  */ Char.Unknown,
  /* 123 - {                  */ Char.Unknown,
  /* 124 - |                  */ Char.Unknown,
  /* 125 - }                  */ Char.Unknown,
  /* 126 - ~                  */ Char.Unknown,
  /* 127 - Delete             */ Char.Unknown
];

export function skipWhitespace(parser: ParserState, context: Context, state: ScannerState): Flags {
  if (parser.index === 0) state |= ScannerState.LineStart;
  const source = parser.source;
  loop: while (parser.index < parser.length) {
    const cp = source.charCodeAt(parser.index);

    switch (whitespaceTbl[cp]) {
      /* line terminators */
      case Char.CarriageReturn:
        state |= ScannerState.NewLine | ScannerState.LastIsCR;
        parser.columnOffset = ++parser.index;
        parser.line++;
        break;

      case Char.LineFeed:
        if ((state & ScannerState.LastIsCR) === 0) parser.line++;
        state = (state | 0b00000000000000000000000000000101) ^ ScannerState.LastIsCR;
        parser.columnOffset = ++parser.index;
        break;

      /* general whitespace */
      case Char.Tab:
      case Char.VerticalTab:
      case Char.FormFeed:
      case Char.Space:
        state |= ScannerState.SameLine;
        parser.index++;
        break;

      /* normal comments */
      case Char.Slash: {
        state |= ScannerState.SameLine;
        const next = source.charCodeAt(parser.index + 1);
        if (next === Char.Slash) {
          state = skipSingleLine(parser, source, state);
          break;
        } else if (next === Char.Asterisk) {
          state = skipBlockComment(parser, context, source, state);
          break;
        }
        break loop;
      }

      /* HTML single line comment */
      case Char.LessThan:
        if (context & Context.Module) break loop;
        if (
          source.charCodeAt(parser.index + 3) === Char.Hyphen &&
          source.charCodeAt(parser.index + 2) === Char.Hyphen &&
          source.charCodeAt(parser.index + 1) === Char.Exclamation
        ) {
          state = skipSingleLine(parser, source, state);
          break;
        }
        break loop;

      /* HTML close */
      case Char.Hyphen:
        if (context & Context.Module || (state & 0b00000000000000000000000000001001) === 0) break loop;
        if (
          source.charCodeAt(parser.index + 2) === Char.GreaterThan &&
          source.charCodeAt(parser.index + 1) === Char.Hyphen
        ) {
          state = skipSingleLine(parser, source, state);
          break;
        }

      // falls through
      default:
        // Non-ASCII code points can only be identifiers or whitespace.
        if ((unicodeLookup[(cp >>> 5) + 139264] >>> cp) & 31 & 1) {
          parser.index++;
          if ((cp & ~1) === Char.LineSeparator) {
            state = (state | 0b00000000000000000000000000000101) ^ ScannerState.LastIsCR;
            parser.columnOffset = parser.index;
            parser.line++;
          }

          break;
        }
        break loop;
    }
  }

  if (state & ScannerState.NewLine) parser.lineTerminatorBeforeNextToken = true;
  if (state & ScannerState.NewLine) return Flags.SeekMoved | Flags.SeekLineTerminator;
  if (state & ScannerState.SameLine) return Flags.SeekMoved;
  return Flags.Empty;
}

export function extractComments(source: string, index: number, isModule: boolean, state: ScannerState): Comment[] {
  if (index === 0) state |= ScannerState.Collecting | ScannerState.LineStart;
  const result: Comment[] = [];
  loop: while (index < source.length) {
    const cp = source.charCodeAt(index);

    switch (whitespaceTbl[cp]) {
      /* line terminators */
      case Char.CarriageReturn:
        state |= ScannerState.NewLine | ScannerState.LastIsCR;
        if (state & ScannerState.Trailing) break loop;
        break;

      case Char.LineFeed:
        index++;
        if (state & ScannerState.Trailing) break loop;
        state = (state | 0b00000000000000000000000000000101) ^ ScannerState.LastIsCR;
        break;

      /* general whitespace */
      case Char.Tab:
      case Char.VerticalTab:
      case Char.FormFeed:
      case Char.Space:
        index++;

        break;

      /* normal comments */
      case Char.Slash: {
        const next = source.charCodeAt(index + 1);
        if (next === Char.Slash) {
          const start = index;
          let cp = source.charCodeAt(index);
          while (index < source.length) {
            if ((unicodeLookup[(cp >>> 5) + 174080] >>> cp) & 31 & 1 || (cp ^ Char.LineSeparator) <= 1) {
              state |= ScannerState.NewLine;
              break;
            }
            index++;
            cp = source.charCodeAt(index);
          }
          state = (state | ScannerState.LineStart) ^ ScannerState.LineStart;
          if (state & ScannerState.Collecting) {
            result.push({
              type: 'SingleLine',
              start,
              end: index,
              newLine: (state & ScannerState.NewLine) === ScannerState.NewLine
            });
          }
          break;
        } else if (next === Char.Asterisk) {
          const start = index;
          while (index < source.length) {
            if (source.charCodeAt(index) === Char.Asterisk && source.charCodeAt(index + 1) === Char.Slash) {
              index += 2;
              break;
            }
            index++;
          }
          state = (state | ScannerState.LineStart) ^ ScannerState.LineStart;
          if (state & ScannerState.Collecting) {
            result.push({
              type: 'MultiLine',
              start,
              end: index,
              newLine: (state & ScannerState.NewLine) === ScannerState.NewLine
            });
          }
          break;
        }
        break loop;
      }

      /* HTML single line comment */
      case Char.LessThan:
        if (isModule) break loop;
        if (
          source.charCodeAt(index + 3) === Char.Hyphen &&
          source.charCodeAt(index + 2) === Char.Hyphen &&
          source.charCodeAt(index + 1) === Char.Exclamation
        ) {
          const start = index;
          let cp = source.charCodeAt(index);
          while (index < source.length) {
            if ((unicodeLookup[(cp >>> 5) + 174080] >>> cp) & 31 & 1 || (cp ^ Char.LineSeparator) <= 1) {
              state |= ScannerState.NewLine;
              break;
            }
            index++;
            cp = source.charCodeAt(index);
          }
          if (state & ScannerState.Collecting) {
            result.push({
              type: 'HTMLOpen',
              start,
              end: index,
              newLine: (state & ScannerState.NewLine) === ScannerState.NewLine
            });
          }
          break;
        }
        break loop;

      /* HTML close */
      case Char.Hyphen:
        if (isModule || (state & 0b00000000000000000000000000001001) === 0) break loop;
        if (source.charCodeAt(index + 2) === Char.GreaterThan && source.charCodeAt(index + 1) === Char.Hyphen) {
          const start = index;
          let cp = source.charCodeAt(index);
          while (index < source.length) {
            if ((unicodeLookup[(cp >>> 5) + 174080] >>> cp) & 31 & 1 || (cp ^ Char.LineSeparator) <= 1) {
              state |= ScannerState.NewLine;
              break;
            }
            index++;
            cp = source.charCodeAt(index);
          }
          if (state & ScannerState.Collecting) {
            result.push({
              type: 'HTMLClose',
              start,
              end: index,
              newLine: (state & ScannerState.NewLine) === ScannerState.NewLine
            });
          }
          break;
        }

      // falls through
      default:
        // Non-ASCII code points can only be identifiers or whitespace.
        if ((unicodeLookup[(cp >>> 5) + 174080] >>> cp) & 31 & 1) {
          index++;
          if ((cp & ~1) === Char.LineSeparator) {
            state = (state | 0b00000000000000000000000000000101) ^ ScannerState.LastIsCR;
          }
          break;
        }
        break loop;
    }
  }

  return result;
}
