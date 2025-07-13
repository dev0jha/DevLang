# DevLang - Programming Language with Hindi Keywords

DevLang is a simple programming language that uses Hindi keywords for better accessibility to Hindi speakers. It supports basic programming constructs like variables, conditionals, and I/O operations.

## Features

- **Hindi Keywords**: Uses intuitive Hindi words for programming constructs
- **Variable Assignment**: Support for string and integer variables
- **Conditional Statements**: if-else logic with Hindi keywords
- **Input/Output**: Interactive input and output operations
- **Symbol Table**: Proper variable management and scoping
- **Modular Architecture**: Clean separation of concerns

## Keywords

- `bolo` - Print/output statement (equivalent to `print` or `console.log`)
- `dekho` - Conditional if statement (equivalent to `if`)
- `puchoo` - Input function to prompt user (equivalent to `input` or `prompt`)
- `nhi_toh` - Else statement (equivalent to `else`)

## Installation

1. Clone or download the DevLang file
```bash
git clone https://github.com/dev0jha/DevLang.git
cd DevLang
```
3. Make sure you have Node.js installed (version 12+)
4. Run programs using the command line

## Usage

### Command Line Options

```bash
# Run from file
node devlang.js -f program.dev

# Run inline code
node devlang.js -e "code here"

# Show tokens for debugging
node devlang.js --tokens -f
```
### Examples
```bash
# Input
x = 10;
y = 20;
z = x + y;
bolo z;

#Output
30
```
```bash
#Input
naam = "Dev Hari Ojha";
bolo naam;

#Output
Dev Hari Ojha
```
```bash
#Input
age = puchoo "Apni age batao";
dekho(age >= 18) {
    bolo "Aap adult ho";
} nhi_toh {
    bolo "Aap minor ho";
}

#Output
Aap minor ho
Aap adult ho




