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
    if (typeof articleId !== "number") {
        throw new Error("ArticleId must be a number");
    }
    let article = warehouse.find(article => article.id === articleId);
    if (article == null) {
        throw new Error("Article not found");
    }
    console.log(article);
}

function addQuantityArticle(warehouse, articleId, quantity) {
    if (typeof articleId !== "number") {
        throw new Error("ArticleId must be a number");
    }
    if (typeof quantity !== "number" && quantity > 0) {
        throw new Error("Quantity must be a number");
    } else if (quantity <= 0) {
        throw new Error("Quantity must be positive and not 0");
    }

    let article = warehouse.find(article => article.id === articleId);

    if (article == null) {
        throw new Error("Article not found");
    }

    article.quantity += quantity;
}

function removeQuantityArticle(warehouse, articleId, quantity) {
    if (typeof articleId !== "number") {
        throw new Error("ArticleId must be a number");
    }
    if (typeof quantity !== "number" && quantity > 0) {
        throw new Error("Quantity must be a number");
    } else if (quantity <= 0){
        throw new Error("Quantity must be positive and not 0");
    } else {
        let article = warehouse.find(article => article.id === articleId);
        if (article == null ){
            throw new Error("Article not found");
        }
        if (quantity > article.quantity ){
            throw new Error("Not enough quantity in the warehouse");
        }
        article.quantity -= quantity;
    }
}

module.exports = {displayReport, displayArticle, removeQuantityArticle, addQuantityArticle};
