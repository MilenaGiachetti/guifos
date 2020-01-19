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
let previewTimeSlots = document.querySelectorAll(
  "#previewVisualTimer .timeSlot"
);
let uploadTimeSlots = document.querySelectorAll("#uploadVisualTimer .timeSlot");
let hr;
let min;
let sec;
let msec;
if (localStorage.getItem("theme") === "theme-dark") {
  setTheme("theme-dark");
  logo.setAttribute("src", "assets/img/logodark.png");
  svgCamera.classList.add("white");
  svgArrow.classList.add("white");
} else {
  setTheme("theme-light");
  logo.setAttribute("src", "assets/img/logo.png");
}
function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
}

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

let constraints = (window.constraints = {
  audio: false,
  video: {
    height: { max: 480 }
  }
});
function recordGuifo() {
  navigator.mediaDevices
    .getUserMedia(constraints)
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
      videoWindowClose.addEventListener("click", () => {
        ctnCreator.classList.add("hidden");
        video.pause();
        stream.stop();
      });
      ctnBtnInitialPreview.addEventListener("click", () => {
        recorder.record();
        let dateStarted = new Date().getTime();
        ctnBtnInitialPreview.classList.add("hidden");
        heading.textContent = "Capturando Tu Guifo";
        ctnBtnCapture.classList.remove("hidden");
        recorder.stream = stream;
        (function looper() {
          if (!recorder || ctnBtnCapture.classList.contains("hidden")) {
            return;
          }
          let time = calculateTimeDuration(
            (new Date().getTime() - dateStarted) / 1000
          );
          setTimeout(looper, 300);
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
ctnBtnCapture.addEventListener("click", () => {
  ctnBtnCapture.classList.add("hidden");
  ctnBtnLastPreview.classList.remove("hidden");
  recorder.stop(blob => {
    blob = blob;
    let newDateStarted = new Date().getTime();
    let totalTime = +hr * 24 + min * 60 + sec;
    let slotTime = (totalTime * 1000 + msec) / 15;
    let recordHr = hr;
    let recordMin = min;
    let recordSec = sec;
    let recordMsec = msec;
    hr = 0;
    min = 0;
    sec = 0;
    msec = 0;
    let slotNumber = -1;
    previewTimer.textContent = "00:00:00,00";
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
      if (!recorder || gifContainer.classList.contains("hidden")) {
        for (let i = 0; i < previewTimeSlots.length; i++) {
          previewTimeSlots[i].classList.remove("passedTimeSlot");
        }
        return;
      }
      fillOneSlot();
      setTimeout(fillSlots, slotTime);
    })();
    function calculateTimeDurationPreview(secs) {
      hr = Math.floor(secs / 3600);
      min = Math.floor((secs - hr * 3600) / 60);
      sec = Math.floor(secs - hr * 3600 - min * 60);
      msec = Math.floor((secs - hr * 3600 - min * 60 - sec) * 100);
      if (hr < 10) {
        hr = "0" + hr;
      } else if (hr === 0) {
        hr = "00";
      }
      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }
      if (msec < 10) {
        msec = "0" + msec;
      }
      if (
        hr * 3600 + min * 60 + sec >
        recordHr * 3600 + recordMin * 60 + recordSec
      ) {
        previewTimer.textContent =
          recordHr + ":" + recordMin + ":" + recordSec + "," + recordMsec;
        hr = 0;
        min = 0;
        sec = 0;
        msec = 0;
        newDateStarted = new Date().getTime();
      } else {
        previewTimer.textContent = hr + ":" + min + ":" + sec + "," + msec;
      }
    }
    (function previewLooper() {
      if (!recorder || gifContainer.classList.contains("hidden")) {
        return;
      }
      calculateTimeDurationPreview(
        (new Date().getTime() - newDateStarted) / 1000
      );
      setTimeout(previewLooper, 300);
    })();
    console.log(blob);
    heading.textContent = "Vista Previa";
    video.srcObject = null;
    video.classList.add("hidden");
    imgGIF.classList.remove("hidden");
    let blobURL = URL.createObjectURL(blob);
    imgGIF.src = blobURL;
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
              btnURL.addEventListener("click", () => {
                let dummy = document.createElement("input");
                document.body.appendChild(dummy);
                dummy.value = miGuifoUrl;
                dummy.select();
                document.execCommand("copy");
                document.body.removeChild(dummy);
              });
              btnDownload.addEventListener("click", () => {
                invokeSaveAsDialog(blob,'miGuifo.gif');
              });       
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
            alert("Se cancelo el upload");
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

function calculateTimeDuration(secs) {
  hr = Math.floor(secs / 3600);
  min = Math.floor((secs - hr * 3600) / 60);
  sec = Math.floor(secs - hr * 3600 - min * 60);
  msec = Math.floor((secs - hr * 3600 - min * 60 - sec) * 100);
  if (hr < 10) {
    hr = "0" + hr;
  } else if (hr === 0) {
    hr = "00";
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  if (msec < 10) {
    msec = "0" + msec;
  }
  return hr + ":" + min + ":" + sec + "," + msec;
}
