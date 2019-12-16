var btnCancelar = document.getElementById('btnCancelar');
var btnComenzar = document.getElementById('btnComenzar');
var titulo = document.getElementById('titulo');
var contenido = document.getElementById('contenido');

if(localStorage.getItem('theme') === 'theme-dark'){
    setTheme('theme-dark');
    logo.setAttribute('src',"assets/img/logodark.png");
}else{
    setTheme('theme-light');
    logo.setAttribute('src',"assets/img/logo.png");
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
function getStreamAndRecord () { 
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
        height: { max: 480 }
    }
})
.then(function(stream) {
    video.srcObject = stream;
    console.log('success');
    video.play();
    btnComenzar.textContent='capturar'
})};


btnComenzar.addEventListener('click',function(){
    if( btnComenzar.textContent =='capturar'){
        record();
    }else if(btnComenzar.textContent =='parar'){
        parar();
    }else{
        grabar();
    }
} );


recorder = RecordRTC(stream, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifRecordingStarted: function() {
     console.log('started')
   },
}); 
//metodos start recording y stop recording
function record(){
    recorder.startRecording();
    btnComenzar.textContent='parar';
    console.log('grabar');
}
function record(){
    recorder.stopRecording();
    console.log('parada');
    btnComenzar.textContent='parado';
}