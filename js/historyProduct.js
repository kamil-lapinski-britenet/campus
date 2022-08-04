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
   // const productsElement = document.querySelector('.orders');
   
    // let orderproductsMap = new Map();
    // let productsAll = Array.from(products);
   
    // productsAll.forEach(product => {
    //     if(userIdLogged == product.order.userId) {
    //         if(orderproductsMap.has(product.order.orderId)) {
    //         let orderproduct = orderproductsMap.get(product.order.orderId);
    //         orderproductsMap.set(product.order.orderId, [orderproduct, product.product]);
            
    //     }
    //     else {
    //         orderproductsMap.set(product.order.orderId, product.product);
    //     }

        
        
    //     }

       
    // });
    const userIdLogged = parseInt(sessionStorage.getItem('user_id'));
    let tempMap = new Map();
    products.forEach(product => {
        // console.warn(orderproduct.product);
        if(userIdLogged == product.order.userId) {
       if(tempMap.has(product.orderId)) {
            tempMap.get(product.orderId).push(product.product);
       }
       else {
        // console.log("NEW",orderproduct.orderId, orderproduct.product);
        tempMap.set(product.orderId, [product.product]);
       }}
    });

    

console.log(tempMap);
console.log(tempMap.get(8));

   //console.log(orderproductsMap);

//    products.forEach( product => {
//     if(userIdLogged == product.order.userId) {
//         productsElement.innerHTML += `
//         <div class="historyOrder">
//         <div class="order__id">orderId ${product.order.orderId}</div>
//         <div class="order__date">DATA: ${product.order.orderDate}</div>
//         <div class="order__status">STATUS: ${product.order.status}</div>
//         <div class="p_name">${product.product.name}</div>
//         <div class="p_price">${product.product.price} PLN</div>
//            </div>
//         `
//      }
   
//  })   

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const renders = (tempMap, orderId, productsElement) => {
    let orderProducts = tempMap.get(orderId);
    if(Array.isArray(orderProducts)){
       
        orderProducts = Array.from(orderProducts);
      
        orderProducts.forEach(orderProduct => {
         //   if(userIdLogged == orderProduct.order.userId) {
          
                productsElement.innerHTML += `
                <div class="historyOrder">
               
                <div class="p_name">${orderProduct.name}</div>
                <div class="p_price">${orderProduct.price} PLN</div>
                   </div>
                `
         //    }
        })
   }
   else {
    productsElement.innerHTML += `
                <div class="historyOrder">
               
                <div class="p_name">${orderProducts.name}</div>
                <div class="p_price">${orderProducts.price} PLN</div>
                   </div>
                `
   } 
}

const renderOrder = (tempMap, products) => {
    const productsElement = document.querySelector('.orders');
    if(productsElement) {
        products.forEach( product => {
            if(userIdLogged == product.order.userId) {
            productsElement.innerHTML += `
            <div class= "order__id" id="order${product.order.orderId}">
                <h3 class="order__date"> DATA ZAMÓWIENIA: ${[product.order.orderDate]}</h3>
                <h3 class="order__date"> NUMER ZAMÓWIENIA: ${[product.order.orderId]}</h3>
                <h3 class="order__date"> STATUS ZAMÓWIENIA: ${[product.order.status]}</h3>
            </div>
            ` ;
            const orderProduct = document.querySelector(`#order${product.order.orderId}`);
            
        renders(tempMap, product.order.orderId, orderProduct);
            
            }
        })
    }
    }



renderOrder(tempMap, products)
}




getProducts()
.then( products => {

    renderProducts(products);
  
} )
.catch( error => {
    console.log(JSON.stringify(error));
})