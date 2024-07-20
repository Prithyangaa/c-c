document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the Sign In button
    document.querySelector('.sign-in .submit').addEventListener('click', function() {
        window.location.href = 'homepage.html';
    });

    // Event listener for the Sign Up button
    document.querySelector('.sign-up .submit').addEventListener('click', function() {
        window.location.href = 'homepage.html';
    });

    // Event listener for toggling sign up / sign in
    document.querySelector('.img__btn').addEventListener('click', function() {
        document.querySelector('.cont').classList.toggle('s--signup');
    });
});
