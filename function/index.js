const apiKey = "HxeqWZObT2555n5inNEcjXprIyTed8Iq";
let light = document.getElementById("light");
let dark = document.getElementById("dark");
let dropdownCaret = document.getElementById("dropdownCaret");
let dropdownMenu = document.getElementById("dropdownMenu");
let logo = document.getElementById("logo");
let caret = document.getElementById("caret");
let ctnPageLeft = document.getElementById("ctnPageLeft");
let ctnPageRight = document.getElementById("ctnPageRight");
let pageLeftTrend = document.getElementById("pageLeftTrend");
let pageRightTrend = document.getElementById("pageRightTrend");
let btnOpenMenu = document.getElementById("btnOpenMenu");
let caretMenu = document.getElementById("caretMenu");
let caretTopTrend = document.getElementById("caretTopTrend");
let caretTopSearch = document.getElementById("caretTopSearch");
let imgLens = document.getElementById("imgLens");
let nav = document.getElementById("nav");
let ctnSearch = document.getElementById("ctnSearch");
let ctnTrending = document.getElementById("ctnTrending");
let ctnSuggestion = document.getElementById("ctnSuggestion");
let searchInput = document.getElementById("searchInput");
let searchSuggestion = document.getElementById("searchSuggestion");
let searchHeading = document.getElementById("searchHeading");
let btnSearch = document.getElementById("btnSearch");
let tagsSuggestion = document.getElementById("tagsSuggestion");
let goToTopSearch = document.getElementById("goToTopSearch");
/*----------Guardar Pagina Actual----------*/
localStorage.setItem("latestPage", "index");
/*----------Temas----------*/
function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
  if (themeName === "theme-dark") {
    logo.setAttribute("src", "assets/img/logodark.png");
    imgLens.setAttribute("src", "assets/img/lensmiddlegray.svg");
    caret.classList.add("whiteCaret");
    caretMenu.classList.add("whiteCaret");
    ctnPageLeft.classList.add("whiteCaret");
    ctnPageRight.classList.add("whiteCaret");
    pageLeftTrend.classList.add("whiteCaret");
    pageRightTrend.classList.add("whiteCaret");
    caretTopTrend.classList.add("whiteCaret");
    caretTopSearch.classList.add("whiteCaret");
    if (searchSuggestion.classList == "hidden") {
      imgLens.setAttribute("src", "assets/img/lensmiddlegray.svg");
    } else {
      imgLens.setAttribute("src", "assets/img/lenslight.svg");
    }
  } else {
    logo.setAttribute("src", "assets/img/logo.png");
    caret.classList.remove("whiteCaret");
    caretMenu.classList.remove("whiteCaret");
    ctnPageLeft.classList.remove("whiteCaret");
    ctnPageRight.classList.remove("whiteCaret");
    pageLeftTrend.classList.remove("whiteCaret");
    pageRightTrend.classList.remove("whiteCaret");
    caretTopTrend.classList.remove("whiteCaret");
    caretTopSearch.classList.remove("whiteCaret");
    if (searchSuggestion.classList == "hidden") {
      imgLens.setAttribute("src", "assets/img/lensinactive.svg");
    } else {
      imgLens.setAttribute("src", "assets/img/lens.svg");
    }
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
  cerrarMenu();
  event.stopPropagation();
});
light.addEventListener("click", () => {
  setTheme("theme-light");
  cerrarMenu();
  event.stopPropagation();
});
/*----------Menu apertura y cierre----------*/
//Menu principal
btnOpenMenu.addEventListener("click", () => {
  if (nav.style.display == "flex") {
    nav.style.display = "none";
  } else {
    nav.style.display = "flex";
  }
  caretMenu.classList.toggle("open-caret");
  event.stopPropagation();
});
//Submenu de temas
function cerrarMenu() {
  caret.classList.toggle("open-caret");
  dropdownMenu.classList.toggle("hidden");
  event.stopPropagation();
}
dropdownCaret.addEventListener("click", cerrarMenu);
//Hacer que el menu y el submenu se cierren con click en cualquier parte del documento por fuera del menu
document.addEventListener("click", () => {
  caret.classList.remove("open-caret");
  dropdownMenu.classList.add("hidden");
  if (nav.style.display == "flex") {
    nav.style.display = "none";
    caretMenu.classList.toggle("open-caret");
  }
});



/*----------Agregar sugerencias de busqueda inciales de no haber----------*/
let suggestItems = [
  "Morty", "Rick", "Dark", "Star Wars", "Planet","Death Note", "Love", "Baby Yoda", "Yoda", "Cat","Juego", "Dancing", "Typing", "Game", "Weird", "Pig","Funny", "Animation", "Movies", "Anime", "Unicorn","Werk", "Adventure Time", "Gravity Falls","SpongeBob", "Avocado", "Vaca", "Disney", "Joker","Japón", "Corea", "Strange", "Ñoño", "Hola", "Area 51", "Comida", "Baby Shark", "Quiero", "Queso","1984", "Queen", "X-Men", "Zorro"
];
if (
  localStorage.getItem("suggestions") === "" ||
  localStorage.getItem("suggestions") === null
) {
  localStorage.setItem("suggestions", JSON.stringify(suggestItems));
}


//crear tags - ultimas busquedas
function saveTags() {
  let lastSearchTags = [];
  let repeated = false;
  let repeatedIndex;
  let newTag = searchInput.value;
  if (noResults === false && newTag !== undefined && newTag !== "") {
    if (localStorage.getItem("searchTags") === null) {
      lastSearchTags.push(newTag);
      localStorage.setItem("searchTags", JSON.stringify(lastSearchTags));
    } else {
      lastSearchTags = JSON.parse(localStorage.searchTags);
      for (let i = 0; i < lastSearchTags.length; i++) {
        if (newTag.toLowerCase() === lastSearchTags[i].toLowerCase()) {
          repeated = true;
          repeatedIndex = i;
          break;
        }
      }
      if (repeated === true) {
        lastSearchTags.splice(repeatedIndex, 1);
      }
      if (lastSearchTags.length === 25) {
        lastSearchTags.shift();
      }
      lastSearchTags.push(newTag);
      localStorage.setItem("searchTags", JSON.stringify(lastSearchTags));
    }
    displayTags();
  }
}
function displayTags() {
  tagsSuggestion.innerHTML = "";
  lastSearchTags = JSON.parse(localStorage.searchTags);
  for (i = lastSearchTags.length - 1; i >= 0; i--) {
    let tag = document.createElement("div");
    tag.classList.add("btnSecondary");
    let tagSpan = document.createElement("span");
    tagSpan.textContent =
      "#" +
      lastSearchTags[i].charAt(0).toUpperCase() +
      lastSearchTags[i].substring(1);
    tag.appendChild(tagSpan);
    tagSpan.addEventListener("click", () => {
      let newInput = tagSpan.textContent;
      searchInput.value = newInput.substring(1);
      search();
    });
    tagsSuggestion.appendChild(tag);
  }
}
//busqueda de gifs con API de Giphy
let suggestion1 = document.getElementById("result1");
let suggestion2 = document.getElementById("result2");
let suggestion3 = document.getElementById("result3");
let suggestionBox1 = document.getElementById("suggestionBox1");
let suggestionBox2 = document.getElementById("suggestionBox2");
let suggestionBox3 = document.getElementById("suggestionBox3");
let noResults = false;
let ctnPageBtn = document.getElementById("ctnPageBtn");
let ctnSearchPages = document.getElementById("ctnSearchPages");
let currentPage;
let biggerPage;
let lastImgBig;
let firstIndexSearch;

function search() {
  ctnSearchPages.classList.add("hidden");
  searchSuggestion.classList.add("hidden");
  goToTopSearch.classList.add("hidden");
  searchHeading.classList.add("hidden");
  tagsSuggestion.classList.add("hidden");
  ctnPageBtn.innerHTML = "";
  ctnSearch.innerHTML = "";
  //pedido de data
  async function giphySearch(searchQuery) {
    let url =
      "https://api.giphy.com/v1/gifs/search?q=" +
      searchQuery +
      "&api_key=" +
      apiKey +
      "&limit=192&rating=PG";
    const resp = await fetch(url);
    const info = await resp.json();
    return info;
  }
  info = giphySearch(searchInput.value.toLowerCase());
  info.then(response => {
    if (response.data.length === 0) {
      ctnSearch.innerHTML =
        "<p class='error'>OOPS! No se encontraron Gifs de ' " +
        searchInput.value +
        "'.</p>";
      noResults = true;
    } else if (response.data.length <= 24) {
      searchHeading.classList.remove("hidden");
      goToTopSearch.classList.remove("hidden");
      tagsSuggestion.classList.remove("hidden");
      searchHeading.textContent = "Resultados de: '" + searchInput.value + "'";
      ctnSearch.innerHTML = "";
      for (let i = 0; i < response.data.length; i++) {
        let ctnTotal = document.createElement("div");
        ctnTotal.setAttribute("class", "ctnTotal");
        let ctnImg = document.createElement("div");
        ctnImg.setAttribute("class", "ctnImg");
        let img = document.createElement("div");
        img.setAttribute("class", "img");
        img.style.background =
          "url(" +
          response.data[i].images.fixed_height_still.url +
          ") center center";
        img.style.backgroundSize = "auto 100%";
        //Poner formato a imagenes con doble ancho
        if (response.data[i].images.fixed_height.width >= "360") {
          ctnTotal.classList.add("largeTotal");
          ctnImg.classList.add("largeImg");
        }
        //cambio de imagen fija a gif
        img.addEventListener("mouseenter", function() {
          this.style.background =
            "url(" +
            response.data[i].images.fixed_height.url +
            ") center center";
          this.style.backgroundSize = "auto 100%";
        });
        //cambio de gif a imagen fija
        img.addEventListener("mouseleave", function() {
          this.style.background =
            "url(" +
            response.data[i].images.fixed_height_still.url +
            ") center center";
          this.style.backgroundSize = "auto 100%";
        });
        //url al clickear
        img.addEventListener("click", function() {
          window.open(response.data[i].url, "_blank");
        });
        ctnImg.appendChild(img);
        ctnTotal.appendChild(ctnImg);
        ctnSearch.appendChild(ctnTotal);
      }
      window.scrollTo(searchHeading.offsetLeft, searchHeading.offsetTop);
    } else {
      //Paginacion para respuestas mas largas
      //creacion de carets para ir a pagina siguiente y anterior
      let ctnPageRight = document.getElementById("ctnPageRight");
      ctnPageRight.innerHTML = "";
      let pageRight = document.createElement("img");
      pageRight.setAttribute("src", "assets/img/caret-right.svg");
      pageRight.setAttribute("class", "caret");
      ctnPageRight.appendChild(pageRight);

      let ctnPageLeft = document.getElementById("ctnPageLeft");
      ctnPageLeft.innerHTML = "";
      let pageLeft = document.createElement("img");
      pageLeft.setAttribute("src", "assets/img/caret-left.svg");
      pageLeft.setAttribute("class", "caret");
      ctnPageLeft.appendChild(pageLeft);

      //creacion de variables para la paginacion
      currentPage = 1;
      biggerPage = 1;
      lastImgBig = [];
      firstIndexSearch = [0];

      //definido numero total de paginas y si cada pagina termina en gif doble que debe hacerse simple o no
      let j = 0;
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].images.fixed_height.width >= "360") {
          if (j === 25) {
            j = 0;
            lastImgBig.push(true);
            firstIndexSearch.push(i);
            biggerPage++;
          } else if (j > 23) {
            j = 0;
            lastImgBig.push(false);
            firstIndexSearch.push(i);
            biggerPage++;
          }
          j++;
        } else {
          if (j === 25) {
            j = 0;
            lastImgBig.push(true);
            firstIndexSearch.push(i);
            biggerPage++;
          } else if (j > 23) {
            j = 0;
            lastImgBig.push(false);
            firstIndexSearch.push(i);
            biggerPage++;
          }
        }
        j++;
        if (i === response.data.length - 1) {
          lastImgBig.push(false);
          firstIndexSearch.push(i);
        }
      }
      ctnSearchPages.classList.remove("hidden");
      goToTopSearch.classList.remove("hidden");
      searchHeading.classList.remove("hidden");
      tagsSuggestion.classList.remove("hidden");
      searchHeading.textContent = "Resultados de: '" + searchInput.value + "'";
      //creacion de botones numericos para cada pagina
      for (let i = 1; i <= biggerPage; i++) {
        let button = document.createElement("button");
        button.textContent = i;
        ctnPageBtn.appendChild(button);
      }
      let buttons = document.querySelectorAll("#ctnPageBtn button");
      buttons[currentPage - 1].classList.add("currentPageHighlight");
      //Agregada funcion para los botones numericos de cada pagina
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", () => {
          if (buttons[i].textContent !== currentPage) {
            buttons[currentPage - 1].classList.remove("currentPageHighlight");
            currentPage = buttons[i].textContent;
            buttons[i].classList.add("currentPageHighlight");
            loadContent(response);
          }
        });
      }
      //Agregada funcion a los carets
      pageLeft.addEventListener("click", previousPage);
      pageRight.addEventListener("click", nextPage);
      function previousPage() {
        if (currentPage !== 1) {
          buttons[currentPage - 1].classList.remove("currentPageHighlight");
          currentPage--;
          buttons[currentPage - 1].classList.add("currentPageHighlight");
          loadContent(response);
        }
      }
      function nextPage() {
        if (currentPage < biggerPage) {
          buttons[currentPage - 1].classList.remove("currentPageHighlight");
          currentPage++;
          buttons[currentPage - 1].classList.add("currentPageHighlight");
          loadContent(response);
        }
      }
      loadContent(response);
    }
    btnSearch.classList.remove("btnSearch");
    btnSearch.classList.remove("btn");
    btnSearch.classList.add("btnInactive");
    if (localStorage.getItem("theme") === "theme-dark") {
      imgLens.setAttribute("src", "assets/img/lensmiddlegray.svg");
    } else {
      imgLens.setAttribute("src", "assets/img/lensinactive.svg");
    }
    saveTags();
    saveSug();
    searchInput.value = "";
  });
}

function loadContent(response) {
  ctnSearch.innerHTML = "";
  for (
    let i = firstIndexSearch[currentPage - 1];
    i < firstIndexSearch[currentPage];
    i++
  ) {
    let ctnTotal = document.createElement("div");
    ctnTotal.setAttribute("class", "ctnTotal");
    let ctnImg = document.createElement("div");
    ctnImg.setAttribute("class", "ctnImg");
    let img = document.createElement("div");
    img.setAttribute("class", "img");
    img.style.background =
      "url(" +
      response.data[i].images.fixed_height_still.url +
      ") center center";
    img.style.backgroundSize = "auto 100%";
    if (response.data[i].images.fixed_height.width >= "360") {
      if (
        (i === firstIndexSearch[currentPage] - 1 &&
        lastImgBig[currentPage - 1] === true)
      ){

      }else {
        ctnTotal.classList.add("largeTotal");
        ctnImg.classList.add("largeImg");
      }
    }
    //cambio de imagen fija a gif
    img.addEventListener("mouseenter", function() {
      this.style.background =
        "url(" + response.data[i].images.fixed_height.url + ") center center";
      this.style.backgroundSize = "auto 100%";
    });
    //cambio de gif a imagen fija
    img.addEventListener("mouseleave", function() {
      this.style.background =
        "url(" +
        response.data[i].images.fixed_height_still.url +
        ") center center";
      this.style.backgroundSize = "auto 100%";
    });
    //url al clickear
    img.addEventListener("click", function() {
      window.open(response.data[i].url, "_blank");
    });
    ctnImg.appendChild(img);
    ctnTotal.appendChild(ctnImg);
    ctnSearch.appendChild(ctnTotal);
  }
  window.scrollTo(searchHeading.offsetLeft, searchHeading.offsetTop);
}
//guardar ultimo search query como sugerencia para futuras busquedas
function saveSug() {
  let storageActual = JSON.parse(localStorage.suggestions);
  let repeated = false;
  let evaluatedText = searchInput.value.toLowerCase();
  for (let i = 0; i < storageActual.length; i++) {
    if (
      evaluatedText === storageActual[i].toLowerCase() ||
      evaluatedText === ""
    ) {
      repeated = true;
      break;
    }
  }
  if (repeated === false && noResults === false) {
    storageActual.push(
      evaluatedText.charAt(0).toUpperCase() + evaluatedText.substring(1)
    );
  }
  localStorage.setItem("suggestions", JSON.stringify(storageActual));
  noResults = false;
}
//Activar busqueda con click en boton buscar
btnSearch.addEventListener("click", search);
//Agregada funcion al teclear en el input
searchInput.addEventListener("keyup", event => {
  searchSuggestion.classList.remove("hidden");
  btnSearch.classList.add("btn");
  btnSearch.classList.add("btnSearch");
  btnSearch.classList.remove("btnInactive");
  if (localStorage.getItem("theme") === "theme-dark") {
    imgLens.setAttribute("src", "assets/img/lenslight.svg");
  } else {
    imgLens.setAttribute("src", "assets/img/lens.svg");
  }
  //Al presionar enter busqueda
  if (event.which === 13 || event.keyCode == 13) {
    search();
  } else if ( // al borrar y quedar nada ocultar sugerencias
    (event.which === 8 || event.keyCode == 8) &&
    (searchInput.value === "" || searchInput.value.length < 1)
  ) {
    searchSuggestion.classList.add("hidden");
    btnSearch.classList.remove("btnSearch");
    btnSearch.classList.remove("btn");
    btnSearch.classList.add("btnInactive");
    if (localStorage.getItem("theme") === "theme-dark") {
      imgLens.setAttribute("src", "assets/img/lensmiddlegray.svg");
    } else {
      imgLens.setAttribute("src", "assets/img/lensinactive.svg");
    }
  } else {//al escribir algo distinto a backspace y enter cambiar sugerencias dependiendo del texto ingresado
    suggestionBox1.classList.remove("hidden");
    suggestionBox2.classList.remove("hidden");
    suggestionBox3.classList.remove("hidden");
    let searchSug = JSON.parse(localStorage.suggestions);
    let end = 0;
    let textSug = [];
    for (let i = 0; i < searchSug.length; i++) {
      if (end === 3) {
        break;
      } else if (
        searchSug[i].toLowerCase().startsWith(searchInput.value.toLowerCase())
      ) {
        textSug.push(searchSug[i]);
        end++;
      }
    }
    if (end < 3) {
      for (let i = 0; i < searchSug.length; i++) {
        if (end === 3) {
          break;
        } else if (
          searchSug[i]
            .toLowerCase()
            .includes(searchInput.value.toLowerCase()) &&
          searchSug[i] !== textSug[0] &&
          searchSug[i] !== textSug[1]
        ) {
          textSug.push(searchSug[i]);
          end++;
        }
      }
    }
    if (textSug.length === 0) {
      suggestionBox3.classList.add("hidden");
      suggestionBox2.classList.add("hidden");
      suggestionBox1.classList.add("hidden");
      searchSuggestion.classList.add("hidden");
    } else if (textSug.length === 1) {
      suggestion1.textContent =
        textSug[0].charAt(0).toUpperCase() + textSug[0].substring(1);
      suggestionBox3.classList.add("hidden");
      suggestionBox2.classList.add("hidden");
    } else if (textSug.length === 2) {
      suggestion1.textContent =
        textSug[0].charAt(0).toUpperCase() + textSug[0].substring(1);
      suggestion2.textContent =
        textSug[1].charAt(0).toUpperCase() + textSug[1].substring(1);
      suggestionBox3.classList.add("hidden");
    } else {
      suggestion1.textContent =
        textSug[0].charAt(0).toUpperCase() + textSug[0].substring(1);
      suggestion2.textContent =
        textSug[1].charAt(0).toUpperCase() + textSug[1].substring(1);
      suggestion3.textContent =
        textSug[2].charAt(0).toUpperCase() + textSug[2].substring(1);
    }
  }
});
//evento click sugerencias
suggestion1.addEventListener("click", () => {
  searchInput.value = suggestion1.textContent;
  search();
});
suggestion2.addEventListener("click", () => {
  searchInput.value = suggestion2.textContent;
  search();
});
suggestion3.addEventListener("click", () => {
  searchInput.value = suggestion3.textContent;
  search();
});
//Cuadros de sugerencias en base a la seleccion random de etiquetas predefinidas
let tagsToSuggest = [
  "Cat", "Dancing", "Typing", "Game", "Weird", "Pig", "Funny", "Animation", "Movies", "Anime", "Unicorn","Werk", "AdventureTime", "GravityFalls", "SpongeBob"
];
async function giphySuggestions(suggestion) {
  let url =
    "https://api.giphy.com/v1/gifs/random?api_key=" +
    apiKey +
    "&tag=" +
    suggestion +
    "&rating=PG";
  const resp = await fetch(url);
  const suggestionsData = await resp.json();
  return suggestionsData;
}
function suggest(suggestion) {
  suggestionsData = giphySuggestions(suggestion);
  suggestionsData.then(response => {
    let ctnTotal = document.createElement("div");
    ctnTotal.setAttribute("class", "ctnTotal");
    let title = document.createElement("div");
    title.setAttribute("class", "heading");
    let content = document.createElement("p");
    content.textContent = "#" + suggestion;
    let close = document.createElement("img");
    close.setAttribute("src", "assets/img/close.svg");
    //funcion de cerrar
    close.addEventListener("click", () => {
      ctnTotal.remove();
      let index = Math.floor(Math.random() * (tagsToSuggest.length - 0)) + 0;
      suggest(tagsToSuggest[index]);
    });
    title.appendChild(content);
    title.appendChild(close);
    ctnTotal.appendChild(title);
    let ctnImg = document.createElement("div");
    ctnImg.setAttribute("class", "ctnImg");
    let img = document.createElement("div");
    img.setAttribute("class", "img");
    img.style.background =
      "url(" +
      response.data.images.fixed_height.url +
      ") center center";
    img.style.backgroundSize = "cover";
    let btn = document.createElement("button");
    btn.setAttribute("class", "btnSecondary");
    btn.innerHTML = "<span> Ver más...</span>";
    btn.addEventListener("click", () => {
      searchInput.value = suggestion;
      ctnSearch.innerHTML = "";
      search();
    });
    img.appendChild(btn);
    ctnImg.appendChild(img);
    ctnTotal.appendChild(ctnImg);
    ctnSuggestion.appendChild(ctnTotal);
  });
}
for (let i = 0; i < 4; i++) {
  let index = Math.floor(Math.random() * (tagsToSuggest.length - 0)) + 0;
  suggest(tagsToSuggest[index]);
}


//trending
async function giphyTrending() {
  let url =
    "https://api.giphy.com/v1/gifs/trending?api_key=" +
    apiKey +
    "&limit=160&rating=PG";
  const resp = await fetch(url);
  const trendingData = await resp.json();
  return trendingData;
}
trendingData = giphyTrending();

//paginacion de los gifs de trending
let ctnTrendingPages = document.getElementById("ctnTrendingPages");
let ctnPageBtnTrend = document.getElementById("ctnPageBtnTrend");
let firstIndex = [0];
let lastImgBigTrend = [];
let currentTrendingPage = 1;
let maxPageTrending = 1;
trendingData.then(response => {
  let j = 0;
  for (let i = 0; i < response.data.length; i++) {
    if (response.data[i].images.fixed_height.width >= "360") {
      if (j === 25) {
        j = 0;
        lastImgBigTrend.push(true);
        firstIndex.push(i);
        maxPageTrending++;
      } else if (j > 23) {
        j = 0;
        lastImgBigTrend.push(false);
        firstIndex.push(i);
        maxPageTrending++;
      }
      j++;
    } else {
      if (j === 25) {
        j = 0;
        lastImgBigTrend.push(true);
        firstIndex.push(i);
        maxPageTrending++;
      } else if (j > 23) {
        j = 0;
        lastImgBigTrend.push(false);
        firstIndex.push(i);
        maxPageTrending++;
      }
    }
    j++;
    if (i === response.data.length - 1) {
      firstIndex.push(i);
    }
  }
  for (let i = 1; i <= maxPageTrending; i++) {
    let button = document.createElement("button");
    button.textContent = i;
    ctnPageBtnTrend.appendChild(button);
  }
  let buttonsTrend = document.querySelectorAll("#ctnPageBtnTrend button");
  buttonsTrend[currentTrendingPage - 1].classList.add(
    "currentTrendPageHighlight"
  );
  for (let i = 0; i < buttonsTrend.length; i++) {
    buttonsTrend[i].addEventListener("click", () => {
      if (buttonsTrend[i].textContent !== currentTrendingPage) {
        buttonsTrend[currentTrendingPage - 1].classList.remove(
          "currentTrendPageHighlight"
        );
        currentTrendingPage = buttonsTrend[i].textContent;
        buttonsTrend[i].classList.add("currentTrendPageHighlight");
        loadTrendingPage(response);
      }
    });
  }
  pageLeftTrend.addEventListener("click", () => {
    if (currentTrendingPage !== 1) {
      buttonsTrend[currentTrendingPage - 1].classList.remove(
        "currentTrendPageHighlight"
      );
      currentTrendingPage--;
      buttonsTrend[currentTrendingPage - 1].classList.add(
        "currentTrendPageHighlight"
      );
      loadTrendingPage(response);
    }
  });
  pageRightTrend.addEventListener("click", () => {
    if (currentTrendingPage < maxPageTrending) {
      buttonsTrend[currentTrendingPage - 1].classList.remove(
        "currentTrendPageHighlight"
      );
      currentTrendingPage++;
      buttonsTrend[currentTrendingPage - 1].classList.add(
        "currentTrendPageHighlight"
      );
      loadTrendingPage(response);
    }
  });
  loadTrendingPage(response);
});
//creacion de gifs de trending
function loadTrendingPage(response) {
  ctnTrending.innerHTML = "";
  for (
    let i = firstIndex[currentTrendingPage - 1];
    i < firstIndex[currentTrendingPage];
    i++
  ) {
    let content;
    let titleStr;
    let ctnTotal = document.createElement("div");
    ctnTotal.setAttribute("class", "ctnTotal");
    let ctnImg = document.createElement("div");
    ctnImg.setAttribute("class", "ctnImg");
    let img = document.createElement("div");
    img.setAttribute("class", "img");
    img.style.background =
      "url(" +
      response.data[i].images.fixed_height_still.url +
      ") center center";
    img.style.backgroundSize = "auto 100%";
    if (response.data[i].images.fixed_height.width >= "360") {
      if (
        (i === firstIndex[currentTrendingPage] - 1 &&
        lastImgBigTrend[currentTrendingPage - 1] === true)
      ) {
      } else {
        ctnTotal.classList.add("largeTotal");
        ctnImg.classList.add("largeImg");
      }
    }
    //cambiar de imagen fija a gif
    img.addEventListener("mouseenter", function() {
      this.style.background =
        "url(" + response.data[i].images.fixed_height.url + ") center center";
      this.style.backgroundSize = "auto 100%";
    });
    //cambiar de gif a imagen fija
    img.addEventListener("mouseleave", function() {
      this.style.background =
        "url(" +
        response.data[i].images.fixed_height_still.url +
        ") center center";
      this.style.backgroundSize = "auto 100%";
    });
    //url al clickear
    img.addEventListener("click", () => {
      window.open(response.data[i].url, "_blank");
    });
    content = document.createElement("p");
    content.setAttribute("class", "heading");
    titleStr =
      response.data[i].title.charAt(0).toUpperCase() +
      response.data[i].title.substring(1);
    content.textContent = titleStr.slice(0, titleStr.indexOf("GIF"));
    if (content.textContent === "") {
      content.classList.add("hidden");
    }
    img.appendChild(content);
    ctnImg.appendChild(img);
    ctnTotal.appendChild(ctnImg);
    ctnTrending.appendChild(ctnTotal);
  }
}