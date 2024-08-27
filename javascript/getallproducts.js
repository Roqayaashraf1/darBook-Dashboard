document.addEventListener('DOMContentLoaded', () => {
    const productTableBody = document.getElementById('productTableBody');
    const token = localStorage.getItem('token');
    async function fetchProducts() {
        try {
            const response = await fetch('http://localhost:3500/api/v1/products', {
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
            console.error('Error fetching products:', error);
        }
    }

    function populateTable(products) {
        productTableBody.innerHTML = '';

        products.forEach(product => {
            const category = product.category;
            const author = product.author;
            const subcategory = product.Subcategory;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
                <td>${product.sold}</td>
                <td>${product.description}</td>
                <td>${product.papersnumber}</td>
                <td>${subcategory ? (subcategory.englishname || subcategory.arabicname) : 'N/A'}</td>
                <td>${category ? (category.englishname || category.arabicname) : 'N/A'}</td>
                <td>${author ? author.name : 'N/A'}</td>
                  <td><a href="edit-product.html?id=${product._id}" class="btn btn-info"><i class="fa fa-edit"></i></a></td>
                <button type="button" class="btn btn-danger mt-3" data-product-id="${product._id}">Delete product</button>
            `;
            productTableBody.appendChild(row);
        });
        productTableBody.querySelectorAll('.btn-danger').forEach(button => {
            button.addEventListener('click', async (event) => {
                const productId = event.target.getAttribute('data-product-id');
                if (confirm('Are you sure you want to delete this product?')) {
                    await deleteproduct(productId);
                }
            });
        });
    
    } async function deleteproduct(id) {
        try {
            const response = await fetch(`http://localhost:3500/api/v1/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token':`${token}`
                    
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            alert('product deleted successfully');
            fetchProducts(); 
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product. Please try again.');
        }
    }

    fetchProducts(); 
});