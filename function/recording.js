const apiKey = "HxeqWZObT2555n5inNEcjXprIyTed8Iq";

let heading = document.getElementById("heading");
let imgGIF = document.getElementById("imgGIF");
let ctnBtnPrincipal = document.getElementById("ctnBtnPrincipal");
let cancelLink = document.getElementById("cancelLink");
let btnStart = document.getElementById("btnStart");
let ctnBtnInitialPreview = document.getElementById("ctnBtnInitialPreview");
let ctnBtnCapture = document.getElementById("ctnBtnCapture");
let ctnBtnLastPreview = document.getElementById("ctnBtnLastPreview");
let btnRepeat = document.getElementById("btnRepeat");
let btnUpload = document.getElementById("btnUpload");
let uploadingContent = document.getElementById("uploadingContent");
let ctnBtnUploading = document.getElementById("ctnBtnUploading");
let ctnBtnFinal = document.getElementById("ctnBtnFinal");
let btnURL = document.getElementById("btnURL");
let btnDownload = document.getElementById("btnDownload");
let btnToStart = document.getElementById("btnToStart");
let svgCamera = document.getElementById("svgCamera");
let svgArrow = document.getElementById("svgArrow");
let gifContainer = document.getElementById("gifContainer");
let startingPage = document.getElementById("startingPage");
let video = document.querySelector("video");
let recorder;
let ctnCreator = document.getElementById("ctnCreator");
let previousPage = document.getElementById("previousPage");
let captureTimer = document.getElementById("captureTimer");
let form;
let blob;
let idAdded = false;
let newGuifo = document.getElementById("newGuifo");
let errorNoGuifo = document.querySelector("#ctnMisGuifos .error");
let previewTimer = document.getElementById("previewTimer");
let previewTimeSlots = document.querySelectorAll("#previewVisualTimer .timeSlot");
let uploadTimeSlots = document.querySelectorAll("#uploadVisualTimer .timeSlot");


/*----------Tema----------*/
function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
}
if (localStorage.getItem("theme") === "theme-dark") {
  setTheme("theme-dark");
  document.querySelector("link[rel='shortcut icon']").href = "assets/img/favicondark.ico";
  logo.setAttribute("src", "assets/img/logodark.png");
  svgCamera.classList.add("white");
  svgArrow.classList.add("white");
} else {
  setTheme("theme-light");
  document.querySelector("link[rel='shortcut icon']").href = "assets/img/favicon.ico";
  logo.setAttribute("src", "assets/img/logo.png");
}

/*----------Ir para atras----------*/
previousPage.addEventListener("click", () => {
  if (localStorage.getItem("currentPage") === "index") {
    previousPage.setAttribute("href", "index.html");
  } else {
    previousPage.setAttribute("href", "misguifos.html");
  }
});
cancelLink.addEventListener("click", () => {
  if (localStorage.getItem("currentPage") === "index") {
    cancelLink.setAttribute("href", "index.html");
  } else {
    cancelLink.setAttribute("href", "misguifos.html");
  }
});


// grabar Guifo
let constraints = (window.constraints = {
  audio: false,
  video: {
    height: { max: 480 }
  }
});
let hr;
let min;
let sec;
function recordGuifo() {
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      video.srcObject = stream;
      video.play();
      console.log("Got stream");
      recorder = new GifRecorder(stream, {
        type: "gif",
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        timeSlice: 1000,
        onGifRecordingStarted: () => {
          console.log("started");
        }
      });
      //funcion x, cerrar ventana
      videoWindowClose.addEventListener("click", () => {
        ctnCreator.classList.add("hidden");
        video.pause();
        stream.stop();
      });
      //funcion de capturar, empieza a grabar
      ctnBtnInitialPreview.addEventListener("click", () => {
        recorder.record();
        let dateStarted = new Date().getTime();
        ctnBtnInitialPreview.classList.add("hidden");
        heading.textContent = "Capturando Tu Guifo";
        ctnBtnCapture.classList.remove("hidden");
        recorder.stream = stream;
        //comienza a contar para el timer
        (function looper() {
          if (!recorder || ctnBtnCapture.classList.contains("hidden")) {
            return;
          }
          let time = calculateTimeDuration(
            (new Date().getTime() - dateStarted) / 1000
          );
          setTimeout(looper, 500);
          captureTimer.textContent = time;
        })();
      });
    })
    .catch(error => {
      if (error.name === "ConstraintNotSatisfiedError") {
        alert("Error: Su dispositivo no tiene la resolución requerida");
      } else if (error.name === "PermissionDeniedError") {
        alert(
          "Error: No se ha dado permiso para usar la cámara, permita el acceso para poder usar esta funcionalidad."
        );
      } else {
        alert("Error.");
      }
    });
}
//funcion para boton de listo, se deja de grabar el gif y se muestra la vista previa
let recordHr;
let recordMin;
let recordSec;
let totalTime;
let slotTime;
ctnBtnCapture.addEventListener("click", () => {
  ctnBtnCapture.classList.add("hidden");
  ctnBtnLastPreview.classList.remove("hidden");
  recorder.stop(blob => {
    blob = blob;
    console.log(blob);
    heading.textContent = "Vista Previa";
    video.srcObject = null;
    video.classList.add("hidden");
    imgGIF.classList.remove("hidden");
    let blobURL = URL.createObjectURL(blob);
    imgGIF.src = blobURL;
    //se comienza timer de repeticion
    let newDateStarted = new Date().getTime();
    totalTime = +hr * 3600 + min * 60 + sec;
    recordHr = hr;
    recordMin = min;
    recordSec = sec;
    hr = 0;
    min = 0;
    sec = 0;
    slotTime = (totalTime * 1000) / 15;
    let slotNumber = -1;
    previewTimer.textContent = "00:00:00:00";
    //funcion para el preview visual timer
    function fillOneSlot() {
      if (slotNumber === previewTimeSlots.length - 1) {
        previewTimeSlots[slotNumber].classList.add("passedTimeSlot");
        slotNumber = -1;
      } else if (slotNumber === -1) {
        for (let i = 0; i < previewTimeSlots.length; i++) {
          previewTimeSlots[i].classList.remove("passedTimeSlot");
        }
        slotNumber++;
      } else {
        previewTimeSlots[slotNumber].classList.add("passedTimeSlot");
        slotNumber++;
      }
    }
    (function fillSlots() {
      if (!recorder || imgGIF.classList.contains("hidden")) {
        for (let i = 0; i < previewTimeSlots.length; i++) {
          previewTimeSlots[i].classList.remove("passedTimeSlot");
        }
        return;
      }
      fillOneSlot();
      setTimeout(fillSlots, slotTime);
    })();
    function calculateTimeDurationPreview(secs) {
      hrPrev = Math.floor(secs / 3600);
      minPrev = Math.floor((secs - hrPrev * 3600) / 60);
      secPrev = Math.floor(secs - hrPrev * 3600 - minPrev * 60);
      if (hrPrev < 10) {
        hrPrev = "0" + hrPrev;
      } 
      if (minPrev < 10) {
        minPrev = "0" + minPrev;
      }
      if (secPrev < 10) {
        secPrev = "0" + secPrev;
      }
      if (
        hrPrev * 3600 + minPrev * 60 + secPrev >=
        totalTime
      ) {
        previewTimer.textContent =
        "00:" + recordHr + ":" + recordMin + ":" + recordSec;
        hrPrev = 0;
        minPrev = 0;
        secPrev = 0;
        newDateStarted = new Date().getTime();
      } else {
        previewTimer.textContent = "00:" + hrPrev + ":" + minPrev + ":" + secPrev;
      }
    }
    (function previewLooper() {
      if (!recorder || gifContainer.classList.contains("hidden")) {
        return;
      }
      calculateTimeDurationPreview(
        (new Date().getTime() - newDateStarted) / 1000
      );
      setTimeout(previewLooper, 500);
    })();
    //subir gif a giphy
    btnUpload.addEventListener("click", () => {
      imgGIF.classList.add("hidden");
      heading.textContent = "Subiendo Guifo";
      let slotNumber = -1;
      gifContainer.classList.add("hidden");
      ctnBtnLastPreview.classList.add("hidden");
      uploadingContent.classList.remove("hidden");
      ctnBtnUploading.classList.remove("hidden");
      function fillOneSlot() {
        if (slotNumber === uploadTimeSlots.length - 1) {
          uploadTimeSlots[slotNumber].classList.add("passedTimeSlot");
          slotNumber = -1;
        } else if (slotNumber === -1) {
          for (let i = 0; i < uploadTimeSlots.length; i++) {
            uploadTimeSlots[i].classList.remove("passedTimeSlot");
          }
          slotNumber++;
        } else {
          uploadTimeSlots[slotNumber].classList.add("passedTimeSlot");
          slotNumber++;
        }
      }
      (function fillSlots() {
        if (uploadingContent.classList.contains("hidden")) {
          for (let i = 0; i < uploadTimeSlots.length; i++) {
            uploadTimeSlots[i].classList.remove("passedTimeSlot");
          }
          return;
        }
        fillOneSlot();
        setTimeout(fillSlots, 500);
      })();
      const controller = new AbortController();
      const signal = controller.signal;
      //boton para cancelar la subida
      ctnBtnUploading.addEventListener("click", () => {
        controller.abort();
      });
      if (blobURL !== null) {
        let form = new FormData();
        form.append("file", recorder.blob, "miGuifo.gif");
        fetch("https://upload.giphy.com/v1/gifs?api_key=" + apiKey, {
          signal,
          method: "POST",
          body: form
        })
          .then(res => res.json())
          .then(response => { 
            let misGuifosActual;
            let newId = response.data.id;
            if (localStorage.getItem("misGuifos") === null) {
              let misGuifosActual = [newId];
              localStorage.setItem(
                "misGuifos",
                JSON.stringify(misGuifosActual)
              );
              errorNoGuifo.classList.add("hidden");
            } else {
              misGuifosActual = JSON.parse(localStorage.misGuifos);
              misGuifosActual.push(newId);
              localStorage.setItem(
                "misGuifos",
                JSON.stringify(misGuifosActual)
              );
            }
            idAdded = true;
            generateMisGuifos(newId);
            return response.data.id;
          })
          .then(response => {
            uploadingContent.classList.add("hidden");
            ctnBtnUploading.classList.add("hidden");
            async function generateMyGuifo(response) {
              let url =
                "https://api.giphy.com/v1/gifs/" +
                response +
                "?api_key=" +
                apiKey;
              const resp = await fetch(url);
              const data = await resp.json();
              return data;
            }
            data = generateMyGuifo(response);
            data.then(response => {
              heading.textContent = "Guifo Subido Con Éxito";
              newGuifo.style.background =
                "url(" +
                response.data.images.fixed_width.url +
                ") center center";
              newGuifo.style.backgroundSize = "100% auto";
              let miGuifoUrl = response.data.url;
              //Copia del link del gif
              btnURL.addEventListener("click", () => {
                let dummy = document.createElement("input");
                document.body.appendChild(dummy);
                dummy.value = miGuifoUrl;
                dummy.select();
                document.execCommand("copy");
                document.body.removeChild(dummy);
              });
              //Descarga del gif
              btnDownload.addEventListener("click", () => {
                invokeSaveAsDialog(blob,'miGuifo.gif');
              });       
              //Boton para ir al comienzo otra vez
              btnToStart.addEventListener("click", () => {
                heading.textContent = "Crear Guifos";
                ctnBtnFinal.classList.add("hidden");
                videoWindowClose.classList.add("hidden");
                startingPage.classList.remove("hidden");
                ctnBtnPrincipal.classList.remove("hidden");
                blobURL = URL.revokeObjectURL(blobURL);
                blobURL = null;
                blob = null;
                recorder = null;
              });
              ctnBtnFinal.classList.remove("hidden");
            });
          })
          .catch(error => {
            console.error("Error al ejecutar el Fetch: ", error);
            alert("Se canceló el upload");
            blobURL = URL.revokeObjectURL(blobURL);
            blobURL = null;
            blob = null;
            recorder = null;
            heading.textContent = "Crear Guifos";
            startingPage.classList.remove("hidden");
            ctnBtnPrincipal.classList.remove("hidden");
            videoWindowClose.classList.add("hidden");
            uploadingContent.classList.add("hidden");
          });
      }
    });
    //Repetir la captura sin subirlo
    btnRepeat.addEventListener("click", () => {
      blobURL = URL.revokeObjectURL(blobURL);
      blobURL = null;
      blob = null;
      recorder = null;
      imgGIF.classList.add("hidden");
      heading.textContent = "Un Chequeo Antes de Empezar";
      ctnBtnLastPreview.classList.add("hidden");
      video.classList.remove("hidden");
      ctnBtnInitialPreview.classList.remove("hidden");
      recordGuifo();
    });
  });
});
function calculateTimeDuration(secs) {
  hr = Math.floor(secs / 3600);
  min = Math.floor((secs - hr * 3600) / 60);
  sec = Math.floor(secs - hr * 3600 - min * 60);
  if (hr < 10) {
    hr = "0" + hr;
  } 
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  return  "00:" +  hr + ":" + min + ":" + sec;
}
//Comenzar a grabar el gif
btnStart.addEventListener("click", () => {
  heading.textContent = "Un Chequeo Antes de Empezar";
  startingPage.classList.add("hidden");
  ctnBtnPrincipal.classList.add("hidden");
  videoWindowClose.classList.remove("hidden");
  gifContainer.classList.remove("hidden");
  video.classList.remove("hidden");
  ctnBtnInitialPreview.classList.remove("hidden");
  recordGuifo();
});

//Mostrar mis Guifos creados
let ctnMisGuifos = document.getElementById("ctnMisGuifos");
if (localStorage.getItem("misGuifos") !== null) {
  let storageMisGuifosActual = JSON.parse(localStorage.misGuifos);
  if (storageMisGuifosActual.length === 0) {
    ctnMisGuifos.innerHTML =
      "<p class='error'>OOPS! No has creado ningún Guifo aún. </p>";
  } else {
    for (let i = storageMisGuifosActual.length - 1; i >= 0; i--) {
      generateMisGuifos(storageMisGuifosActual[i]);
    }
  }
} else {
  ctnMisGuifos.innerHTML =
    "<p class='error'>OOPS! No has creado ningún Guifo aún. </p>";
}
function generateMisGuifos(id) {
  async function generateMyGuifo(id) {
    let url = "https://api.giphy.com/v1/gifs/" + id + "?api_key=" + apiKey;
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  }
  data = generateMyGuifo(id);
  data.then(response => {
    let ctnTotal = document.createElement("div");
    ctnTotal.setAttribute("class", "ctnTotal");
    let ctnImg = document.createElement("div");
    ctnImg.setAttribute("class", "ctnImg");
    let img = document.createElement("div");
    img.setAttribute("class", "img");
    img.style.background =
      "url(" + response.data.images.fixed_height.url + ") center center";
    img.style.backgroundSize = "auto 100%";
    img.addEventListener("click", function() {
      window.open(response.data.url, "_blank");
    });
    ctnImg.appendChild(img);
    ctnTotal.appendChild(ctnImg);
    if (idAdded !== true) {
      ctnMisGuifos.appendChild(ctnTotal);
    } else {
      ctnMisGuifos.insertBefore(ctnTotal, ctnMisGuifos.firstChild);
      idAdded === false;
    }
  });
}