/**
 * 'R' = 'Recovery'
 *
 * 'N' = 'Normal'
 */

export const enum Constants {
  /* Tokens */
  NextTokenIsNotALetDeclaration  = 0b00001000000100011000000000000000,
  SourceElements                 = 0b00100000000100010011000000000000,
  SwitchClausesR                 = 0b00100100000100010010000000000000,
  SwitchClausesN                 = 0b01100100001101110010000000000000,
  IdentifierOrFutureReserved     = 0b00000000000100010000000000000000,
  IdentifierOrKeyword            = 0b00001000000100010000000000000000,
  PatternOrIdentifier            = 0b00000000000100011000000000000000,
  VarOrLexical                   = 0b00000000000100011100000000000000,
  ParenthesizedN                 = 0b00101001111101111110000000000000,
  ParenthesizedR                 = 0b00000000100100011010000000000000,
  DelimitedList                  = 0b00101001111101111110000000000000,
  ArgumentList                   = 0b00000000101100011010000000000000,
  FormalParams                   = 0b00000000100100011000000000000000,
  CanFollowAccessor              = 0b00001001000100010000000000000000,
  ClassListN                     = 0b00101001011100010011000000000000,
  ClassListR                     = 0b01001000000100010000000000000000,
  ArrayListN                     = 0b00001010100100011010000000000000,
  ArrayListR                     = 0b00000010100100011010000000000000,
  ArrayPattern                   = 0b00000010100100011000000000000000,
  ObjectPatternR                 = 0b00001001100100010000000000000000,
  ObjectPatternN                 = 0b00001001100100011010000000000000,
  ObjectLiteralElements          = 0b00001001100100010000000000000000,
  ModuleElementsN                = 0b00001000000100010010000000000000,
  ModuleElementsR                = 0b00111000000100010000000000000000,
  PrimaryExpr                    = 0b00000000000001100101000000000000,
  IsAssignCommaOrLeftBrace       = 0b00000010000000100100000000000000,

  /* Scope */
  ClauseBlock                    = 0b00110000000100000000000000000000,
  StrictOrNoWebCompat            = 0b00000000000000000000010000000100,

  /* PropertyKind */

  HasModifier            = 0b00000000000000000000000000010111,

  /* AsciiChar */
  DecimalOrSeparator             = 0b00000000000000000000000000110000
}
