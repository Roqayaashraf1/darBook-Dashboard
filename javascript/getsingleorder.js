document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('token');
    const orderId = new URLSearchParams(window.location.search).get('id');

    if (!orderId) {
        console.error('Order ID not found in URL');
        return;
    }

    fetch(`http://localhost:3500/api/v1/orders/${orderId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': `${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'success') {
            const order = data.result;
            console.log(order)
            document.getElementById('user-name').textContent = order.user.name;
            document.getElementById('user-email').textContent = order.user.email ;
            document.getElementById('street').textContent = order.shippingAddress.street || 'N/A';
            document.getElementById('city').textContent = order.shippingAddress.city || 'N/A';
            document.getElementById('phone').textContent = order.shippingAddress.phone || 'N/A';
            document.getElementById('country').textContent = order.shippingAddress.country || 'N/A';
            document.getElementById('building').textContent = order.shippingAddress.building || 'N/A';
            document.getElementById('area').textContent = order.shippingAddress.area || 'N/A';
            document.getElementById('floor').textContent = order.shippingAddress.floor || 'N/A';
            document.getElementById('apartment').textContent = order.shippingAddress.apartment || 'N/A';
            document.getElementById('totalPriceExchanged').textContent = order.totalPriceExchanged || 'N/A';
            // Populate the cart items
            const cartItemsTbody = document.getElementById('cart-items-tbody');
            cartItemsTbody.innerHTML = ''; // Clear existing content
            
            order.cartItems.forEach(item => {
                const row = `
                    <tr>
                        <td>${item.product.title}</td>
                        <td>${item.quantity}</td>
                        <td>${item.product.price}</td>
                        <td>${item.priceExchanged} ${order.currency}</td>
                    </tr>
                `;
                cartItemsTbody.innerHTML += row;
            });
        } else {
            console.error('Error fetching order details:', data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});
