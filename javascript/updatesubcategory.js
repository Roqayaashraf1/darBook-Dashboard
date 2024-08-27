document.addEventListener('DOMContentLoaded', () => {
    const subcategoryForm = document.querySelector('form');
    const subcategoryId = new URLSearchParams(window.location.search).get('id');
    console.log('subcategory ID:', subcategoryId)

    subcategoryForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(subcategoryForm);
        const arabicname = formData.get('arabicname');
        const englishname = formData.get('englishname');
        

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:3500/api/v1/subcategory/${subcategoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${token}`,
                },
                body: JSON.stringify({
                    englishname,
                    arabicname

                }),
            });

            if (!response.ok) {
                console.error('Failed request:', response.statusText);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert('subcategory updated successfully');
            window.location.href = 'subcategory-history.html';
        } catch (error) {
            console.error('Error updating subcategory:', error);
            alert('Failed to update subcategory');
        }
    });
});