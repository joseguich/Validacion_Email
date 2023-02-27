document.addEventListener("DOMContentLoaded", () => {

    //Crear objeto para usarlo si estan lleno los campo
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }
    //Seleccionando Elemento del HTML
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type= "submit"]');
    const btnReset = document.querySelector('#formulario button[type= "reset"]');
    const spinner = document.querySelector('#spinner');

    //! Utilizando eventListener
    registrarEvenetListener();
    function registrarEvenetListener() {

        //! Validando email
        inputEmail.addEventListener('input', validar);

        //! Validando asunto
        inputAsunto.addEventListener('input', validar);

        //Validar Mensaje
        inputMensaje.addEventListener('input', validar)

        //! Resetear el formulario 
        btnReset.addEventListener('click', (e) => {
            e.preventDefault();
           resetearFormurario();
        });

        //! Funcionamiento para enviar el email
        formulario.addEventListener('submit', enviarEmail);
    }

    //! Enviando el formulario 
    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

         //Eliminando la alerta 
        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            //Resetear el formulario
            resetearFormurario();

            //Mostrando alerta de exito 
            const alertExito = document.createElement('P');
            alertExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10',
            'font-bold', 'text-sm', 'uppercase');
            alertExito.textContent = "Correo electronico enviado correctamente";

            formulario.appendChild(alertExito);

            //Eliminando la alerta exito
            setTimeout(() => {
                alertExito.remove();
            }, 3000);

        }, 3000);
    }


    //!Validando todos los input
    function validar(e) {

        //Referncia del elemento padre el input..
        const padreInput = e.target.parentElement;

        //Validar si el campo esta vacio
        if (e.target.value.trim() === '') {
            //Mostrar elemento de alerta en cada ubicacion...
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, padreInput);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        //!Mostrando la validacion del email...
        if (!validarEmail(e.target.value) && e.target.id === 'email') {
            mostrarAlerta(`Email no es valido`, padreInput);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(padreInput);

        //Visualizar que todo los campo esten llenos
        email[e.target.name] = e.target.value.trim().toLowerCase();

        //Comprobar el objeto del email
        comprobarEmail();


    }
    //! Mostrar alert de error
    function mostrarAlerta(mensaje, ubicacion) {

        //Limpiar la multiples alerta
        limpiarAlerta(ubicacion);

        //Creando la interfaz de error
        const error = document.createElement('P');
        error.textContent = mensaje;

        //Libreria Tailwind CSS....
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center', 'text-lg', 'font-mono');

        //Mostrando en el HTML
        ubicacion.appendChild(error);
    }

    //! Limpiar alerta si el campo esta lleno
    function limpiarAlerta(ubicacion) {

        //Comprovar si ya existe una alerta
        const alerta = ubicacion.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

    //! Validar email
    function validarEmail(email) {
        //Expresion Regular
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        //validando si cumple 
        const validacion = regex.test(email);
        return validacion;
    }

    //! Comprobar si tiene valor el objeto
    function comprobarEmail() {
        // Asignar los valores a un nuevo arreglo y si algunos de los elemento tiene un string vacio
        if (Object.values(email).includes("")) {

            //Si borramos un campo lleno que se active de nuevo
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;

        }
        //Si llena todos los y existe esta clase eliminalo
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;

    }
    //Restear el formulario 
    function resetearFormurario() {
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }
});