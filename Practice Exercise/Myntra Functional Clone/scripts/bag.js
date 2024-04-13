let bagItemObjects;
onLoad();

function onLoad(){
    loadBagItemObjects();
    displayBagItems();
    displayBagIcon();
    displayBagSummary();
}

function displayBagSummary(){
    let bagSummaryElement = document.querySelector('.bag-summary');
    let totalItem = bagItemObjects.length;
    let totalMRP = 0;
    let totalDiscount = 0;
    bagItemObjects.forEach(item=>{
        totalMRP+=item.price.original_price;
        totalDiscount+=item.price.original_price-item.price.current_price;
       })
    let finalPayment = eval(totalMRP - totalDiscount + 99);   

    bagSummaryElement.innerHTML = `
    <div class="bag-details-container">
                    <div class="price-header">PRICE DETAILS(${totalItem} Items)</div>
                    <div class="price-item">
                        <span class="price-item-tag">Total MRP</span>
                        <span class="price-item-value">Rs ${totalMRP}</span>
                    </div>
                    <div class="price-item">
                        <span class="price-item-tag">Discount on MRP</span>
                        <span class="price-item-value priceDetail-base-discount">- Rs ${totalDiscount}</span>
                    </div>
                    <div class="price-item">
                        <span class="price-item-tag">Convenience Fee</span>
                        <span class="price-item-value">Rs 99</span>
                    </div>
                    <div class="price-footer">
                        <span class="price-item-tag">Total Amount</span>
                        <span class="price-item-value">Rs ${finalPayment}</span>
                    </div>
                </div>
                <button class="btn-place-order">
                    <div class="css-xjhrni">PLACE ORDER</div>
                </button>`
}

function loadBagItemObjects(){
    bagItemObjects = bagItems.map(itemId =>{
        for(let i=0;i<items.length;i++){
            if(itemId==items[i].id){
                return items[i];
            }
        }
    })
    console.log(bagItemObjects);
}

function displayBagItems(){
    let containerElement = document.querySelector('.bag-items-container');
    let innerHTML='';
    bagItemObjects.forEach(element => {
        innerHTML+=generateItemHTML(element);
    });
    containerElement.innerHTML = innerHTML;
}

function removeFromBag(itemId){
    bagItems = bagItems.filter(bagItemId => bagItemId != itemId )
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    loadBagItemObjects();
    displayBagItems();
    displayBagIcon();
    displayBagSummary();
}

function generateItemHTML(item){
    return `<div class="bag-items-container">
                <div class="item-left-part">
                    <img class="bar-item-img" src="../${item.item_image}" alt="${item.item_alt}">
                </div>
                <div class="item-right-part">
                    <div class="company">${item.company_name}</div>
                    <div class="item-name">${item.item_name}</div>
                    <div class="price-container">
                        <span class="current-price">Rs ${item.price.current_price}</span>
                        <span class="original-price">Rs ${item.price.original_price}</span>
                        <span class="discount">(${item.price.discount}% OFF)</span>
                    </div>
                    <div class="return-period">
                        <span class="return-period-days">${item.return_period}</span> return available
                    </div>
                    <div class="delivery-details">
                        Delivered by <span>${item.delivery_date}</span>
                    </div>
                </div>
                <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
            </div>`;
}