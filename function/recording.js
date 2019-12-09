/*var light = document.getElementById('light');
var dark = document.getElementById('dark');
var dropdownCaret = document.getElementById('dropdownCaret');
var dropdownMenu = document.getElementById('dropdownMenu');
var logo = document.getElementById('logo');
var caret = document.getElementById('caret');

function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}
dark.addEventListener('click',function(){
    setTheme('theme-dark');
    logo.setAttribute('src',"assets/img/logodark.png");
    cerrarMenu();
    event.stopPropagation();
});
light.addEventListener('click',function(){
    setTheme('theme-light');
    logo.setAttribute('src',"assets/img/logo.png");
    cerrarMenu();
    event.stopPropagation();
});
dropdownCaret.addEventListener('click', cerrarMenu)
function cerrarMenu (){
    caret.classList.toggle('open-caret');        
    dropdownMenu.classList.toggle('hidden');
    event.stopPropagation();
}
document.addEventListener('click', function(){
    caret.classList.remove('open-caret');        
    dropdownMenu.classList.add('hidden');
})*/
var btnCancelar = document.getElementById('btnCancelar');
var btnComenzar = document.getElementById('btnComenzar');
var titulo = document.getElementById('titulo');
var contenido = document.getElementById('contenido');


function grabar (){
    titulo.textContent = 'Un Chequeo Antes de Empezar';
    contenido.innerHTML = '<video src="" id="video"></video><button id="btnCapturar" class="btn">Capturar</button>';
    getStreamAndRecord ();
}



btnComenzar.addEventListener('click', grabar);

function getStreamAndRecord () { 
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
        height: { max: 480 }
    }
})

.then(function(stream) {
    video.srcObject = stream;
    console.log('succes');
    video.play()    
})};
