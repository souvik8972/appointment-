const form = document.querySelector("#form");
form.addEventListener("submit", login);

async function login(e) {
    e.preventDefault();
    try {
        const formData = {
            name: e.target.name.value,
            phoneNumber: e.target.phone.value
        };
        console.log(formData);
        const response = await axios.post("/user", formData);

        localStorage.setItem("user", JSON.stringify(response.data));

        alert("login done ");
        window.location.href = "/dashboard"
    } catch (error) {
        alert("Error");
    }
}




