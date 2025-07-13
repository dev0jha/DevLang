/**
 * Tokenizer - Performs lexical analysis on DevLang source code
 * 
 * @version 1.0.0
 * @license MIT
 */

const { TokenTypes } = require('./tokenTypes');
const { Token } = require('./token');

/**
 * Tokenizer - Performs lexical analysis on DevLang source code
 */
class Tokenizer {
    constructor(code) {
        this.code = code;
        this.tokens = [];
        this.keywords = new Set(['bolo', 'dekho', 'puchoo', 'nhi_toh']);
        this.arithmeticOps = new Set(['+', '-', '*', '/', '%']);
        this.comparisonOps = new Set(['==', '!=', '>', '<', '>=', '<=']);
        this.logicalOps = new Set(['&&', '||', '!']);
        this.parentheses = new Set(['(', ')']);
        this.curlyBraces = new Set(['{', '}']);
        
        this.tokenize();
    }

    tokenize() {
    // Correct pattern: includes string literals
    const pattern = /"(?:\\.|[^"\\])*"|[A-Za-z_]\w*|\d+|==|!=|>=|<=|&&|\|\||[+\-*/%]=?|[(){};,]|[<>]|=/g;
    const matches = this.code.match(pattern) || [];

    for (const match of matches) {
        // String literal (e.g. "hello world")
        if (match.startsWith('"') && match.endsWith('"')) {
            this.tokens.push(new Token(TokenTypes.STRING_LITERAL, match.slice(1, -1)));
        }
        // Keyword (bolo, dekho, puchoo, nhi_toh)
        else if (this.keywords.has(match)) {
            this.tokens.push(new Token(TokenTypes.KEYWORD, match));
        }
        // Identifier (e.g. name, age)
        else if (/^[A-Za-z_]\w*$/.test(match)) {
            this.tokens.push(new Token(TokenTypes.IDENTIFIER, match));
        }
        //  Assignment operator (=)
        else if (match === '=') {
            this.tokens.push(new Token(TokenTypes.ASSIGNMENT_OP, match));
        }
        // Integer literal
        else if (/^\d+$/.test(match)) {
            this.tokens.push(new Token(TokenTypes.INT_LITERAL, match));
        }
        // Arithmetic operators
        else if (this.arithmeticOps.has(match)) {
            this.tokens.push(new Token(TokenTypes.ARITHMETIC_OP, match));
        }
        //  Comparison operators
        else if (this.comparisonOps.has(match)) {
            this.tokens.push(new Token(TokenTypes.COMPARISON_OP, match));
        }
        //  Logical operators
        else if (this.logicalOps.has(match)) {
            this.tokens.push(new Token(TokenTypes.LOGICAL_OP, match));
        }
        //  Parentheses
        else if (this.parentheses.has(match)) {
            this.tokens.push(new Token(TokenTypes.PARENTHESIS, match));
        }
        //  Curly braces
        else if (this.curlyBraces.has(match)) {
            this.tokens.push(new Token(TokenTypes.CURLY_BRACE, match));
        }
        //  Semicolon
        else if (match === ';') {
            this.tokens.push(new Token(TokenTypes.SEMICOLON, match));
        }
        //  Unknown token
        else {
            console.warn(`Unrecognized token: ${match}`);
        }
    }
}


    getTokens() {
        return this.tokens;
    }
}

module.exports = { Tokenizer };