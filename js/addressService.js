const acceptAddress = () => {
    const btn = document.querySelector('#accept__address');
    const address_text = document.querySelector('#addressCart').value;
    const address_input = document.getElementById('addressCart');
        console.log(address_text);
        alert("Zatwierdzono adres wysyłki!");
        sessionStorage.setItem('addressCart', JSON.stringify(address_text));
        address_input.setAttribute('readonly', true);
        address_input.style.backgroundColor = "#d7d7d7";
    return false;
}

