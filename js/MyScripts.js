/* Capturo el elemto del DOM a traves de su Id */
const obtener_datos = document.getElementById('obtener_datos');

const data_result = document.getElementById('data-result');
const info = document.getElementById('info');

const MESSAGEHTML = "<p>Solitud Realizada y Procesada</p>";

obtener_datos.addEventListener('click', function(event){
    /* Llamando a la funcion que realiza mi solicitud AJAX */
    AJAX();
})


function AJAX(){
    /* Instancia de objeto */
    const xhttp = new XMLHttpRequest;

    // Definimos el tipo de metodo.
    const METHOD = 'GET';
    
    // URI a la cual se le hara la solicitud
    const URI = 'https://jsonplaceholder.typicode.com/users';

    // Metodo que esta pendiente al cambio de estado
    xhttp.onreadystatechange = function(){
        // Respuesta del servidor.
        if(this.readyState == 4 && this.status == 200 ){
            const result = JSON.parse(this.response);
            const view = ResultInView(result);
            data_result.style.transition = "1s all"
            data_result.innerHTML = view;
            info.style.transition = "1s all"
            info.style.backgroundColor = "#44bd32"
            info.innerHTML = MESSAGEHTML;
        }
    
    }

    //Metodo que recibe la configuracion de la solicitud.
    xhttp.open(METHOD, URI, true)

    //Enviar la solicitud.
    xhttp.send()

}

function ResultInView(array){
    var html = '';
    array.map((data)=>{
        html += `
            <div class="user-info">
                <p><strong>Nombre: </strong>             ${data.name}        </p>
                <p><strong>Nombre de usuario: </strong>  ${data.username}    </p>
                <p><strong>E-mail:</strong>              ${data.email}        </p>
            </div>
        `;
    });
    return html;
}


