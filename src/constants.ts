export const enum Constants {
  IsStartOfStatement = 0b00100000000100010011000000000000,
  IsSourceElement = 0b00101000000100010011000000000000,
  IsClauseRecovery = 0b00100100000100010010000000000000,
  IsClauseNormal = 0b00100000001101110011000000000000,
  IsIdentifierOrKeywordNormal = 0b00001000000100010000000000000000,
  IsIdentifierOrKeywordRecovery = 0b00000000000100010000000000000000,
  IsIdentifierOrKeyword = 0b00001000000100010000000000000000,
  IsPatternOrIdentifierNormal = 0b00000000000100011000000000000000,
  IsPatternOrIdentifierRecovery = 0b00000000000100011000000000000000,
  IsLabelNormal = 0b00001000000100010000000000000000,
  IsLabelRecovery = 0b00000000000100010000000000000000,
  IsGroupParnethizedNormal = 0b00101001111101111110000000000000,
  IsGroupParnethizedRecovery = 0b00000000100100011010000000000000,
  IsDelimitedListNormal = 0b00101001111101111110000000000000,
  IsDelimitedListRecovery = 9543680,
  CanFollowAccessor = 0b00001001000100010000000000000000,
  ClassListNormal = 0b00101001011100010011000000000000,
  ClassListRecovery = 1209073664,
  ArrayListNormal = 0b00001010100100011010000000000000,
  ArrayListRecovery = 0b00000010100100011010000000000000,
  ObjectList = 0b00001001100100011010000000000000,
  ObjectListRecovery = 0b00001001100100010000000000000000,
  ObjAfterCommaNormal = 0b00101000111101111010000000000000,
  ObjAfterCommaRecovery = 0b00000000000100010010000000000000,
  ImportExportSpecifier = 0b00001000000100010010000000000000,
  PrimaryExpr = 0b00000000000001100101000000000000,

  // AsciiChar
  DecimalOrSeparator = 0b00000000000000000000000000110000
}
