function display(warehouse) {
    warehouse.forEach(article => {
        let res = article;
        if (article.quantity < 50) {
            res += " flag";
        }
        console.log(res);
    });
}

module.exports = {display};