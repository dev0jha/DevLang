#!/usr/bin/env node

/**
 * DevLang Compiler - A Simple Programming Language with Hindi Keywords
 * 
 * DevLang is a simple programming language that uses Hindi keywords for better
 * accessibility to Hindi speakers. It supports basic programming constructs
 * like variables, conditionals, and I/O operations.
 * 
 * Features:
 * - Hindi keywords: bolo (print), dekho (if), puchoo (input), nhi_toh (else)
 * - Variable assignment and arithmetic operations
 * - Conditional statements with if-else
 * - String and integer literals
 * - Symbol table for variable management
 * - Lexical analysis, parsing, and interpretation
 * 
 * Usage:
 *   node devlang.js -f program.dev     // Run from file
 *   node devlang.js -e "code here"     // Run inline code
 *   node devlang.js --tokens -f file   // Show tokens for debugging
 *   node devlang.js --async -f file    // Enable real input
 * 
 * Example DevLang Program:
 *   naam = "DevLang";
 *   bolo naam;
 *   age = 25;
 *   dekho(age > 18) {
 *       bolo "Adult";
 *   } nhi_toh {
 *       bolo "Minor";
 *   }
 * 
 * Keywords:
 * - bolo: Print/output statement
 * - dekho: Conditional if statement
 * - puchoo: Input function (prompt user)
 * - nhi_toh: Else statement
 * 
 * @version 1.0.0
 * @license MIT
 */

const fs = require('fs');
const { Tokenizer } = require('./tokenizer');
const { Parser } = require('./parser');
const { Interpreter } = require('./interpreter');

/**
 * Main function to run the DevLang interpreter
 */
async function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('DevLang Compiler v1.0.0');
        console.log('Usage: node devlang.js -f <file> OR node devlang.js -e "<code>"');
        console.log('       node devlang.js --tokens -f <file> (show tokens)');
        console.log('       node devlang.js --async -f <file> (enable real input)');
        console.log('');
        console.log('Example: node devlang.js -e "naam = \\"Hello\\"; bolo naam;"');
        process.exit(1);
    }
    
    let code = '';
    let isAsync = false;
    
    // Check for async flag
    if (args.includes('--async')) {
        isAsync = true;
        // Remove --async from args
        const asyncIndex = args.indexOf('--async');
        args.splice(asyncIndex, 1);
    }
    
    if (args[0] === '-f' && args[1]) {
        try {
            code = fs.readFileSync(args[1], 'utf8');
        } catch (error) {
            console.error(`Error reading file: ${error.message}`);
            process.exit(1);
        }
    } else if (args[0] === '-e' && args[1]) {
        code = args[1];
    } else if (args[0] === '--tokens' && args[1] === '-f' && args[2]) {
        try {
            code = fs.readFileSync(args[2], 'utf8');
            const tokenizer = new Tokenizer(code);
            console.log('Tokens:');
            tokenizer.getTokens().forEach(token => console.log(token.toString()));
            return;
        } catch (error) {
            console.error(`Error reading file: ${error.message}`);
            process.exit(1);
        }
    } else if (args[0] === '--tokens' && args[1] === '-e' && args[2]) {
        code = args[2];
        const tokenizer = new Tokenizer(code);
        console.log('Tokens:');
        tokenizer.getTokens().forEach(token => console.log(token.toString()));
        return;
    } else {
        console.log('Invalid arguments. Use -f <file> or -e "<code>"');
        process.exit(1);
    }
    
    try {
        const interpreter = new Interpreter(code, isAsync);
        
        if (isAsync) {
            await interpreter.execute();
        } else {
            interpreter.executeSync();
        }
    } catch (error) {
        console.error(`Execution error: ${error.message}`);
        process.exit(1);
    }
}

// Run main function when script is executed directly
if (require.main === module) {
    main().catch(error => {
        console.error(`Fatal error: ${error.message}`);
        process.exit(1);
    });
}

// Export modules for testing and external use
module.exports = { 
    Tokenizer, 
    Parser, 
    Interpreter
};