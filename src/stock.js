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

module.exports = {displayReport, displayArticle};
