document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#example1 tbody');
    const btnEn = document.querySelector('#btn-en');
    const btnAr = document.querySelector('#btn-ar');
    let selectedLanguage = 'ar';
    const token = localStorage.getItem('token');
    btnEn.addEventListener('click', () => {
        selectedLanguage = 'en';
        fetchCategories(selectedLanguage);
    });

    btnAr.addEventListener('click', () => {
        selectedLanguage = 'ar';
        fetchCategories(selectedLanguage);
    });

    async function fetchCategories(language) {
        try {
            const response = await fetch('http://localhost:3500/api/v1/categories', {
                headers: {
                    'accept-language': language,
                    'currency': "KWD"
                }
            });

            const data = await response.json();

            if (data.message === "success") {
                populateTable(data.result);
            } else {
                console.error('Failed to fetch categories:', data.message);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    function populateTable(categories) {
        tableBody.innerHTML = '';
        categories.forEach(category => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${category.name}</td>
                
                     <td><a href="edit-category.html ?id=${category._id}"  class="btn btn-info"><i class="fa fa-edit"></i></a></td>
                 <button type="button" class="btn btn-danger mt-3" data-category-id="${category._id}">Delete category</button>
            `;

            tableBody.appendChild(row);
        });

        tableBody.querySelectorAll('.btn-danger').forEach(button => {
            button.addEventListener('click', async (event) => {
                const categoryId = event.target.getAttribute('data-category-id');
                if (confirm('Are you sure you want to delete this category?')) {
                    await deleteCategory(categoryId);
                }
            });
        });
    }

    async function deleteCategory(id) {
        try {
            const response = await fetch(`http://localhost:3500/api/v1/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${token}`

                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete category');
            }

            alert('category deleted successfully');
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Failed to delete category. Please try again.');
        }
    }

    fetchCategories(selectedLanguage);
});