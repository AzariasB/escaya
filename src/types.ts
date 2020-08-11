/**
 * A slice of text.
 */
export interface TextRange {
  start: number;
  end: number;
}

export interface TextSpan {
  start: number;
  length: number;
}

export interface TextChangeRange {
  span: TextSpan;
  newLength: number;
}
