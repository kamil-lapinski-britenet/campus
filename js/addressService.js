const acceptAddress = () => {
    const btn = document.querySelector('#accept__address');
    const address_text = document.querySelector('#addressCart').value;
   
        console.log(address_text);
        sessionStorage.setItem('addressCart', JSON.stringify(address_text));
    return false;
}

