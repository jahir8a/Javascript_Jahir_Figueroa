
var Calculadora=(function(){
	
		var numeroPantalla="0"; 
		var	iniciarNumeroEnPantalla=1; //iniciar número en pantalla: 1=si; 0=no;
		var	tieneComa=0; //estado coma decimal 0=no, 1=si;
		var	numeroEnEspera=0; //número oculto o en espera.
		var	operacion="no"; //operación en curso; "no" =  sin operación.
		var	pantalla=null;
		var alto_original=null;
		var ancho_original=null;
		var repetirOperacion=0;
		var ultimoOperador="";
		var ultimoOperando="";
		var ultimoEnEspera=0;
		var resultado = 0;
		
		
		var suscribirseAEventos = function(){
		document.getElementById("0").addEventListener("click",mostrarEnPantalla,false);
		document.getElementById("1").addEventListener("click",mostrarEnPantalla,false);
		document.getElementById("2").addEventListener("click",mostrarEnPantalla,false);
		document.getElementById("3").addEventListener("click",mostrarEnPantalla,false);
		document.getElementById("4").addEventListener("click",mostrarEnPantalla,false);
		document.getElementById("5").addEventListener("click",mostrarEnPantalla,false);
		document.getElementById("6").addEventListener("click",mostrarEnPantalla,false);
		document.getElementById("7").addEventListener("click",mostrarEnPantalla,false);
		document.getElementById("8").addEventListener("click",mostrarEnPantalla,false);
		document.getElementById("9").addEventListener("click",mostrarEnPantalla,false);
		document.getElementById("mas").addEventListener("click",operador,false);
		document.getElementById("menos").addEventListener("click",operador,false);
		document.getElementById("por").addEventListener("click",operador,false);
		document.getElementById("dividido").addEventListener("click",operador,false);
		document.getElementById("raiz").addEventListener("click",mostrarEnPantalla,false);
		document.getElementById("sign").addEventListener("click",numeroOpuesto,false);
		document.getElementById("on").addEventListener("click",borrarTodo,false);
		document.getElementById("punto").addEventListener("click",mostrarEnPantalla,false);
		document.getElementById("igual").addEventListener("click",igual,false);
		
		document.getElementById("0").addEventListener("mousedown",reducirBoton,false);
		document.getElementById("1").addEventListener("mousedown",reducirBoton,false);
		document.getElementById("2").addEventListener("mousedown",reducirBoton,false);
		document.getElementById("3").addEventListener("mousedown",reducirBoton,false);
		document.getElementById("4").addEventListener("mousedown",reducirBoton,false);
		document.getElementById("5").addEventListener("mousedown",reducirBoton,false);
		document.getElementById("6").addEventListener("mousedown",reducirBoton,false);
		document.getElementById("7").addEventListener("mousedown",reducirBoton,false);
		document.getElementById("8").addEventListener("mousedown",reducirBoton,false);
		document.getElementById("9").addEventListener("mousedown",reducirBoton,false);
		document.getElementById("mas").addEventListener("mousedown",reducirBoton,false);
		document.getElementById("menos").addEventListener("mousedown",reducirBoton,false);
		document.getElementById("por").addEventListener("mousedown",reducirBoton,false);
		document.getElementById("dividido").addEventListener("mousedown",reducirBoton,false);
		document.getElementById("raiz").addEventListener("mousedown",reducirBoton,false);
		document.getElementById("sign").addEventListener("mousedown",reducirBoton,false);
		document.getElementById("on").addEventListener("mousedown",reducirBoton,false);
		document.getElementById("punto").addEventListener("mousedown",reducirBoton,false);
		document.getElementById("igual").addEventListener("mousedown",reducirBoton,false);
		
		document.getElementById("0").addEventListener("mouseup",botonOriginal,false);
		document.getElementById("1").addEventListener("mouseup",botonOriginal,false);
		document.getElementById("2").addEventListener("mouseup",botonOriginal,false);
		document.getElementById("3").addEventListener("mouseup",botonOriginal,false);
		document.getElementById("4").addEventListener("mouseup",botonOriginal,false);
		document.getElementById("5").addEventListener("mouseup",botonOriginal,false);
		document.getElementById("6").addEventListener("mouseup",botonOriginal,false);
		document.getElementById("7").addEventListener("mouseup",botonOriginal,false);
		document.getElementById("8").addEventListener("mouseup",botonOriginal,false);
		document.getElementById("9").addEventListener("mouseup",botonOriginal,false);
		document.getElementById("mas").addEventListener("mouseup",botonOriginal,false);
		document.getElementById("menos").addEventListener("mouseup",botonOriginal,false);
		document.getElementById("por").addEventListener("mouseup",botonOriginal,false);
		document.getElementById("dividido").addEventListener("mouseup",botonOriginal,false);
		document.getElementById("raiz").addEventListener("mouseup",botonOriginal,false);
		document.getElementById("sign").addEventListener("mouseup",botonOriginal,false);
		document.getElementById("on").addEventListener("mouseup",botonOriginal,false);
		document.getElementById("punto").addEventListener("mouseup",botonOriginal,false);
		document.getElementById("igual").addEventListener("mouseup",botonOriginal,false);
		};
		
		
		var inicializar = function() {
			pantalla = document.getElementById("display");
			pantalla.innerHTML="0";
			suscribirseAEventos();
			
		};
		
		return {
			init: inicializar
		 };
		
		
function reducirBoton(boton){
	if(boton.target.alt=="mas"){
		boton.target.style="padding-right:2px";
	}else{
	boton.target.style="padding:2px";
	}
}

function botonOriginal(boton){
	if(boton.target.alt=="mas"){
		boton.target.style="padding-right:0px";
	}else{
	boton.target.style="padding:0px";
	}
}

function mostrarEnPantalla(tecla){
		//animarBoton(tecla.target);
		var numero="";
		switch(tecla.target.alt){
			case 'mas':
			//numero = "+";
			break;
			case 'menos':
			//numero = "-";
			break;
			case 'por':
			//numero = "*";
			break;
			case 'dividido':
			//numero = "/";
			break;
			case "punto":
			numero=".";
			break;
			case "igual":
			break;
			case "On":
			break;
			default:
			numero = tecla.target.alt;
		}
		if(pantalla.innerHTML.length<8 || pantalla.innerHTML.length==null){
				agregarNumeroYPunto(numero);
				iniciarNumeroEnPantalla=0; //el número está iniciado y podemos ampliarlo.
		}
}
	function operador(s){
		
		repetirOperacion=0;
		if(numeroEnEspera!=0){
			
			igual();
		}
		switch(s.target.alt){
			case "mas":
			operacion="+"; //guardamos tipo de operación.
			break;
			case "menos":
			operacion="-"; //guardamos tipo de operación.
			break;
			case "por":
			operacion="*"; //guardamos tipo de operación.
			break;
			case "dividido":
			operacion="/"; //guardamos tipo de operación.
			break;
		}
		
		numeroEnEspera=numeroPantalla; //ponemos el 1º número en "numero en espera" para poder escribir el segundo.
		pantalla.innerHTML=""; // se limpia la pantalla
		tieneComa=0;
		ultimoOperando=0;//el ultimo operando se coloca a cero ya que se inicia una nueva operacion
        iniciarNumeroEnPantalla=1; //inicializar pantalla.
		
	}
	function igual(s) {
	if(s!=undefined) { repetirOperacion++; }
		var resultado = 0;
         if (operacion=="no") { //no hay ninguna operación pendiente.
            pantalla.innerHTML=numeroPantalla;	//mostramos el mismo número	
            }
			else if(repetirOperacion>1){
				
			switch(operacion){
				case "+":
					resultado = sumar(parseFloat(ultimoOperando),parseFloat(numeroPantalla));
					resultado=""+resultado;
					resultado=resultado.substr(0,8);
				break;
				case "-":
					resultado = restar(parseFloat(numeroPantalla),parseFloat(ultimoOperando));
					resultado=""+resultado;
					resultado=resultado.substr(0,8);
				break;
				case "*":
					resultado = multiplicar(parseFloat(ultimoOperando),parseFloat(numeroPantalla));
					resultado=""+resultado;
					resultado=resultado.substr(0,8);
				break;
				case "/":
					resultado = dividir(parseFloat(numeroPantalla),parseFloat(ultimoOperando));
					resultado=""+resultado;
					resultado=resultado.substr(0,8);
				break;
			}
			
			pantalla.innerHTML=resultado; //mostramos la solución
            numeroPantalla=resultado; //guardamos la solución
            iniciarNumeroEnPantalla=1; //se puede reiniciar la pantalla.
			}
         else { //con operación pendiente resolvemos
            //repetirOperacion++;
			ultimoOperando=numeroPantalla;
			switch(operacion){
				case "+":
					resultado = sumar(parseFloat(numeroEnEspera),parseFloat(numeroPantalla));
					resultado=""+resultado;
					resultado=resultado.substr(0,8);
				break;
				case "-":
					resultado = restar(parseFloat(numeroEnEspera),parseFloat(numeroPantalla));
					resultado=""+resultado;
					resultado=resultado.substr(0,8);
				break;
				case "*":
					resultado = multiplicar(parseFloat(numeroEnEspera),parseFloat(numeroPantalla));
					resultado=""+resultado;
					resultado=resultado.substr(0,8);
				break;
				case "/":
					resultado = dividir(parseFloat(numeroEnEspera),parseFloat(numeroPantalla));
					resultado=""+resultado;
					resultado=resultado.substr(0,8);
				break;
			}
			numeroEnEspera = 0;
				pantalla.innerHTML=resultado; //mostramos la solución
				numeroPantalla=resultado; //guardamos la solución
				iniciarNumeroEnPantalla=1; //se puede reiniciar la pantalla.
            }
    }
	function borrarTodo(){
		pantalla.innerHTML="0"; //poner pantalla en 0
         numeroPantalla="0"; //reiniciar número en pantalla
         tieneComa=0; //reiniciar estado coma decimal 
         numeroEnEspera=0; //indicador de número oculto a 0;
         operacion="no"; //borrar operación en curso.
		 repetirOperacion=0;
	}
	function numeroOpuesto() { 
		if(pantalla.innerHTML.length>0){
				numeroOriginal=Number(numeroPantalla); //convertir en número
				numeroOriginal=-numeroOriginal; //cambiar de signo
				numeroPantalla=String(numeroOriginal); //volver a convertir a cadena
				pantalla.innerHTML=numeroPantalla; //mostrar en pantalla.
		}
    }
	
	function agregarNumeroYPunto(numero){
		if (numeroPantalla=="0" || iniciarNumeroEnPantalla==1  ) {	// inicializar un número, 
            pantalla.innerHTML=numero; //mostrar en pantalla
            numeroPantalla=numero; //guardar número
            if (numero==".") { //si escribimos una coma al principio del número
               pantalla.innerHTML="0."; //escribimos 0.
               numeroPantalla=numero; //guardar número
               tieneComa=1; //cambiar estado de la coma
               }
           }
           else { //continuar escribiendo un número
               if (numero=="." && tieneComa==0) { //si escribimos una coma decimal pòr primera vez
                   pantalla.innerHTML+=numero;
                   numeroPantalla+=numero;
                   tieneComa=1; //cambiar el estado de la coma  
               }
               //si intentamos escribir una segunda coma decimal no realiza ninguna acción.
               else if (numero=="." && tieneComa==1) {} 
               //Resto de casos: escribir un número del 0 al 9 	 
               else {
                   pantalla.innerHTML+=numero;
                   numeroPantalla+=numero
               }
            }
	}
		
		function actualizarResultado(nuevoResultado){
			resultado = nuevoResultado;
			return resultado;
		}
		
			function sumar(num1,num2){
				var resultado = num1+num2;
				return actualizarResultado(resultado);
			}
			function restar(num1,num2){
				var resultado = num1-num2;
				return actualizarResultado(resultado);
			}
			function multiplicar(num1,num2){
				var resultado = num1*num2;
				return actualizarResultado(resultado);
			}
			function dividir(num1,num2){
				var resultado = num1/num2;
				return actualizarResultado(resultado);
			}
		
		
	})();


window.onload=function(){
Calculadora.init();
}