
  const renderCartProducts = () => {
    const productName = document.querySelector('.product__name');
    const productAmount = document.querySelector('.product__amount');
    const productInfoCart = document.querySelector('.product__info__cart');
        const cart = sessionStorage.getItem('cartWithProducts');
        const allCartProducts = JSON.parse(cart);
        const alld = allCartProducts.cartProducts;
        
        alld.forEach(element => {
            productInfoCart.innerHTML += `
           
            <div class="renderedCartProducts">
       
            <div class=".product__name">${JSON.stringify(element.name)}</div>
      
            <div class=".product__amount">${JSON.stringify(element.amount)}</div>
            </div>
            `;


            //productName.innerHTML += ;
            //productAmount.innerHTML += JSON.stringify(element.amount);
        });
       
        console.log(allCartProducts.cartProducts)
      
}

renderCartProducts();