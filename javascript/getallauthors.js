document.addEventListener('DOMContentLoaded', () => {
    const authorTableBody = document.getElementById('authorTableBody');
    const token = localStorage.getItem('token');
    async function fetchAuthors() {
        try {
            const response = await fetch('http://localhost:3500/api/v1/authors', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'currency': 'KWD'

                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            populateTable(data.result);
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    }

    function populateTable(authors) {
        authorTableBody.innerHTML = '';

        authors.forEach(author => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${author.name}</td>
                <td><a href="edit-author.html?id=${author._id}" class="btn btn-info"><i class="fa fa-edit"></i></a></td>
                <td><button type="button" class="btn btn-danger mt-3" data-author-id="${author._id}">Delete author</button></td>
            `;
            authorTableBody.appendChild(row);
        });

        // Add event listeners for delete buttons
        authorTableBody.querySelectorAll('.btn-danger').forEach(button => {
            button.addEventListener('click', async (event) => {
                const authorId = event.target.getAttribute('data-author-id');
                if (confirm('Are you sure you want to delete this author?')) {
                    await deleteAuthor(authorId);
                }
            });
        });
    }

    async function deleteAuthor(id) {
        try {
            const response = await fetch(`http://localhost:3500/api/v1/authors/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token':`${token}`
                    
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete author');
            }

            alert('Author deleted successfully');
            fetchAuthors(); 
        } catch (error) {
            console.error('Error deleting author:', error);
            alert('Failed to delete author. Please try again.');
        }
    }

    fetchAuthors();
});
