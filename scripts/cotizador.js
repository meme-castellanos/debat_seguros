const registeredUser = document.getElementById("registeredUser"),
  registeredPassword = document.getElementById("registeredPassword"),
  check = document.getElementById("check"),
  ingreso = document.getElementById("ingreso"),
  btnIngresar = document.getElementById("btnIngresar"),
  login = document.getElementById("login"),
  btnRegistrarse = document.getElementById("btnRegistrarse"),
  newUser = document.getElementById("newUser"),
  nUserApellido = document.getElementById("nUserApellido"),
  nUserName = document.getElementById("nUserName"),
  nDni = document.getElementById("nDni"),
  nUserMail = document.getElementById("nUserMail"),
  nUserDir = document.getElementById("nUserDir"),
  nUserTel = document.getElementById("nUserTel"),
  btnEnviarDatos = document.getElementById("btnEnviarDatos"),
  btnVolver = document.getElementById("btnVolver"),
  nuevoRegistro = document.getElementById("nuevoRegistro"),
  registrado = document.getElementById("registrado"),
  btnCotizar = document.getElementById("btnCotizar"),
  btnDatos = document.getElementById("btnDatos"),
  btnSalir = document.getElementById("btnSalir"),
  mostrarCotizador = document.getElementById("mostrarCotizador"),
  btnCalcular = document.getElementById("btnCalcular"),
  btnBorrar = document.getElementById("btnBorrar"),
  resultadoCuota = document.getElementById("resultadoCuota"),
  datosCliente = document.getElementById("datosCliente"),
  sumaIngresada = document.getElementById("sumaIngresada");
class Cliente {
  constructor(
    apellido,
    nombre,
    dni,
    mail,
    domicilio,
    telefono,
    compania,
    ramo,
    id
  ) {
    this.apellido = apellido;
    this.nombre = nombre;
    this.dni = parseInt(dni);
    this.mail = mail;
    this.domicilio = domicilio;
    this.telefono = parseInt(telefono);
    this.compania = compania;
    this.ramo = ramo;
    this.id = id;
  }

  asignarId(clientes) {
    this.id = clientes.length;
  }
}

const clientesDB = [
  new Cliente(
    "Castellanos",
    "Mercedes",
    28651560,
    "memitacastellanos@gmail.com",
    "Lote 31 mza 224 La Calera",
    156065975,
    "R??o Uruguay",
    "Automotor",
    1
  ),
  new Cliente(
    "Abril",
    "Celia",
    5794302,
    "cbabril@yahoo.com.ar",
    "Islas del Atl??ntico Sur 4550",
    156421255,
    "Mapfre",
    "Automotor",
    2
  ),
  new Cliente(
    "Debat",
    "Juan Pablo",
    28428204,
    "juandebat@hotmail.com",
    "Lote 31 mza 224 La Calera",
    152226092,
    "Mapfre",
    "Vivienda",
    3
  ),
  new Cliente(
    "Luchini",
    "Patricia",
    12456987,
    "patri_luchini@gmail.com",
    "Roberto Boyle 6130",
    157619061,
    "Mapfre",
    "Automotor",
    4
  ),
  new Cliente(
    "Alves",
    "Jorge",
    29965078,
    "jorge.alves@gmail.com",
    "Recta Martinolli 4695",
    156605947,
    "Mapfre",
    "Vivienda",
    5
  ),
];

//Declaro Funciones
//Valido usuario y contrase??a

function validarCliente(clientesDB, mail, dni) {
  let clienteEncontrado = clientesDB.find((cliente) => cliente.mail == mail);

  if (typeof clienteEncontrado === "undefined") {
    return false;
  } else {
    if (clienteEncontrado.dni != dni) {
      return false;
    } else {
      return clienteEncontrado;
    }
  }
}
//Guarda datos en Storage
function guardarCliente(clientesDB, storage) {
  const cliente = {
    apellido: clientesDB.apellido,
    nombre: clientesDB.nombre,
    dni: clientesDB.dni,
    mail: clientesDB.mail,
    domicilio: clientesDB.domicilio,
    telefono: clientesDB.telefono,
    compania: clientesDB.compania,
    ramo: clientesDB.ramo,
    id: clientesDB.id,
  };
  storage.setItem("cliente", JSON.stringify(cliente));
}
//Recupera datos del Storage
function recuperarCliente(storage) {
  return JSON.parse(storage.getItem("cliente"));
}
//Borra el storage
function clearStorage() {
  localStorage.clear();
  sessionStorage.clear();
}

//Cerrar Sesi??n
function cerrarSesion() {
  login.classList.replace("hidden", "visible");
  registrado.classList.replace("visible", "hidden");
  mostrarCotizador.classList.replace("visible", "hidden");
  ingreso.reset();
  newUser.classList.replace("visible", "hidden");
  newUser.querySelector("form").reset();
  resultadoCuota.innerHTML = ``;
  datosCliente.innerHTML = ``;
  clearStorage(localStorage);
  clearStorage(sessionStorage);
}

//Para usuarios registrados

btnIngresar.addEventListener("click", (e) => {
  e.preventDefault();
  if (!registeredUser.value || !registeredPassword.value) {
    Swal.fire({
      toast: true,
      title: "Atenci??n!",
      text: "Oops! Debes completar los campos",
      icon: "warning",
      iconColor: "#a70016",
      timer: 2000,
      showConfirmButton: false,
    });
  } else {
    let user = validarCliente(
      clientesDB,
      registeredUser.value,
      registeredPassword.value
    );
    if (user) {
      if (check.checked) {
        guardarCliente(user, localStorage);
      } else {
        guardarCliente(user, sessionStorage);
      }

      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        icon: "success",
        iconColor: "#a70016",
        title: "Bienvenid@ " + user.nombre,
      });
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          body: "Agregamos nuevas promociones, seguinos en las redes para enterarte!!!",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) =>
          Swal.fire({
            title: "Promociones",
            icon: "info",
            iconColor: "#a70016",
            showConfirmButton: false,
            timer: 3500,
            text: data.body,
          })
        );

      login.classList.replace("visible", "hidden");
      registrado.classList.replace("hidden", "visible");
      //Ingresa al cotizador

      btnCotizar.addEventListener("click", (e) => {
        e.preventDefault();

        mostrarCotizador.classList.replace("hidden", "visible");
        datosCliente.innerHTML = ``;
        btnCalcular.addEventListener("click", (e) => {
          e.preventDefault();
          sessionStorage.setItem(
            "sumaIngresada",
            JSON.stringify(sumaIngresada.value)
          );
          const sumaAsegurada = JSON.parse(
            sessionStorage.getItem("sumaIngresada")
          );

          while (sumaAsegurada != 0) {
            function cotizar(sumaAsegurada) {
              let coberturaA = 4000;
              let coberturaB = coberturaA + 0.001 * sumaAsegurada;
              let premio = coberturaB * 1.21;
              return premio;
            }
            resultadoCuota.innerHTML = `<p>El valor final aproximado de la cuota a pagar, de acuerdo a la suma asegurada ingresada es: $${cotizar(
              sumaAsegurada
            )}</p>`;
            break;
          }
        });
        btnBorrar.addEventListener("click", () => {
          resultadoCuota.innerHTML = ``;
          mostrarCotizador.querySelector("form").reset();
        });
      });

      //Ingresa a Datos guardados

      btnDatos.addEventListener("click", (e) => {
        e.preventDefault();
        resultadoCuota.innerHTML = ``;
        mostrarCotizador.classList.replace("visible", "hidden");
        let clienteRegistrado = [];
        if (check.checked) {
          clienteRegistrado = [recuperarCliente(localStorage)];
        } else {
          clienteRegistrado = [recuperarCliente(sessionStorage)];
        }

        console.log(clienteRegistrado);
        const usuario = clientesDB.filter(
          (cliente) => cliente.id == clienteRegistrado
        );
        for (const iterator of clienteRegistrado) {
          datosCliente.innerHTML = `<p>Los datos registrados son:<br> Apellido: ${iterator.apellido} <br> Nombre: ${iterator.nombre} <br> DNI: ${iterator.dni} <br> e-Mail: ${iterator.mail} <br> Domicilio: ${iterator.domicilio} <br> Tel??fono: ${iterator.telefono}</p>`;
        }
        console.log(usuario);
      });

      //Volver al login desde registrados
      btnSalir.addEventListener("click", () => {
        login.classList.replace("hidden", "visible");
        registrado.classList.replace("visible", "hidden");
        mostrarCotizador.classList.replace("visible", "hidden");
        ingreso.reset();
        resultadoCuota.innerHTML = ``;
        datosCliente.innerHTML = ``;
        clearStorage(localStorage);
        clearStorage(sessionStorage);
      });
      //Inactivo por 10 min, cierra la sesi??n
      //Ver de poner un if para saber si hizo click en la pantalla?
      setTimeout(() => {
        Swal.fire({
          toast: true,
          text: "Oops! La sesi??n ha expirado, ingresa nuevamente",
          icon: "error",
          showConfirmButton: false,
          iconColor: "#a70016",
          timer: 3500,
        });
        cerrarSesion();
      }, 600000);
    } else {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        icon: "error",
        iconColor: "#a70016",
        title: "Oops! Parece que no est??s registrado",
      });
    }
  }
});
//Para nuevo registro de usuario

btnRegistrarse.addEventListener("click", (e) => {
  e.preventDefault();
  login.classList.replace("visible", "hidden");
  newUser.classList.replace("hidden", "visible");
  btnEnviarDatos.addEventListener("click", (e) => {
    e.preventDefault();
    const cliente = new Cliente(
      nUserApellido.value,
      nUserName.value,
      nDni.value,
      nUserMail.value,
      nUserDir.value,
      nUserTel.value
    );
    clientesDB.push(cliente);
    cliente.asignarId(clientesDB);
    guardarCliente(cliente, localStorage);
    let clienteRecuperado = [recuperarCliente(localStorage)];

    newUser.classList.replace("visible", "hidden");

    if (
      !nUserApellido.value ||
      !nUserName.value ||
      !nDni.value ||
      !nUserMail.value ||
      !nUserDir.value
    ) {
      newUser.classList.replace("hidden", "visible");
      Swal.fire({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 3000,
        icon: "warning",
        iconColor: "#a70016",
        title: "Completa los campos",
        timer: 3000,
      });
    } else {
      for (const iterator of clienteRecuperado) {
        nuevoRegistro.innerHTML = `<p>Los datos registrados son:<br> Apellido: ${iterator.apellido} <br> Nombre: ${iterator.nombre} <br> DNI: ${iterator.dni} <br> e-Mail: ${iterator.mail} <br> Domicilio: ${iterator.domicilio} <br> Tel??fono: ${iterator.telefono}</p>`;
      }
      Swal.fire({
        text: "Gracias por registrarte",
        icon: "success",
        iconColor: "#a70016",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
      });
      setInterval("location.reload()", 4000);
    }
  });
  btnVolver.addEventListener("click", () => {
    cerrarSesion();
  });
});
