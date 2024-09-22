function submitForm() {
    console.log("submitForm function called");
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    console.log("Name:", name, "Password:", password);
    if (name === 'Daksh' && password === 'Daksh@215shah') {
        console.log("Credentials correct, attempting to redirect");
        try {
            window.location.replace('task1.html');
            console.log("Redirection attempted");
        } 
        catch (error) {
            console.error("Error during redirection:", error);
        }
        setTimeout(function() {
            console.log("Fallback: manually changing location");
            window.location.href = 'task1.html';
        }, 1000);
    } else {
        console.log("Invalid credentials");
        alert('Invalid credentials. Please try again.');
    }
}
console.log("portfolio.js loaded successfully");
function openImage() {
    console.log("Image is clicked");
    window.open('../img/profilepic.jpg','_blank');
}
function signout(){
    console.log("Signout button clicked");
    window.location.href = 'portfolio.html';
    alert('You have been successfully signed out');
}
document.getElementById('loginform').addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
        event.preventDefault();
        submitForm();
    }
});
function togglePassword() {
    var passwordInput = document.getElementById('password');
    var showPasswordCheckbox = document.getElementById('showPassword');
    if (showPasswordCheckbox.checked) {
        passwordInput.type = 'text';
    } 
    else {
        passwordInput.type = 'password';
    }
}
document.getElementById('showPassword').addEventListener('change', togglePassword);