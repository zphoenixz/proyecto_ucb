var NMateria = "Sin Nombre";
var aux;
function set_NMateria(nombre){
    NMateria = nombre;
    aux = NMateria;
    console.log("Supuestamente cambie a "+NMateria);
    return NMateria;
}

function onload(){
    console.log("La materia cargada es "+aux);
    //document.getElementsByName('tit')[0].value = NMateria;
    
}

function init(){
    onload();
}




init();