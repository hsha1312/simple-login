var usuario = document.getElementById("usuario");
var contrasena = document.getElementById("contrasena");
var text_title = document.getElementById("window_title");
var testino_url = new URLSearchParams(window.location.search).get("gourl");
var protocolo_dest = testino_url.split("/")[0]
window.url_no_protocolo = ""

var i = 2
var e = ""
while (testino_url.split("/").length != i) {
    window.url_no_protocolo = window.url_no_protocolo + e + testino_url.split("/")[i];
    e = "/";
    i++;
}

text_title.textContent = testino_url

usuario.addEventListener('keydown', 
    function(e) {
        if(e.keyCode === 13) {
            inicia_sesion()
            console.log(e.target.value);
        };
    }
);

contrasena.addEventListener('keydown', 
    function(e) {
        if(e.keyCode === 13) {
            inicia_sesion()
            console.log(e.target.value);
        };
    }
);

function inicia_sesion() {
    window.location.href = protocolo_dest + "//" + usuario.value + ":" + contrasena.value + "@" + window.url_no_protocolo;
}

