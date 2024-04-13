let bagItems;
onLoad();

function onLoad(){
    let bagItemStr = localStorage.getItem('bagItems'); // To persist the data in localsotrage even if we refresh the page
    bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];  // This we have seen in Truthy and Falsy
    displayItemsOnHomePage();
    displayBagIcon();
}

function addToBag(itemId){
   bagItems.push(itemId);
   localStorage.setItem('bagItems',JSON.stringify(bagItems));
   displayBagIcon();
}

function displayBagIcon(){
    let bagItemCount = document.querySelector('.bag-item-count');
    if(bagItems.length>0){
        bagItemCount.style.visibility = 'visible';  
        bagItemCount.innerText = bagItems.length;
    }
    else{
        bagItemCount.style.visibility = 'hidden';   
    }
}

function displayItemsOnHomePage(){
    let itemsContainerElement = document.querySelector('.items-container');
    let innerHtml = '';

    items.forEach((item)=>{
    innerHtml+= `
        <div class="item-container">
            <a href="#"><img class="item-image" src=${item.item_image} alt= ${item.image_alt}></a>
            <div class="rating">
                ${item.rating.stars} ⭐ | ${item.rating.noOfReview}k
            </div>
            <div class="company-name">${item.company_name}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price">
                <span class="current-price">Rs ${item.price.current_price}</span>
                <span class="original-price" ><s>Rs ${item.price.original_price}</s></span>
                <span class="discount">(${item.price.discount}% OFF)</span>
            </div>
            <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
        </div>
    `
    })
    itemsContainerElement.innerHTML = innerHtml;
}

