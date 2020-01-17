## A TDD Checkout System Using Mocha and Chai

I applied for a software engineer role in Pillar Technology back in December. I went through the initial interview and was
moved forward to the code kata.

They gave several kata choices, and the one that I chose was the [checkout system](https://github.com/PillarTechnology/kata-checkout-order-total).

#### Requirement - An API 

This is a straight forward API with different functions to fulfill the functionalities, as no display system is required.

### Accept a scanned item with weight, and an accurate current total
````javascript
    addItemToCart: (itemId, quantity) => {
        let currentItem = totalHelper.getProduct(itemId)
        if (!_.isNumber(quantity) || quantity < 1) {
            return false
        }
        if(currentItem) {
            let cartItem = {
                itemId,
                quantity
            }
            cart.push(cartItem)
            return true
        }
        return false
    }
````

### Remove items from an order, while correcting the current total
````javascript
    clearCart: () => {
        cart = []
    },

    removeItemFromCart: (itemId) => {
        let currentItem = totalHelper.getProduct(itemId)
        if(currentItem){
            _.remove(cart, { itemId })
            return true
        }
        return false
    }
````
### Support a markdown
````javascript
    setMarkdown: (itemId, price) => {
        let currentItem = totalHelper.getProduct(itemId)
        if(currentItem){
            currentItem.markdownPrice = price
            return true
        }
        return false
    }
````
### Support a special in the form of "Buy N items get M at %X off." For example, "Buy 1 get 1 free" or "Buy 2 get 1 half off."
````javascript
    setSpecial: (itemId, specialQuantity, totalPrice,limit)=>{
        let currentItem = totalHelper.getProduct(itemId)
        if(currentItem){
            currentItem.specialsPrice = totalPrice / specialQuantity
            currentItem.limit = limit
            currentItem.specialMode = 'N-for-X'
            return true
        }
        return false
    }
````
### Support a special in the form of "N for $X." For example, "3 for $5.00"
````javascript
    setFreeSpecial:(itemId, quantity, quantityFree, limit)=>{
        let currentItem = totalHelper.getProduct(itemId)
        if(currentItem){
            currentItem.freeQuantity = quantityFree
            currentItem.requiredQuantity = quantity
            currentItem.limit = limit
            currentItem.specialMode = 'N-with-X'
            return true
        }
        return false
    }
````
### Support "Buy N, get M of equal or lesser value for %X off" on weighted items. For example, "Buy 2 pounds of ground beef, get 1 pound half off."
````javascript
    setCombinationSpecial: (itemId, quantity, reducedPrice, reducedPriceQuantity) => {
        let currentItem = totalHelper.getProduct(itemId)
        if(currentItem) {
            currentItem.requiredQuantity = quantity
            currentItem.reducedPrice = reducedPrice
            currentItem.reducedPriceQuantity = reducedPriceQuantity
            currentItem.specialMode = 'N-with-price-X'

            return true
        }

        return false
    }
````
### Keep current total
This is the most challenge part of the kata, as each special has its own method for their total. 
````javascript
    getCartTotals: () => {
        let total = _.reduce(cart, totalHelper.getTotal, 0)
        let withoutMarkdown = _.reduce(cart, totalHelper.getMaximumTotal, 0)

        return {
            total,
            withoutMarkdown,
            savings: withoutMarkdown - total
        }
    }
````

I've created a ````totalHelper.js```` module to calculate totals for each specials:
````javascript
const getPriceNforX = (item, quantity) => {
    let { limit, specialsPrice } = item
    let itemsOverLimit = (quantity - limit) > 0 ? quantity - limit : 0
    let specialsQuantity = itemsOverLimit > 0 ? limit: quantity

    return specialsQuantity * specialsPrice + getDefaultTotal(item, itemsOverLimit)
}

const getPriceNwithX = (item, quantity) => {
    let { limit, freeQuantity, requiredQuantity } = item
    let itemsOverLimit = (quantity - limit) > 0 ? quantity - limit : 0

    let specialsQuantity = itemsOverLimit > 0 ? limit : quantity
    let total = 0
    while(specialsQuantity > 0) {

        if(specialsQuantity >= requiredQuantity) {
            total = total + getDefaultTotal(item, requiredQuantity)

            specialsQuantity = specialsQuantity - requiredQuantity - freeQuantity
        } else {
            total = total + getDefaultTotal(item, specialsQuantity)
            specialsQuantity = 0
        }
    }

    return total + getDefaultTotal(item, itemsOverLimit)
}

const getPriceNwithPriceX = (item, quantity) => {
    let { limit, reducedPrice, reducedPriceQuantity, requiredQuantity } = item
    let itemsOverLimit = (quantity - limit) > 0 ? quantity - limit : 0

    let specialsQuantity = itemsOverLimit > 0 ? limit : quantity
    let total = 0

    while(specialsQuantity > 0) {
        if(specialsQuantity >= requiredQuantity) {
            total = total + getDefaultTotal(item, requiredQuantity)

            specialsQuantity = specialsQuantity - requiredQuantity - reducedPriceQuantity

            let quantityToCharge = specialsQuantity > 0 ? reducedPriceQuantity : specialsQuantity + reducedPriceQuantity

            total = total + (quantityToCharge * reducedPrice)
        } else {
            total = total + getDefaultTotal(item, specialsQuantity)
            specialsQuantity = 0
        }
    }

    return total + getDefaultTotal(item, itemsOverLimit)
}

const getDefaultTotal = (item, quantity) => {
    let { markdownPrice, price } = item
    let itemPrice = markdownPrice < price ? markdownPrice : price
    return itemPrice * quantity
}

module.exports = {
    getTotal: (total, item) => {
        let { itemId, quantity } = item
        let currentItem = module.exports.getProduct(itemId)
        let priceMethod = module.exports.getPriceMethod(currentItem.specialMode)

        return total + priceMethod(currentItem, quantity)
    },

    getMaximumTotal: (total, item) =>{
        let {itemId, quantity} = item
        let currentItem = module.exports.getProduct(itemId)

        let { price } = currentItem
        return total + price * quantity
    },

    getProduct: (itemId) => {
        return _.find(products, { itemId })
    },

    getPriceMethod: (activeSpecial) => {
        let currentModule = module.exports
        if (activeSpecial === 'N-for-X'){
            return currentModule.getPriceNforX
        }
        if (activeSpecial === 'N-with-X'){
            return currentModule.getPriceNwithX
        }
        if (activeSpecial === 'N-with-price-X'){
            return currentModule.getPriceNwithPriceX
        }
        return currentModule.getDefaultTotal
    },

    getPriceNforX,

    getPriceNwithPriceX,

    getPriceNwithX,

    getDefaultTotal
}
````
### Each function has its own set of unit tests using ````Mocha```` and ````Chai````.

### Link
[Github](https://github.com/sufanHuang/checkout-kata)
