var NMateria = "Sin Nombre";

function set_NMateria(nombre){
    NMateria = nombre;
    return NMateria;
}

function onload(){
    console.log("La materia cargada es "+NMateria);
    //document.getElementsByName('tit')[0].value = NMateria;
    
}

function init(){
    onload();
}




init();