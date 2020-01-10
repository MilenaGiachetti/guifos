//get Giphy API Key
//---------------busqueda---------------
//...............funcionBusqueda...............
//1-fetch data de la api, endpoint: https://api.giphy.com/v1/gifs/search?q=(input busqueda) -- variable valor del input
//2-agarrar el value del input y pasarlo a la funcion al tocar enter (keydown) o al clickear boton 'buscar'
//3-debe agregarse al html los resultados de la busqueda en una grid
//---------------sugerencias---------------
//hacer un array con tags(coding, cats,typing, aww, dance,etc -10/15) para buscar un gif random
//1-fetch data de la api, endpoint: ?????(tag sugerencia) -- variable valor del input

/*'https://api.giphy.com/v1/gifs/random?api_key='+apiKey+'&tag=adventure+time&fmt=html'*/

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
let imgLupa = document.getElementById('imgLupa');

let suggestItems = ['Morty','Rick','Dark','Star Wars','Planet','Death Note', 'Love','Baby Yoda', 'Yoda','Cat', 'Juego', 'Dancing', 'Typing', 'Game','Weird', 'Pig','Funny','Animation','Movies','Anime','Unicorn','Werk', 'Adventure Time', 'Gravity Falls', 'SpongeBob', 'Avocado', 'Vaca', 'Disney', 'Joker','Japón', 'Corea', 'Strange', 'Ñoño', 'Hola', 'Area 51', 'Comida', 'Baby Shark', 'Quiero', 'Queso', '1984', 'Queen', 'X-Men', 'Zorro'];
if(localStorage.getItem('suggestions') === '' || localStorage.getItem('suggestions') === null ){
    localStorage.setItem("suggestions", JSON.stringify(suggestItems));
}
if(localStorage.getItem('theme') === 'theme-dark'){
    setTheme('theme-dark');
    logo.setAttribute('src',"assets/img/logodark.png");
    imgLupa.setAttribute('src', 'assets/img/lupamiddlegray.svg')
}else{
    setTheme('theme-light');
    logo.setAttribute('src',"assets/img/logo.png");
    imgLupa.setAttribute('src', 'assets/img/lupainactive.svg')
}

function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}
dark.addEventListener('click',()=>{
    setTheme('theme-dark');
    logo.setAttribute('src',"assets/img/logodark.png");
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
})

//busqueda 
let sugerencia1 = document.getElementById('resultado1');
let sugerencia2 = document.getElementById('resultado2');
let sugerencia3 = document.getElementById('resultado3');
let cuadroSug1 = document.getElementById('cuadroSug1');
let cuadroSug2 = document.getElementById('cuadroSug2');
let cuadroSug3 = document.getElementById('cuadroSug3');
let noResults = false;
function busqueda(){
    sugerenciasBusq.classList.add('hidden')
    ctnBusqueda.innerHTML = '';
    titleBusq.classList.add('hidden');
    tagsSugeridos.classList.add('hidden');
    async function giphyBusqueda(busqueda){
        let url = "https://api.giphy.com/v1/gifs/search?q=" + busqueda + "&api_key=" + apiKey + "&limit=20&rating=PG";
        const resp = await fetch(url);
        const datos = await resp.json();
        return datos;
    }
    datos = giphyBusqueda(inputBusqueda.value);
    datos.then(function(respuesta){
        if(respuesta.data.length === 0){
            ctnBusqueda.innerHTML = "<p class='error'>OOPS! No se encontraron Gifs de ' "+inputBusqueda.value+"'.</p>";
            noResults = true;
        }else{
            titleBusq.classList.remove('hidden');
            tagsSugeridos.classList.remove('hidden');
            titleBusq.textContent = "Resultados de: '" + inputBusqueda.value+"'";
            for (let i = 0; i < respuesta.data.length; i++) {
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
                    ctnTotal.classList.add('largeTotal');
                    ctnImg.classList.add('largeImg');
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
        }
        btnBusqueda.classList.remove('btnBuscar');
        btnBusqueda.classList.remove('btn');
        btnBusqueda.classList.add('btnInactivo');
        if(localStorage.getItem('theme') === 'theme-dark'){
            imgLupa.setAttribute('src', 'assets/img/lupamiddlegray.svg')
        }else{
            imgLupa.setAttribute('src', 'assets/img/lupainactive.svg')
        }
        saveSug();
        inputBusqueda.value = '';
    });
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
        btn.innerHTML = "<a href='"+respuesta.data.bitly_url+"' target='_blank'> Ver más...</a>";
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
    let url = "https://api.giphy.com/v1/gifs/trending?api_key=" + apiKey + "&limit=20&rating=PG";
    const resp = await fetch(url);
    const trendingDatos = await resp.json();
    return trendingDatos;
}
trendingDatos = giphyTrending();

trendingDatos.then((respuesta)=>{
    for (let i = 0; i < respuesta.data.length; i++) {
        let ctnTotal = document.createElement('div');
        ctnTotal.setAttribute('class', 'ctnTotal');
        let ctnImg = document.createElement('div');
        ctnImg.setAttribute('class', 'ctnImg');
        let img = document.createElement('div');
        img.setAttribute('class', 'img');
        img.style.background = 'url('+respuesta.data[i].images.fixed_height_still.url+') center center';
        img.style.backgroundSize = 'auto 100%';
        if(respuesta.data[i].images.fixed_height.width >= '360'){
            ctnTotal.classList.add('largeTotal');
            ctnImg.classList.add('largeImg');
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
        let content = document.createElement('p');
        content.setAttribute('class', 'title');
        let titleStr = respuesta.data[i].title.charAt(0).toUpperCase() + respuesta.data[i].title.substring(1); 
        content.textContent = titleStr.slice(0, titleStr.indexOf("GIF")); 
        if(content.textContent === ''){ 
            content.classList.add('hidden'); 
        }
        img.appendChild(content);
        ctnImg.appendChild(img);
        ctnTotal.appendChild(ctnImg);
        ctnTrending.appendChild(ctnTotal);
    }
});


