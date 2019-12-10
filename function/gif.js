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
var ctnBusqueda = document.getElementById('ctnBusqueda');
var ctnTrending = document.getElementById('ctnTrending');
var ctnSugerencias = document.getElementById('ctnSugerencias');
var inputBusqueda = document.getElementById('inputBusqueda');
var sugerenciasBusq = document.getElementById('sugerenciasBusq');
var titleBusq = document.getElementById('titleBusq');
var btnBusqueda = document.getElementById('btnBusqueda');
var tagsSugeridos = document.getElementById('tagsSugeridos');
var light = document.getElementById('light');
var dark = document.getElementById('dark');
var dropdownCaret = document.getElementById('dropdownCaret');
var dropdownMenu = document.getElementById('dropdownMenu');
var logo = document.getElementById('logo');
var caret = document.getElementById('caret');

function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}
dark.addEventListener('click',function(){
    setTheme('theme-dark');
    logo.setAttribute('src',"assets/img/logodark.png");
    cerrarMenu();
    event.stopPropagation();
});
light.addEventListener('click',function(){
    setTheme('theme-light');
    logo.setAttribute('src',"assets/img/logo.png");
    cerrarMenu();
    event.stopPropagation();
});
dropdownCaret.addEventListener('click', cerrarMenu)
function cerrarMenu (){
    caret.classList.toggle('open-caret');        
    dropdownMenu.classList.toggle('hidden');
    event.stopPropagation();
}
document.addEventListener('click', function(){
    caret.classList.remove('open-caret');        
    dropdownMenu.classList.add('hidden');
})

//busqueda

function busqueda(){
    sugerenciasBusq.classList.add('hidden')
    ctnBusqueda.innerHTML = '';
    titleBusq.classList.remove('hidden');
    titleBusq.textContent = "Resultados de: '" + inputBusqueda.value+"'";
    tagsSugeridos.classList.remove('hidden');
    async function giphyBusqueda(busqueda){
        let url = "https://api.giphy.com/v1/gifs/search?q=" + busqueda + "&api_key=" + apiKey + "&limit=4&rating=PG";
        const resp = await fetch(url);
        const datos = await resp.json();
        return datos;
    }
    datos = giphyBusqueda(inputBusqueda.value);
    datos.then(function(respuesta){
        for (let i = 0; i < respuesta.data.length; i++) {
            var ctnTotal = document.createElement('div');
            ctnTotal.setAttribute('class', 'ctnTotal');
            var ctnImg = document.createElement('div');
            ctnImg.setAttribute('class', 'ctnImg');
            ctnImg.style.background = 'url('+respuesta.data[i].images.fixed_height/*_still*/.url+') center center';
            /*background-size: auto 100%;*/
            ctnImg.style.backgroundSize = 'cover';

            ctnTotal.appendChild(ctnImg);
            ctnBusqueda.appendChild(ctnTotal);
        }
        btnBusqueda.classList.remove('btn');
        btnBusqueda.classList.add('btnInactivo');
    });
    inputBusqueda.value = '';
}
btnBusqueda.addEventListener('click', busqueda);
inputBusqueda.addEventListener('keydown', function(){
    sugerenciasBusq.classList.remove('hidden');
    btnBusqueda.classList.add('btn');
    btnBusqueda.classList.remove('btnInactivo');

    if (event.which === 13|| event.keyCode == 13) {
        busqueda();
    }else if (event.which === 8|| event.keyCode == 8){
        if(inputBusqueda.value === ''||inputBusqueda.value.length <= 1){
            sugerenciasBusq.classList.add('hidden');
            btnBusqueda.classList.remove('btn');
            btnBusqueda.classList.add('btnInactivo');
    
        }
    }
})
//funcion cerrar sugerencias
function close (){
    this.ctnTotal.remove();
}
//sugerencias
let tagsSugerir = ['cat', 'dancing', 'typing', 'pig'];
async function giphySugerencias(sugerencia){
    let url = "https://api.giphy.com/v1/gifs/random?api_key=" + apiKey + "&tag="+ sugerencia +"&rating=PG";
    const resp = await fetch(url);
    const sugerenciasDatos = await resp.json();
    return sugerenciasDatos;
}
function sugerir(sugerencia){
    sugerenciasDatos = giphySugerencias(sugerencia);
    sugerenciasDatos.then(function(respuesta){
        var ctnTotal = document.createElement('div');
        ctnTotal.setAttribute('class', 'ctnTotal');
        var title = document.createElement('div');
        title.setAttribute('class', 'title');
        var content = document.createElement('p');
        content.textContent = '#'+sugerencia/*respuesta.data.title*/;
        var close = document.createElement('img');
        close.setAttribute('src', 'assets/img/close.svg');
        //funcion de cerrar
        close.addEventListener('click',function(){
            ctnTotal.remove();
            sugerir();
        });    
        title.appendChild(content);
        title.appendChild(close);
        ctnTotal.appendChild(title);
        var ctnImg = document.createElement('div');
        ctnImg.setAttribute('class', 'ctnImg');
        var img = document.createElement('div');
        img.setAttribute('class', 'img');
        img.style.background = 'url('+respuesta.data.images.fixed_height/*_still*/.url+') center center';
            /*background-size: auto 100%;*/
        img.style.backgroundSize = 'cover';
        var btn = document.createElement('button');
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
trendingDatos.then(function(respuesta){
    for (let i = 0; i < respuesta.data.length; i++) {
        var ctnTotal = document.createElement('div');
        ctnTotal.setAttribute('class', 'ctnTotal');
        var ctnImg = document.createElement('div');
        ctnImg.setAttribute('class', 'ctnImg');
        var img = document.createElement('div');
        img.setAttribute('class', 'img');
        img.style.background = 'url('+respuesta.data[i].images.fixed_height_still.url+') center center';
        img.style.backgroundSize = 'cover';
        var content = document.createElement('p');
        content.setAttribute('class', 'title');
        content.textContent = '#cat #grumpy #cute #aww';
        img.appendChild(content);
        ctnImg.appendChild(img);
        ctnTotal.appendChild(ctnImg);
        
        /*if(respuesta.data[i].images.fixed_height_still.width >= 345){
            div.classList.add('gifRectangulo');
        }else{
            div.classList.add('gifCuadrado');
        }*/
        ctnTrending.appendChild(ctnTotal);
        ctnTotal.addEventListener('mouseenter', function(){
            ctnTotal.classList.add('hidden');
        })
    }
});
