const login = async (mail, password) => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/authentication/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mail: mail,
                password: password
            })
        });

        const auth_data = await response.json();
        const user_id = auth_data.userId;
        const user_token = auth_data.userToken;
        sessionStorage.setItem('user_id', user_id);
        sessionStorage.setItem('user_token', user_token);
        

        const loggedUser = document.querySelector("#logged__user");
        loggedUser.innerHTML = sessionStorage.getItem('user_id');

        return Promise.resolve();

    } catch (e) {
        return Promise.reject(e);
    }
}

const register = async (name, lastName, mail, address, password, telephone) => {
    try {
        const responsee = await fetch('http://localhost:8080/api/v1/authentication/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                lastName: lastName,
                mail: mail,
                address: address,
                password: password,
                telephone: telephone
            })
        });

     
      

        return Promise.resolve();

    } catch (e) {
        return Promise.reject(e);
    }
}



const isLoggedIn = () => {
    return sessionStorage.getItem('user_id') != null;
}


const performLogin = () => {
    const mail = document.querySelector('#mail').value;
    const password = document.querySelector('#password').value;

    console.log(mail);
    console.log(password);

    login(mail, password)
        .then( data => {
            //TODO zalogowano!
            window.location.href="index.html";    
            location.reload();
            alert('Zalogowano!');
            isLoggedIn();
        } )
        .catch( err => {
            console.log('Error');
            console.log(JSON.stringify(err));
        });

    return false;
}

const performRegister = () => {

    const name = document.querySelector('#name').value;
    const lastName = document.querySelector('#lastName').value;
    const mail = document.querySelector('#mail').value;
    const address = document.querySelector('#address').value;
    const password = document.querySelector('#password').value;
    const telephone = document.querySelector('#telephone').value;
    
    console.log(mail);
    console.log(password);

    register(name, lastName, mail, address, password, telephone)
        .then( data => {
            //TODO zalogowano!
            window.location.href="index.html";    
            alert('zarejestrowano!');
        } )
        .catch( err => {
            console.log('Error');
            console.log(JSON.stringify(err));
        });

    return false;
}





const hideCarts = () => {
    if(sessionStorage.getItem('user_id') == null) {
        const hideProducts = document.querySelector("#carts");
        const hideLogout = document.querySelector("#logout");
        hideLogout.classList.add("hiding");
        hideProducts.classList.add("hiding");
      
        
    }
    else {
        console.log("eloelo");
    }

}

const hideRegister = () => {
    if(sessionStorage.getItem('user_id') != null) {
        const hideProducts = document.querySelector("#register");
        hideProducts.classList.add("hiding");
        
       
    }
    else {
        console.log("eloelo");
    }

}

const logout = () => {
    window.sessionStorage.clear();
    window.location.href="index.html";    

}

hideCarts();


hideRegister();



