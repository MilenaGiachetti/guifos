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

if(localStorage.getItem('theme') === 'theme-dark'){
    setTheme('theme-dark');
}else{
    setTheme('theme-light');
}
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}
function grabar (){
    titulo.textContent = 'Un Chequeo Antes de Empezar';
    contenido.innerHTML = '<video src="" id="video"></video><button id="btnCapturar" class="btn">Capturar</button>';
    contenido.style.flexFlow = 'column wrap';
    getStreamAndRecord ();
}



btnComenzar.addEventListener('click', grabar);
/*
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

recorder = RecordRTC(stream, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    
    onGifRecordingStarted: function() {
     console.log('started')
   },
}); */
//metodos start recording y stop recording