const fs = require("fs");

function logOperation(operation, article, quantity) {
    const date = new Date().toISOString();
    const logLine = `${date} - ${operation} - Article ID: ${article.id}, Name: ${article.name}, Quantity: ${quantity}\n`;
    fs.appendFileSync("history.txt", logLine);
}

module.exports = {logOperation};
