const formulario = document.getElementById('formulario');
const campos = ['nombre', 'paterno', 'materno', 'edad', 'telefono', 'email'];
const panelExito = document.getElementById('exito');
const botonVolver = document.getElementById('volver');
const errorGeneral = document.getElementById('error-general');

// Letras del alfabeto español, incluidas vocales con acento y la ñ.
const patronNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[ ]+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;
const patronEdad = /^\d{1,3}$/;
const patronTelefono = /^\d{16}$/;
const patronEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function validarCampo(id) {
  const campo = document.getElementById(id);
  const mensaje = document.getElementById(`error-${id}`);
  const valor = campo.value.trim();
  let error = '';

  if (valor === '') {
    error = 'Este campo es obligatorio.';
  } else {
    switch (id) {
      case 'nombre':
        if (!patronNombre.test(valor)) error = 'Nombre: usa solamente letras y espacios.';
        break;
      case 'paterno':
        if (!patronNombre.test(valor)) error = 'Apellido paterno: usa solamente letras y espacios.';
        break;
      case 'materno':
        if (!patronNombre.test(valor)) error = 'Apellido materno: usa solamente letras y espacios.';
        break;
    case 'edad':
  const fecha = new Date(campo.value + 'T00:00:00');
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  if (isNaN(fecha) || fecha > hoy) {
    error = 'Fecha de nacimiento: elige una fecha válida.';
  } else {
    let edadCalculada = hoy.getFullYear() - fecha.getFullYear();
    const yaCumplio = (hoy.getMonth() > fecha.getMonth()) ||
      (hoy.getMonth() === fecha.getMonth() && hoy.getDate() >= fecha.getDate());
    if (!yaCumplio) edadCalculada--;

    if (edadCalculada < 18) {
      error = 'Debes ser mayor de 18 años para suscribirte.';
    }
  }
  break;
      case 'telefono':
  const soloNumeros = campo.value.replace(/\D/g, '');
  if (!patronTelefono.test(soloNumeros)) error = 'Teléfono: escribe exactamente 16 números de tu tarjeta.';
  break;
      case 'email':
        if (!patronEmail.test(valor)) error = 'Email: escribe un correo válido (ejemplo@dominio.com).';
        break;
    }
  }

  mensaje.textContent = error;
  campo.classList.toggle('invalid', Boolean(error));
  campo.setAttribute('aria-invalid', error ? 'true' : 'false');
  return error === '';
}

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  errorGeneral.textContent = '';

  // Se revisan todos los campos para mostrar cada error en su lugar.
  const resultados = campos.map(validarCampo);
  const formularioValido = resultados.every(Boolean);

  if (!formularioValido) {
    const primerCampoIncorrecto = campos.find((id) => !validarCampo(id));
    document.getElementById(primerCampoIncorrecto).focus();
    errorGeneral.textContent = 'Revisa los campos señalados. Todos son obligatorios para continuar.';
    return;
  }

  formulario.hidden = true;
  panelExito.hidden = false;
});

campos.forEach((id) => {
  document.getElementById(id).addEventListener('input', () => {
    // Quita o actualiza el mensaje mientras la persona corrige el campo.
    validarCampo(id);
    errorGeneral.textContent = '';
  });
});

botonVolver.addEventListener('click', () => {
  panelExito.hidden = true;
  formulario.hidden = false;
  formulario.reset();
  campos.forEach((id) => {
    const campo = document.getElementById(id);
    campo.classList.remove('invalid');
    campo.removeAttribute('aria-invalid');
    document.getElementById(`error-${id}`).textContent = '';
  });
  document.getElementById('nombre').focus();
});

// Poner en MAYÚSCULAS al terminar de escribir
["nombre", "paterno", "materno"].forEach(function(id) {
  const campo = document.getElementById(id);
  if (campo) {
    campo.addEventListener("blur", function() {
      campo.value = campo.value.toUpperCase();
    });
  }
});

// BLOQUEAR NÚMEROS en Nombre y Apellidos
["nombre", "paterno", "materno"].forEach(function(id) {
  const campo = document.getElementById(id);
  if (campo) {
    campo.addEventListener("input", function() {
      // Quita todo lo que sea número o símbolo, deja letras, acentos y espacios
      campo.value = campo.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    });
    // También bloquea al pegar
    campo.addEventListener("paste", function(e) {
      e.preventDefault();
    });
  }
});

// FORMATO TARJETA - Solo 16 números
const campoTarjeta = document.getElementById('telefono');
if (campoTarjeta) {
  campoTarjeta.addEventListener("input", function() {
    let numeros = this.value.replace(/\D/g, "");
    numeros = numeros.slice(0, 16);
    this.value = numeros.replace(/(\d{4})(?=\d)/g, "$1 ");
  });
}

// Menú lateral
const btnMenuLateral = document.getElementById('toggleSidebarBtn');
const sidebar = document.getElementById('sidebar');

if (btnMenuLateral && sidebar) {
  btnMenuLateral.addEventListener('click', () => {
    sidebar.classList.toggle('abierto');
  });
}