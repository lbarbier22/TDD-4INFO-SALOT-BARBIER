const { displayReport, displayArticle, addQuantityArticle, removeQuantityArticle } = require("../src/stock");
const {Article} = require("../src/article");
const fs = require("fs");

const warehouse = [
    new Article(1,"table",200),
    new Article(2,"chair",400),
    new Article(3,"lamp",0),
    new Article(4,"carpet",200)
]

beforeEach(() => {
    jest.restoreAllMocks();
    console.log = jest.fn();
});


describe ("When I want to display the stock of my warehouse", () => {
    test("Then it prints the report with corresponding flags", () => {
        displayReport(warehouse);
        expect(console.log).toHaveBeenCalledTimes(warehouse.length);
        expect(console.log).toHaveBeenCalledWith(warehouse[0]);
        expect(console.log).toHaveBeenCalledWith(warehouse[1]);
        expect(console.log).toHaveBeenCalledWith(warehouse[2] + " Warning : The quantity of this article is low");
    });

    test("And the console not working, then return 'Console not working'", () => {
        console.log = jest.fn(() => {
            throw new Error("Console not working");
        });

        expect(() => displayReport(warehouse)).toThrow("Console not working");
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
        expect(() => displayArticle(warehouse, 666)).toThrow("Article not found");
    });

    test("And the console not working, then return 'Console not working'", () => {
        console.log = jest.fn(() => {
            throw new Error("Console not working");
        });

        expect(() => displayReport(warehouse)).toThrow("Console not working");
    });
});

describe ("When I want to add some quantities to one of my article", () => {
    test("With an articleId of an article that exist and a quantity coherent and positive, Then it add it to the actual quantity", () => {
        const articleMock = new Article(3,"lamp",100);

        addQuantityArticle(warehouse, 3, 100);
        expect(warehouse[2]).toEqual(articleMock);
    });

    test("With an articleId of an article that exist and a quantity incoherent, Then it should return an error", () => {
        expect(() => addQuantityArticle(warehouse, 3, -100)).toThrow("Quantity must be positive and not 0");
    });

    test("With an articleId that's not an number, Then it should return an error", () => {
        expect(() => addQuantityArticle(warehouse, "3", -100)).toThrow("ArticleId must be a number");
    });

    test("With a quantity that's not an number, Then it should return an error", () => {
        expect(() => addQuantityArticle(warehouse, 3, "100")).toThrow("Quantity must be a number");
    });

    test("With an articleId of an article that doesn't exist, Then it should return an error", () => {
        expect(() => addQuantityArticle(warehouse, 666, 100)).toThrow("Article not found");
    });

    test("When the logging fails during addition, then it returns an alert 'The operation was successful but not logged'", () => {
        jest.spyOn(fs, "appendFileSync").mockImplementation(() => {
            throw new Error("Simulated logging failure");
        });

        expect(() => addQuantityArticle(warehouse, 1, 50)).toThrow("The operation was successful but not logged");
        expect(warehouse[0].quantity).toBe(250);
    });
});

describe ("When I want to remove quantity of my article", () => {
    test("With an articleId of an article that exist and a quantity that is coherent Then it removes the quantity from the article", () => {
        const articleMock = new Article(2,"chair",350);

        removeQuantityArticle(warehouse, 2, 50);
        expect(warehouse[1]).toEqual(articleMock);
    });

    test("With an articleId of an article that exist and a quantity that is coherent Then it removes the quantity from the article", () => {
        removeQuantityArticle(warehouse, 2, 320);
        expect(console.log).toHaveBeenCalledWith("Warning : The quantity of this article is low");
    });

    test("With an articleId of an article that exist and a quantity that is negative Then it returns an error", () => {
        expect(() => removeQuantityArticle(warehouse, 2, -20)).toThrow("Quantity must be positive and not 0");
    });

    test("With an articleId of an article that exist and a quantity that is not a number Then it returns an error", () => {
        expect(() => removeQuantityArticle(warehouse, 2, "2")).toThrow("Quantity must be a number");
    });

    test("With an articleId of an article that exist and a quantity that is coherent but there is not enough stock in the warehouse Then it returns an error", () => {
        expect(() => removeQuantityArticle(warehouse, 2, 500)).toThrow("Not enough quantity in the warehouse for this article");
    });

    test("With an articleId that is not a number and a quantity that is coherent Then it returns an error", () => {
        expect(() => removeQuantityArticle(warehouse, "10", 100)).toThrow("ArticleId must be a number");
    });

    test("With an articleId of an article that does not exist and a quantity that is coherent Then it returns an error", () => {
        expect(() => removeQuantityArticle(warehouse, 10, 100)).toThrow("Article not found");
    });

    test("When the logging fails during removal, then it returns an alert 'The operation was successful but not logged'", () => {
        jest.spyOn(fs, "appendFileSync").mockImplementation(() => {
            throw new Error("Simulated logging failure");
        });

        expect(() => removeQuantityArticle(warehouse, 4, 50)).toThrow("The operation was successful but not logged");
        expect(warehouse[3].quantity).toBe(150);
    });
});
