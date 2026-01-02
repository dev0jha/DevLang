# Frequently Asked Questions (FAQ)

## What file extension do DevLang programs use?

DevLang source code files use the `.dev` extension.

## How do I run a DevLang program?

After installing DevLang, run:

```bash
node devlang.js -f your_program.dev
```

You can also execute inline code with the `-e` option:

```bash
node devlang.js -e "bolo 'Hello World'"
```

For more installation options, see the [Installation Guide](installation.md).

## What are the Hindi keywords used in DevLang?

DevLang uses Hindi-inspired keywords to make programming more accessible:

- `bolo` — Print output (like `print` or `console.log`)
- `agar` — If condition
- `nhi_toh` — Else condition
- `jabtak` — While loop
- `puchoo` — Take input (planned feature)

See the [Keywords Reference](keywords.md) for a complete list.

## What data types does DevLang support?

Currently, DevLang supports:

- **Numbers** (integers and decimals)
- **Strings** (text enclosed in quotes)
- **Variables** (dynamically typed)

Additional data types like arrays and objects are planned for future releases.

## Are functions supported in DevLang?

Not yet. DevLang currently focuses on basic programming constructs like variables, conditionals, and loops. User-defined functions are a planned feature for future versions.

## How does DevLang handle errors?

DevLang provides error messages for:

- **Syntax errors** — When code doesn't follow the language syntax
- **Runtime errors** — When errors occur during execution
- **Semantic errors** — When code is syntactically correct but logically invalid

Error handling is continuously being improved to provide better debugging information.

## Can I use DevLang for real projects?

DevLang is currently an **educational and experimental language**. It's perfect for:

- Learning programming concepts
- Teaching coding to Hindi speakers
- Exploring language design
- Experimenting with localized programming

It's not recommended for production use at this stage.

## What Node.js version does DevLang require?

DevLang requires **Node.js version 12.0.0 or higher**. It's recommended to use the latest LTS version for best compatibility.

## Can I add new keywords to DevLang?

Absolutely! DevLang is open source and designed to be extensible. To add new keywords:

1. Define the token type in `tokenTypes.js`
2. Update the tokenizer in `tokenizer.js`
3. Modify the parser in `parser.js`
4. Update the interpreter in `interpreter.js`
5. Add documentation and examples

See the [Contributing Guide](contributing.md) for detailed instructions.

## How does DevLang compare to other programming languages?

DevLang is unique because:

- **Language Inclusivity** — Uses Hindi keywords instead of English
- **Educational Focus** — Designed for learning, not production
- **Simplicity** — Minimal syntax and easy to understand
- **Open Source** — Completely free and customizable
- **JavaScript-based** — Runs on Node.js without additional dependencies

## Can I contribute to DevLang?

Yes! Contributions are welcome from users of all experience levels. You can:

- Add new features or keywords
- Improve the interpreter, parser, or tokenizer
- Enhance documentation
- Fix bugs
- Create example programs
- Suggest improvements

See the [Contributing Guide](contributing.md) for details on submitting pull requests and reporting issues.

## Where can I find more documentation?

Full documentation and usage examples are available at:

- [Home](index.md) — Overview and introduction
- [Installation](installation.md) — Setup instructions
- [CLI Usage](cli-usage.md) — Command-line interface
- [Syntax](syntax.md) — Language syntax guide
- [Keywords](keywords.md) — Complete keyword reference
- [Examples](examples.md) — Code examples and tutorials
- [Internals](internals.md) — How DevLang works under the hood

## Is DevLang inspired by other projects?

Yes! DevLang is conceptually inspired by projects like Doglang and other educational programming languages, but it's independently implemented with its own unique focus on Hindi-based programming and language accessibility.

## Who created DevLang?

DevLang is an open-source project created to promote inclusive programming by making code more accessible to Hindi speakers and demonstrating that programming languages can embrace linguistic diversity.

## How can I report bugs or request features?

If you find bugs or have feature suggestions:

1. Check the [GitHub Issues](https://github.com/dev0jha/DevLang/issues) to see if it's already reported
2. If not, open a new issue with:
   - Clear description of the bug or feature
   - Steps to reproduce (for bugs)
   - Expected behavior
   - Your environment details

## Can I use DevLang to teach programming?

Absolutely! DevLang is perfect for educational settings, especially:

- Teaching programming to Hindi-speaking students
- Introducing coding concepts without English language barriers
- Computer science classes in schools and colleges
- Self-learners exploring programming
- Workshops on language design and interpreters

## What's the future roadmap for DevLang?

Planned features include:

- User-defined functions
- Arrays and data structures
- More operators and built-in functions
- Better error messages
- Standard library
- REPL (interactive mode)
- More Hindi keywords
- Input/output operations

---

If you have other questions, feel free to open an issue on the [GitHub repository](https://github.com/dev0jha/DevLang) or contribute to the documentation!




