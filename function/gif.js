const apiKey = 'HxeqWZObT2555n5inNEcjXprIyTed8Iq';
let ctnBusqueda = document.getElementById('ctnBusqueda');
let ctnTrending = document.getElementById('ctnTrending');
let ctnSugerencias = document.getElementById('ctnSugerencias');
let inputBusqueda = document.getElementById('inputBusqueda');
let sugerenciasBusq = document.getElementById('sugerenciasBusq');
let titleBusq = document.getElementById('titleBusq');
let btnBusqueda = document.getElementById('btnBusqueda');
let tagsSugeridos = document.getElementById('tagsSugeridos');
let light = document.getElementById('light');
let dark = document.getElementById('dark');
let dropdownCaret = document.getElementById('dropdownCaret');
let dropdownMenu = document.getElementById('dropdownMenu');
let logo = document.getElementById('logo');
let caret = document.getElementById('caret');
let ctnPageLeft = document.getElementById('ctnPageLeft');
let ctnPageRight = document.getElementById('ctnPageRight');
let pageLeftTrend = document.getElementById('pageLeftTrend');
let pageRightTrend = document.getElementById('pageRightTrend');
let btnOpenMenu = document.getElementById('btnOpenMenu');
let caretMenu = document.getElementById('caretMenu');
let caretTopTrend = document.getElementById('caretTopTrend');
let caretTopSearch = document.getElementById('caretTopSearch');
let GoToTopSearch = document.getElementById('GoToTopSearch');
let imgLupa = document.getElementById('imgLupa');
let nav = document.getElementById('nav');

let suggestItems = ['Morty','Rick','Dark','Star Wars','Planet','Death Note', 'Love','Baby Yoda', 'Yoda','Cat', 'Juego', 'Dancing', 'Typing', 'Game','Weird', 'Pig','Funny','Animation','Movies','Anime','Unicorn','Werk', 'Adventure Time', 'Gravity Falls', 'SpongeBob', 'Avocado', 'Vaca', 'Disney', 'Joker','Japón', 'Corea', 'Strange', 'Ñoño', 'Hola', 'Area 51', 'Comida', 'Baby Shark', 'Quiero', 'Queso', '1984', 'Queen', 'X-Men', 'Zorro'];
if(localStorage.getItem('suggestions') === '' || localStorage.getItem('suggestions') === null ){
    localStorage.setItem("suggestions", JSON.stringify(suggestItems));
}
if(localStorage.getItem('theme') === 'theme-dark'){
    setTheme('theme-dark');
    logo.setAttribute('src',"assets/img/logodark.png");
    imgLupa.setAttribute('src', 'assets/img/lupamiddlegray.svg')
    caret.classList.add('whiteCaret');
    caretMenu.classList.add('whiteCaret');
    ctnPageLeft.classList.add('whiteCaret');
    ctnPageRight.classList.add('whiteCaret');
    pageLeftTrend.classList.add('whiteCaret');
    pageRightTrend.classList.add('whiteCaret');
    caretTopTrend.classList.add('whiteCaret');
    caretTopSearch.classList.add('whiteCaret');
}else{
    setTheme('theme-light');
    logo.setAttribute('src',"assets/img/logo.png");
    imgLupa.setAttribute('src', 'assets/img/lupainactive.svg');
}

function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}
dark.addEventListener('click',()=>{
    setTheme('theme-dark');
    logo.setAttribute('src',"assets/img/logodark.png");
    caret.classList.add('whiteCaret');
    caretMenu.classList.add('whiteCaret');
    ctnPageLeft.classList.add('whiteCaret');
    ctnPageRight.classList.add('whiteCaret');
    pageLeftTrend.classList.add('whiteCaret');
    pageRightTrend.classList.add('whiteCaret');
    caretTopTrend.classList.add('whiteCaret');
    caretTopSearch.classList.add('whiteCaret');
    if(sugerenciasBusq.classList == 'hidden'){
        imgLupa.setAttribute('src', 'assets/img/lupamiddlegray.svg');
    }else{
        imgLupa.setAttribute('src', 'assets/img/lupalight.svg');
    }
    cerrarMenu();
    event.stopPropagation();
});
light.addEventListener('click',()=>{
    setTheme('theme-light');
    logo.setAttribute('src',"assets/img/logo.png");
    caret.classList.remove('whiteCaret');
    caretMenu.classList.remove('whiteCaret');
    ctnPageLeft.classList.remove('whiteCaret');
    ctnPageRight.classList.remove('whiteCaret');
    pageLeftTrend.classList.remove('whiteCaret');
    pageRightTrend.classList.remove('whiteCaret');
    caretTopTrend.classList.remove('whiteCaret');
    caretTopSearch.classList.remove('whiteCaret');
    if(sugerenciasBusq.classList == 'hidden'){
        imgLupa.setAttribute('src', 'assets/img/lupainactive.svg')
    }else{
        imgLupa.setAttribute('src', 'assets/img/lupa.svg')
    }
    cerrarMenu();
    event.stopPropagation();
});
dropdownCaret.addEventListener('click', cerrarMenu)
function cerrarMenu (){
    caret.classList.toggle('open-caret');        
    dropdownMenu.classList.toggle('hidden');
    event.stopPropagation();
}
document.addEventListener('click', ()=>{
    caret.classList.remove('open-caret');        
    dropdownMenu.classList.add('hidden');
    if(nav.style.display == 'flex'){
        nav.style.display = 'none'; 
        caretMenu.classList.toggle('open-caret');               
    }
})
btnOpenMenu.addEventListener('click', () => {
    if(nav.style.display == 'flex'){
        nav.style.display = 'none';        
    }else{
        nav.style.display = 'flex';
    }
    caretMenu.classList.toggle('open-caret'); 
    event.stopPropagation();
})
//know the page when you go back
localStorage.setItem('currentPage', 'index');

//create tags - last Searches
/*            <div id="tagsSugeridos" class="hidden">
                <div class="btnSecundario"><span>#Un ejemplo</span></div>*/
function saveTags() {
    let lastSearchTags = [];
    let newTag = inputBusqueda.value;
    if(noResults === false && newTag !== undefined  && newTag !== ''){
        if (localStorage.getItem("searchTags") === null) {
            lastSearchTags.push(newTag);
            localStorage.setItem('searchTags', JSON.stringify(lastSearchTags));
        }else{
            lastSearchTags = JSON.parse(localStorage.searchTags);
            lastSearchTags.push(newTag);
            localStorage.setItem("searchTags", JSON.stringify(lastSearchTags));    
        }
        displayTags();
    }
}
function displayTags() {
    tagsSugeridos.innerHTML = '';
    lastSearchTags = JSON.parse(localStorage.searchTags);
    for(i = (lastSearchTags.length - 1); i >= (lastSearchTags.length - 11); i--){0
        let tag = document.createElement('div');
        tag.classList.add('btnSecundario');
        let tagSpan = document.createElement('span');
        tagSpan.textContent = '#'+lastSearchTags[i];
        tag.appendChild(tagSpan);
        tagSpan.addEventListener('click', () => {
            let newInput = tagSpan.textContent;
            inputBusqueda.value = newInput.substring(1);
            busqueda();
        })
        tagsSugeridos.appendChild(tag);
    }
}
//busqueda 
let sugerencia1 = document.getElementById('resultado1');
let sugerencia2 = document.getElementById('resultado2');
let sugerencia3 = document.getElementById('resultado3');
let cuadroSug1 = document.getElementById('cuadroSug1');
let cuadroSug2 = document.getElementById('cuadroSug2');
let cuadroSug3 = document.getElementById('cuadroSug3');
let noResults = false;
let ctnPageBtn = document.getElementById('ctnPageBtn');
let ctnBusquedaPages = document.getElementById('ctnBusquedaPages');
let currentPage;
let biggerPage;
let lastImgBig;
let firstIndexSearch;

function busqueda(){
    let ctnPageRight = document.getElementById('ctnPageRight');
    ctnPageRight.innerHTML = '';
    let pageRight = document.createElement('img');
    pageRight.setAttribute('src', 'assets/img/caret-right.svg');
    pageRight.setAttribute('class', 'caret');
    ctnPageRight.appendChild(pageRight);
    //let pageRight = document.getElementById('pageRight');
    let ctnPageLeft = document.getElementById('ctnPageLeft');
    ctnPageLeft.innerHTML = '';
    let pageLeft = document.createElement('img');
    pageLeft.setAttribute('src', 'assets/img/caret-left.svg');
    pageLeft.setAttribute('class', 'caret');
    ctnPageLeft.appendChild(pageLeft);
    currentPage = 1;
    biggerPage = 1;
    lastImgBig = [];
    firstIndexSearch = [0];
    ctnBusquedaPages.classList.add('hidden');
    sugerenciasBusq.classList.add('hidden');
    GoToTopSearch.classList.add('hidden');
    ctnPageBtn.innerHTML = '';
    ctnBusqueda.innerHTML = '';
    titleBusq.classList.add('hidden');
    tagsSugeridos.classList.add('hidden');
    async function giphyBusqueda(busqueda){
        let url = "https://api.giphy.com/v1/gifs/search?q=" + busqueda + "&api_key=" + apiKey + "&limit=192&rating=PG";
        const resp = await fetch(url);
        const datos = await resp.json();
        return datos;
    }
    datos = giphyBusqueda(inputBusqueda.value.toLowerCase());
    datos.then((respuesta) => {
        if(respuesta.data.length === 0){
            ctnBusqueda.innerHTML = "<p class='error'>OOPS! No se encontraron Gifs de ' "+inputBusqueda.value+"'.</p>";
            noResults = true;
        }else if(respuesta.data.length <= 24){
            titleBusq.classList.remove('hidden');
            GoToTopSearch.classList.remove('hidden');
            tagsSugeridos.classList.remove('hidden');
            titleBusq.textContent = "Resultados de: '" + inputBusqueda.value+"'";
            ctnBusqueda.innerHTML = '';
            for (let i = 0; i <= respuesta.data.length; i++) {
                let ctnTotal = document.createElement('div');
                ctnTotal.setAttribute('class', 'ctnTotal');
                let ctnImg = document.createElement('div');
                ctnImg.setAttribute('class', 'ctnImg');
                let img = document.createElement('div');
                img.setAttribute('class', 'img');  
                img.style.background = 'url('+respuesta.data[i].images.fixed_height_still.url+') center center';
                /*background-size: auto 100%;*/
                img.style.backgroundSize = 'auto 100%';
                if(respuesta.data[i].images.fixed_height.width >= '360'){
                    //if(i !== firstIndexSearch[currentPage]){
                        ctnTotal.classList.add('largeTotal');
                        ctnImg.classList.add('largeImg');
                    //}
                }
                //mover img
                img.addEventListener('mouseenter', function(){
                    this.style.background = 'url('+respuesta.data[i].images.fixed_height.url+') center center'
                    this.style.backgroundSize = 'auto 100%';
                });
                //pausar img
                img.addEventListener('mouseleave', function(){
                    this.style.background = 'url('+respuesta.data[i].images.fixed_height_still.url+') center center'
                    this.style.backgroundSize = 'auto 100%';
        
                });
                //url al clickear
                img.addEventListener('click', function(){
                    window.open(respuesta.data[i].url,'_blank');
                });
                ctnImg.appendChild(img);
                ctnTotal.appendChild(ctnImg);
                ctnBusqueda.appendChild(ctnTotal);
            }
            window.scrollTo(titleBusq.offsetLeft,titleBusq.offsetTop);
        }else{
            let j = 0;
            for(let i = 0; i < respuesta.data.length; i++){
                if(respuesta.data[i].images.fixed_height.width >= '360'){
                    if(j === 25){
                        j = 0;
                        lastImgBig.push(true);
                        firstIndexSearch.push(i);
                        biggerPage++;
                    }else if(j > 23){
                        j = 0;
                        lastImgBig.push(false);
                        firstIndexSearch.push(i);
                        biggerPage++;
                    }
                    j++;
                }else{
                    if (j === 25){
                        j = 0;
                        lastImgBig.push(true);
                        firstIndexSearch.push(i);
                        biggerPage++;
                    }else if(j > 23){
                        j = 0;
                        lastImgBig.push(false);
                        firstIndexSearch.push(i);
                        biggerPage++;
                    }
                }
                j++;
                if(i === (respuesta.data.length-1)){
                    lastImgBig.push(false);
                    firstIndexSearch.push(i);
                }
            }
            ctnBusquedaPages.classList.remove('hidden');
            GoToTopSearch.classList.remove('hidden');
            titleBusq.classList.remove('hidden');
            tagsSugeridos.classList.remove('hidden');
            titleBusq.textContent = "Resultados de: '" + inputBusqueda.value+"'";
            console.log(lastImgBig);
            for(let i = 1; i <= biggerPage; i++){
                let button = document.createElement('button');
                button.textContent = i;
                ctnPageBtn.appendChild(button);
            }
            let buttons = document.querySelectorAll('#ctnPageBtn button');
            buttons[currentPage - 1].classList.add('currentPageHighlight');
            for(let i = 0; i < buttons.length; i++){
                buttons[i].addEventListener('click', () => {
                    if(buttons[i].textContent !== currentPage){
                        buttons[currentPage - 1].classList.remove('currentPageHighlight');
                        currentPage = buttons[i].textContent;
                        buttons[i].classList.add('currentPageHighlight');
                        loadContent(respuesta);
                    }
                })
            }
            console.log(buttons);
                pageLeft.addEventListener('click', previousPage);
                pageRight.addEventListener('click', nextPage);

            /*btnBusqueda.addEventListener('click', () => {
                pageLeft.removeEventListener('click', previousPage);
                pageRight.removeEventListener('click', nextPage);
            })*/

            function previousPage(){
                if(currentPage !== 1){
                    buttons[currentPage - 1].classList.remove('currentPageHighlight');
                    currentPage--; 
                    buttons[currentPage - 1].classList.add('currentPageHighlight');
                    loadContent(respuesta);
                }
            };
            function nextPage(){
                if(currentPage < biggerPage){
                    buttons[currentPage - 1].classList.remove('currentPageHighlight');
                    currentPage++;
                    buttons[currentPage - 1].classList.add('currentPageHighlight');
                    loadContent(respuesta);
                }
            };
            loadContent(respuesta);
        }
        btnBusqueda.classList.remove('btnBuscar');
        btnBusqueda.classList.remove('btn');
        btnBusqueda.classList.add('btnInactivo');
        if(localStorage.getItem('theme') === 'theme-dark'){
            imgLupa.setAttribute('src', 'assets/img/lupamiddlegray.svg')
        }else{
            imgLupa.setAttribute('src', 'assets/img/lupainactive.svg')
        }
        saveTags();
        saveSug();
        inputBusqueda.value = '';
    });
}



function loadContent(respuesta){
    ctnBusqueda.innerHTML = '';
    for (let i = (firstIndexSearch[currentPage - 1]); i < (firstIndexSearch[currentPage]); i++) {
        let ctnTotal = document.createElement('div');
        ctnTotal.setAttribute('class', 'ctnTotal');
        let ctnImg = document.createElement('div');
        ctnImg.setAttribute('class', 'ctnImg');
        let img = document.createElement('div');
        img.setAttribute('class', 'img');  
        img.style.background = 'url('+respuesta.data[i].images.fixed_height_still.url+') center center';
        /*background-size: auto 100%;*/
        img.style.backgroundSize = 'auto 100%';
        if(respuesta.data[i].images.fixed_height.width >= '360'){
            if(i === (firstIndexSearch[currentPage]-1) && lastImgBig[currentPage - 1] === true){
            }else{
                ctnTotal.classList.add('largeTotal');
                ctnImg.classList.add('largeImg');
            }
        }
        //mover img
        img.addEventListener('mouseenter', function(){
            this.style.background = 'url('+respuesta.data[i].images.fixed_height.url+') center center'
            this.style.backgroundSize = 'auto 100%';
        });
        //pausar img
        img.addEventListener('mouseleave', function(){
            this.style.background = 'url('+respuesta.data[i].images.fixed_height_still.url+') center center'
            this.style.backgroundSize = 'auto 100%';

        });
        //url al clickear
        img.addEventListener('click', function(){
            window.open(respuesta.data[i].url,'_blank');
        });
        ctnImg.appendChild(img);
        ctnTotal.appendChild(ctnImg);
        ctnBusqueda.appendChild(ctnTotal);
    }
    window.scrollTo(titleBusq.offsetLeft,titleBusq.offsetTop);

}
function saveSug(){
    let storageActual = JSON.parse(localStorage.suggestions);
    let repeated = false;
    let evaluatedText = inputBusqueda.value.toLowerCase();
    for(let i = 0; i < storageActual.length; i++){
        if(evaluatedText === storageActual[i].toLowerCase() || evaluatedText === ''){
            repeated = true;
            break;
        }
    }
    if(repeated === false && noResults === false){
        storageActual.push(evaluatedText.charAt(0).toUpperCase() + evaluatedText.substring(1));
    }
    localStorage.setItem("suggestions", JSON.stringify(storageActual));
    noResults = false;
}
btnBusqueda.addEventListener('click', busqueda);
inputBusqueda.addEventListener('keyup', (event)=>{
    sugerenciasBusq.classList.remove('hidden');
    btnBusqueda.classList.add('btn');
    btnBusqueda.classList.add('btnBuscar');
    btnBusqueda.classList.remove('btnInactivo');
    if(localStorage.getItem('theme') === 'theme-dark'){
        imgLupa.setAttribute('src', 'assets/img/lupalight.svg')
    }else{
        imgLupa.setAttribute('src', 'assets/img/lupa.svg')
    }
    if (event.which === 13|| event.keyCode == 13) {
        busqueda();
    }else if ((event.which === 8|| event.keyCode == 8)
            &&(inputBusqueda.value === ''
            ||inputBusqueda.value.length < 1)){
        sugerenciasBusq.classList.add('hidden');
        btnBusqueda.classList.remove('btnBuscar');
        btnBusqueda.classList.remove('btn');
        btnBusqueda.classList.add('btnInactivo');
        if(localStorage.getItem('theme') === 'theme-dark'){
            imgLupa.setAttribute('src', 'assets/img/lupamiddlegray.svg')
        }else{
            imgLupa.setAttribute('src', 'assets/img/lupainactive.svg')
        }
    }else{
        cuadroSug1.classList.remove('hidden');
        cuadroSug2.classList.remove('hidden');
        cuadroSug3.classList.remove('hidden');
        let searchSug = JSON.parse(localStorage.suggestions)
        let end = 0;
        let textSug = [];
        for(let i = 0; i < searchSug.length; i++){
            if(end === 3){
                break;
            }else if(searchSug[i].toLowerCase().startsWith(inputBusqueda.value.toLowerCase())){
                textSug.push(searchSug[i]);
                end++;
            }      
        }
        if(end < 3){
            for(let i = 0; i < searchSug.length; i++){
                if(end === 3){
                    break;
                }else if(searchSug[i].toLowerCase().includes(inputBusqueda.value.toLowerCase()) 
                        && (searchSug[i] !== textSug[0]) 
                        && (searchSug[i] !== textSug[1])){
                    textSug.push(searchSug[i]);
                    end++;
                }      
            }
        }
        if(textSug.length === 0){
            cuadroSug3.classList.add('hidden');
            cuadroSug2.classList.add('hidden');
            cuadroSug1.classList.add('hidden');
            sugerenciasBusq.classList.add('hidden');
        } else if (textSug.length === 1){
            sugerencia1.textContent = textSug[0].charAt(0).toUpperCase() + textSug[0].substring(1);
            cuadroSug3.classList.add('hidden');
            cuadroSug2.classList.add('hidden');
        }else if (textSug.length === 2){
            sugerencia1.textContent = textSug[0].charAt(0).toUpperCase() + textSug[0].substring(1);
            sugerencia2.textContent = textSug[1].charAt(0).toUpperCase() + textSug[1].substring(1);
            cuadroSug3.classList.add('hidden');
        }else{
            sugerencia1.textContent = textSug[0].charAt(0).toUpperCase() + textSug[0].substring(1);
            sugerencia2.textContent = textSug[1].charAt(0).toUpperCase() + textSug[1].substring(1);
            sugerencia3.textContent = textSug[2].charAt(0).toUpperCase() + textSug[2].substring(1);
        }
    }
})
//evento click sugerencias
sugerencia1.addEventListener('click', ()=>{
    inputBusqueda.value = sugerencia1.textContent;
    busqueda();    
})
sugerencia2.addEventListener('click', ()=>{
    inputBusqueda.value = sugerencia2.textContent;
    busqueda();
})
sugerencia3.addEventListener('click', ()=>{
    inputBusqueda.value = sugerencia3.textContent;
    busqueda();
})
//funcion cerrar sugerencias
function close (){
    this.ctnTotal.remove();
}
//sugerencias
let tagsSugerir = ['Cat', 'Dancing', 'Typing', 'Game','Weird', 'Pig','Funny','Animation','Movies','Anime','Unicorn','Werk', 'AdventureTime', 'GravityFalls', 'SpongeBob'];
async function giphySugerencias(sugerencia){
    let url = "https://api.giphy.com/v1/gifs/random?api_key=" + apiKey + "&tag="+ sugerencia +"&rating=PG";
    const resp = await fetch(url);
    const sugerenciasDatos = await resp.json();
    return sugerenciasDatos;
}
function sugerir(sugerencia){
    sugerenciasDatos = giphySugerencias(sugerencia);
    sugerenciasDatos.then((respuesta)=>{
        let ctnTotal = document.createElement('div');
        ctnTotal.setAttribute('class', 'ctnTotal');
        let title = document.createElement('div');
        title.setAttribute('class', 'title');
        let content = document.createElement('p');
        content.textContent = '#'+sugerencia/*respuesta.data.title*/;
        let close = document.createElement('img');
        close.setAttribute('src', 'assets/img/close.svg');
        //funcion de cerrar
        close.addEventListener('click',()=>{
            ctnTotal.remove();
            let index = Math.floor(Math.random() * (tagsSugerir.length - 0)) + 0;
            sugerir(tagsSugerir[index]);
        });    
        title.appendChild(content);
        title.appendChild(close);
        ctnTotal.appendChild(title);
        let ctnImg = document.createElement('div');
        ctnImg.setAttribute('class', 'ctnImg');
        let img = document.createElement('div');
        img.setAttribute('class', 'img');
        img.style.background = 'url('+respuesta.data.images.fixed_height/*_still*/.url+') center center';
            /*background-size: auto 100%;*/
        img.style.backgroundSize = 'cover';
        let btn = document.createElement('button');
        btn.setAttribute('class', 'btnSecundario');
        btn.innerHTML = "<span> Ver más...</span>";
        btn.addEventListener('click', () =>{
            inputBusqueda.value = sugerencia;
            ctnBusqueda.innerHTML = '';
            busqueda();
        })
        img.appendChild(btn);
        ctnImg.appendChild(img);
        ctnTotal.appendChild(ctnImg);
        ctnSugerencias.appendChild(ctnTotal);
    });
}
for (let i = 0; i < 4; i++) {
    let index = Math.floor(Math.random() * (tagsSugerir.length - 0)) + 0;
    sugerir(tagsSugerir[index]);
}
//trending
async function giphyTrending(){
    let url = "https://api.giphy.com/v1/gifs/trending?api_key=" + apiKey + "&limit=160&rating=PG";
    const resp = await fetch(url);
    const trendingDatos = await resp.json();
    return trendingDatos;
}
trendingDatos = giphyTrending();

let ctnTrendingPages = document.getElementById('ctnTrendingPages');
let ctnPageBtnTrend = document.getElementById('ctnPageBtnTrend');
let firstIndex = [0];
let lastImgBigTrend = [];
let currentTrendingPage = 1;
let maxPageTrending = 1;
trendingDatos.then((respuesta)=>{

    let j = 0;
    for(let i = 0; i < respuesta.data.length; i++){
        if(respuesta.data[i].images.fixed_height.width >= '360'){
            if(j === 25){
                j = 0;
                lastImgBigTrend.push(true);
                firstIndex.push(i);
                maxPageTrending++;
            }else if(j > 23){
                j = 0;
                lastImgBigTrend.push(false);
                firstIndex.push(i);
                maxPageTrending++;
            }
            j++;
        }else{
            if (j === 25){
                j = 0;
                lastImgBigTrend.push(true);
                firstIndex.push(i);
                maxPageTrending++;
            }else if(j > 23){
                j = 0;
                lastImgBigTrend.push(false);
                firstIndex.push(i);
                maxPageTrending++;
            }
        }
        j++;
        if(i === (respuesta.data.length-1)){
            firstIndex.push(i);
        }
    }
    console.log(firstIndex);
    console.log(maxPageTrending);
    for(let i = 1; i <= maxPageTrending; i++){
        let button = document.createElement('button');
        button.textContent = i;
        ctnPageBtnTrend.appendChild(button);
    }
    let buttonsTrend = document.querySelectorAll('#ctnPageBtnTrend button');
    buttonsTrend[currentTrendingPage-1].classList.add('currentTrendPageHighlight');
    for(let i = 0; i < buttonsTrend.length; i++){
        buttonsTrend[i].addEventListener('click', () => {
            if(buttonsTrend[i].textContent !== currentTrendingPage){
                buttonsTrend[currentTrendingPage-1].classList.remove('currentTrendPageHighlight');
                currentTrendingPage = buttonsTrend[i].textContent;
                buttonsTrend[i].classList.add('currentTrendPageHighlight');
                loadTrendingPage(respuesta);
            }
        })
    }
    pageLeftTrend.addEventListener('click',() => {
        if(currentTrendingPage !== 1){
            buttonsTrend[currentTrendingPage-1].classList.remove('currentTrendPageHighlight');
            currentTrendingPage--;
            buttonsTrend[currentTrendingPage-1].classList.add('currentTrendPageHighlight');
            loadTrendingPage(respuesta);
        }
    })
    pageRightTrend.addEventListener('click',() => {
        if(currentTrendingPage < maxPageTrending){
            buttonsTrend[currentTrendingPage-1].classList.remove('currentTrendPageHighlight');
            currentTrendingPage++;
            buttonsTrend[currentTrendingPage-1].classList.add('currentTrendPageHighlight');
            loadTrendingPage(respuesta);
        }
    })
    loadTrendingPage(respuesta);
});
function loadTrendingPage(respuesta){
    ctnTrending.innerHTML = '';
    for (let i = (firstIndex[currentTrendingPage-1]); i < (firstIndex[currentTrendingPage]); i++) {
        let content;
        let titleStr;
        let ctnTotal = document.createElement('div');
        ctnTotal.setAttribute('class', 'ctnTotal');
        let ctnImg = document.createElement('div');
        ctnImg.setAttribute('class', 'ctnImg');
        let img = document.createElement('div');
        img.setAttribute('class', 'img');
        img.style.background = 'url('+respuesta.data[i].images.fixed_height_still.url+') center center';
        img.style.backgroundSize = 'auto 100%';
        if(respuesta.data[i].images.fixed_height.width >= '360'){
            if(i === (firstIndex[currentTrendingPage]-1) && lastImgBigTrend[currentTrendingPage - 1] === true){
            }else{
                ctnTotal.classList.add('largeTotal');
                ctnImg.classList.add('largeImg');
            }
        }
        //mover img
        img.addEventListener('mouseenter', function(){
            this.style.background = 'url('+respuesta.data[i].images.fixed_height.url+') center center'
            this.style.backgroundSize = 'auto 100%';
        });
        //pausar img
        img.addEventListener('mouseleave', function(){
            this.style.background = 'url('+respuesta.data[i].images.fixed_height_still.url+') center center'
            this.style.backgroundSize = 'auto 100%';
        });
        //url al clickear
        img.addEventListener('click', ()=>{
            window.open(respuesta.data[i].url,'_blank');
        });
        content = document.createElement('p');
        content.setAttribute('class', 'title');
        titleStr = respuesta.data[i].title.charAt(0).toUpperCase() + respuesta.data[i].title.substring(1); 
        content.textContent = titleStr.slice(0, titleStr.indexOf("GIF")); 
        if(content.textContent === ''){ 
            content.classList.add('hidden'); 
        }
        img.appendChild(content);
        ctnImg.appendChild(img);
        ctnTotal.appendChild(ctnImg);
        ctnTrending.appendChild(ctnTotal);
    }
}

