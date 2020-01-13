var light = document.getElementById('light');
var dark = document.getElementById('dark');
var dropdownCaret = document.getElementById('dropdownCaret');
var dropdownMenu = document.getElementById('dropdownMenu');
var logo = document.getElementById('logo');
var caret = document.getElementById('caret');

if(localStorage.getItem('theme') === 'theme-dark'){
    setTheme('theme-dark');
    logo.setAttribute('src',"assets/img/logodark.png");
    caret.classList.add('whiteCaret');
}else{
    setTheme('theme-light');
    logo.setAttribute('src',"assets/img/logo.png");
    caret.classList.remove('whiteCaret');
}


function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}
dark.addEventListener('click',function(){
    setTheme('theme-dark');
    logo.setAttribute('src',"assets/img/logodark.png");
    caret.classList.add('whiteCaret');
    cerrarMenu();
    event.stopPropagation();
});
light.addEventListener('click',function(){
    setTheme('theme-light');
    logo.setAttribute('src',"assets/img/logo.png");
    caret.classList.remove('whiteCaret');
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

localStorage.setItem('currentPage', 'misGuifos');

