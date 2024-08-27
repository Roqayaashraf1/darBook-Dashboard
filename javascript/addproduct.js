const token = localStorage.getItem('token');
document.addEventListener('DOMContentLoaded', () => {

    async function fetchCategories(language) {
        try {
            const response = await fetch('http://localhost:3500/api/v1/categories', {
                headers: {
                    'accept-language': language,
                    'currency': "KWD"
                }
            });

            const data = await response.json();

            if (data.message === "success") {
                return data;
            } else {
                console.error('Failed to fetch categories:', data.message);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    async function fetchSubCategory(language) {
        try {
            const response = await fetch('http://localhost:3500/api/v1/subcategory', {
                headers: {
                    'language': language,
                    'currency': "KWD"
                }
            });

            const data = await response.json();

            if (data.message === "success") {
                return data;
            } else {
                console.error('Failed to fetch subcategories:', data.message);
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    }
    async function fetchauthor() {
        try {
            const response = await fetch('http://localhost:3500/api/v1/authors', {
                headers: {
                    'currency': "KWD"
                }
            });

            const data = await response.json();

            if (data.message === "success") {
                return data;
            } else {
                console.error('Failed to fetch author:', data.message);
            }
        } catch (error) {
            console.error('Error fetching author:', error);
        }
    }


    const fillCatogory = async () => {
        categoyList.innerHTML = '';
        catoegories = await fetchCategories('en');

        console.log(catoegories);
        catoegories.result.forEach(
            category => {
                const newOption = document.createElement("option");
                newOption.value = category._id;
                newOption.text = category.name;

                categoyList.appendChild(newOption);

            }
        )
    }

    const fillSubCatogory = async () => {
        subCategoyList.innerHTML = '';
        subCategories = await fetchSubCategory('en');

        console.log(subCategories);
        subCategories.result.forEach(
            subCategory => {
                const newOption = document.createElement("option");
                newOption.value = subCategory._id;
                newOption.text = subCategory.englishname;

                subCategoyList.appendChild(newOption);
            }
        )
    }
    const fillauthor = async () => {
        authorList.innerHTML = '';
        authors = await fetchauthor();

        console.log(authors);
        authors.result.forEach(
            author => {
                const newOption = document.createElement("option");
                newOption.value = author._id;
                newOption.text = author.name;

                authorList.appendChild(newOption);
            }
        )
    }

    function getFormData() {
        const formData = new FormData();
    
        const title = document.querySelector('input[name="title"]').value;
        const price = document.querySelector('input[name="price"]').value;
        const stock = document.querySelector('input[name="stock"]').value;
        const description = document.querySelector('textarea[name="description"]').value;
        const pages = document.querySelector('input[name="pages"]').value;
        const image = document.querySelector('input[name="image"]').files[0]; // Get the file object
    
        formData.append('title', title);
        formData.append('price', price);
        formData.append('quantity', stock);
        formData.append('description', description);
        formData.append('author', authorList.value);
        formData.append('papersnumber', pages);
        formData.append('category', categoyList.value);
        formData.append('Subcategory', subCategoyList.value);
        formData.append('image', image); 
    
        return formData;
    }
    
    const addProductbtn = document.getElementById("add-product-btn");
    
    let catoegories = [];
    let subCategories = [];
    let authors=[];
    const categoyList = document.getElementById("category");
    const subCategoyList = document.getElementById("sub-category");
    const authorList = document.getElementById("author")
    
    addProductbtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const formData = getFormData();
    
        try {
            let response = await fetch('http://localhost:3500/api/v1/products', {
                method: 'POST',
                headers: {
                    'currency': 'KWD',
                    'token': ` ${token}` 
                },
                body: formData 
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log("Product created successfully:", data);
                window.location.href = 'product-history.html';
            } else {
                console.error("Error creating product:", data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
    fillCatogory();
    fillSubCatogory();
    fillauthor();
    
})