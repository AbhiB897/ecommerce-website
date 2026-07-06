const registerForm =
document.getElementById("registerForm");

registerForm.addEventListener(
    "submit",
    function(event){

        event.preventDefault();

        const name =
        document.getElementById("name").value;

        const email =
        document.getElementById("email").value;

        const password =
        document.getElementById("password").value;

        const confirmPassword =
        document.getElementById("confirmPassword").value;

        if(password !== confirmPassword){

            alert("Passwords Do Not Match");

            return;
        }

        const user = {
            name,
            email,
            password
        };

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        alert("Registration Successful");

        window.location.href =
        "login.html";

    }
);