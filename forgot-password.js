const forgotForm =
document.getElementById("forgotForm");

forgotForm.addEventListener(
    "submit",
    function(event){

        event.preventDefault();

        const email =
        document.getElementById("email").value;

        const user =
        JSON.parse(
            localStorage.getItem("user")
        );

        if(
            user &&
            user.email === email
        ){

            alert(
                "Password Reset Request Submitted Successfully (Demo)"
            );

            window.location.href =
            "login.html";

        }else{

            alert(
                "Email Not Found"
            );
        }

    }
);