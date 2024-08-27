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
        const formData = new FormData();
        const title = document.querySelector('input[name="title"]').value;
        const image = document.querySelector('input[name="image"]').files[0];
        if(title){
            formData.append('title', title);
        }
        if(image){

            formData.append('image', image);
        }
        if(productList.value){
            formData.append('productId',productList.value )
 
        }
        return formData;
    }

    const addpopupbtn = document.getElementById("add-popup-btn");

    let products = [];
    const productList = document.getElementById("productId")
    addpopupbtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const formData = getFormData();
        console.log(formData)
        try {
            let response = await fetch('http://localhost:3500/api/v1/popup', {
                method: 'POST',
                headers: {
                    'token': `${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                console.log("popup created successfully:", data);
                window.location.href = 'popup-history.html';
            } else {
                console.error("Error creating popup:", data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
    fillproducts();

})