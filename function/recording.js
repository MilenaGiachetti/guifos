var btnCancelar = document.getElementById('btnCancelar');
var btnComenzar = document.getElementById('btnComenzar');
var titulo = document.getElementById('titulo');
var contenido = document.getElementById('contenido');
var video = document.getElementById('video');
var recorder;

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
var stream;
function grabar (){
    titulo.textContent = 'Un Chequeo Antes de Empezar';
    video.classList.remove('hidden');
    instrucciones.classList.add('hidden');
    contenido.style.flexFlow = 'column wrap';
    getStreamAndRecord ();
}

function getStreamAndRecord () { 
    stream = navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
        height: { max: 480 }
    }
    })
    .then(function(stream) {
        video.srcObject = stream;
        console.log('success');
        video.play();
        btnComenzar.classList.add('hidden');
        btnCapturar.classList.remove('hidden');
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
        btnCapturar.addEventListener('click', function(){
            video.srcObject = stream;
            recorder.startRecording();
            recorder.camera = stream;
            btnCapturar.classList.add('hidden');
            btnListo.classList.remove('hidden');
            console.log('grabar');
        });
        function vistaPrevia(){
            btnListo.textContent = 'fin'
            video.src = video.srcObject = null;
            video.src = URL.createObjectURL(recorder.blob);
            recorder.camera.stop();
            recorder = null;
        }
        btnListo.addEventListener('click', function(){
            recorder.stopRecording(vistaPrevia);
            console.log('parada');
        });
    })
    .catch(function(error) {
        alert('Error, no se ha encontrado una camara');
    });
};
    
    btnComenzar.addEventListener('click',grabar);

//metodos start recording y stop recording


/*let stream =  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
        height: { max: 480 }
    }
})
function grabar (stream){
    titulo.textContent = 'Un Chequeo Antes de Empezar';
    video.classList.remove('hidden');
    instrucciones.classList.add('hidden');
    contenido.style.flexFlow = 'column wrap';
    view(stream);
}
        function view (stream) {
            video.srcObject = stream;
            console.log('success');
            video.play();
            btnComenzar.classList.add('hidden');
            btnCapturar.classList.remove('hidden');
        }




btnComenzar.addEventListener('click', grabar());
btnCapturar.addEventListener('click', record);


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
    console.log('grabar');
    btnCapturar.classList.add('hidden');
    btnListo.classList.remove('hidden');

}
function record(){
    recorder.stopRecording();
    console.log('parada');
    btnListo.classList.add('hidden');

}*/