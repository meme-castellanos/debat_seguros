const registeredUser = document.getElementById("registeredUser"),
  registeredPassword = document.getElementById("registeredPassword"),
  check = document.getElementById("check"),
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
  sumaIngresada = document.getElementById("sumaIngresada"),
  btnCalcular = document.getElementById("btnCalcular"),
  btnExit = document.getElementById("btnExit"),
  resultadoCuota = document.getElementById("resultadoCuota"),
  datosCliente = document.getElementById("datosCliente");

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
    "Río Uruguay",
    "Automotor",
    1
  ),
  new Cliente(
    "Abril",
    "Celia",
    5794302,
    "cbabril@yahoo.com.ar",
    "Islas del Atlántico Sur 4550",
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
//1.-Valido usuario y contraseña

function validarCliente(clientesDB, mail, dni) {
  let clienteEncontrado = clientesDB.find((cliente) => cliente.mail == mail);
  console.log(clienteEncontrado);

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

function clearStorage() {
  localStorage.clear();
  sessionStorage.clear();
}
//Para usuarios registrados
btnIngresar.addEventListener("click", (e) => {
  e.preventDefault();
  if (!registeredUser.value || !registeredPassword.value) {
    alert("Completa todos los campos");
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
      alert("Hola " + user.nombre);
      login.classList.replace("visible", "hidden");
      registrado.classList.replace("hidden", "visible");
      //Ingresa al cotizador

      //Ingresa a Datos guardados

      //Volver
      btnSalir.addEventListener("click", () => {
        login.classList.replace("hidden", "visible");
        registrado.classList.replace("visible", "hidden");
      });
    } else {
      //cambiar por sweet alert
      alert("Usuario no registrado");
    }
  }
});
//Para nuevos registros
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
    //Agregar: Mostrar datos guardados en el storage
  });
});
