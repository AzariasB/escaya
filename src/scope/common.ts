/**
 * Scope kinds
 */
export const enum ScopeKind {
  None = 0,
  ForStatement = 1 << 0,
  Block = 1 << 1,
  CatchStatement = 1 << 2,
  SwitchStatement = 1 << 3,
  ArgList = 1 << 4,
  TryStatement = 1 << 5,
  CatchBlock = 1 << 6,
  FunctionBody = 1 << 7,
  FunctionRoot = 1 << 8,
  FunctionParams = 1 << 9,
  ArrowParams = 1 << 10,
  CatchIdentifier = 1 << 11
}
