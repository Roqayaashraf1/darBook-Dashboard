const token = localStorage.getItem('token');
document.addEventListener('DOMContentLoaded', () => {

    async function fetchproducts() {
        try {
            const response = await fetch('http://localhost:3500/api/v1/products', {
                headers: {
                    'currency': "KWD"
                }
            });

            const data = await response.json();

            if (data.message === "success") {
                return data;
            } else {
                console.error('Failed to fetch product:', data.message);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }

    const fillproducts = async () => {
        productList.innerHTML = '';
        products = await fetchproducts();
        products.result.forEach(
            product => {
                const newOption = document.createElement("option");
                newOption.value = product._id;
                newOption.text = product.title;

                productList.appendChild(newOption);
            }
        )
    }

    function getFormData() {
    
        const discount = document.querySelector('input[name="discount"]').value;
        const startDate = document.querySelector('input[name="startDate"]').value;
       
        const offer = {
            
            productId : productList.value,
            discount ,
            startDate
        }
        return offer;
    }
    
    const addOfferbtn = document.getElementById("add-offer-btn");
    
    let products=[];
    const productList = document.getElementById("productId")
    addOfferbtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const offer = getFormData();
    console.log(offer)
        try {
            let response = await fetch('http://localhost:3500/api/v1/offers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${token}` 
                },
                body: JSON.stringify(offer)
            });
      
            const data = await response.json();
    
            if (response.ok) {
                console.log("Offer created successfully:", data);
                window.location.href = 'offer-history.html';
            } else {
                console.error("Error creating offer:", data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
    fillproducts();
    
})