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
    throw new Error("not implemented");
}

module.exports = {displayReport, displayArticle};
