var NMateria = "Sin Nombre";
exports.NMateria = NMateria;
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