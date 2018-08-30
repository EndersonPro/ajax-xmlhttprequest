/* Capturo el elemeto del DOM a traves de su Id */
const obtener_datos = document.getElementById('obtener_datos');

const guardar_datos = document.getElementById('save');

const data_result = document.getElementById('data-result');


obtener_datos.addEventListener('click', event => {
    /* Llamando a la funcion que realiza mi solicitud AJAX */
    AjaxGET();
})

guardar_datos.addEventListener('click', event => {
    event.preventDefault();

    //Obtengo el valor de los input a traves del id que les he colocado
    let name = document.getElementById('name').value;
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;

    let formData = { name, username, email };

    //Valido la informacion proveniente del formulario
    let Si_O_No = ValidateForm(formData);

    // Verifico que los campos tengan algo
    // Si tienen algo los guardo en una variable como un objeto 
    // De no tener nada lanzo un mensaje de error
    Si_O_No ? (NuevoUsuario = { name, username, email }, AjaxPOST(NuevoUsuario)) : console.log("Nel no paso");

})

data_result.addEventListener('click', event => {

    if (event.target.matches(".material-icons")) {
        let id = event.toElement.parentElement.offsetParent.children[1].children[0].children[0].innerText;
        AjaxDELETE(id);
    }

})


function AjaxGET() {
    /* Instancia de objeto */
    const xhttp = new XMLHttpRequest;

    // Definimos el tipo de metodo.
    const METHOD = 'GET';

    // URI a la cual se le hara la solicitud
    const URI = 'http://localhost:3000/user';

    //Metodo que recibe la configuracion de la solicitud.
    xhttp.open(METHOD, URI, true);

    //Enviar la solicitud.
    xhttp.send();

    // Metodo que esta pendiente al cambio de estado
    xhttp.onreadystatechange = function () {

        //Verifico si esta en estado de aceptacion y si la solicitud esta lista sin problemas.
        if (this.readyState == 4 && this.status == 200) {
            const result = JSON.parse(this.response);
            const view = ResultInView(result);
            data_result.innerHTML = view;
        }
    }

}

function AjaxPOST(data) {

    /* Instancia de objeto */
    const xhttp = new XMLHttpRequest;

    // Definimos el tipo de metodo.
    const METHOD = 'POST';

    // URI a la cual se le hara la solicitud
    const URI = 'http://localhost:3000/user';

    //Metodo que recibe la configuracion de la solicitud.
    xhttp.open(METHOD, URI, true);

    xhttp.setRequestHeader("Content-type", "application/json");

    // Metodo que esta pendiente al cambio de estado
    xhttp.onreadystatechange = function () {

        //Verifico si esta en estado de aceptacion y si la solicitud esta lista sin problemas.
        if (this.readyState == 4 && this.status == 200) {
            AjaxGET();
        }
    }

    xhttp.send(JSON.stringify(data));

}

function AjaxDELETE(id) {
    /* Instancia de objeto */
    const xhttp = new XMLHttpRequest;

    // Definimos el tipo de metodo.
    const METHOD = 'DELETE';

    // URI a la cual se le hara la solicitud
    const URI = 'http://localhost:3000/user/' + id;

    //Metodo que recibe la configuracion de la solicitud.
    xhttp.open(METHOD, URI, true);

    // Metodo que esta pendiente al cambio de estado
    xhttp.onreadystatechange = function () {

        //Verifico si esta en estado de aceptacion y si la solicitud esta lista sin problemas.
        if (this.readyState == 4 && this.status == 200) {
            AjaxGET();
        }
    }

    xhttp.send();
}


function ValidateForm(form) {

    //Expresion regular para validar el formato de un email
    let emailPattern = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;

    if (form.name.length > 4 && form.username != '') {
        if (emailPattern.test(form.email)) {
            return true;
        }
    }

    return false;

}

/* Retorna todo el html construido con toda la informacion de los usuarios para ser mostrada */
function ResultInView(array) {
    var html = '';
    array.map((data) => {
        html += CardUserInfo(data);
    });
    return html;
}

/* Funcion encarda de construir el html de como se muestra la informacion del usuario */
/* Recive como parametro los datos de un usuario */
function CardUserInfo(user) {
    return `<div class="col s6 info">
                <div class="card deep-orange darken-4">
                <a class="waves-effect waves-light"><i class="material-icons">delete</i></a>
                    <div class="card-content white-text">
                        <p><span class="badge blue">${user._id}</span></p>
                        <hr>
                        <p><span><b>Nombre: </b></span>${user.name}</p>
                        <p><span><b>Username: </b></span>${user.username}</p>
                        <p><span><b>Email: </b></span>${user.email}</p>
                        <hr>
                        <p><span><b>Fecha de registro: </b></span>${user.Created_date}</p>
                    </div>
                </div>
            </div>`;
}