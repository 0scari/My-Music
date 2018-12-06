window.fbAsyncInit = function() {
    // FB JavaScript SDK configuration and setup
    FB.init({
        appId      : '515565722293003', // FB App ID
        cookie     : true,  // enable cookies to allow the server to access the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.8
    });

    // Check whether the user already logged in
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            //display user data
            getFbUserData();
        }
    });
};
// Load the JavaScript SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$('document').ready(function(){
    $('#facebookLogin').click(() => {
        fbLogin()
    })
    $('#linkedinLogin').click(() => {
        $.post('/enter', {
            uuid: '2345867362108488',
            first_name: 'userData.first_name',
            last_name: 'userData.last_name',
            email: 'userData.email'
        }).then(
            () => location.reload()
        )
    })
});


// Facebook login with JavaScript SDK
function fbLogin() {
    FB.login(function (response) {
        if (response.authResponse) {
            // Get and display the user profile data
            getFbUserData();
        } else {
            document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
        }
    }, {scope: 'email'});
}

// Save user data to the database
function saveUserData(userData){
    const data = {
        uuid: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email
    }
    $.post('/enter', data).then(
        () => location.reload()
    )
}

function getFbUserData(){
    FB.api('/me', {locale: 'en_UK', fields: 'id,first_name,last_name,email'},
        (response) => {
            saveUserData(response);
        })
}

// Logout from facebook
function fbLogout() {
    FB.logout();
}


