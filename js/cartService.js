
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
    let cartPrice = price;
    let userIdSession = parseInt(sessionStorage.getItem("user_id"));
    
    let productCartId = 0;

    createCart( cartPrice, userIdSession, productCartId)
        .then( data => {
            
            alert('stworzono zamówienie!');
            getCarts();
            performCartProducts();
            performOrder();

        } )
        .catch( err => {
            console.log(err);
            console.log(JSON.stringify(err));
            alert('chujnia')
        });
    return false;
}

const getCarts = () => {
    return new Promise( (resolve, reject) => {
        fetch('http://localhost:8080/api/v1/cart')
            .then( async response => {
                const carts = await response.json();
                resolve(carts);
                console.log(carts);
                let cartList = Array.from(carts);
                let cartId = (cartList[cartList.length-1].cartId);
                sessionStorage.setItem('cartId', cartId);
               
            } )
            .catch( error => {
                console.log(error);
                console.log(JSON.stringify(error));
                
                reject(error);
            } );
    } );
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
    
    const cart = JSON.parse(sessionStorage.getItem('cartWithProducts'));
   
  
   let cartId = parseInt(sessionStorage.getItem("cartId"));
   const alld = cart.cartProducts;
  
    alld.forEach(e => {
        createCartProducts( e.amount, cartId+1, e.productId)
        .then( data => {
          // alert('Stworzono cartProducts');
        } )
        .catch( err => {
            console.log(err);
            console.log(JSON.stringify(err));
            alert('chujnia')
        });


    })

    return false;
}



const createOrder = async (status, userId, orderProductId) => {
   
   // const user_token = sessionStorage.getItem('user_token');
    try {
        await fetch('http://localhost:8080/api/v1/order', {
            method: 'POST',
            headers: {
                
                
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: status,
                userId: userId,
                orderProductId: orderProductId
            })
        });
        return Promise.resolve();
    } catch (e) {
        return Promise.reject(e);
    }

}

const performOrder = () => {
    let status = "nowy";
    let userIdSession = parseInt(sessionStorage.getItem("user_id"));
    let orderProductId = 0;
    //let orderProductId = parseInt(sessionStorage.getItem("orderProductId"));

    createOrder( status, userIdSession, orderProductId)
        .then( data => {
            
   
            getOrders();
            performOrderProducts();
            getOrderProducts();
      
            performPutOrder();
        
        } )
        .catch( err => {
            console.log(err);
            console.log(JSON.stringify(err));
            
        });
    return false;
}

const getOrders = () => {
    return new Promise( (resolve, reject) => {
        fetch('http://localhost:8080/api/v1/order')
            .then( async response => {
                const orders = await response.json();
                resolve(orders);
                console.log(orders);
                let orderList = Array.from(orders);
                let orderId = (orderList[orderList.length-1].orderId);
                sessionStorage.setItem('orderId', orderId);
               
            } )
            .catch( error => {
                console.log(error);
                console.log(JSON.stringify(error));
                
                reject(error);
            } );
    } );
}

const createOrderProduct = async (productId, orderId) => {
   
    // const user_token = sessionStorage.getItem('user_token');
     try {
         await fetch('http://localhost:8080/api/v1/orderProducts', {
             method: 'POST',
             headers: {
                 
                 
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                productId: productId,
                 orderId: orderId
             })
         });
         return Promise.resolve();
     } catch (e) {
         return Promise.reject(e);
     }
 
 }

 const performOrderProducts = () => {
    
   let orderId = parseInt(sessionStorage.getItem("orderId"));
   const cart = JSON.parse(sessionStorage.getItem('cartWithProducts'));
   const alld = cart.cartProducts;
  
    alld.forEach(e => {
        createOrderProduct( e.productId, orderId+1)
        .then( data => {
       //     alert('Stworzono orderProduct');

        } )
        .catch( err => {
            console.log(err);
            console.log(JSON.stringify(err));
            alert('chujnia')
        });


    })

    return false;
}

const getOrderProducts = () => {
    return new Promise( (resolve, reject) => {
        fetch('http://localhost:8080/api/v1/orderProducts')
            .then( async response => {
                const orderProducts = await response.json();
                resolve(orderProducts);
                console.log(orderProducts);
                let orderProductList = Array.from(orderProducts);
                let orderProductId = (orderProductList[orderProductList.length-1].orderProductId);
                sessionStorage.setItem('orderProductId', orderProductId);
                
            } )
            .catch( error => {
                console.log(error);
                console.log(JSON.stringify(error));
                
                reject(error);
            } );
    } );
}

const putOrder = async (orderId, status, userId, orderProductId) => {
   
    // const user_token = sessionStorage.getItem('user_token');
     try {
         await fetch('http://localhost:8080/api/v1/order', {
             method: 'PUT',
             headers: {
                 
                 
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 orderId: orderId,
                 status: status,
                 userId: userId,
                 orderProductId: orderProductId
             })
         });
         return Promise.resolve();
     } catch (e) {
         return Promise.reject(e);
     }
 
 }

 const performPutOrder = () => {
    let status = "w trakcie realizacji";
    let userIdSession = parseInt(sessionStorage.getItem("user_id"));
    let orderId = parseInt(sessionStorage.getItem('orderId'+1));
    let orderProductId = parseInt(sessionStorage.getItem("orderProductId"));

    putOrder( orderId, status, userIdSession, orderProductId)
        .then( data => {
            
            //alert('stworzono putOrder!');
          
        } )
        .catch( err => {
            console.log(err);
            console.log(JSON.stringify(err));
          
        });
    return false;
}







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


