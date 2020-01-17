const apiKey = 'HxeqWZObT2555n5inNEcjXprIyTed8Iq';


let light = document.getElementById('light');
let dark = document.getElementById('dark');
let dropdownCaret = document.getElementById('dropdownCaret');
let dropdownMenu = document.getElementById('dropdownMenu');
let logo = document.getElementById('logo');
let caret = document.getElementById('caret');
let btnOpenMenu = document.getElementById('btnOpenMenu');
let caretMenu = document.getElementById('caretMenu');

if(localStorage.getItem('theme') === 'theme-dark'){
    setTheme('theme-dark');
    logo.setAttribute('src',"assets/img/logodark.png");
    caret.classList.add('whiteCaret');
    caretMenu.classList.add('whiteCaret');
}else{
    setTheme('theme-light');
    logo.setAttribute('src',"assets/img/logo.png");
    caret.classList.remove('whiteCaret');
    caretMenu.classList.remove('whiteCaret');
}


function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}
dark.addEventListener('click', () => {
    setTheme('theme-dark');
    logo.setAttribute('src',"assets/img/logodark.png");
    caret.classList.add('whiteCaret');
    caretMenu.classList.add('whiteCaret');
    cerrarMenu();
    event.stopPropagation();
});
light.addEventListener('click', () => {
    setTheme('theme-light');
    logo.setAttribute('src',"assets/img/logo.png");
    caret.classList.remove('whiteCaret');
    caretMenu.classList.remove('whiteCaret');
    cerrarMenu();
    event.stopPropagation();
});
dropdownCaret.addEventListener('click', cerrarMenu)
function cerrarMenu (){
    caret.classList.toggle('open-caret');        
    dropdownMenu.classList.toggle('hidden');
    event.stopPropagation();
}
document.addEventListener('click', () => {
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
localStorage.setItem('currentPage', 'misGuifos');

let ctnMisGuifos = document.getElementById('ctnMisGuifos');
if (localStorage.getItem("misGuifos") !== null) {
    let storageMisGuifosActual = JSON.parse(localStorage.misGuifos);
    if (storageMisGuifosActual.length === 0){
        ctnMisGuifos.innerHTML = "<p class='error'>OOPS! No has creado ningún Guifo aún. </p>";
    }else{
        for(let i = storageMisGuifosActual.length-1 ; i >= 0; i--){
            generateMisGuifos (storageMisGuifosActual[i]);
        }
    }
}else{
    ctnMisGuifos.innerHTML = "<p class='error'>OOPS! No has creado ningún Guifo aún. Para crear uno haga <a href= 'recording.html'>click aquí. </a></p>";
}
function generateMisGuifos (id){
    async function generateMyGuifo(id){
        let url = "https://api.giphy.com/v1/gifs/" + id + "?api_key=" + apiKey;
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
        ctnMisGuifos.appendChild(ctnTotal);
    })
}
