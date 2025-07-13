/**
 * Symbol Table - Manages variable storage and lookup for DevLang
 * 
 * @version 1.0.0
 * @license MIT
 */

/**
 * Symbol Table Entry - Represents a variable in the symbol table
 */
class SymbolEntry {
    constructor(name, type, scope, value) {
        this.name = name;
        this.type = type;
        this.scope = scope;
        this.value = value;
    }
}

/**
 * Symbol Table - Manages variable storage and lookup
 */
class SymbolTable {
    constructor() {
        this.symbols = [];
    }

    insert(name, type, scope, value) {
        this.symbols.push(new SymbolEntry(name, type, scope, value));
    }

    lookup(name) {
        return this.symbols.find(entry => entry.name === name) || null;
    }

    modify(name, value) {
        const entry = this.lookup(name);
        if (entry) {
            entry.value = value;
            return true;
        }
        return false;
    }
}

module.exports = { SymbolTable, SymbolEntry };