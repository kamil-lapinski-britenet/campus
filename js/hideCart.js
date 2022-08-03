const hideCart = () => {
    if(sessionStorage.getItem('user_id') == null) {
        const hideCarts = document.querySelector(".content_detail");
        hideCarts.classList.add("hiding");

      
        
    }
    else {
        console.log("eloelo");
    }

}

window.addEventListener ("load", hideCart());

