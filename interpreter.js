/**
 * Interpreter - Executes the parsed AST for DevLang
 * 
 * @version 1.0.0
 * @license MIT
 */

const readline = require('readline');
const { TokenTypes } = require('./tokenTypes');
const { SymbolTable } = require('./symbolTable');
const { Tokenizer } = require('./tokenizer');
const { Parser } = require('./parser');

/**
 * Interpreter - Executes the parsed AST
 */
class Interpreter {
    constructor(code, isAsync = false) {
        this.symbolTable = new SymbolTable();
        this.isAsync = isAsync;
        const tokenizer = new Tokenizer(code);
        const parser = new Parser(tokenizer.getTokens());
        this.ast = parser.parse();
        
        if (isAsync) {
            this.setupReadline();
        }
    }
    
    setupReadline() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    
    async execute() {
        try {
            await this.visit(this.ast);
        } finally {
            if (this.rl) {
                this.rl.close();
            }
        }
    }
    
    // Synchronous execution for backwards compatibility
    executeSync() {
        this.visit(this.ast);
    }

    async visit(node) {
        switch (node.type) {
            case 'Program':
            case 'block':
                for (const child of node.children) {
                    await this.visit(child);
                }
                break;
            case 'assignment':
                await this.handleAssignment(node.children);
                break;
            case 'print':
                this.handlePrint(node.children);
                break;
            case 'conditional':
                await this.handleConditional(node.children);
                break;
        }
    }

    async handleAssignment(children) {
        const name = children[0].value;
        
        if (children[1].value === 'input') {
            const expression = children[1].children[0];
            const prompt = this.evaluateExpression(expression.children);
            
            if (this.isAsync && this.rl) {
                // Async input handling
                const userInput = await this.getUserInput(prompt);
                const value = this.parseInput(userInput);
                
                if (this.symbolTable.lookup(name) === null) {
                    this.symbolTable.insert(name, typeof value, 'local', value);
                } else {
                    this.symbolTable.modify(name, value);
                }
            } else {
                // Synchronous fallback - simulate input
                console.log(`Input prompt: ${prompt}`);
                const simulatedInput = this.getSimulatedInput(prompt);
                const value = this.parseInput(simulatedInput);
                
                if (this.symbolTable.lookup(name) === null) {
                    this.symbolTable.insert(name, typeof value, 'local', value);
                } else {
                    this.symbolTable.modify(name, value);
                }
            }
            return;
        }
        
        const value = this.evaluateExpression(children[1].children);
        
        if (this.symbolTable.lookup(name) === null) {
            this.symbolTable.insert(name, typeof value, 'local', value);
        } else {
            this.symbolTable.modify(name, value);
        }
    }
    
    async getUserInput(prompt) {
        return new Promise((resolve) => {
            this.rl.question(`${prompt}: `, (answer) => {
                resolve(answer);
            });
        });
    }
    
    getSimulatedInput(prompt) {
        // For demonstration purposes, provide simulated inputs
        const simulatedInputs = {
            'Apna naam batao': 'DevLang User',
            'Apni age batao': '25',
            'Enter your name': 'John Doe',
            'Enter your age': '30'
        };
        
        return simulatedInputs[prompt] || '0';
    }
    
    parseInput(input) {
        // Try to parse as number first
        const num = parseFloat(input);
        if (!isNaN(num) && isFinite(num)) {
            return Number.isInteger(num) ? parseInt(input) : num;
        }
        // Return as string if not a number
        return input;
    }

    handlePrint(children) {
        for (const child of children) {
            if (child.type === 'expression') {
                const result = this.evaluateExpression(child.children);
                console.log(result);
                return result;
            }
        }
    }

    async handleConditional(children) {
        const conditionNode = children[0];
        const thenBlock = children[1];
        const elseBlock = children.length > 2 ? children[2] : null;
        
        const condition = this.evaluateExpression(conditionNode.children);
        
        if (condition) {
            await this.visit(thenBlock);
        } else if (elseBlock) {
            await this.visit(elseBlock.children[0]);
        }
    }

    evaluateExpression(children) {
        if (!children || children.length === 0) {
            return null;
        }
        
        // Handle single string literals
        if (children.length === 1 && children[0].type === TokenTypes.STRING_LITERAL) {
            return children[0].value;
        }
        
        // Handle single identifiers
        if (children.length === 1 && children[0].type === TokenTypes.IDENTIFIER) {
            const symbol = this.symbolTable.lookup(children[0].value);
            if (symbol === null) {
                throw new Error(`Variable '${children[0].value}' not declared`);
            }
            return symbol.value;
        }
        
        // Handle single numbers
        if (children.length === 1 && children[0].type === TokenTypes.INT_LITERAL) {
            return parseInt(children[0].value);
        }
        
        // Build expression string for complex expressions
        let expression = '';
        for (const child of children) {
            if (child.type === TokenTypes.STRING_LITERAL) {
                expression += `"${child.value}"`;
            } else if (child.type === TokenTypes.IDENTIFIER) {
                const symbol = this.symbolTable.lookup(child.value);
                if (symbol === null) {
                    throw new Error(`Variable '${child.value}' not declared`);
                }
                // Ensure numeric values are treated as numbers in expressions
                if (typeof symbol.value === 'number') {
                    expression += symbol.value.toString();
                } else if (typeof symbol.value === 'string' && !isNaN(parseFloat(symbol.value))) {
                    expression += parseFloat(symbol.value).toString();
                } else {
                    expression += `"${symbol.value}"`;
                }
            } else {
                expression += child.value;
            }
        }
        
        try {
            return eval(expression);
        } catch (error) {
            throw new Error(`Error evaluating expression: ${expression}`);
        }
    }
}

module.exports = { Interpreter };