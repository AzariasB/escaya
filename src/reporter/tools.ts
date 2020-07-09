import * as Types from '../types';

export function getLine(src: string, start: number, end: number): string {
  const lastLine = src.lastIndexOf('\n', start) + 1; // cut off the \n
  const nextLine = src.indexOf('\n', end);
  return src.slice(lastLine, nextLine);
}

export function getLinePos(src: string, start: number, end: number): Types.TextRange {
  const lastLine = src.lastIndexOf('\n', start) + 1; // cut off the \n
  return {
    start: start - lastLine,
    end: end - lastLine
  };
}

export function getLineNumber(src: string, start: number) {
  let lineCount = 1;
  let currentIdx = 0;
  while (true) {
    const next = src.indexOf('\n', currentIdx + 1);
    if (next === -1) {
      return lineCount + 1;
    }
    if (start >= currentIdx && start <= next) {
      return lineCount;
    }
    lineCount++;
    currentIdx = next;
  }
}
