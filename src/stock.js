const {articleNotFound, articleIdMustBeANumber} = require("../src/article")
const { logOperation } = require("../src/log");

function displayReport(warehouse) {
    warehouse.forEach(article => {
        let res = article;
        if (article.quantity < 50) {
            res += " flag";
        }
        console.log(res);
    });
}

function displayArticle(warehouse, articleId) {
    articleIdMustBeANumber(articleId);
    let article = warehouse.find(article => article.id === articleId);
    articleNotFound(article);
    console.log(article);
}

function addQuantityArticle(warehouse, articleId, quantity) {
    articleIdMustBeANumber(articleId);
    if (typeof quantity !== "number" && quantity > 0) {
        throw new Error("Quantity must be a number");
    } else if (quantity <= 0) {
        throw new Error("Quantity must be positive and not 0");
    }

    let article = warehouse.find(article => article.id === articleId);

    articleNotFound(article);

    article.quantity += quantity;
    try {
        logOperation("ADD", article, quantity);
    } catch (err) {
        throw new Error("The operation was successful but not logged");
    }
}

function removeQuantityArticle(warehouse, articleId, quantity) {
    articleIdMustBeANumber(articleId);
    if (typeof quantity !== "number" && quantity > 0) {
        throw new Error("Quantity must be a number");
    } else if (quantity <= 0){
        throw new Error("Quantity must be positive and not 0");
    } else {
        let article = warehouse.find(article => article.id === articleId);
        articleNotFound(article);
        if (quantity > article.quantity ){
            throw new Error("Not enough quantity in the warehouse");
        }
        article.quantity -= quantity;
        try {
            logOperation("REMOVE", article, quantity);
        } catch (err) {
            throw new Error("The operation was successful but not logged");
        }
    }
}

module.exports = {displayReport, displayArticle, removeQuantityArticle, addQuantityArticle};
