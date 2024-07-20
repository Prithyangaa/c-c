document.querySelector('.img__btn').addEventListener('click', function () {
    document.querySelector('.cont').classList.toggle('s--signup');
});

function toggleForm() {
    document.querySelector('.cont').classList.toggle('s--signup');
}

async function signUp() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const phone = document.getElementById('signup-phone').value;
    const country = document.getElementById('signup-country').value;
    const occupation = document.getElementById('signup-occupation').value;
    const universityCompany = document.getElementById('signup-university-company').value;
    const co2Credits = document.getElementById('signup-co2-credits').value;

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, email, password, phone, country, occupation, universityCompany, co2Credits
        })
    });

    const data = await response.json();

    if (data.success) {
        alert('Registration successful!');
        toggleForm();
    } else {
        alert('Registration failed: ' + data.message);
    }
}

async function signIn() {
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
        alert('Login successful!');
        window.location.href = '/homepage'; // Redirect to homepage
    } else {
        alert('Login failed: ' + data.message);
    }
}
