document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.querySelector('form');
    const productId = new URLSearchParams(window.location.search).get('id');
    console.log('product ID:', productId)

    productForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(productForm);
        const title = formData.get('title');
        const price = formData.get('price');
        const quantity = formData.get('quantity');
        const description = formData.get('description');

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:3500/api/v1/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${token}`,
                },
                body: JSON.stringify({
                    title,
                    price,
                    quantity,
                    description

                }),
            });

            if (!response.ok) {
                console.error('Failed request:', response.statusText);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert('product updated successfully');
            window.location.href = 'product-history.html';
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product');
        }
    });
});