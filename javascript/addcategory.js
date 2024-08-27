document.addEventListener('DOMContentLoaded', () => {
    const addCategoryForm = document.getElementById('add-category-form');

    addCategoryForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const englishname = document.querySelector('input[name="englishname"]').value;
        const arabicname = document.querySelector('input[name="arabicname"]').value;
        const token = localStorage.getItem('token');
     

        try {
            const response = await fetch('http://localhost:3500/api/v1/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${token}`
                },
                body: JSON.stringify({
                    englishname: englishname,
                    arabicname: arabicname
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('category added successfully:', data);
                alert('category added successfully!');
                addCategoryForm.reset();
            } else {
                console.log('Failed to add category:', data.message || 'Unknown error');
                alert('Failed to add category: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error during category creation:', error);
            alert('An error occurred. Please try again.');
        }
    });
});