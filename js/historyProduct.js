const getProducts = () => {
    return new Promise( (resolve, reject) => {
        fetch('http://localhost:8080/api/v1/orderProducts')
            .then( async response => {
                const products = await response.json();
                resolve(products);
            } )
            .catch( error => {
                console.log('[DEBUG] ERROR');
                console.log(JSON.stringify(error));
                reject(error);
            } );
    } );
}

const renderProducts = (products) => {
    const productsElement = document.querySelector('.orders');
    const userIdLogged = parseInt(sessionStorage.getItem('user_id'));
  
   
    if (productsElement) {
       
        products.forEach( product => {
            if(userIdLogged == product.order.userId) {
            productsElement.innerHTML += `
            <div class="historyOrder">
            <div class="order__id">orderId ${product.order.orderId}</div>
            <div class="order__date">DATA: ${product.order.orderDate}</div>
            <div class="order__status">STATUS: ${product.order.status}</div>
            <div class="p_name">${product.product.name}</div>
            <div class="p_price">${product.product.price} PLN</div>
               </div>
            `}
        } );
// <p class="product__buy" id="product_buy"> DODAJ DO KOSZYKA </p>
    }
    else{
        throw new Error('Cannot find #products.');
    }
}


getProducts()
.then( products => {
    renderProducts(products);
} )
.catch( error => {
    console.log(JSON.stringify(error));
})