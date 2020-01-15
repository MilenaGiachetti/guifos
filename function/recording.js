const apiKey = 'HxeqWZObT2555n5inNEcjXprIyTed8Iq';

let title = document.getElementById('title');
let imgGIF = document.getElementById('imgGIF');
let ctnBtnPrincipal = document.getElementById('ctnBtnPrincipal');
let cancelLink = document.getElementById('cancelLink');
let btnComenzar = document.getElementById('btnComenzar');
let ctnBtnInitialPreview = document.getElementById('ctnBtnInitialPreview');
let ctnBtnCaptura = document.getElementById('ctnBtnCaptura');
let ctnBtnLastPreview = document.getElementById('ctnBtnLastPreview');
let btnRepeat = document.getElementById('btnRepeat');
let btnUpload = document.getElementById('btnUpload');
let contenidoUploading = document.getElementById('contenidoUploading');
let ctnBtnUploading = document.getElementById('ctnBtnUploading');
let ctnBtnFinal = document.getElementById('ctnBtnFinal');
let btnURL = document.getElementById('btnURL');
let btnDownload = document.getElementById('btnDownload');
let btnToStart = document.getElementById('btnToStart');
let svgCamera = document.getElementById('svgCamera');
let svgArrow = document.getElementById('svgArrow');
let gifContainer = document.getElementById('gifContainer');
let startingPage = document.getElementById('startingPage');


if(localStorage.getItem('theme') === 'theme-dark'){
    setTheme('theme-dark');
    logo.setAttribute('src',"assets/img/logodark.png");
    svgCamera.classList.add('white');
    svgArrow.classList.add('white');
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
let ctnCreador = document.getElementById('ctnCreador');
let previousPage = document.getElementById('previousPage');
let captureTimer = document.getElementById('captureTimer');
previousPage.addEventListener('click', () => {
    if(localStorage.getItem('currentPage') === 'index'){
        previousPage.setAttribute('href',"index.html");
    }else{
        previousPage.setAttribute('href',"misguifos.html");
    }
})
cancelLink.addEventListener('click', () => {
    if(localStorage.getItem('currentPage') === 'index'){
        cancelLink.setAttribute('href',"index.html");
    }else{
        cancelLink.setAttribute('href',"misguifos.html");
    }
})
btnComenzar.addEventListener('click', () => {
    title.textContent = 'Un Chequeo Antes de Empezar';
    startingPage.classList.add('hidden');
    ctnBtnPrincipal.classList.add('hidden');
    videoWindowClose.classList.remove('hidden');
    gifContainer.classList.remove('hidden');
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
        console.log('Got stream')
        recorder = new GifRecorder (stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            timeSlice: 1000,
            onGifRecordingStarted: () => {
                console.log('started')
            },
        });
        videoWindowClose.addEventListener('click', () => {
            ctnCreador.classList.add('hidden');
            video.pause();
            stream.stop();
        })
        ctnBtnInitialPreview.addEventListener('click', () => {
            recorder.record();
            dateStarted = new Date().getTime();
            (function looper() {
                if(!recorder) {
                    return;
                }
                calculateTimeDuration((new Date().getTime() - dateStarted) / 1000);
                setTimeout(looper, 100);
            })();
            recorder.stream = stream;
            ctnBtnInitialPreview.classList.add('hidden');
            ctnBtnCaptura.classList.remove('hidden');
        })


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
if (localStorage.getItem("misGuifos") !== null) {
    let storageMisGuifosActual = JSON.parse(localStorage.misGuifos);
        //ctnMisGuifos.innerHTML = '';
    for(let i = storageMisGuifosActual.length-1 ; i >= 0; i--){
        generateMisGuifos (storageMisGuifosActual[i]);
    }
}
let ctnMisGuifos = document.getElementById('ctnMisGuifos');
function generateMisGuifos (id){
    async function generateMyGuifo(id){
        let url = "http://api.giphy.com/v1/gifs/" + id + "?api_key=" + apiKey;
        const resp = await fetch(url);
        const datos = await resp.json();
        return datos;
    }
    datos = generateMyGuifo(id);
    datos.then((respuesta) => {
        let ctnTotal = document.createElement('div');
        ctnTotal.setAttribute('class', 'ctnTotal');
        let ctnImg = document.createElement('div');
        ctnImg.setAttribute('class', 'ctnImg');
        let img = document.createElement('div');
        img.setAttribute('class', 'img');  
        img.style.background = 'url('+respuesta.data.images.fixed_height.url+') center center';
        /*background-size: auto 100%;*/
        img.style.backgroundSize = 'auto 100%';
        if(respuesta.data.images.fixed_height.width >= '360'){
            if(i !== firstIndexSearch[currentPage]){
                ctnTotal.classList.add('largeTotal');
                ctnImg.classList.add('largeImg');
            }
        }
        img.addEventListener('click', function(){
            window.open(respuesta.data.url,'_blank');
        });
        ctnImg.appendChild(img);
        ctnTotal.appendChild(ctnImg);
        if(idAdded !== true){
            ctnMisGuifos.appendChild(ctnTotal);
        }else{
            ctnMisGuifos.insertBefore(ctnTotal, ctnMisGuifos.firstChild);
            idAdded === false;
        }
    })
}

let blob;
let data;
let form ;
let idAdded = false;

let previewTimer = document.getElementById('previewTimer');
ctnBtnCaptura.addEventListener('click', () => {
    recorder.stop((blob) => {
        console.log('Time is:'+hr + ':' + min + ':' + sec + ':' + msec);
        previewTimer.textContent = hr + ':' + min + ':' + sec + ':' + msec;
        blob = blob;
        video.srcObject = null;
        video.classList.add('hidden');
        imgGIF.classList.remove('hidden');    
        console.log(blob);
        let blobURL = URL.createObjectURL(blob);
        imgGIF.src = blobURL;

        btnRepeat.addEventListener('click', () => {
            blobURL = URL.revokeObjectURL(blobURL);
            blobURL = null;
            blob = null;
            recorder.clearRecordedData();
            recorder = null;
            imgGIF.classList.add('hidden');   
            ctnBtnLastPreview.classList.add('hidden'); 
            video.classList.remove('hidden');
            ctnBtnInitialPreview.classList.remove('hidden');
            grabar();
        })
        btnUpload.addEventListener('click', () => {   
            if(blobURL !== null){
                let form = new FormData();
                form.append('file', recorder.blob, 'miGuifo.gif');
                console.log(form.get('file'));
                console.log(blobURL); 
                fetch('https://upload.giphy.com/v1/gifs?api_key=' + apiKey, {
                    method: 'POST',
                    body: form
                })
                .then(res => res.json())
                .catch(error => console.error('Error al ejecutar el Fetch: ', error))
                .then((response) => {
                    let misGuifosActual;
                    let newId = response.data.id;
                    if (localStorage.getItem("misGuifos") === null) {
                        let misGuifosActual = [newId];
                        localStorage.setItem('misGuifos', JSON.stringify(misGuifosActual));
                    }else{
                        misGuifosActual = JSON.parse(localStorage.misGuifos);
                        misGuifosActual.push(newId);
                        localStorage.setItem("misGuifos", JSON.stringify(misGuifosActual));    
                    }
                    console.log(response.data.id);
                    idAdded = true;
                    generateMisGuifos (newId);
                });
                imgGIF.classList.add('hidden');    
                gifContainer.classList.add('hidden');
                ctnBtnLastPreview.classList.add('hidden');
                contenidoUploading.classList.remove('hidden');
                ctnBtnUploading.classList.remove('hidden');
            }

        });
        btnDownload.addEventListener('click', () => {
            invokeSaveAsDialog(blob);
        })
    });
    ctnBtnCaptura.classList.add('hidden');
    ctnBtnLastPreview.classList.remove('hidden');
    
})
let hr;
let min;
let sec;
let msec;
function calculateTimeDuration(secs) {
    hr = Math.floor(secs / 3600);
    min = Math.floor((secs - (hr * 3600)) / 60);
    sec = Math.floor(secs - (hr * 3600) - (min * 60));
    msec = Math.floor((secs - (hr * 3600) - (min * 60)-sec)*100);
    if (hr < 10) {
        hr = "0" + hr;
    }else if (hr === 0){
        hr = '00'
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    if (msec < 10){
        msec = "0" + msec;
    }
    captureTimer.textContent = hr + ':' + min + ':' + sec + ':' + msec;
}


/*'http://api.giphy.com/v1/gifs/IccczI41mAIxf00g6J?api_key='+ apiKey;


let newId = response.data.id;
if (localStorage.getItem("misGuifos") === null) {
    localStorage.setItem('misGuifos', newId);
}else{
    let misGuifosActual = JSON.parse(localStorage.misGuifos);
    misGuifosActual.push(newId);
    localStorage.setItem("misGuifos", JSON.stringify(misGuifosActual));    
}
*/