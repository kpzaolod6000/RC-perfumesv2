let inputEmail=document.getElementById("email");
let inputPassword=document.getElementById("password");
let formLogin=document.getElementById("formLogin");
let adminLi=document.getElementById("adminLi");
let register=document.getElementById("register");
let lista=document.getElementById("lista")
let cerrar=document.getElementById("cerrar")
let iniciar=document.getElementById("iniciar")
checkSaveAdmin();

let newUser= JSON.parse(localStorage.getItem("users"));
let newSession  = JSON.parse(sessionStorage.getItem("user"));

if (newSession) {

    const usuarioEncontrado=newUser.find((element)=>element.email==newSession.email)

    if (usuarioEncontrado.sessionActive){
        closeLog(iniciar);
        closeLog(register);
        openLogout(lista);
        openLogout(cerrar);
    }
    
}


inputEmail.addEventListener("blur", () => {
    validateEmail(inputEmail);
  });
  inputPassword.addEventListener("blur", () => {
    validatePassword(inputPassword);
  });
formLogin.addEventListener("submit",Login);

function saveUserLog(user) {
    sessionStorage.setItem("user", JSON.stringify(user));
};

function getRolUserLog() {
    const user=JSON.parse(sessionStorage.getItem("user"));

    if (user!==null) {
        return user.role
    }else{
        return "Cliente"
    }
     };

function Login(e) {
    e.preventDefault();
    let usuariosRegistrados= JSON.parse(localStorage.getItem("users"));
    if (usuariosRegistrados.length >0 && usuariosRegistrados !== null) {
        const usuarioEncontrado=usuariosRegistrados.find((element)=>element.email===inputEmail.value)
        if (usuarioEncontrado !== undefined) {
            if (usuarioEncontrado.password===inputPassword.value) {
                const savedUser={
                    email:usuarioEncontrado.email,
                    role:usuarioEncontrado.role,
                };
                saveUserLog(savedUser);
                checkAdmin(adminLi);
                closeRegister(register);
                openLogout(cerrar);
                openWhist(lista);
                closeLog(iniciar);
                formLogin.reset();
                $("#exampleModal").modal("hide")

                usuariosRegistrados.forEach(user => {
                    if (user.email == usuarioEncontrado.email) {
                        user.sessionActive = true;
                    }
                });
                localStorage.setItem('users', JSON.stringify(usuariosRegistrados));

            }else{
                Swal.fire({
                    icon: "error",
                    title: "Email o Password incorrectos",
                    text: "Por favor vuelva a ingresar los Datos",

                    });
            }
        }else{
            Swal.fire({
                icon: "error",
                title: "Email o Password incorrectos",
                text: "Por favor vuelva a ingresar los Datos",
                
                });
        }
    }else{
        Swal.fire({
            icon: "error",
            title: "Email o Password incorrectos",
            text: "Por favor vuelva a ingresar los Datos",
            
            });
    }
}

function checkSaveAdmin(){
    const arrayUsers=JSON.parse(localStorage.getItem("users"));
    const userAdmin={
    
    email:"perfumesrolling@gmail.com",
    role:"Administrador",
    password:"Perfumes24",


}
if (arrayUsers===null) {
    const users=[userAdmin];      
    localStorage.setItem("users", JSON.stringify(users));

}else if (arrayUsers.length===0) {
const users=[userAdmin];     
localStorage.setItem("users", JSON.stringify(users));
}
}


//funciones para cerrar items del navbar



window.LogOut = function() {
    
    let sesionAct = JSON.parse(sessionStorage.getItem("user"));
    let usuariosRegistrados= JSON.parse(localStorage.getItem("users"));

    usuariosRegistrados.forEach(user => {
        if (user.email == sesionAct.email) {
            user.sessionActive = false;
        }
    });
    localStorage.setItem('users', JSON.stringify(usuariosRegistrados));
    sessionStorage.removeItem("user");
    closeLog(cerrar);
    openLogout(iniciar);
    openLogout(register);
    adminLi.className = "nav-item d-none";
    window.location.replace("/index.html");
};

  

  function checkAdmin(adminLi) {
    const role = getRolUserLog();

    if (role === "Administrador") {
        adminLi.classList.remove("d-none");  
    } 
}

function closeRegister(register) {
    register.classList.add("d-none")
}

function openWhist(list) {

    list.classList.remove("d-none");
}


function openLogout(cerrar) {
    cerrar.classList.remove("d-none")
}

function closeLog(iniciar) {
    iniciar.classList.add("d-none")
}


//validaciones

function validateEmail(input) {
    let regEmail =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (regEmail.test(input.value)) {
      input.className = "form-control is-valid";
      return true;
    } else if (input.value.trim().length > 0 && input.value.trim().length < 6) {
      input.className = "form-control is-valid";
      return true;
    } else {
      input.className = "form-control is-invalid";
      return false;
    }
  }

  function validatePassword(input) {
    let regPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    if (regPass.test(input.value)) {
        input.className = "form-control is-valid";
        return true;
    } else if (input.value.trim().length > 0 && input.value.trim().length < 8) {
        input.className = "form-control is-invalid";
        return false;
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}



  