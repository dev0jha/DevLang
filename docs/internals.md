# Internals — How DevLang Works

This document provides a deep dive into the architecture and implementation details of DevLang. Understanding these internals will help you contribute to the project or build your own programming language.

---

## Architecture Overview

DevLang follows the classic interpreter architecture with three main stages:

```
Source Code → Tokenizer → Parser → Interpreter → Output
  (.dev)       (Tokens)    (AST)    (Execution)
```

### Processing Pipeline

1. **Lexical Analysis** — Tokenizer converts source code into tokens
2. **Syntactic Analysis** — Parser builds an Abstract Syntax Tree (AST)
3. **Execution** — Interpreter traverses the AST and executes instructions

---

## Stage 1: Tokenizer (Lexical Analysis)

**File:** `tokenizer.js`

### Purpose

The tokenizer (or lexer) performs **lexical analysis** — breaking down source code into meaningful units called **tokens**.

### How It Works

```javascript
// Input: "bolo 'Hello'"
// Output: [
//   Token(KEYWORD, "bolo"),
//   Token(STRING_LITERAL, "Hello")
// ]
```

### Token Types

The tokenizer recognizes several types of tokens:

| Token Type | Examples | Description |
|------------|----------|-------------|
| `KEYWORD` | `bolo`, `agar`, `jabtak` | Hindi language keywords |
| `IDENTIFIER` | `x`, `age`, `counter` | Variable names |
| `INTEGER_LITERAL` | `42`, `100` | Numeric values |
| `STRING_LITERAL` | `"Hello"`, `"Namaste"` | Text in quotes |
| `ARITHMETIC_OP` | `+`, `-`, `*`, `/`, `%` | Math operators |
| `COMPARISON_OP` | `>`, `<`, `==`, `!=` | Comparison operators |
| `LOGICAL_OP` | `&&`, `\|\|`, `!` | Logical operators |
| `ASSIGNMENT_OP` | `=` | Variable assignment |
| `LPAREN`, `RPAREN` | `(`, `)` | Parentheses |
| `LBRACE`, `RBRACE` | `{`, `}` | Curly braces |

### Tokenization Process

1. **Pattern Matching** — Uses regex to identify token patterns
2. **Classification** — Determines the type of each token
3. **Token Creation** — Creates Token objects with type and value
4. **Stream Building** — Produces a sequential list of tokens

### Key Features

- **String Handling** — Properly parses quoted strings with escape sequences
- **Keyword Recognition** — Identifies Hindi keywords (`bolo`, `agar`, etc.)
- **Operator Detection** — Recognizes multi-character operators (`==`, `>=`, etc.)
- **Whitespace Handling** — Automatically skips spaces and newlines

---

## Stage 2: Parser (Syntactic Analysis)

**File:** `parser.js`

### Purpose

The parser performs **syntactic analysis** — building a hierarchical tree structure (AST) that represents the program's logical structure.

### Abstract Syntax Tree (AST)

An AST represents the grammatical structure of code in tree form:

```
Program
├── AssignmentStatement
│   ├── Identifier: "x"
│   └── IntegerLiteral: 10
└── PrintStatement
    └── Identifier: "x"
```

### Parsing Methods

The parser uses **recursive descent parsing** with methods for each grammar rule:

- `program()` — Top-level program structure
- `statement()` — Individual statements
- `expression()` — Expressions and values
- `condition()` — Conditional expressions
- `loop()` — Loop constructs

### Grammar Rules

DevLang follows this simplified grammar:

```
Program        → Statement*
Statement      → PrintStmt | AssignStmt | IfStmt | LoopStmt
PrintStmt      → 'bolo' Expression
AssignStmt     → Identifier '=' Expression
IfStmt         → 'agar' Condition Statement ('nhi_toh' Statement)?
LoopStmt       → 'jabtak' Condition Statement
Expression     → Term (('+' | '-') Term)*
Term           → Factor (('*' | '/' | '%') Factor)*
Factor         → Number | String | Identifier | '(' Expression ')'
Condition      → Expression ComparisonOp Expression
```

### Node Types

The parser creates different AST node types:

- **Program** — Root node containing all statements
- **AssignmentStatement** — Variable assignment
- **PrintStatement** — Output operation
- **IfStatement** — Conditional branching
- **LoopStatement** — While loops
- **BinaryOperation** — Arithmetic/comparison operations
- **Identifier** — Variable reference
- **Literal** — Integer or string value

### Error Handling

The parser provides detailed error messages:

- **Syntax Errors** — Missing tokens, unexpected symbols
- **Structure Errors** — Malformed statements
- **Position Tracking** — Shows where errors occur

---

## Stage 3: Interpreter (Execution)

**File:** `interpreter.js`

### Purpose

The interpreter **executes** the AST by traversing nodes and performing operations.

### Execution Model

DevLang uses a **tree-walking interpreter**:

1. Traverses the AST depth-first
2. Evaluates each node based on its type
3. Maintains runtime state in a symbol table
4. Performs operations and produces output

### Symbol Table

**File:** `symbolTable.js`

The symbol table manages variable storage:

```javascript
symbolTable = {
  'x': 10,
  'name': 'DevLang',
  'counter': 5
}
```

- **Variable Storage** — Stores identifier-value pairs
- **Scope Management** — Handles variable lookups
- **Type Flexibility** — Supports dynamic typing

### Visitor Pattern

The interpreter uses the **visitor pattern** to handle different node types:

```javascript
visit(node) {
  switch(node.type) {
    case 'Program': return this.visitProgram(node);
    case 'PrintStatement': return this.visitPrint(node);
    case 'AssignmentStatement': return this.visitAssignment(node);
    // ... more node types
  }
}
```

### Statement Execution

#### Print Statement (`bolo`)

1. Evaluates the expression
2. Converts to string
3. Outputs to console

#### Assignment Statement

1. Evaluates right-hand expression
2. Stores value in symbol table
3. Associates with identifier

#### Conditional Statement (`agar`/`nhi_toh`)

1. Evaluates condition
2. If true, executes first branch
3. If false, executes else branch (if present)

#### Loop Statement (`jabtak`)

1. Evaluates condition
2. While true, executes body
3. Re-evaluates condition
4. Repeats until false

### Expression Evaluation

The interpreter evaluates expressions recursively:

- **Binary Operations** — Performs arithmetic/comparison
- **Variable Lookup** — Retrieves values from symbol table
- **Literals** — Returns constant values
- **Nested Expressions** — Evaluates from innermost to outer

### Type Coercion

DevLang performs automatic type conversion:

- **String + Number** → Concatenation
- **Comparisons** → Type-aware comparison
- **Arithmetic** → Numeric operations

---

## Core Files

### tokenizer.js

- **Class:** `Tokenizer`
- **Main Method:** `tokenize()`
- **Output:** Array of Token objects
- **Dependencies:** `tokenTypes.js`, `token.js`

### parser.js

- **Class:** `Parser`
- **Main Method:** `parse()`
- **Output:** AST root node
- **Dependencies:** `tokenTypes.js`, `astNode.js`

### interpreter.js

- **Class:** `Interpreter`
- **Main Methods:** `execute()`, `visit()`
- **Output:** Program execution and side effects
- **Dependencies:** All core files

### Supporting Files

- **tokenTypes.js** — Token type constants
- **token.js** — Token class definition
- **astNode.js** — AST node class
- **symbolTable.js** — Variable storage
- **devlang.js** — CLI entry point

---

## Execution Flow Example

Let's trace how this code executes:

```devlang
x = 10
bolo x
```

### 1. Tokenization

```javascript
[
  Token(IDENTIFIER, "x"),
  Token(ASSIGNMENT_OP, "="),
  Token(INTEGER_LITERAL, "10"),
  Token(KEYWORD, "bolo"),
  Token(IDENTIFIER, "x")
]
```

### 2. Parsing

```
Program
├── AssignmentStatement
│   ├── Identifier: "x"
│   └── IntegerLiteral: 10
└── PrintStatement
    └── Identifier: "x"
```

### 3. Execution

1. **Visit Program node** → Process children
2. **Visit AssignmentStatement**
   - Evaluate right side: `10`
   - Store in symbol table: `symbolTable['x'] = 10`
3. **Visit PrintStatement**
   - Evaluate expression: lookup `x` → `10`
   - Output: `10`

**Result:** Prints `10` to console

---

## Error Handling Strategy

### Lexical Errors

Caught during tokenization:
- Invalid characters
- Malformed strings

### Syntax Errors

Caught during parsing:
- Missing tokens
- Invalid grammar
- Unexpected symbols

### Runtime Errors

Caught during execution:
- Undefined variables
- Type errors
- Division by zero

---

## Design Principles

### 1. Simplicity

DevLang prioritizes simplicity over performance:
- Clear, readable code
- Straightforward algorithms
- Easy to understand and modify

### 2. Educational Focus

Designed for learning:
- Well-documented code
- Standard patterns (visitor, recursive descent)
- Modular architecture

### 3. Extensibility

Easy to extend:
- Add new keywords in tokenizer
- Add new grammar rules in parser
- Add new operations in interpreter

### 4. Language Inclusivity

Hindi keywords make programming accessible:
- Familiar vocabulary
- Cultural relevance
- Lower language barriers

---

## Performance Considerations

### Current Implementation

- **Interpreter Speed** — Not optimized for performance
- **Memory Usage** — Creates full AST in memory
- **Execution Model** — Tree-walking (slower than bytecode)

### Potential Optimizations

Future improvements could include:

1. **Bytecode Compilation** — Convert AST to bytecode
2. **JIT Compilation** — Compile hot paths at runtime
3. **Symbol Table Optimization** — Use hash maps
4. **Constant Folding** — Evaluate constants at parse time
5. **Tail Call Optimization** — For recursive functions

---

## Future Enhancements

### Planned Features

1. **Functions** — User-defined functions with parameters
2. **Arrays** — List data structure
3. **Objects** — Key-value data structures
4. **Modules** — Import/export system
5. **Standard Library** — Built-in functions
6. **REPL** — Interactive mode
7. **Debugging** — Breakpoints and inspection

### Language Extensions

- More Hindi keywords
- Enhanced string operations
- File I/O operations
- Error handling (try/catch)
- Classes and objects

---

## Contributing to Internals

If you want to modify DevLang internals:

1. **Understand the Pipeline** — Know how each stage works
2. **Maintain Separation** — Keep tokenizer, parser, and interpreter separate
3. **Add Tests** — Test new features thoroughly
4. **Document Changes** — Update this documentation
5. **Follow Patterns** — Use existing code patterns

See [Contributing Guide](contributing.md) for detailed instructions.

---

## References and Learning Resources

- **Crafting Interpreters** by Robert Nystrom
- **Compilers: Principles, Techniques, and Tools** (Dragon Book)
- **Writing An Interpreter In Go** by Thorsten Ball
- **Let's Build a Compiler** by Jack Crenshaw

---

Understanding these internals will help you:
- Contribute new features
- Fix bugs effectively
- Build your own programming language
- Learn about language implementation

Happy exploring! 🚀
