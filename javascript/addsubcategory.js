
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
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

    function getFormData() {
        const arabicname = document.querySelector('input[name="arabicname"]').value.trim();
        const englishname = document.querySelector('input[name="englishname"]').value.trim();



        const subCategory = {
            englishname,
            arabicname,

            category: categoyList.value
        }
        return subCategory;
    }

    const addSubcategorybtn = document.getElementById("add-subcategory-btn");


    let catoegories = [];

    const categoyList = document.getElementById("category");


    addSubcategorybtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const subCategory = getFormData();
        console.log(subCategory)
        try {
            let response = await fetch('http://localhost:3500/api/v1/subcategory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                    'currency': 'KWD',
                    'token': ` ${token}`
                },
                body: JSON.stringify(subCategory)
            });

            const data = await response.json();
            console.log(data)
            if (response.ok) {
                console.log("subcategory created successfully:", data);
                window.location.href = 'subcategory-history.html';
            } else {
                console.error("Error creating subcategory:", data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
    fillCatogory();


})