const apiKey = 'HxeqWZObT2555n5inNEcjXprIyTed8Iq';

let title = document.getElementById('title');
let wimdowImg = document.getElementById('windowImg');
let secondaryTitle = document.getElementById('secondaryTitle');
let imgGIF = document.getElementById('imgGIF');
let instrucciones = document.getElementById('instrucciones');
let ctnBtnPrincipal = document.getElementById('ctnBtnPrincipal');
let btnCancelar = document.getElementById('btnCancelar');
let btnComenzar = document.getElementById('btnComenzar');
let ctnBtnInitialPreview = document.getElementById('ctnBtnInitialPreview');
let ctnBtnCaptura = document.getElementById('ctnBtnCaptura');
let ctnBtnLastPreview = document.getElementById('ctnBtnLastPreview');
let btnRepeat = document.getElementById('btnRepeat');
let btnUpload = document.getElementById('btnUpload');
let ctnBtnFinal = document.getElementById('ctnBtnFinal');
let btnURL = document.getElementById('btnURL');
let btnDownload = document.getElementById('btnDownload');
let btnToStart = document.getElementById('btnToStart');


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
let video = document.querySelector('video');
let recorder;

btnComenzar.addEventListener('click', () => {
    title.textContent = 'Un Chequeo Antes de Empezar';
    windowImg.classList.add('hidden');
    secondaryTitle.classList.add('hidden');
    instrucciones.classList.add('hidden');
    ctnBtnPrincipal.classList.add('hidden');
    video.classList.remove('hidden');
    ctnBtnInitialPreview.classList.remove('hidden');
    grabar();
})

let constraints = window.constraints = {
    audio: false,
    video: {
        height: { max: 480 }
    }
};
function grabar(){
    navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
        video.srcObject = stream;
        video.play();
        console.log('Got strem')
        recorder = new GifRecorder (stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: () => {
                console.log('started')
            },
        });
    })
    .catch((error) => {
        if(error.name === 'ConstraintNotSatisfiedError'){
            alert('Error: Su dispositivo no tiene la resolución requerida')
        }else if (error.name === 'PermissionDeniedError'){
            alert('Error: No se ha dado permiso para usar la cámara, permita el acceso para poder usar esta funcionalidad.')
        }else{
            alert('Error.')
        }
    })
}

ctnBtnInitialPreview.addEventListener('click', () => {
    recorder.record();
    ctnBtnInitialPreview.classList.add('hidden');
    ctnBtnCaptura.classList.remove('hidden');
})
let blob;
ctnBtnCaptura.addEventListener('click', () => {
    recorder.stop((blob) => {
        blob = blob;
        video.classList.add('hidden');
        imgGIF.classList.remove('hidden');    
        console.log(blob);
        let blobURL = URL.createObjectURL(blob);
        imgGIF.src = blobURL;
        btnUpload.addEventListener('click', () => {  
            let form = new FormData();
            form.append('file', recorder.blob, 'myGuifo.gif');
            console.log(form.get('file'));
            upload(form.get('file'))
        })
        btnDownload.addEventListener('click', () => {
            invokeSaveAsDialog(blob);
        })
    });
    ctnBtnCaptura.classList.add('hidden');
    ctnBtnLastPreview.classList.remove('hidden');
    
})


function upload(gif){
    async function giphyUpload(gif){
        let url = "https://upload.giphy.com/v1/gifs&api_key=" + apiKey;
        const resp = await fetch(url);
        const datos = await resp.json();
        return datos;
    }
    datos = giphyUpload(gif);
    datos.then(function(respuesta){
        console.log(respuesta);
    });
}



//api.giphy.com/v1/gifs gif by id endpoint
/*para guardar gifs en la compu creo q se puede agregar nombre del archivo como segundo parametro: blob, 'miGuifo.(extension de gif)'
        invokeSaveAsDialog(blob, 'miGuifo');

/*let stream;
function grabar (){
    titulo.textContent = 'Un Chequeo Antes de Empezar';
    wimdowImg.classList.add('hidden');
    secondaryTitle.classList.add('hidden');
    instrucciones.classList.add('hidden');
    video.classList.remove('hidden');
    getStreamAndRecord ();
}

function getStreamAndRecord () { 
    stream = navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
        height: { max: 480 }
    }
    })
    .then((stream) => {
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
            onGifRecordingStarted:()=> {
             console.log('started')
           },
        }); 
        btnCapturar.addEventListener('click', () => {
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
        btnListo.addEventListener('click', () => {
            recorder.stopRecording(vistaPrevia);
            console.log('parada');
        });
    })
    .catch((error) => {
        alert('Error, no se ha encontrado una camara');
    });
};
    
    btnComenzar.addEventListener('click', grabar);
*/
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