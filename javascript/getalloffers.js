document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3500/api/v1/offers', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const offers = data.offers || [];
        const alloffers = document.getElementById('alloffers'); // Directly select tbody by ID
        if (!alloffers) {
            console.error('Element with ID "alloffers" not found');
            return;
        }
        alloffers.innerHTML = ''; 

        offers.forEach((offer, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${offer.discount}%</td>
                    <td>${new Date(offer.startDate).toLocaleDateString()}</td>
                    <td>${offer.product.title}</td>
                    <td>${offer.product.price}</td>
                    <td>${offer.product.priceAfterDiscount}</td>
                    <td>
                        <button type="button" class="btn btn-danger mt-3" data-offer-id="${offer._id}">Delete Offer</button>
                    </td>
                </tr>
            `;
            alloffers.innerHTML += row;
        });
        document.querySelectorAll('.btn-danger').forEach(button => {
            button.addEventListener('click', async (event) => {
                const offerId = event.target.getAttribute('data-offer-id'); // Changed this to use event.target
                if (confirm('Are you sure you want to delete this Offer?')) {
                    deleteOffer(offerId);
                }
            });
        });
    })
    .catch(error => console.error('Error:', error));

    async function deleteOffer(offerId) {
        await fetch(`http://localhost:3500/api/v1/offers/${offerId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': `${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Offer deleted successfully') {
                alert('Offer deleted successfully!');
                document.querySelector(`[data-offer-id="${offerId}"]`).closest('tr').remove();
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    }
});
