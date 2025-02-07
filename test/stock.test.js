const { displayReport, displayArticle, removeQuantityArticle } = require("../src/stock");
const Article = require("../src/article");

const warehouse = [
    new Article(1,"table",200),
    new Article(2,"chair",400),
    new Article(3,"lamp",0),
]

beforeEach(() => {
    console.log = jest.fn();
});


describe ("When I want to display the stock of my warehouse", () => {
    test("Then it prints the report with corresponding flags", () => {
        displayReport(warehouse);
        expect(console.log).toHaveBeenCalledTimes(warehouse.length);
        expect(console.log).toHaveBeenCalledWith(warehouse[0]);
        expect(console.log).toHaveBeenCalledWith(warehouse[1]);
        expect(console.log).toHaveBeenCalledWith(warehouse[2] + " flag");
    });
});

describe ("When I want to display the stock of my article", () => {
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

describe ("When I want to remove quantity of my article", () => {
    test("With an articleId of an article that exist and a quantity that is coherent Then it removes the quantity from the article", () => {
        const expectedArticle = new Article(2,"chair",350);
        removeQuantityArticle(warehouse, 2, 50);
        expect(warehouse[1]).toEqual(expectedArticle);
    });

    test("With an articleId of an article that exist and a quantity that is negative Then it returns an error", () => {
        expect(() => removeQuantityArticle(warehouse, 2, -20)).toThrow("Quantity must be positive and not 0");
    });

    test("With an articleId of an article that exist and a quantity that is not a number Then it returns an error", () => {
        expect(() => removeQuantityArticle(warehouse, 2, "2")).toThrow("Quantity must be a number");
    });

    test("With an articleId of an article that exist and a quantity that is coherent but there is not enough stock in the warehouse Then it returns an error", () => {
        expect(() => removeQuantityArticle(warehouse, 2, 500)).toThrow("Not enough quantity in the warehouse");
    });

    test("With an articleId that is not a number and a quantity that is coherent Then it returns an error", () => {
        expect(() => removeQuantityArticle(warehouse, "10", 100)).toThrow("ArticleId must be a number");
    });
});
