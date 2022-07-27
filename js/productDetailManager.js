const retrieveProductIdFromURI = () => {
    const query_string = window.location.search;
    const url_params = new URLSearchParams(query_string);
    const product_id = url_params.get('productId');
    if (product_id) {
        return product_id;
    }
    throw new Error('Cannot find product id in URI params.');
}

const getProduct = (productId) => {
    return new Promise( (resolve, reject) => {
        fetch(`http://localhost:8080/api/v1/product/${productId}`)
            .then( async response => {
                const product = await response.json();
                resolve(product);
            } )
            .catch( error => {
                console.log('[DEBUG] ERROR');
                console.log(JSON.stringify(error));
                reject(error);
            } );
    } );
}

const renderProduct = (product) => {
    const name = document.querySelector('#name');
    name.innerText = product.name;
    const desc = document.querySelector('#desc');
    desc.innerText = product.description;
    const price = document.querySelector('#price');
    price.innerText = `${product.price}`;
    const productImage = document.querySelector('#image');
    productImage.src =  `./img/${product.images.paths}`;
   
}

const product_id = retrieveProductIdFromURI();

getProduct(product_id)
.then( product => {
    renderProduct(product);
} )
.catch( error => {
    console.log(JSON.stringify(error));
})