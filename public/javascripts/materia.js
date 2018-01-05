
var NMateria = "Sin Nombre";
export{NMateria};


function onload(){
    console.log("La materia cargada es "+NMateria);
    document.getElementById('tit').value=NMateria;
    
}

function init(){
    onload();
}




init();