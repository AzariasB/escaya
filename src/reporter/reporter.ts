import { Diagnostic } from '../diagnostic/diagnostics';
import { RootNode } from '../common';
import { getLine, getLinePos, getLineNumber } from './tools';

export function reportDiagnostics(root: RootNode): void {
  for (const diagnostic of root.diagnostics) {
    writeLineInfo(root, diagnostic);
  }
}

function writeLineInfo(root: RootNode, diagnostic: Diagnostic) {
  const lineNumber = getLineNumber(root.text as string, diagnostic.start).toString();
  const lnSpacing = ' '.repeat(lineNumber.length);
  const line = getLine(root.text as string, diagnostic.start, diagnostic.end);
  const relativePos = getLinePos(root.text as string, diagnostic.start, diagnostic.end);
  const errLen = relativePos.end - relativePos.start;
  let errorMarker = '-'.repeat(errLen);
  // if the underline is 2 characters or less, add `-- here` to make it stand out more.
  if (errLen <= 2) {
    errorMarker += '-- ^';
  }
  process.stdout.write(`${'error'}: ${diagnostic.message}\n`);
  process.stdout.write(`${lnSpacing} ${'|'}\n`);
  process.stdout.write(`${`${lineNumber} |`} ${line}\n`);
  process.stdout.write(`${lnSpacing} ${'|'}`);
  process.stdout.write(`${' '.repeat(relativePos.start + 1)}${errorMarker}\n\n`);
}
