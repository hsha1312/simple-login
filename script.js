// Configurar cada variable con su idem
var usuario = document.getElementById("usuario");
var contrasena = document.getElementById("contrasena");
var text_title = document.getElementById("window_title");
var testino_url = new URLSearchParams(window.location.search).get("gourl");
var testino_title = new URLSearchParams(window.location.search).get("title");
window.url_no_protocolo = ""
var content_zone = document.getElementById("content_zone")
var show_password = document.getElementById("show_password")

// Cargar url
function load_url() {
    console.log("Loading destURL...")
    if (testino_url != null) {
        // Si testino url está
        if (testino_url == "") {
            // Si está vacío
            console.error("Destination URL error: The parameter ?gourl= is present but empty.")
            text_title.textContent = "Destination URL error"
            document.title = text_title.textContent + " | Log in"
            content_zone.innerHTML = `<h1 class=\"error\">Error</h1>
        <p>The parameter <code>?gourl=</code> is present but empty.<p>
        <p>For the login page to work, you need to specify the destination URL for logging in.</p>`
        } else if (testino_url.split("/")[0] != "https:" & testino_url.split("/")[0] != "http:") {
            // Si no es de origen que necesita
            console.error("Invalid origin: The one that has been put in the origin ?gourl= is invalid.")
            text_title.textContent = "Invalid origin"
            document.title = text_title.textContent + " | Log in"
            content_zone.innerHTML = `<h1 class=\"error\">Error</h1>
        <p>The one that has been put in the origin <code>?gourl=</code> is invalid.<p>
        <p>What you have entered is not of https or http origin, check if it is spelled correctly.</p>`
        } else {
            // Si está correcto, ejercuta para obtener datos
            window.protocolo_dest = testino_url.split("/")[0] //Obtener protocolo
            text_title.textContent = "Log in to " + testino_url // Cambiar título de la ventana
            document.title = "Log in to " + testino_url + " | Log in" // Cambiar título
            // Configurar el resto
            var i = 2
            var e = ""
            while (testino_url.split("/").length != i) {
                window.url_no_protocolo = window.url_no_protocolo + e + testino_url.split("/")[i];
                e = "/";
                i++;
            }
            console.log("URL ready: " + window.protocolo_dest + "//" + window.url_no_protocolo);
            console.log("Protocolo: " + window.protocolo_dest + " / URL sin protocolo: " + window.url_no_protocolo);
        }
        if (testino_title != null) {
            // Definir título
            text_title.textContent = "Log in to " + testino_title
            document.title = "Log in to " + testino_title + " | Log in"
            console.log("New title: " + testino_title)
        } else {
            console.warn("The parameter ?title= has not been defined, the title will be ?gourl= by default.")
        }
    } else {
        // Si el destino URL no está
        console.error("Destination URL error: The parameter ?gourl= is missing.")
        text_title.textContent = "Destination URL error"
        document.title = text_title.textContent + " | Log in"
        content_zone.innerHTML = `<h1 class=\"error\">Error</h1>
        <p>The parameter <code>?gourl=</code> is missing.</p>
        <p>For the login page to work, you need to specify the destination URL for logging in.</p>`
    }
}

function inicia_sesion() {
    // Iniciar sesión
    window.location.href = window.protocolo_dest + "//" + usuario.value + ":" + contrasena.value + "@" + window.url_no_protocolo;
}

usuario.addEventListener('keydown', 
    function(e) {
        if(e.keyCode === 13) {
            // Al darse Enter en casilla de usuario
            contrasena.focus()
            console.log("Enter in user input.")
        };
    }
);

contrasena.addEventListener('keydown', 
    function(e) {
        if(e.keyCode === 13) {
            inicia_sesion()
        };
    }
);

// Checkbox para mostrar contraseña
show_password.addEventListener('click', function() {
    if(show_password.checked) {
        contrasena.type = "text"
        console.log("Password displayed")
    } else {
        contrasena.type = "password"
        console.log("Hidden password")
    }
});

load_url()