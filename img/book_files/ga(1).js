function registerGA() {
  var forms = document.getElementsByTagName('form');
	
  for(var i=0; i<forms.length; i++) {
    // Add hidden form field when we have google checkout tracking
    try {
      if( forms[i].method == 'post') {
        var hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.name = URCHINFIELD;
        hidden.value = getUrchinFieldValue();
        forms[i].appendChild(hidden);      
      }		
    } catch(e) {}	
  }
}


(function (){
  var onload = window.onload;
  
  if ((onload === undefined) || (onload == null))	{ 
		window.onload = function(){ registerGA(); }; 
	} else { 
		window.onload = function(){ registerGA(); onload(); }; 
	}    
})();