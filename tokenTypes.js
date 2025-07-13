/**
 * Token Types - Defines all token types used in DevLang lexical analysis
 * 
 * @version 1.0.0
 * @license MIT
 */

const TokenTypes = {
    KEYWORD: 'KEYWORD',
    IDENTIFIER: 'IDENTIFIER',
    ASSIGNMENT_OP: 'ASSIGNMENT_OP',
    INT_LITERAL: 'INT_LITERAL',
    STRING_LITERAL: 'STRING_LITERAL',
    ARITHMETIC_OP: 'ARITHMETIC_OP',
    COMPARISON_OP: 'COMPARISON_OP',
    LOGICAL_OP: 'LOGICAL_OP',
    PARENTHESIS: 'PARENTHESIS',
    CURLY_BRACE: 'CURLY_BRACE',
    SEMICOLON: 'SEMICOLON'
};

module.exports = { TokenTypes };