var NMateria = "Sin Nombre";
/*module.exports = function CNombre(nom) {
    NMateria = nom;
    return NMateria;
};*/
function set_NMateria(nombre){
    NMateria = nombre;
    return NMateria;
}

function onload(){
    console.log("La materia cargada es "+NMateria);
    document.getElementsByName('tit')[0].value = NMateria;
    
}

function init(){
    onload();
}




init();