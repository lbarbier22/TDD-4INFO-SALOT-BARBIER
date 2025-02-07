const { display } = require("../src/stock");
const Article = require("../src/article");

const warehouse = [
    new Article(1,"table",200),
    new Article(2,"chair",400),
    new Article(3,"lamp",0),
]
describe ("When I want to display the stock of my warehouse", () => {
    test("Then it prints the report with corresponding flags", () => {
        console.log = jest.fn();
        display(warehouse);
        expect(console.log).toHaveBeenCalledTimes(warehouse.length);
        expect(console.log).toHaveBeenCalledWith(warehouse[0]);
        expect(console.log).toHaveBeenCalledWith(warehouse[1]);
        expect(console.log).toHaveBeenCalledWith(warehouse[2] + " flag");
    });
});