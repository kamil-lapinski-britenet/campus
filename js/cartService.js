
const createCart = async (cartPrice, userId, productCartId) => {
    const user_token = sessionStorage.getItem('user_token');
    try {
        await fetch('http://localhost:8080/api/v1/cart', {
            method: 'POST',
            headers: {
                
                'Authorization': user_token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartPrice: cartPrice,
                userId: userId,
                productCartId: productCartId
            })
        });
        return Promise.resolve();
    } catch (e) {
        return Promise.reject(e);
    }

}


const performCart = () => {
    let cartPrice = 0;
    let userId = sessionStorage.getItem("user_id");
    let productCartId = 1;

    createCart( cartPrice, userId, productCartId)
        .then( data => {

            alert('zrobione!');
        } )
        .catch( err => {
            console.log(err);
            console.log(JSON.stringify(err));
            alert('chujnia')
        });

    return false;
}


const createCartProducts = async (amount, cartId, productId) => {
    //const user_token = sessionStorage.getItem('user_token');
    try {
        await fetch('http://localhost:8080/api/v1/cartProducts', {
            method: 'POST',
            headers: {
                
               // 'Authorization': user_token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: amount,
                cartId: cartId,
                productId: productId
            })
        });
        return Promise.resolve();
    } catch (e) {
        return Promise.reject(e);
    }

}


const performCartProducts = () => {
    let cartPrice = 0;
    let userId = sessionStorage.getItem("user_id");
    let productCartId = 1;

    createCart( cartPrice, userId, productCartId)
        .then( data => {

            alert('zrobione!');
        } )
        .catch( err => {
            console.log(err);
            console.log(JSON.stringify(err));
            alert('chujnia')
        });

    return false;
}



//var productCart;





document.getElementById("product__buy").addEventListener("click", ()=> {
    let id = parseInt(retrieveProductIdFromURI());
    
    let productToAdd = {productId: id, name: document.querySelector("#name").textContent,
    price: document.querySelector("#price").textContent, amount: 1};
    if(sessionStorage.getItem('cartWithProducts')) {
        const cartWithProducts = JSON.parse(sessionStorage.getItem('cartWithProducts'));
        
        console.log("BEFORE",cartWithProducts)
        if(cartWithProducts) {
            let productList = Array.from(cartWithProducts.cartProducts);
            const i = productList.findIndex(element => element.productId === id);
            if( i > -1) {
                let temp = productList[i];
                console.log(i);
                console.log(temp);
                temp.amount += 1;
                productList[i] = temp;
            }
            else {
                productList.push(productToAdd);
            }
            cartWithProducts.cartProducts = productList;
        }
        console.log("AFTER",cartWithProducts);
    sessionStorage.setItem('cartWithProducts', JSON.stringify(cartWithProducts));
    }
    else{
        sessionStorage.setItem('cartWithProducts', JSON.stringify({
            cart: {
                total: 0
            },
            cartProducts: 
            [productToAdd]
        }));
    }
    //location.href="cart.html";

  });





 
  //document.getElementById("cart__button").addEventListener("click", );


