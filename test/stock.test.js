const { displayReport, displayArticle } = require("../src/stock");
const Article = require("../src/article");

const warehouse = [
    new Article(1,"table",200),
    new Article(2,"chair",400),
    new Article(3,"lamp",0),
]



describe ("When I want to display the stock of my warehouse", () => {
    test("Then it prints the report with corresponding flags", () => {
        console.log = jest.fn();
        displayReport(warehouse);
        expect(console.log).toHaveBeenCalledTimes(warehouse.length);
        expect(console.log).toHaveBeenCalledWith(warehouse[0]);
        expect(console.log).toHaveBeenCalledWith(warehouse[1]);
        expect(console.log).toHaveBeenCalledWith(warehouse[2] + " flag");
    });
});

describe ("When I want to display the stock of on of my article", () => {

    beforeEach(() => {
        console.log = jest.fn();
    });

    test("With an articleId of an article that exist, Then it prints the details", () => {
        displayArticle(warehouse, 2);
        expect(console.log).toHaveBeenCalledWith(warehouse[1]);
    });

    test("With not an number, Then it returns an error", () => {

        expect(() => displayArticle(warehouse, "2")).toThrow("ArticleId must be a number");
    });

    test("With an articleId of an article that doesn't exist, Then it returns an error", () => {
        expect(() => displayArticle(warehouse, 4)).toThrow("Article not found");
    });
});
