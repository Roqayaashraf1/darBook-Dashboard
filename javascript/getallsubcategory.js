document.addEventListener('DOMContentLoaded', () => {
    const subcategoryTableBody = document.getElementById('subcategoryTableBody');
    const btnEn = document.querySelector('#btn-en');
    const btnAr = document.querySelector('#btn-ar');
    let selectedLanguage = 'arabic';
    const token = localStorage.getItem('token');

    btnEn.addEventListener('click', () => {
        selectedLanguage = 'english';
        fetchSubcategory(selectedLanguage);
    });

    btnAr.addEventListener('click', () => {
        selectedLanguage = 'arabic';
        fetchSubcategory(selectedLanguage);
    });

    async function fetchSubcategory(language) {
        try {
            const response = await fetch('http://localhost:3500/api/v1/subcategory', {
                headers: {
                    'language': language,
                    'currency': "KWD"
                }
            });

            const data = await response.json();

            if (data.message === "success") {
                populateTable(data.result, language);
                console.log(data.result, language);
            } else {
                console.error('Failed to fetch subcategory:', data.message);
            }
        } catch (error) {
            console.error('Error fetching subcategory:', error);
        }
    }

    function populateTable(subcategories, language) {
        subcategoryTableBody.innerHTML = '';
        console.log('Fetching with language:', language);

        subcategories.forEach(subcategory => {
            const category = subcategory.category;
            let categoryDetails = '';

            if (category) {
                if (language === 'english') {
                    categoryDetails = `
                        <td>${category.englishname || 'N/A'}</td>
                    `;
                } else {
                    categoryDetails = `
                        <td>${category.arabicname || 'N/A'}</td>
                    `;
                }
            } else {
                categoryDetails = '<td colspan="3">N/A</td>';
            }

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${subcategory.name}</td>
                ${categoryDetails}
                  <td><a href="edit-subcategory.html?id=${subcategory._id}" class="btn btn-info"><i class="fa fa-edit"></i></a></td>
                   <button type="button" class="btn btn-danger mt-3" data-id="${subcategory._id}">Delete Subcategory</button>
            `;
            subcategoryTableBody.appendChild(row);
        });

        document.querySelectorAll('.btn-danger').forEach(button => {
            button.addEventListener('click', async (event) => {
                const subcategoryId = event.target.getAttribute('data-id');
                try {
                    const response = await fetch(`http://localhost:3500/api/v1/subcategory/${subcategoryId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'token': `${token}`
                        }
                    });

                    const data = await response.json();

                    if (data.message === "success") {
                        event.target.closest('tr').remove();
                        console.log('Subcategory deleted:', data.result);
                    } else {
                        console.error('Failed to delete subcategory:', data.message);
                    }
                } catch (error) {
                    console.error('Error deleting subcategory:', error);
                }
            });
        });
    }

    fetchSubcategory(selectedLanguage);
});