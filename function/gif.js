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
var imgLupa = document.getElementById('imgLupa');
var sugerencia1 = document.getElementById('resultado1');
var sugerencia2 = document.getElementById('resultado2');
var sugerencia3 = document.getElementById('resultado3');

var Qsuggest = ['hola','morty','rick','alabama','dark','star wars','planet','love','planetario','planometria', 'Abadejo','Abadía','Abano','Abasto','Abdomen','Abecedario','Abedul','Abeja','Abejilla','Abertura','Abeto','Abismo','Ambiente','Abogada','Abogado','Abono','Abrazo','Abrelatas','Abrigo','Academia','Acceso','Accesorio','Acebiño','Acebo','Acedía','Aceite','Aceituna','Acelga','Acelgas','Acento','Acentor','plata','palta'];
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
dark.addEventListener('click',function(){
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
light.addEventListener('click',function(){
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
document.addEventListener('click', function(){
    caret.classList.remove('open-caret');        
    dropdownMenu.classList.add('hidden');
})

//busqueda Qsuggest

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
        }else{
            titleBusq.classList.remove('hidden');
            tagsSugeridos.classList.remove('hidden');
            titleBusq.textContent = "Resultados de: '" + inputBusqueda.value+"'";
            for (let i = 0; i < respuesta.data.length; i++) {
                var ctnTotal = document.createElement('div');
                ctnTotal.setAttribute('class', 'ctnTotal');
                var ctnImg = document.createElement('div');
                ctnImg.setAttribute('class', 'ctnImg');
                var img = document.createElement('div');
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
        inputBusqueda.value = '';
    });
}
btnBusqueda.addEventListener('click', busqueda);
inputBusqueda.addEventListener('keyup', function(){
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
    }else if (event.which === 8|| event.keyCode == 8){
        if(inputBusqueda.value === ''||inputBusqueda.value.length < 1){
            sugerenciasBusq.classList.add('hidden');
            btnBusqueda.classList.remove('btnBuscar');
            btnBusqueda.classList.remove('btn');
            btnBusqueda.classList.add('btnInactivo');
            if(localStorage.getItem('theme') === 'theme-dark'){
                imgLupa.setAttribute('src', 'assets/img/lupamiddlegray.svg')
            }else{
                imgLupa.setAttribute('src', 'assets/img/lupainactive.svg')
            }

        }
    }/*else{
        Qsuggest.forEach(function(suggestion1){
            if(suggestion1.toLowerCase().includes(inputBusqueda.value.toLowerCase()) && suggestion1 !== sugerencia2.textContent  && suggestion1 !== sugerencia3.textContent){
                sugerencia1.textContent = suggestion1;
                console.log(suggestion1);
            }
        });
        Qsuggest.forEach(function(suggestion2){
            if(suggestion2.toLowerCase().includes(inputBusqueda.value.toLowerCase()) && suggestion2 !== sugerencia1.textContent  && suggestion2 !== sugerencia3.textContent){
                sugerencia2.textContent = suggestion2;
                console.log(suggestion2);
            }
        });               
        Qsuggest.forEach(function(suggestion3){
            if(suggestion3.toLowerCase().includes(inputBusqueda.value.toLowerCase()) && suggestion3 !== sugerencia1.textContent && suggestion3 !== sugerencia2.textContent){
                sugerencia3.textContent = suggestion3;
                console.log(suggestion3);
            }
        });
    }*/
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
            let index = Math.floor(Math.random() * (tagsSugerir.length - 0)) + 0;
            sugerir(tagsSugerir[index]);
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
        var content = document.createElement('p');
        content.setAttribute('class', 'title');

        //str = respuesta.data[i].title.substring(str.indexOf("G") + 1); 
        let titleStr = respuesta.data[i].title.charAt(0).toUpperCase() + respuesta.data[i].title.substring(1); 
        content.textContent = titleStr.slice(0, titleStr.indexOf("GIF")); 
        if(content.textContent === ''){ 
            content.textContent = 'No title'; 
        }
        /*if(respuesta.data[i].images.fixed_height_still.width >= 345){
            div.classList.add('gifRectangulo');
        }else{
            div.classList.add('gifCuadrado');
        }*/
        img.appendChild(content);
        ctnImg.appendChild(img);
        ctnTotal.appendChild(ctnImg);
        ctnTrending.appendChild(ctnTotal);
        /*ctnTotal.addEventListener('mouseenter', function(){
            ctnTotal.classList.add('hidden');
        })*/
    }
});


