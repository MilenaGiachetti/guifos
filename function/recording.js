const apiKey = 'HxeqWZObT2555n5inNEcjXprIyTed8Iq';

let title = document.getElementById('title');
let wimdowImg = document.getElementById('windowImg');
let secondaryTitle = document.getElementById('secondaryTitle');
let imgGIF = document.getElementById('imgGIF');
let instrucciones = document.getElementById('instrucciones');
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
    windowImg.classList.add('hidden');
    secondaryTitle.classList.add('hidden');
    instrucciones.classList.add('hidden');
    ctnBtnPrincipal.classList.add('hidden');
    videoWindowClose.classList.remove('hidden');
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


let blob;
let data;
let form ;
  
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
        btnUpload.addEventListener('click', () => {   
            let form = new FormData();
            form.append('file', recorder.blob, 'miGuifo.gif');
            console.log(form.get('file'));
            fetch('https://upload.giphy.com/v1/gifs?api_key=' + apiKey, {
                method: 'POST',
                body: form,
                headers: {
                    'API-Key': apiKey,
                    'Content-Type': 'multipart/form-data',
                },
                mode: 'no-cors',
            })
            .then((response) => {
                if (response.ok) {
                    let json = response.json();
                    console.log(json);
                    return json;
                }else{
                    console.log('Problema subiendo el GIF');
                }
            })
            .catch((error) => {
                console.log('Error al ejecutar Fetch' + error);
            })
            imgGIF.classList.add('hidden');    
            ctnBtnLastPreview.classList.add('hidden');
            contenidoUploading.classList.remove('hidden');
            ctnBtnUploading.classList.remove('hidden');

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


btnRepeat.addEventListener('click', () => {
    imgGIF.classList.add('hidden');   
    ctnBtnLastPreview.classList.add('hidden'); 
    video.classList.remove('hidden');
    ctnBtnInitialPreview.classList.remove('hidden');
    grabar();
})


/*            
let newId;

async function randomId(){
    let url = 'https://api.giphy.com/v1/randomid?api_key=' + apiKey;
    let resp = await fetch(url);
    let random = await resp.json();
    newId = random.data.random_id
    return newId;
}      
form = new FormData();
            form.append('file', recorder.blob, 'myGuifo.gif');
            form.append('api_key', 'HxeqWZObT2555n5inNEcjXprIyTed8Iq');
            form.append('gif_id', base64data);

            let reader = new FileReader();
            reader.readAsDataURL(recorder.blob); 
            reader.onload = function(){
                base64data = reader.result;                
                console.log(base64data);
                function uploadToGiphy(){
                    console.log(base64data);
                    fetch('https://upload.giphy.com/v1/gifs?api_key=HxeqWZObT2555n5inNEcjXprIyTed8Iq',{
                        method: 'POST',
                        headers: {
                            'api_key' : 'HxeqWZObT2555n5inNEcjXprIyTed8Iq',
                            'username' : 'Milenaag',
                            'Content-Type': 'multipart/form-data',
                            //'gif_id' : base64data
                        },
                        data : {
                            api_key : 'HxeqWZObT2555n5inNEcjXprIyTed8Iq',
                            file: {
                                value: base64data,
                                contentType: 'image/gif'
                            },
                        },
                        mode: 'no-cors',
                        body: form,
                    })
                    .then((response) => {
                        if (response.ok) {
                            let json = response.json();
                            console.log(json);
                            return json;
                        }else{
                            console.log('Problema subiendo el GIF');
                        }
                    })
                    .catch((error) => {
                        console.log('Error al ejecutar Fetch' + error);
                    })
                }
                uploadToGiphy();
            }
        form = new FormData();
            form.append('file', base64data, 'myGuifo.gif');
            form.append('api_key', 'HxeqWZObT2555n5inNEcjXprIyTed8Iq');
        form.append('username', 'Milenaag');;
        form.append('gif_id', newId);


            console.log(form.get('file'));
            upload(postData).then((gifUrl) => {
                console.log('Posted to' + gifUrl);
                data = {
                    api_key : 'HxeqWZObT2555n5inNEcjXprIyTed8Iq',
                    file: {
                        value: recorder.blob,
                        contentType: 'image/gif'
                    }
                }*/
/*function upload(postData){
    let options = {
        url: 'https://upload.giphy.com/v1/gifs&api_key=;'+ postData.api_key,
        formData: {
            api_key = 'HxeqWZObT2555n5inNEcjXprIyTed8Iq',
            file: {
                value: recorder.blob,
                contentType: 'myGuifo.gif'
            }
        },
        json: true
    };
    console.log('Uploading via '+ options.url);
    const promise = new Promise((resolve, reject) => {
        request.post(options, function(e, resp, body){
            if(e  || resp.statusCode !== 200) console.log('giphy upload failed: ' + e);
            resolve('https://media.giphy.com/media/'+body.data.id+'/giphy.gif')
        });
    });
    return p
    /*async function giphyUpload(gif){
        let url = "https://upload.giphy.com/v1/gifs&api_key=" + apiKey;
        const resp = await post(url);
        const datos = await resp.json();
        return datos;
    }
    datos = giphyUpload(gif);
    datos.then(function(respuesta){
        console.log(respuesta);
    });
}*/



//api.giphy.com/v1/gifs gif by id endpoint
/*para guardar gifs en la compu creo q se puede agregar nombre del archivo como segundo parametro: blob, 'miGuifo.(extension de gif)'
        invokeSaveAsDialog(blob, 'miGuifo');
*/