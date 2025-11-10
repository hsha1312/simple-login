var usuario = document.getElementById("usuario");
var contrasena = document.getElementById("contrasena");
var text_title = document.getElementById("window_title");
var testino_url = new URLSearchParams(window.location.search).get("gourl");
var testino_title = new URLSearchParams(window.location.search).get("title");
window.url_no_protocolo = ""
var content_zone = document.getElementById("content_zone")
var show_password = document.getElementById("show_password")

function load_url() {
    if (testino_url != null) {
        if (testino_url == "") {
            text_title.textContent = "Destination URL error"
            document.title = text_title.textContent + " | Log in"
            content_zone.innerHTML = `<h1 class=\"error\">Error</h1>
        <p>The parameter <code>?gourl=</code> is present but empty.<p>
        <p>For the login page to work, you need to specify the destination URL for logging in.</p>`
        } else if (testino_url.split("/")[0] != "https:" & testino_url.split("/")[0] != "http:") {
            text_title.textContent = "Invalid origin"
            document.title = text_title.textContent + " | Log in"
            content_zone.innerHTML = `<h1 class=\"error\">Error</h1>
        <p>The one that has been put in the origin <code>?gourl=</code> is invalid.<p>
        <p>What you have entered is not of https or http origin, check if it is spelled correctly.</p>`
        } else {
            window.protocolo_dest = testino_url.split("/")[0]
            text_title.textContent = "Log in to " + testino_url
            document.title = "Log in to " + testino_url + " | Log in"
            var i = 2
            var e = ""
            while (testino_url.split("/").length != i) {
                window.url_no_protocolo = window.url_no_protocolo + e + testino_url.split("/")[i];
                e = "/";
                i++;
            }
        }
        if (testino_title != null) {
            text_title.textContent = "Log in to " + testino_title
            document.title = "Log in to " + testino_title + " | Log in"
        }
    } else {
        text_title.textContent = "Destination URL error"
        document.title = text_title.textContent + " | Log in"
        content_zone.innerHTML = `<h1 class=\"error\">Error</h1>
        <p>The parameter <code>?gourl=</code> is missing.</p>
        <p>For the login page to work, you need to specify the destination URL for logging in.</p>`
    }
}

function inicia_sesion() {
    window.location.href = window.protocolo_dest + "//" + usuario.value + ":" + contrasena.value + "@" + window.url_no_protocolo;
}

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

show_password.addEventListener('click', function() {
    if(show_password.checked) {
        contrasena.type = "text"
    } else {
        contrasena.type = "password"
    }
});

load_url()