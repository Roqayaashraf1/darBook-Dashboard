document.addEventListener('DOMContentLoaded', () => {
    const authorForm = document.querySelector('form');
    const authorId = new URLSearchParams(window.location.search).get('id');


    authorForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(authorForm);
        const name = formData.get('name'); 
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3500/api/v1/authors/${authorId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${token}`,
                },
                body: JSON.stringify({
                    name
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert('Author updated successfully');
            window.location.href = 'author-history.html';
        } catch (error) {
            console.error('Error updating author:', error);
            alert('Failed to update author');
        }
    });
});