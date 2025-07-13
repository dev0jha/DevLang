/**
 * Token Class - Represents a lexical token in DevLang
 * 
 * @version 1.0.0
 * @license MIT
 */

/**
 * Token class - Represents a lexical token
 */
class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }

    toString() {
        return `Token(${this.type}, '${this.value}')`;
    }
}

module.exports = { Token };