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

