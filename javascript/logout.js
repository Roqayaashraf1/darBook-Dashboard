document.getElementById('logoutLink').addEventListener('click', async function(event) {
    event.preventDefault(); 
    const token = localStorage.getItem('token'); 

    if (!token) {
        alert('You are not logged in.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3500/api/v1/auth/logout', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'token': `${token}`,
                'currency':'KWD'
            }
        });

        const result = await response.json();

        if (response.ok) {
            // Successfully logged out
            alert(result.message);
            localStorage.removeItem('token');
            window.location.href = 'login.html'; 
        } else {
            alert(result.message || 'Logout failed. Please try again.');
        }
    } catch (error) {
        console.error('Error logging out:', error);
        alert('An error occurred. Please try again.');
    }
});