
  const renderCartProducts = () => {
    const productName = document.querySelector('.product__name');
    const productAmount = document.querySelector('.product__amount');
    const productInfoCart = document.querySelector('.product__info__cart');
        const cart = sessionStorage.getItem('cartWithProducts');
        const allCartProducts = JSON.parse(cart);
        const alld = allCartProducts.cartProducts;
        
        alld.forEach(element => {
            productInfoCart.innerHTML += `
           
            <div class="renderedCartProducts ${element.productId}">
       
            <div class=".product__name">${(element.name).toString()}</div>
          
            
            <div class="amount">${(element.amount).toString()}</div>
            <button onclick="deleteProductFromCart(${parseInt(element.productId)})" class="deleteProduct ${element.productId}" value="${element.productId}" type="button">X</button>
            </div>
            `;

            console.log(element.productId);
            
        });
       
        console.log(allCartProducts.cartProducts);
   
      
}






const deleteProductFromCart = (id) => {
    const cartWithProducts = JSON.parse(sessionStorage.getItem('cartWithProducts'));
    //const allCartProducts = JSON.parse(cart);
   // const alld = allCartProducts.cartProducts;
   let productList = Array.from(cartWithProducts.cartProducts);
   const i = productList.findIndex(element => element.productId === id);
    if(cartWithProducts) {
        
            if( i > -1) {
                let temp = productList[i];
                if(temp.amount > 1 ) {
                    temp.amount -=1;
                    productList[i] = temp;
                }
                
                else if(temp.amount == 1){
                productList.splice(i);
                console.log(productList);
            }
            }

            else {
                productList.splice(i);
            }
        }
            cartWithProducts.cartProducts = productList;
            sessionStorage.setItem('cartWithProducts', JSON.stringify(cartWithProducts));
            
            console.log(cartWithProducts);
     location.reload();


  renderCartProducts();

}

// const cart_btn = document.querySelectorAll('.deleteProduct');

// cart_btn.forEach(btn => {
//   btn.addEventListener('click', (e) => {
//       console.log(e.target.id);
//       deleteProductFromCart(parseInt(e.target.id));
//   })
// });


renderCartProducts();


