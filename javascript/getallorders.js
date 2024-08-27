document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('token');

    fetch('http://localhost:3500/api/v1/orders/allorders', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': `${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const orders = data.orders || [];
        const orderList = document.getElementById('order-list');
        orderList.innerHTML = ''; 

        orders.forEach((order, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>${order.isPaied}</td>
                    <td>${order.totalPriceExchanged} ${order.currency}</td>
                    <td>${order.PaymentMethod}</td>
                    <td><a href="single-order.html?id=${order._id}" class="btn btn-info"><i class="fa fa-edit"></i></a></td>
                </tr>
            `;
            orderList.innerHTML += row;
        });

        document.querySelectorAll('.view-btn').forEach(button => {
            button.addEventListener('click', function() {
                const orderId = this.getAttribute('data-order-id');
                window.location.href = `order-details-page.html?orderId=${orderId}`;
            });
        });
    })
    .catch(error => console.error('Error:', error));
});
