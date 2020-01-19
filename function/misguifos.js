const apiKey = "HxeqWZObT2555n5inNEcjXprIyTed8Iq";
let light = document.getElementById("light");
let dark = document.getElementById("dark");
let logo = document.getElementById("logo");
let caret = document.getElementById("caret");
let caretMenu = document.getElementById("caretMenu");
/*----------Guardar Pagina Actual----------*/
localStorage.setItem("latestPage", "misGuifos");
/*----------Tema----------*/
function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
  if (themeName === "theme-light") {
    logo.setAttribute("src", "assets/img/logo.png");
    caret.classList.remove("whiteCaret");
    caretMenu.classList.remove("whiteCaret");
  } else {
    logo.setAttribute("src", "assets/img/logodark.png");
    caret.classList.add("whiteCaret");
    caretMenu.classList.add("whiteCaret");
  }
}
//Buscar tema elegido anteriormente por el usuario - light por default
if (localStorage.getItem("theme") === "theme-dark") {
  setTheme("theme-dark");
} else {
  setTheme("theme-light");
}
//Cambio de tema desde el menu
dark.addEventListener("click", () => {
  setTheme("theme-dark");
  closeMenu();
  event.stopPropagation();
});
light.addEventListener("click", () => {
  setTheme("theme-light");
  closeMenu();
  event.stopPropagation();
});
/*----------Menu apertura y cierre----------*/
let dropdownCaret = document.getElementById("dropdownCaret");
let dropdownMenu = document.getElementById("dropdownMenu");
let btnOpenMenu = document.getElementById("btnOpenMenu");
let nav = document.getElementById('nav');
//Menu principal
btnOpenMenu.addEventListener("click", () => {
  if (nav.style.display === "flex") {
    nav.style.display = "none";
  } else {
    nav.style.display = "flex";
  }
  caretMenu.classList.toggle("open-caret");
  event.stopPropagation();
});
//Submenu de temas
function closeMenu() {
  caret.classList.toggle("open-caret");
  dropdownMenu.classList.toggle("hidden");
  event.stopPropagation();
}
dropdownCaret.addEventListener("click", closeMenu);
//Hacer que el menu y el submenu se cierren con click en cualquier parte del documento por fuera del menu
document.addEventListener("click", () => {
  caret.classList.remove("open-caret");
  dropdownMenu.classList.add("hidden");
  if (nav.style.display === "flex") {
    nav.style.display = "none";
    caretMenu.classList.toggle("open-caret");
  }
});
/*----------Creacion de Gifs en Mis Guifos----------*/
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
    img.addEventListener("click", () => {
      window.open(response.data.url, "_blank");
    });
    ctnImg.appendChild(img);
    ctnTotal.appendChild(ctnImg);
    ctnMisGuifos.appendChild(ctnTotal);
  });
}
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
    "<p class='error'>OOPS! No has creado ningún Guifo aún. Para crear uno haga <a href= 'recording.html'>click aquí. </a></p>";
}