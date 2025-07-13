/**
 * AST Node Class - Represents nodes in the Abstract Syntax Tree
 * 
 * @version 1.0.0
 * @license MIT
 */

/**
 * AST Node class - Represents nodes in the Abstract Syntax Tree
 */
class ASTNode {
    constructor(type, value = null) {
        this.type = type;
        this.value = value;
        this.children = [];
    }

    addChild(child) {
        this.children.push(child);
    }

    toString(indent = 0) {
        const spaces = ' '.repeat(indent);
        let result = `${spaces}AST(${this.type}, ${this.value}, [`;
        
        if (this.children.length === 0) {
            result += '])';
            return result;
        }
        
        result += '\n';
        for (const child of this.children) {
            result += ' '.repeat(indent + 4) + child.toString(indent + 4) + ',\n';
        }
        result += spaces + '])';
        return result;
    }
}

module.exports = { ASTNode };