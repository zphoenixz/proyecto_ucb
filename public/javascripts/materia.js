
/*
function addLoadEvent(func) {  
    var oldonload = window.onload;  
    if (typeof window.onload != 'function') {  
      window.onload = func;  
    } else {  
      window.onload = function() {  
        if (oldonload) {  
          oldonload();  
        }  
        func();  
      }  
    }  
}  	
addLoadEvent(function() { 
  document.getElementById('tit').innerHTML = GetMat();
});*/

function onload(){
    document.getElementById("myURL").disabled = true;
    //console.log("La materia cargada es "+NMateria); 
}
function init(){
    onload();
}
init();
