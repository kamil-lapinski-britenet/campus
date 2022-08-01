const mailView = () => {

    const userMail = document.querySelector('#userMailId');
    if(sessionStorage.getItem('user_id') != null) {
        userMail.innerHTML = " " + sessionStorage.getItem('user_mail').toString().toUpperCase();
       
   
    }
}

mailView();