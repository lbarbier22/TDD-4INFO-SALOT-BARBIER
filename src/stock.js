const {articleNotFound, articleIdMustBeANumber} = require("../src/article")

function displayReport(warehouse) {
    warehouse.forEach(article => {
        let res = article;
        if (article.quantity < 50) {
            res += " Warning : The quantity of this article is low";
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
            throw new Error("Not enough quantity in the warehouse for this article");
        }
        article.quantity -= quantity;
        if (article.quantity < 50) {
            console.log("Warning : The quantity of this article is low")
        }
    }
}

module.exports = {displayReport, displayArticle, removeQuantityArticle, addQuantityArticle};
