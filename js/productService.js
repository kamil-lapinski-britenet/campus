const getProducts = () => {
    return new Promise( (resolve, reject) => {
        fetch('http://localhost:8080/api/v1/product')
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
    const productsElement = document.querySelector('#products');
    if (productsElement) {

        products.forEach( product => {
            productsElement.innerHTML += `
            
                <div class="product" id="product_id">
                <a href="product_details.html?productId=${product.productId}">
                    <img class="product__img" src="img/${product.images.paths}" alt="woman"/> </a>
                    <div class="product__info">
                        <h3> ${product.name} </h3>
                        <p> ${product.description} </p>
                        <div class="product__actions">
                            <p class="product__price"> ${product.price} PLN </p>
                            <p class="product__buy"> KUP </p>
                        </div>
                    </div>
                   
                </div>
               
            `
        } );

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