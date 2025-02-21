class Article{
    constructor(id, name, quantity){
        this.id = id;
        this.name = name;
        this.quantity = quantity;
    }
}

function articleIdMustBeANumber(articleId){
    if (typeof articleId !== "number") {
        throw new Error("ArticleId must be a number");
    }
}

function articleNotFound(article){
    if (article == null ){
        throw new Error("Article not found");
    }
}

module.exports = {Article, articleIdMustBeANumber, articleNotFound};