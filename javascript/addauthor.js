document.addEventListener('DOMContentLoaded', () => {
    const addAuthorForm = document.getElementById('add-author-form');

    addAuthorForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.querySelector('input[name="name"]').value;
        const token = localStorage.getItem('token'); 
        
        try {
            const response = await fetch('http://localhost:3500/api/v1/authors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${token}`
                },
                body: JSON.stringify({
                    name: name
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Author added successfully:', data);
                alert('Author added successfully!');
                addAuthorForm.reset();
            } else {
                console.log('Failed to add author:', data.message || 'Unknown error');
                alert('Failed to add author: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error during author creation:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
