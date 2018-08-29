/* Capturo el elemeto del DOM a traves de su Id */
const obtener_datos = document.getElementById('obtener_datos');

const data_result = document.getElementById('data-result');
const info = document.getElementById('message-info');

const MESSAGE = "Solitud Realizada y Procesada";

var instance = M.Tabs.init('tabs');

obtener_datos.addEventListener('click', event => {
    /* Llamando a la funcion que realiza mi solicitud AJAX */
    FunctionAJAX();
})

function FunctionAJAX(){
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
    xhttp.onreadystatechange = function(){
        
        //Verifico si esta en estado de aceptacion y si la solicitud esta lista sin problemas.
        if(this.readyState == 4 && this.status == 200 ){
            const result = JSON.parse(this.response);
            console.log(result);
            const view = ResultInView(result);
            info.style.borderLeftColor = "#44bd32"
            info.innerHTML = MESSAGE;
            obtener_datos.remove(this);
            data_result.innerHTML = view;
        }
    }

}

/* Retorna todo el html construido con toda la informacion de los usuarios para ser mostrada */
function ResultInView(array){
    var html = '';
    array.map((data)=>{
        html += CardUserInfo(data);
    });
    return html;
}

/* Funcion encarda de construir el html de como se muestra la informacion del usuario */
/* Recive como parametro los datos de un usuario */
function CardUserInfo(user){
    return `<div class="col s6">
                <div class="card deep-orange darken-4">
                    <div class="card-content white-text">
                        <p><span><b>Nombre: </b></span>${user.name}</p>
                        <p><span><b>Username: </b></span>${user.username}</p>
                        <p><span><b>Email: </b></span>${user.email}</p>
                        <hr>
                        <p><span><b>Fecha de registro: </b></span>${user.Created_date}</p>
                    </div>
                </div>
            </div>`;
}