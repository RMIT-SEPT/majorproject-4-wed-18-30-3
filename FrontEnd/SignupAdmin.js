

function accountCreated() {
    var username = document.getElementById(username).inn;
    var password = document.getElementById(password);
    var phone = document.getElementById(phone);
    var address = document.getElementById(address);
    var firstName = document.getElementById(firstName);
    var lastName = document.getElementById(lastName);
    if(username == null){
        alert("username invalid!");
        /* TO DO if username is taken pop up with username taken*/
        exit();
    }
    else if(password == null){
        alert("please create a password!");
        exit();
    }
    else if(phone == null || this.phone.length !== 10){
        alert("please add a valid phone number!");
        exit();
    }
    else if(address == null){
        alert("please add an address!");
        exit();
    }

    else if(firstName == null){
        alert("please add a first name!");
        exit();
    }
    else if(lastName == null){
        alert("please add a last name!");
        exit();
    }
    else {
        /*TO DO send all info to backend*/
        location.replace("LogIn UI.html")
    }
}