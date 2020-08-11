# test262-parser-tests

This folder contains invalid `test262-parser-tests`. Added here to make sure we can recover
correctly from them all.

## Early

The parser should only bypass the errors and continue to parse as normal without recreating an AST

## Failure

Handle all error cases and recreate an AST based on put in all scenarios
