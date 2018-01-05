var NMateria = "Sin Nombre";
module.exports = function CNombre(nom) {
    NMateria = nom;
    return NMateria;
};
function set_NMateria(nombre){
    NMATERIA = nombre;
}

function onload(){
    console.log("La materia cargada es "+NMateria);
    document.getElementById('tit').value=NMateria;
    
}

function init(){
    onload();
}




init();