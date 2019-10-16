const listOfProducts = [
    {"id": "0001", "name" : "Coca Cola", "price": 3},
    {"id": "0002", "name" : "Diet Coke", "price": 4},
    {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
    {"id": "0004", "name" : "Mountain Dew", "price": 6},
    {"id": "0005", "name" : "Dr Pepper", "price": 7},
    {"id": "0006", "name" : "Sprite", "price": 8},
    {"id": "0007", "name" : "Diet Pepsi", "price": 9},
    {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
    {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
    {"id": "0010", "name" : "Fanta", "price": 12}
];

function print(products) {
    return printReceipt(products);
}

module.exports = print;

function printReceipt(products) {
    if(checkBarcodes(products)) {
        return generateReceipt(products);
    }
    return null;
}

function checkBarcodes(products) {
    for(var element = 0; element < products.length; element++) {
        if(listOfProducts.filter(result => result.id == products[element]).length == 0) {   
            return false;
        }
    }
    return true;
}

function generateReceipt(products) {
    var productResults = [];
    var countBarcode = [];
    var currentBarcode = '';
    var product = '';
    var price = 0;
    var totalPrice = 0;
    var receipt = '';

    for(var element = 0; element < products.length; element++) {
        currentBarcode = products[element];
        if(countBarcode.indexOf(currentBarcode) == -1) {
            listOfProducts.forEach(element => {
                if(element.id == currentBarcode){
                    product = element.name;
                    price = element.price;
                }
            });
            productResults.push({barcode: currentBarcode, productName: product, priceValue: price, count: countBarcodeLength(products, currentBarcode)});
            countBarcode.push(currentBarcode);
        }
    }

    productResults.sort((a, b) => (a.barcode > b.barcode) ? 1 : -1)
    receipt = 'Receipts\n' + 
    '------------------------------------------------------------\n';
    for(var y = 0; y < productResults.length; y++) {
        receipt += createSpaces(productResults[y].productName, productResults[y].priceValue, productResults[y].count) + '\n';
        totalPrice += productResults[y].priceValue * productResults[y].count;
    }
    receipt += '------------------------------------------------------------\n' +
    'Price: ' + totalPrice;
    return receipt;
}

function countBarcodeLength(products, currentBarcode) {
    return products.filter(result => result == currentBarcode).length;
}

function createSpaces(productName, price, count) {
    var productLine = productName;

    for(var element = 0; element <= 31 - productName.length; element++) {
        productLine += ' ';
    }
    productLine += price;
    
    for(element = productLine.length; element < 43; element++) {
        productLine += ' ';
    }
    productLine += count;
    
    return productLine;
}