const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3500/api/v1/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'currency': 'KWD' 
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok && data.message === "success") {
            console.log('Login successful:', data);
            localStorage.setItem('token', data.token);
            window.location.href = './index.html';
        } else {
            console.log('Login failed:', data.err || 'Unknown error');
            alert('Login failed: ' + data.err || 'Unknown error');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
});
