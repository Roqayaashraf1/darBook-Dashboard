document.addEventListener('DOMContentLoaded', function () {

    fetch(`http://localhost:3500/api/v1/newsletter`, {
        method: 'GET'
    }).then(response => response.json())
    .then(data => {
        if (data.message === 'success') {
            const newsletterTable = document.getElementById('newsletter');
            newsletterTable.innerHTML = '';
            data.result.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.email}</td>
                    <td>${new Date(item.createdAt).toLocaleString()}</td>
                `;
                newsletterTable.appendChild(row);
            });
        } else {
            console.error('Error fetching order details:', data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});
