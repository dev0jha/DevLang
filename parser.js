/**
 * Parser - Performs syntactic analysis and builds AST for DevLang
 * 
 * @version 1.0.0
 * @license MIT
 */

const { TokenTypes } = require('./tokenTypes');
const { ASTNode } = require('./astNode');

/**
 * Parser - Performs syntactic analysis and builds AST
 */
class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.current = 0;
    }

    currentToken() {
        return this.current < this.tokens.length ? this.tokens[this.current] : null;
    }

    advance() {
        this.current++;
    }

    match(expectedType, expectedValue = null) {
        const token = this.currentToken();
        if (!token) {
            throw new Error(`Unexpected end of input. Expected ${expectedType}`);
        }
        if (token.type !== expectedType || (expectedValue && token.value !== expectedValue)) {
            throw new Error(`Expected ${expectedType} ${expectedValue || ''} but got ${token.type} ${token.value}`);
        }
        this.advance();
        return token;
    }

    parse() {
        return this.program();
    }

    program() {
        const node = new ASTNode('Program');
        while (this.current < this.tokens.length) {
            node.addChild(this.statement());
        }
        return node;
    }

    statement() {
        const token = this.currentToken();
        
        if (token.type === TokenTypes.KEYWORD) {
            switch (token.value) {
                case 'bolo':
                    return this.printStatement();
                case 'dekho':
                    return this.conditionalStatement();
                default:
                    throw new Error(`Unexpected keyword: ${token.value}`);
            }
        } else if (token.type === TokenTypes.IDENTIFIER) {
            return this.assignmentStatement();
        } else {
            throw new Error(`Unexpected token: ${token.type} ${token.value}`);
        }
    }

    assignmentStatement() {
        const node = new ASTNode('assignment');
        const id = this.currentToken().value;
        node.addChild(new ASTNode(TokenTypes.IDENTIFIER, id));
        this.match(TokenTypes.IDENTIFIER);
        this.match(TokenTypes.ASSIGNMENT_OP, '=');
        node.addChild(this.expression());
        this.consumeSemicolon();
        return node;
    }

    printStatement() {
        const node = new ASTNode('print');
        this.match(TokenTypes.KEYWORD, 'bolo');
        node.addChild(this.expression());
        this.consumeSemicolon();
        return node;
    }

    conditionalStatement() {
        const node = new ASTNode('conditional');
        this.match(TokenTypes.KEYWORD, 'dekho');
        this.match(TokenTypes.PARENTHESIS, '(');
        node.addChild(this.expression());
        this.match(TokenTypes.PARENTHESIS, ')');
        node.addChild(this.codeBlock());
        
        if (this.currentToken() && this.currentToken().value === 'nhi_toh') {
            node.addChild(this.elseStatement());
        }
        return node;
    }

    elseStatement() {
        const node = new ASTNode(TokenTypes.KEYWORD, 'nhi_toh');
        this.match(TokenTypes.KEYWORD, 'nhi_toh');
        node.addChild(this.codeBlock());
        return node;
    }

    codeBlock() {
        const node = new ASTNode('block');
        this.match(TokenTypes.CURLY_BRACE, '{');
        while (this.currentToken() && this.currentToken().value !== '}') {
            node.addChild(this.statement());
        }
        this.match(TokenTypes.CURLY_BRACE, '}');
        return node;
    }

    expression() {
        const node = new ASTNode('expression');
        
        // Handle input function
        if (this.currentToken() && this.currentToken().type === TokenTypes.KEYWORD && this.currentToken().value === 'puchoo') {
            this.match(TokenTypes.KEYWORD, 'puchoo');
            const inputNode = new ASTNode(TokenTypes.KEYWORD, 'input');
            inputNode.addChild(this.expression());
            return inputNode;
        }
        
        // Parse expression tokens
        while (this.currentToken() && 
               this.currentToken().value !== ';' && 
               this.currentToken().value !== '{' && 
               this.currentToken().value !== '}' &&
               this.currentToken().value !== ')') {
            
            const token = this.currentToken();
            node.addChild(new ASTNode(token.type, token.value));
            this.advance();
        }
        
        return node;
    }

    consumeSemicolon() {
        if (this.currentToken() && this.currentToken().value === ';') {
            this.advance();
        }
    }
}

module.exports = { Parser };