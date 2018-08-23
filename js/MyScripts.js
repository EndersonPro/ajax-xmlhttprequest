/* Capturo el elemto del DOM a traves de su Id */
const obtener_datos = document.getElementById('obtener_datos');

obtener_datos.addEventListener('click', function(event){
    /* Llamando a la funcion que realiza mi solicitud AJAX */
    AJAX();
})


function AJAX(uri){

    /* Instancia de objeto */
    const xhttp = new XMLHttpRequest;

    /* Defino una UR por defecto a la cual mi metodo hace la solicitud */
    const defaultURI = 'https://jsonplaceholder.typicode.com/users';

    // Definimos el tipo de metodo.
    const METHOD = 'GET';
    
    // URI a la cual se le hara la solicitud
    const URI = typeof(uri) != 'undefined' ? uri : defaultURI;

    console.log(URI);
    // Metodo que esta pendiente al cambio de estado
    xhttp.onreadystatechange = function(){
        // Respuesta del servidor.
        if(xhttp.readyState == 4 && xhttp.status == 200 ){
            console.log(this.response)
        }
    }

    //Metodo que recibe la configuracion de la solicitud.
    xhttp.open(METHOD, URI, true)

    //Enviar la solicitud.
    xhttp.send()

}


