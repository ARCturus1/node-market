exports.Product = class Product {
    constructor(name, description = null, imageUrl = null, cost = 0){
        this.name = name, 
        this.description = description;
        this.imageUrl = imageUrl;
        this.cost = cost;
    }
}