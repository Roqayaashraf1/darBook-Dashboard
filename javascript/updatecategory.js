document.addEventListener('DOMContentLoaded', () => {
    const categoryForm = document.querySelector('form');
    const categoryId = new URLSearchParams(window.location.search).get('id');
    console.log('Category ID:', categoryId)

    categoryForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(categoryForm);
        const englishname = formData.get('englishname');
        const arabicname = formData.get('arabicname');
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:3500/api/v1/categories/${categoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${token}`,
                },
                body: JSON.stringify({
                    arabicname,
                    englishname
                }),
            });

            if (!response.ok) {
                console.error('Failed request:', response.statusText);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert('Category updated successfully');
            window.location.href = 'category-history.html';
        } catch (error) {
            console.error('Error updating category:', error);
            alert('Failed to update category');
        }
    });
});