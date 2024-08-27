document.addEventListener("DOMContentLoaded", () => {

  const token = localStorage.getItem('token');
  async function fetchPopups() {
    try {
      const response = await fetch('http://localhost:3500/api/v1/popup');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      populatePopupsTable(data.result);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  function populatePopupsTable(popups) {
    const tableBody = document.querySelector('#example1 tbody');
    tableBody.innerHTML = ''; 

    popups.forEach(popup => {
        const row = document.createElement('tr');
        row.dataset.id = popup._id; // Add data-id for easy row removal

        const titleCell = document.createElement('td');
        titleCell.textContent = popup.title ? popup.title : 'No Title';
        row.appendChild(titleCell);

        const imageCell = document.createElement('td');
        if (popup.image) {
            const img = document.createElement('img');
            img.src = `http://localhost:3500/${popup.image}`;
            img.style.width = '100px'; 
            imageCell.appendChild(img);
        } else {
            imageCell.textContent = 'No Image';
        }
        row.appendChild(imageCell);

        const productTitleCell = document.createElement('td');
        productTitleCell.textContent = popup.product && popup.product.title ? popup.product.title : 'No Product';
        row.appendChild(productTitleCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger mt-3';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this popup?')) {
                deletePopup(popup._id);
            }
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
        tableBody.appendChild(row);
    });
}

async function deletePopup(id) {
    try {
        const response = await fetch(`http://localhost:3500/api/v1/popup/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': `${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete popup');
        }

        alert('Popup deleted successfully');
        const rowToDelete = document.querySelector(`tr[data-id='${id}']`);
        if (rowToDelete) {
            rowToDelete.remove(); // Remove the row without refreshing the page
        }
    } catch (error) {
        console.error('Error deleting popup:', error);
        alert('Failed to delete popup. Please try again.');
    }
}

fetchPopups(); 
});
