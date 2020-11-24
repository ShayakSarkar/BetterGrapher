function onClick(e){
    e.preventDefault();
    console.log(e.pageX, e.pageY);
}

document.addEventListener('contextmenu',onClick);