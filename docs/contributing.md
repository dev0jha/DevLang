# Contributing to DevLang

Thank you for your interest in improving DevLang! We welcome contributions from everyone, whether you are fixing typos, clarifying explanations, adding new features, or improving the language itself.

Here's how you can help:

## Ways to Contribute

### 1. Documentation

All documentation files are Markdown (`.md`) files located inside the `/docs` folder in the repository.

- Edit relevant `.md` files to improve clarity
- Add examples to help users understand features better
- Fix typos, grammar, or outdated information
- Create tutorials or guides for specific use cases

### 2. Code Contributions

- Add new keywords or language features
- Improve the tokenizer, parser, or interpreter
- Fix bugs or optimize performance
- Write tests for existing functionality
- Add support for new operators or data types

### 3. Examples and Sample Programs

- Create interesting example programs in DevLang
- Add practical use cases that demonstrate language features
- Write sample projects that showcase DevLang's capabilities

## Getting Started

### Fork and Clone

1. Fork the DevLang repository to your own GitHub account
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/DevLang.git
cd DevLang
```

3. Create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
```

### Making Changes

#### For Code Changes

1. Make your modifications to the relevant files:
   - `tokenizer.js` - Lexical analysis
   - `parser.js` - Syntax analysis and AST generation
   - `interpreter.js` - Code execution
   - `tokenTypes.js` - Token definitions
   - Other supporting files as needed

2. Test your changes thoroughly:

```bash
node devlang.js -f test_program.dev
```

3. Ensure your code follows clean coding practices

#### For Documentation Changes

1. Edit the Markdown files in the `/docs` folder
2. Preview your changes locally (see below)

## Previewing Documentation Locally

Before submitting your changes, preview how the documentation will look:

1. Install MkDocs and Material theme (if not already installed):

```bash
pip install mkdocs mkdocs-material
```

2. From the project root directory, run:

```bash
mkdocs serve
```

3. Open your browser at [http://127.0.0.1:8000/](http://127.0.0.1:8000/) to see a live preview

When you save your Markdown files, the preview will update automatically.

## Submitting Changes

1. Commit your changes with clear, descriptive messages:

```bash
git add .
git commit -m "Add feature: description of what you changed"
```

2. Push your branch to your fork:

```bash
git push origin feature/your-feature-name
```

3. Open a Pull Request (PR) from your branch to the original repository's `main` branch

4. In your PR description:
   - Explain what changes you made and why
   - Reference any related issues
   - Include screenshots if applicable (for documentation changes)

We review all pull requests promptly and provide feedback if necessary.

## Reporting Issues or Suggesting Features

If you find bugs, have questions, or want to suggest new features:

1. Check if the issue already exists in the [GitHub Issues](https://github.com/dev0jha/DevLang/issues)
2. If not, open a new issue with:
   - A clear, descriptive title
   - Detailed description of the problem or suggestion
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Your environment (Node.js version, OS, etc.)

## Code Style Guidelines

- Use meaningful variable and function names
- Add comments to explain complex logic
- Keep functions small and focused
- Follow existing code patterns in the project
- Test your changes before submitting

## Adding New Keywords

If you want to add a new Hindi keyword:

1. Add the token type in `tokenTypes.js`
2. Update the tokenizer in `tokenizer.js` to recognize it
3. Update the parser in `parser.js` to handle its syntax
4. Update the interpreter in `interpreter.js` to execute it
5. Add documentation and examples
6. Update the keywords reference in `docs/keywords.md`

## Our Commitment

We believe in open and collaborative development to make programming more accessible through Hindi keywords. Your feedback and contributions make this project better for the whole community!

Thank you for being part of the DevLang community!

Happy coding! 🚀
