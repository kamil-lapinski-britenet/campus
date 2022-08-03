const hideItems = () => {
    if(sessionStorage.getItem('user_id') == null) {
       // const hideProducts = document.querySelector("#products");
       // hideProducts.classList.add("hiding");
        const linkNotLog = document.querySelector("#single_product");
        linkNotLog.classList.add("hiding");
      
        
    }
    else {
        console.log("eloelo");
    }

}

hideItems();


    
