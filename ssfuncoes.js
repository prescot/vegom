//window.onload = function(){
//	document.onkeydown = TABEnter;
//}

showLoading = function(str){
	str = (typeof str === "undefined") ? "" : str;
	$("#loading").empty().append("<span>"+str+"</span>").css("display","");
}

hideLoading = function(){
	setTimeout(function(){$("#loading").css("display","none");},1000);
}

if (typeof jQuery != 'undefined'){
	jQuery.browser = {};
	jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit    /.test(navigator.userAgent.toLowerCase());
	jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
	jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
	jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
}

if(document.loaded){
	document.onkeydown = TABEnter;
} else {
    if (window.addEventListener) {
	   window.addEventListener('keydown', TABEnter, false);
    } else {
		document.attachEvent('onkeydown', TABEnter);
    }
}

function autoTab(input, e){
	var ind = 0;
	var isNN = (navigator.appName.indexOf("Netscape")!=-1);
	var keyCode = (isNN) ? e.which : e.keyCode;
	var nKeyCode = e.keyCode;
	if(keyCode == 13){
		if (!isNN) {window.event.keyCode = 0;} // evitar o beep
		ind = getIndex(input);
		if(!input.form[ind]) return;
		if (input.form[ind].type == 'textarea' || input.form[ind].type == 'hidden') {
			return;
		}
		ind++;
		if(input.form[ind].name == undefined) return;
			input.form[ind].focus();
		if (input.form[ind].type == 'text') {
			input.form[ind].select();
		}
	}
}

  function getIndex(input) {
	var index = -1, i = 0, found = false;
	while (i < input.form.length && index == -1){
		if (input.form[i] == input) {
			index = i;
			if (i < (input.form.length -1)) {
				if ((input.form[i+1].type == 'hidden') || (input.form[i+1].disabled) || (input.form[i+1].readonly == "readonly")) {
					index++;
				}
				if (input.form[i+1].type == 'button') {
					index++;
				}
			}
		} else {
			i++;
		}
		return index;
	}
}

/**
 *  Variável global para verificar o bloqueio da tecla F5
 *  podendo ser desabilitado a nível de página
 *  var bloqueiaF5 = false;
 */
var bloqueiaF5 = true;
  /** 
	* Método responsável por controle do teclado.
	* Funções retiradas da internet e adaptadas para uso específico do sistema
  	* @author Cabral <cabral@timing.eng.br> 
  	* @version 4.0 
  	* 
  	*/

function TABEnter(oEvent){

   /*	
	*	4. Ajuste para funcionamento do Enter em outros navegadores
	*		Cabral - 16.07.2012
	*	
	*	3. Bloqueio da tecla BackSpace, evitando retornar a outras páginas
	*      Cabral 16.11.2010
	*
   	*	2. Bloqueio da tecla F5, evitando assim Refresh indesejado
    *	   Cabral - 12.11.2010
    *
   	*	1. Bug ao digitar enter em elementos TEXTAREA
    *      Cabral - 20.07.2010
	*
	*	KEYCODE	BACKSPACE	= 8
	*   KEYCODE TAB			= 9
	* 	KEYCODE ENTER 		= 13
	*	KEYCODE F5			= 116
	*/

	var cTabIndex=1;

	var oEvent = (oEvent) ? oEvent : event;
	var oTarget = (oEvent.target) ? oEvent.target : oEvent.srcElement;
	var nTecla = oEvent.keyCode;
	if(navigator.appName.indexOf("Microsoft") == -1){
		autoTab(oTarget, oEvent);
		return;
	}

	if (bloqueiaF5){
		if(nTecla == 116){
			oEvent.keyCode=null;
			oEvent.returnValue=false;
		}
	}

	/*
	 * Bloqueia tecla voltar
	 */
	if(nTecla == 8){
		if((oTarget.type!="textarea") && (oTarget.type!="text") && (oTarget.type!="password")){
			return false;
			oEvent.keyCode=null;
			oEvent.returnValue=false;
		}
	}

	if((oTarget.type=="textarea") && (nTecla == 13)) return;
	if(oTarget.type=="button" && nTecla==13) return;
	if(oTarget.type=="submit" && nTecla==13) return;
	if(oTarget.type=="text" && nTecla==13){
		oEvent.keyCode=9;
	}
	if(oTarget.type=="radio" && nTecla==13){
		oEvent.keyCode=9;
	}
	if(nTecla==13){
		oEvent.keyCode=9;
	}
}

var url 			= window.location.href.split("/");
var globalUrl 		= url[2];
var globalNamespace = url[3];

function openModalWindow(pUrl,pW,pH){
	if(pUrl == ""){
		alert("Please especify a page to open !");
	} else {
		if(pW=="") pW=700;
		if(pH=="") pH=500;
		w = screen.width;
		h = screen.height;
		meio_w = w/2;
		meio_h = h/2;
		altura2 = pH/2;
		largura2 = pW/2;
		meio1 = meio_h-altura2;
		meio2 = meio_w-largura2;
		rand = Math.floor((Math.random()*99090)+1);
		window.open(pUrl,'wTelaCliente'+rand,'width='+pW+',height='+pH+',toolbar=no,top='+meio1+',left='+meio2+'+directories=no,status=yes,menubar=no,scrollbars=yes,resizable=yes,modal=yes');
	}
	return false;
}

function getKeyboardAction(event){
	// Talvez apenas funcione para o IE [Cabral (06.11.2009)]
	//alert("Click !");
	//var tecla 	= (document.all)?event.keyCode:event.which;
	//var page 	= window.location.href;
	//var tmp1 	= page.indexOf("SSTOP");
	//var tmp2 	= page.indexOf("ssmenu");
	//var tmp3 	= page.indexOf("ssindex.csp");
	//var tmp4 	= page.indexOf("ssconscli.csp");
	TABEnter(event);
	//if(tecla == 119){
	//	if(tmp1 > 0) return;
	//	if(tmp2 > 0) return;
	//	if(tmp3 > 0) return;
	//	openModalWindow("/"+globalNamespace+"/ssconscli.csp");
	//} else {
	//	return;
	//}
}

// verificar se a sessão expirou em páginas que NÃO estão no diretório raiz
function expira(emp){
	if (emp==null || emp==""){
	alert('Sua sessão expirou!\n Efetue novo login!');
	window.open("../sslogin.csp","_top");
	return false;
	}
}	

// verificar se a sessão expirou em páginas que ESTÃO no diretório raiz
function expira_raiz(emp){
	if (emp==null || emp==""){
	alert('Sua sessão expirou!\n Efetue novo login!');
	window.open("sslogin.csp","_top");
	return false;
	}
}	

function sshelp(sis,cod,winName) { //v2.0
  window.open('sshelp.csp?SIS='+sis+'&HELP='+ cod,winName,'width=300,height=400,top=200,left=300');
}

function ssimp(rel,winName) { //v2.0
  window.open('ssimp.csp?SSIMP='+rel,winName,'width=400,height=220');
}

function ssdmos(rel,winName) { //v2.0
  window.open('ssdmos.csp?SSDMOS='+rel,winName,'width=780,height=400,scrollbars=yes');
}

function ssdos(rel,winName) { //v2.0
  window.open('ssdos.csp?SSDOS='+rel,winName,'width=780,height=400,scrollbars=yes');
}

function ssfdt(titulo,rel,winName) { //v2.0
  window.open('ssfdt.csp?TIT='+titulo+'&SSIMP='+rel,winName,'width=400,height=220');
}

function trim(str){
   return str.replace(/^\s+|\s+$/g,"");
}

function ltrim(str){
   return str.replace(/^\s+/,"");
}

function rtrim(str){
   return str.replace(/\s+$/,"");
}

function ssjanela(titulo,pagina,envia,altura,largura,winName){
	if (largura<200){
		largura=200;
	}
	if (altura<200){
		altura=200;
	}
	window.open(pagina + '?TITULO='+titulo+'&ENVIA='+envia,winName,'width='+largura+',height='+altura+',top=200,left=250');
}

function ssledata(data,evt){
		var BACKSPACE = 8;
        var key;
        var tecla;
		var strValidos = "0123456789"

        CheckTAB=true;
        tecla = window.event ? evt.keyCode : evt.which;  //event.keyCode;
		if (tecla.keyCode) code = tecla.keyCode;      
		else if (tecla.which) code = tecla.which; // Netscape 4.?  
		else if (tecla.charCode) code = tecla.charCode; // Mozilla  
        key = String.fromCharCode( tecla);
        
        if ( tecla == BACKSPACE ){
                return true;
		}else{
			tam = data.value.length;
			if ((tam == 2) || (tam == 5)){
				data.value = data.value + "/";
			}else if (tam == 10){
				key = "^";
			}
		}
        return ( isLetra(key, strValidos)); 
}

function ssleMesAno(data){ //v2.0
        var BACKSPACE=  8;
        var key;
        var tecla;
		var strValidos = "0123456789"

        CheckTAB=true;
        tecla= event.keyCode;

        key = String.fromCharCode( tecla);
        
        if ( tecla == BACKSPACE ){
                return true;
		}else{
			tam = data.value.length;
			if (tam == 2){
				data.value = data.value + "/";
			}else if (tam == 7){
				key = "^";
			}
		}
        return ( isLetra(key, strValidos)); 
}

function ssleord(numero,event) { //v2.0
		var BACKSPACE=  8;
        var key;
        var tecla;
		var strValidos = "0123456789"

        CheckTAB=true;
		//tecla= event.keyCode;

		if (event.which == null) tecla = event.keyCode;
		else if (event.which != 0 && event.charCode != 0) tecla= event.which;

        key = String.fromCharCode( tecla);

        if ((tecla == undefined) || (tecla == BACKSPACE)) return true;

        return ( isLetra(key, strValidos)); 
}
function ssleordff(e) { //v2.0
		var BACKSPACE=  8;
		var OUTRA = 0;
        var key;
        var tecla;
		var strValidos = "0123456789"

        CheckTAB=true;
       	//var tecla = window.event ? e.keyCode : e.which;
		//tecla= event.keyCode;
		if (event.which == null) tecla = event.keyCode;
		else if (event.which != 0 && event.charCode != 0) tecla= event.which;

        key = String.fromCharCode(tecla);

		if ( (tecla == BACKSPACE) || (tecla == undefined)) return true;
        return ( isLetra(key, strValidos)); 
}


function ssledesc(numero) { //v2.0
        var BACKSPACE=  8;
        var key;
        var tecla;
				var strValidos = "0123456789+."
        CheckTAB=true;
        //tecla= event.keyCode;
		if (event.which == null) tecla = event.keyCode;
		else if (event.which != 0 && event.charCode != 0) tecla= event.which;

        key = String.fromCharCode( tecla);
       // if ( tecla == BACKSPACE )
      //  return true;
	  if ((tecla == undefined) || (tecla == BACKSPACE)) return true;
        return ( isLetra(key, strValidos)); 
}

function ssleordneg(numero,event) { //v2.0
        var BACKSPACE=  8;
        var key;
        var tecla;
		var strValidos = "0123456789-"

        CheckTAB=true;
        //tecla= event.keyCode;
		if (event.which == null) tecla = event.keyCode;
		else if (event.which != 0 && event.charCode != 0) tecla= event.which;

        key = String.fromCharCode( tecla);
        
        //if ( tecla == BACKSPACE )
       //         return true;
	   if ((tecla == undefined) || (tecla == BACKSPACE)) return true;
        return ( isLetra(key, strValidos)); 
}

function sslereal(numero,event) { //v2.0
	var BACKSPACE=  8;
	var key;
	var tecla;
	var valor;
	var strValidos = "0123456789."
	//tecla=event.keyCode;
	//if (event.which == null) tecla = event.keyCode;
	//else if (event.which != 0 && event.charCode != 0) tecla= event.which;
	tecla = (window.Event) ? event.which : event.keyCode;
	if (tecla==44) {
		return false;
	}
		key = String.fromCharCode( tecla);
		valor = numero.value;
		if (key=='.') {
			if (valor.indexOf('.')==-1){
				return true;
			}else{
				return false;
			}
		}
		//if ( tecla == BACKSPACE ) {
		//	return true;
		//}
		if ((tecla == undefined) || (tecla == BACKSPACE)) return true;
		return ( isLetra(key, strValidos));
}

function sslerealneg(numero) { //v2.0
        var BACKSPACE=  8;
        var key;
        var tecla;
				var valor;
				var strValidos = "0123456789.-"
        //tecla= event.keyCode;
		if (event.which == null) tecla = event.keyCode;
		else if (event.which != 0 && event.charCode != 0) tecla= event.which;

		if (tecla==44) {event.keyCode=46; tecla=46;}
	      key = String.fromCharCode( tecla);
        valor = numero.value;
		if (key=='.') {
			if (valor.indexOf('.')==-1){
				return true;
			}else{
				return false;
			}
		}
      //  if ( tecla == BACKSPACE )
       //         return true;
	   if ((tecla == undefined) || (tecla == BACKSPACE)) return true;
        return ( isLetra(key, strValidos)); 
}

function sslevcto(numero, event) { //v2.0

		var BACKSPACE=  8;
        var key;
        var tecla;
		var strValidos = "0123456789/"
        CheckTAB=true;
        //tecla= event.keyCode;
		if (event.which == null) tecla = event.keyCode;
		else if (event.which != 0 && event.charCode != 0) tecla= event.which;

        key = String.fromCharCode( tecla);
       // if ( tecla == BACKSPACE )
        //return true;
		if ((tecla == undefined) || (tecla == BACKSPACE)) return true;
        return ( isLetra(key, strValidos)); 
}

function ssletel(obj,event) { //v2.0
        var BACKSPACE=  8;
        var key;
        var tecla;
		var strValidos = "0123456789()-. "
        CheckTAB=true;
        //tecla= event.keyCode;
		if (event.which == null) tecla = event.keyCode;
		else if (event.which != 0 && event.charCode != 0) tecla= event.which;

        key = String.fromCharCode( tecla);
		//if ( tecla == BACKSPACE ) return true;
		if ((tecla == undefined) || (tecla == BACKSPACE)) return true;
        return (isLetra(key, strValidos));
}

function sslecgc(numero) { //v2.0
        var BACKSPACE=  8;
        var key;
        var tecla;
				var strValidos = "0123456789/-. "
        CheckTAB=true;
        //tecla= event.keyCode;
		if (event.which == null) tecla = event.keyCode;
		else if (event.which != 0 && event.charCode != 0) tecla= event.which;

        key = String.fromCharCode( tecla);
        //if ( tecla == BACKSPACE )
        //return true;
		if ((tecla == undefined) || (tecla == BACKSPACE)) return true;
        return ( isLetra(key, strValidos)); 
}

function isLetra( caractere, strValidos ) {
        if ( strValidos.indexOf( caractere ) == -1)
                return false;
        return true;
}

function sslecampo(campo, event){
        /*
		 * - Ajuste no BUG ao pressionar a tecla enter.
		 *   Cabral 09.08.2010
		 */

		var BACKSPACE	= 8;
		var ENTER		= 13
        var key;
        var tecla;
		var strValidos = " 0123456789abcdefghijlmnopqrstuvxzwyk012êéèâôâíóàáíìùúãõçABCDEFGHIJLMNOPQRSTUVXZWYKÂÊÔÁÉÍÀÙÚÓÃÕÇ/\\¾½°ªØ%!?@#$%&*-_=+[](){}:;,.|~°ºª\"";

        CheckTAB=true;
        //tecla= event.keyCode;
		if (event.which == null) tecla = event.keyCode;
		else if (event.which != 0 && event.charCode != 0) tecla= event.which;

		if(tecla == ENTER) return true;
		key = String.fromCharCode(tecla);
		//if ( tecla == BACKSPACE ) return true;
		if ((tecla == undefined) || (tecla == BACKSPACE)) return true;
		return (isLetra(key, strValidos));
}

function ssopenwin(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function sspgabertura(sis) { //v2.0
	parent.principal.location = 'ssabertura.csp?SIS=' + sis;
}

/*function sslecampo(campo) { //v2.0
	tecla= event.keyCode;
		
        key = String.fromCharCode(tecla);
	alert(key);
    var strValidos = "0123456789abcdefghijlmnopqrstuvxzwykABCDEFGHIJLMNOPQRSTUVXZWYK "
    if ( strValidos.indexOf( key ) == -1 ){
       return false;
	}
}*/



function preencheString(obj,intQtd,strCaracter,intIniFim){
    var strResult = '';
	var intFor = intQtd - obj.value.length;
	if (intFor <= 0){ return; }

	for (var I=0;I<intFor;I++){ var strResult = strResult + strCaracter; }
	if (intIniFim == 1){ strResult = strResult + obj.value; }
	if (intIniFim == 2){ strResult = obj.value + strResult; }
	obj.value = strResult;
}

function ssleestado (formulario){ 
	/*if (formulario.value == ""){
		alert ("Favor selecionar o estado");
		
	}*/
		var BACKSPACE=  8;
        var key;
        var tecla;
				var strValidos = "abcdefghijlmnopqrstuvxzwykABCDEFGHIJLMNOPQRSTUVXZWY"
        CheckTAB=true;
        tecla= event.keyCode;
        key = String.fromCharCode( tecla);
        if ( tecla == BACKSPACE )
        return true;
        return ( isLetra(key, strValidos));
}

function hoje(data){
	alert(data.value.length);
	if (data.value.length < 10){
		dataatual = new Date();
		dia = dataatual.getDate();
		
		if (dia < 10){
			dia = "0" + dia;}
			
		mes = (dataatual.getMonth() + 1);
		
		if (mes < 10){
			mes = "0" + mes;}
			
		ano = dataatual.getYear();	
		
		data.value = (dia + "/" +  mes + "/" + ano);
	}
}


//inicio da validação de data
function validaMesAno(pData){
		pData2 = pData;
		pData = pData.value;
		if(pData.length<1){
			return false;
		}
		if (pData.length<7 && pData.length>=1) {
			alert('Data inválida\nInforme a data no formato (mm/aaaa)');
			pData2.focus();
			return false;
		}
		var ano = '' + pData.substring(4,7);
		var mes = '' + pData.substring(1,2);

		//if(mes>12)
		if(mes>12){
			alert('Data inválida\nMes Inexistente');
			pData2.focus();
			return false;
		}

		//return form_save();
		//alert('Data correta!!!');
		return true
}


//inicio da validação de data
function validata(pData){
		pData2 = pData;
		pData = pData.value;
		if(pData.length<1){
			return false;
		}
		if (pData.length<10 && pData.length>=1) {
			alert('Data inválida\nInforme a data no formato (dd/mm/aaaa)');
			pData2.focus();
			return false;
		}
		var ano = '' + pData.substring(6,10);
		var mes = '' + pData.substring(3,5);
		var dia = '' + pData.substring(0,2);
					
		if(dia>'31'){
			alert('Data inválida\nDia Inexistente');
			pData2.focus();
			return false;
		}
							
		if(mes>'12'){
			alert('Data inválida\nMes Inexistente');
			pData2.focus();
			return false;
		}

		if(mes=='02'){
			if(ano%4!=0 && dia>'28'){
				alert('Data Inválida\nEste mes tem apenas 28 dias');
				pData2.focus();
				return false;
			}
			else{
				if(dia>'29'){
					alert('Data Inválida\nEste mes tem apenas 29 dias');
					pData2.focus();
					return false;
				}
			}
		}
		if(mes<='07'){
			if(mes%2==0 && dia>'30'){
				alert('Data inválida\nDia Inexistente');
				pData2.focus();
				return false;
			}
		}
		else{
			if(mes>'08'){
				if(mes%2!=0 && dia>'30'){
					alert('Data inválida!\nDia Inexistente');
					pData2.focus();
					return false;
				}
			}
		}
		return true
	}

    function fCvData(pData,De,Para){
	// 1 - (DD/MM/AAAA)
	// 2 - (MM/DD/AAAA)
	// 3 - (AAAAMMDD)
		switch(De){
			case 1:{
				var ano = '' + pData.substring(6,10);
				var mes = '' + pData.substring(3,5);
				var dia = '' + pData.substring(0,2);
				break;			}
			case 2:{
				var ano = '' + pData.substring(6,10);
				var mes = '' + pData.substring(0,2);
				var dia = '' + pData.substring(3,5);
				break;
			}
			case 3:{
				var ano = '' + pData.substring(0,4);
				var mes = '' + pData.substring(4,6);
				var dia = '' + pData.substring(6,8);
				break;
			}
		}
			if(validata(dia+'/'+mes+'/'+ano)!=True){
				alert('Data inválida');
				pData2.focus();
				return null;
			}

		switch(Para){
			case 1:{
				var datafinal = dia+'/'+mes+'/'+ano;
				break;
			}
			case 2:{
				var datafinal = mes+'/'+dia+'/'+ano;
				break;
			}
			case 3:{
				var datafinal = ano+mes+dia;
				break;
			}
		}
		
		return datafinal
	}
//final da validação de data

function abre_status(pagina){
	window.open(pagina,'janalestatus','width=250,height=100,scrolling=no,toolbars=no,left=250,top=250');
}
// ####<<<< INICIO DA VALIDAÇÃO DE CNPJ/CGC >>>>#### //

function ssvcpf(pCPF_CNPJ){
	if(pCPF_CNPJ.value==''){
		//alert('Por favor informe o CNPJ');
		//document.form1.cnpj.focus();
	}
	else{
		pfValidaCNPJ(pCPF_CNPJ, 'Número inválido')
	}
			
}

function pfValidaCNPJ(msCNPJ, msMSG){
	if (!(checa(msCNPJ.value, msMSG))){
		//msCNPJ.focus();
		return false;
	}
	else{ 
		return true; 
	}
}

function checa(msCNPJ, msMSG){
	if ((msCNPJ.length != 15) && (msCNPJ.length !=11)){
		alert(msMSG);
		return false;
	}
			  
	if ((!(modulo(msCNPJ.substring(0,msCNPJ.length - 2)).toString()+modulo(msCNPJ.substring(0,msCNPJ.length - 1)).toString() == msCNPJ.substring(msCNPJ.length - 2,msCNPJ.length))) && (modulo_cic(msCNPJ.substring(0,msCNPJ.length - 2)) + "" + modulo_cic(msCNPJ.substring(0,msCNPJ.length - 1)) != msCNPJ.substring(msCNPJ.length - 2,msCNPJ.length))){
		alert(msMSG);
		return false;
	}
	return true;
}

function modulo(msCNPJ){
	soma=0;
	ind=2;
				
	for(pos=msCNPJ.length-1;pos>-1;pos=pos-1){
		soma = soma + (parseInt(msCNPJ.charAt(pos)) * ind);
		ind++;
			      
		if(msCNPJ.length>11){ 
			if(ind>9) ind=2; 
			}
		}
				
	resto = soma - (Math.floor(soma / 11) * 11);
					 
		if(resto < 2){ 
			return 0; 
		}
		else{ 
			return (11 - resto); 
		}
}


function modulo_cic(msCNPJ){
soma=0;
ind=2;
	for(pos=msCNPJ.length-1;pos>-1;pos=pos-1){
		soma = soma + (parseInt(msCNPJ.charAt(pos)) * ind);
		ind++;
				 
		if(msCNPJ.length>11){	
			if(ind>9) ind=2; 
			}
		}				
				
		resto = soma - (Math.floor(soma / 11) * 11);
					  
		if(resto < 2){	
			return 0; 
		}
		else{ 
			return 11 - resto;
		}
}
// ####<<<< FINAL DA VALIDAÇÃO DE CNPJ/CGC >>>>#### \\
// ####<<<< TRAVA DO BOTÃO DIREITO DO MOUSE >>>>#### \\
 function travaMouse() {
/* if (window.Event) 
document.captureEvents(Event.MOUSEUP); 
function nocontextmenu() 
{ 
event.cancelBubble = true 
event.returnValue = false; 
return false; 
} 
function norightclick(e) 
{ 
if (window.Event) 
{ 
if (e.which == 2 || e.which == 3)
return false; 
} 
else 
if (event.button == 2 || event.button == 3) 
{ 
event.cancelBubble = true 
event.returnValue = false; 
alert("Código fonte indisponível");
return false; 
} 

} 
if (document.layers) { 
document.captureEvents(Event.MOUSEDOWN); 
} 
document.oncontextmenu = nocontextmenu; 
document.onmousedown = norightclick; 
document.onmouseup = norightclick; */
}
// <<<<#### FiNAL DO CÓDIGO DE TRAVA ####>>>> \\


// ================= Funcoes para rollover do menu principal
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
//============== Fim das funcoes do rollover do menu principal

function inverteData(data,campo){
campos = data.value.split('/');
alert(campo);
campo.value = campos[1] + '/' + campos[0] + '/' + campos[2];
}

//=========== Inicio da Função para adicionar zeros a esquerda
function sto(numero,casa){	
	tam = numero.length;
	if (tam<casa){
		for (i=tam;i<casa;i=i+1){
		numero='0'+numero;
		}	
	}
	return numero;
}

function rsto(numero,casa){
	numero.value=sto(numero.value,casa)
}

function limpaCombo(objComponente){
	if (objComponente != null){
	  var intN = objComponente.options.length;
	  for (var I=0;I<=intN;I++){ objComponente.remove(I); }
	}
}

//=========== Final da Função para adicionar zeros a esquerda
//função para os campo de consulta
function textoReq(texto){
	if (texto.value == ""){
		alert('Se você não preencher o campo,\nserão listados todos os registros.')
	}
}
//função para campos requeridos nos formulários
function campoReq(campo1,campo2,campo3,campo4,campo5){
erro = false;
	if (campo1 != null){
		if (campo1.value.replace(/ /g, "")==""){
			erro = true;
			campo1.focus();
		}
		else if (campo2 != null){
			if (campo2.value.replace(/ /g, "")==""){
				erro = true;
				campo2.focus();
			}
			else if (campo3 != null){
				if (campo3.value.replace(/ /g, "")==""){		
					erro = true;
				campo3.focus();
				}
				else if (campo4 != null){
					if (campo4.value.replace(/ /g, "")==""){		
						erro = true;
						campo4.focus();
					}
					else if (campo5 != null){
						if (campo5.value.replace(/ /g, "")==""){		
							erro = true;
							campo5.focus();
						}
					}
				}
			}
		}
	}
	if (erro==false){
		return salvar();
	}
	else{
		alert("Favor preencher todos os campos requeridos.");
		return false;
	}
}

function sslehora(hora,event){
        var BACKSPACE = 8;
        var key;
        var tecla;
		var strValidos = "0123456789"

        CheckTAB=true;
        //tecla= event.keyCode;
		if (event.which == null) tecla = event.keyCode;
		else if (event.which != 0 && event.charCode != 0) tecla= event.which;

        key = String.fromCharCode( tecla);
        
        if ((tecla == BACKSPACE) || (tecla == undefined)){
                return true;
		}else{
			tam = hora.value.length;
			if (tam == 2){
				hora.value = hora.value + ":";
			}else if (tam == 5){
				key = "^";
			}
		}
		return ( isLetra(key, strValidos));
}

function ssvhora(hora){
    xhora = hora.value
    var hor = '' + xhora.substring(0,2);
    var minuto = '' + xhora.substring(3,5);
	if ((hor > 23)||(minuto>59)){
		alert('Hora Inválida!');
		hora.focus();
	}
}

function hratual(hora){
	if (hora.value.length < 10){
		horaatual = new Date();
		hr = horaatual.getHours();
		mn = horaatual.getMinutes();
		if (hr<10){
			hr = '0'+hr;
		}
		if (mn<10){
			mn = '0'+mn;
		}
		hora.value = hr+':'+mn;
	}
}

//================= Atualiza frame de consulta com a pagina ssdmosvisualizar.csp
function atualizarFrame(campoOrigem,posCampoRetorno,indiceTabela,nomeTabela,camposTabela,legendaCampos,frameRetorno,frameListagem){
	if(campoOrigem.value == "") {
		if(document.forms[0].elements[posCampoRetorno]) {
			document.forms[0].elements[posCampoRetorno].value = "";
		}
	}

	if(document.forms[0].elements[posCampoRetorno]){
		if(document.forms[0].elements[posCampoRetorno].value != "") return false;
	}

	campoMaiusculo=campoOrigem.value.toUpperCase();
	path = "../ssdmosvisualizar.csp?BUSCA=" + campoMaiusculo + "&NRCAMPO=" + posCampoRetorno + "&NDX=" + indiceTabela + "&TAB=" + nomeTabela + "&COL=" + camposTabela + "&LEG=" + legendaCampos + "&FRAME=" + frameRetorno;

	if (frameListagem == null){
		//window.open(path,"consulta");
		if(document.getElementsByName("consulta")){
			document.getElementsByName("consulta")[0].src = path;
			return false;
		}
		if(document.all.consulta){
			document.all.consulta.src = path;
			return false;
		}
		//document.getElementById("consulta").setAttribute("src",path);
	} else {
		//window.open(path,frameListagem);
		document.getElementById(frameListagem).setAttribute("src",path);
	}
	
	if(campoOrigem.id){
		document.getElementById(campoOrigem.id).value = campoOrigem.value ;
		document.getElementById(campoOrigem.id).focus();
	}
}

function retornoConsulta(posCampo, valorCampo, frameRetorno, nomeCampo, intForm){
	if ((intForm=="")||(intForm==null)||(intForm=='undefined')){ intForm="0";}
	if (frameRetorno == 'pedido'){
		parent.pedido.document.forms[intForm].elements[posCampo].value = valorCampo;
		parent.pedido.document.forms[intForm].elements[posCampo].focus();
		parent.pedido.document.forms[intForm].elements[posCampo].select();
	}
	if (frameRetorno == 'cadastro'){
		parent.document.forms[intForm].elements[posCampo].value = valorCampo;
		parent.document.forms[intForm].elements[posCampo].select();
	}
	if (frameRetorno == 'xfornecedor'){
		parent.fornecedor.document.getElementById('editCFornecedor').value = valorCampo;
		parent.fornecedor.document.getElementById('editCFornecedor').select();
	}
	if ((frameRetorno == '')&&((nomeCampo == 'undefined')||(nomeCampo == null)||(nomeCampo == ''))){
		parent.document.forms[intForm].elements[posCampo].value = valorCampo;
		parent.document.forms[intForm].elements[posCampo].focus();
		parent.document.forms[intForm].elements[posCampo].select();
	}
    if ((frameRetorno == '')&&((nomeCampo != 'undefined')&&(nomeCampo != null)&&(nomeCampo != ''))){
		parent.document.getElementById(nomeCampo).value = valorCampo;
		parent.document.getElementById(nomeCampo).focus();
		parent.document.getElementById(nomeCampo).select();
	}
	if (frameRetorno == 'semFrame'){
		parent.document.form.elements[posCampo].value = valorCampo;
	 	parent.document.form.elements[posCampo].select();
	}
	if (frameRetorno == 'semFramePedido'){
	 	parent.pedido.document.form.elements[posCampo].value = valorCampo;
	 	parent.pedido.document.form.elements[posCampo].select();
	}
}

//função pra mudar cor da linha quando botão é desabilitado...
function sscolorline(ID_TR,ID_BOTAO,COLOR,FORM_NAME){
	document.getElementById(FORM_NAME).elements(ID_BOTAO).disabled = true;
	document.getElementById(ID_TR).style.backgroundColor=COLOR;
}

//Função para campos com numeros e pontos..
function sslectb(ctb,padrao){
       // onKeyPress="return sslectb(this,'XX.XXX.XXX.X', event)"
	    var BACKSPACE = 8;
        var key;
        var tecla;
		var strValidos = "0123456789"
	 
	    CheckTAB=true;
        tecla= event.keyCode;
        key = String.fromCharCode( tecla);
        if ( tecla == BACKSPACE ){
                return true;
		} else {
			tam = padrao.length;
			pos = ctb.value.length;
			if (padrao.substring(pos,pos+1) == ".") {
				ctb.value = ctb.value + ".";
			}else if (pos > tam-1){
				key = "^";
			}
		}
        return ( isLetra(key, strValidos)); 
}

// Função para alterar o texto de uma layer a cada 90 milisegundos
function alteraTextozzz(NPONTO){
  if (document.all["Layer1"].visibility == 'hidden') {
	document.all["Layer1"].innerHTML = "<font color='#FFFFFF' size='2' face='Arial, Helvetica, sans-serif'><strong>&nbsp;&nbsp;Carregando...</strong></font>";
  } else {	
	if (NPONTO==0) {
		document.all["Layer1"].innerHTML = "<font color='#FFFFFF' size='2' face='Arial, Helvetica, sans-serif'><strong>&nbsp;&nbsp;Carregando</strong></font>";
		setTimeout("mudaTexto(1)",90);
	} else if (NPONTO==1) {
		document.all["Layer1"].innerHTML = "<font color='#FFFFFF' size='2' face='Arial, Helvetica, sans-serif'><strong>&nbsp;&nbsp;Carregando.</strong></font>";
		setTimeout("mudaTexto(2)",90);
	} else if (NPONTO==2) {
		document.all["Layer1"].innerHTML = "<font color='#FFFFFF' size='2' face='Arial, Helvetica, sans-serif'><strong>&nbsp;&nbsp;Carregando..</strong></font>";
		setTimeout("mudaTexto(3)",90);
	} else if (NPONTO==3) {
		document.all["Layer1"].innerHTML = "<font color='#FFFFFF' size='2' face='Arial, Helvetica, sans-serif'><strong>&nbsp;&nbsp;Carregando...</strong></font>";
		setTimeout("mudaTexto(0)",90);
	}
  }
}

function MM_showHideLayers() { //v6.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; } 	
}

// Função para alterar o texto de uma layer a cada 200 milisegundos
function mudaTexto(NPONTO) {	
  if (document.all["Layer1"].visibility == 'hidden') {
	document.all["Layer1"].innerHTML = "<font color='#FFFFFF' size='2' face='Arial, Helvetica, sans-serif'><strong>&nbsp;&nbsp;Carregando...</strong></font>";
  } else {	
	if (NPONTO==0) {
		document.all["Layer1"].innerHTML = "<font color='#FFFFFF' size='2' face='Arial, Helvetica, sans-serif'><strong>&nbsp;&nbsp;Carregando</strong></font>";
		setTimeout("mudaTexto(1)",200);
	} else if (NPONTO==1) {
		document.all["Layer1"].innerHTML = "<font color='#FFFFFF' size='2' face='Arial, Helvetica, sans-serif'><strong>&nbsp;&nbsp;Carregando.</strong></font>";
		setTimeout("mudaTexto(2)",200);
	} else if (NPONTO==2) {
		document.all["Layer1"].innerHTML = "<font color='#FFFFFF' size='2' face='Arial, Helvetica, sans-serif'><strong>&nbsp;&nbsp;Carregando..</strong></font>";
		setTimeout("mudaTexto(3)",200);
	} else if (NPONTO==3) {
		document.all["Layer1"].innerHTML = "<font color='#FFFFFF' size='2' face='Arial, Helvetica, sans-serif'><strong>&nbsp;&nbsp;Carregando...</strong></font>";
		setTimeout("mudaTexto(0)",400);
	}
  }
}

// somar ou subtrair data
function datam(c,q){
	if (c) {
		if (validata(c)){	
			var ano = '' + c.value.substring(6,10);
			var mes = '' + Math.floor(c.value.substring(3,5))-1;
			var dia = '' + c.value.substring(0,2);
			var data=new Date(ano,mes,dia);
			data.setDate(data.getDate()+q);
			dia=data.getDate();
			if (dia<10){	dia='0'+dia; }
			mes=data.getMonth()+1;			
			if (mes<10){	mes='0'+mes; }
			ano=data.getYear();
			nData=dia+'/'+mes+'/'+ano;
			c.value=nData;
			return true;
		}
	}
}

function maiusculo(campo){   
	document.getElementById(campo.name).value=campo.value.toUpperCase();
}

// função para ler cep
function sslecep(campo){
	var txt=campo.value;
	var tam=campo.value.length;
	var name=campo.name;
	var key;
	var tecla;
	var backspace=8;
	tecla= event.keyCode;
	var strValidos = "0123456789";
	key = String.fromCharCode( tecla);
	if(tecla==backspace){
		return false;
	}else{
		if(tam==5){
			txt=txt+"-";
			document.form[name].value=txt;
		}else if (tam == 9){
				key = "^";
		}
	}
	return ( isLetra(key, strValidos)); 
}

function validacep(campo){
	var tam = campo.value.length;
	if(tam>0){
		if (tam<9){
			alert('Numero de caracteres do CEP é invalido!');
			campo.focus();
		}
	}
}

function MoveObj(){
	var ie=document.all;
	var nn6=document.getElementById&&!document.all;
	var isdrag=false;
	var xm,ym;
	var dobj;

	document.onmousedown=selectmouse;
	document.onmouseup=new Function("isdrag=false");
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////// funções para ver objetos na pagina /////////////////////
function movemouse(e){
  if (isdrag)
  {
    dobj.style.left = nn6 ? tx + e.clientX - xm : tx + event.clientX - xm;
    dobj.style.top  = nn6 ? ty + e.clientY - ym : ty + event.clientY - ym;
    if(parseInt(dobj.style.left)<0) dobj.style.left=0;;
		if(parseInt(dobj.style.top)<0) dobj.style.top=0;
		return false;
  }
}

var drag;
if ((drag!=undefined)&&(drag==1)){
	
function selectmouse(e){
  var fobj = nn6 ? e.target : event.srcElement;
  var topelement = nn6 ? "HTML" : "BODY";
  while (fobj.tagName != topelement && fobj.className != "dragme"){
    fobj = nn6 ? fobj.parentNode : fobj.parentElement;
  }

  if (fobj.className=="dragme"){
    isdrag = true;
    dobj = fobj;
	tx = parseInt(dobj.style.left+0);
    ty = parseInt(dobj.style.top+0);
    xm = nn6 ? e.clientX : event.clientX;
    ym = nn6 ? e.clientY : event.clientY;
    document.onmousemove=movemouse;
    return false;
  }
}

function MoveObj(){
	var ie=document.all;
	nn6=document.getElementById&&!document.all;
	isdrag=false;
	xm,ym;
	dobj;
}

//MoveObj();
	var ie=document.all;
	var nn6=document.getElementById&&!document.all;
	var isdrag=false;
	var xm,ym;
	var dobj;
	document.onmousedown=selectmouse;
	document.onmouseup=new Function("isdrag=false");
}



// Sistema da SASMAQ
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


//------------- formata numero -------------
function FormatNum(num,mil,dec){
	var num=new String(num);
	var p=num.indexOf("."); // se for = -1 n tem ponto
	if (p==-1){ 
		num+=".00";
	} else { 
		xy=num.split(".");
		t=xy[1];
		t=t.length;
		if (t==1){ num+="0"; }
	}
	var xe=num.split(".");
	var te=xe[0];
	var tamanho=te.length;
	var vl='';
	var c=0;
	var te=te.replace(""," ");
	for (i=tamanho; i > 0 ; i--){		
		n=te.charAt(i);
		if (c==3){ vl=mil+vl; c=0; }			
		vl=n+vl;
		c++;
	}
	if (vl==""){ vl=0; }
	var total=vl+","+xe[1]
	return total;
}
//------------------------------------------------
function VerNivel(niv,op){
	if (op == 1){  // apenas administradores
		if (niv!=1 || niv==""){
			msg="========================\n"
			msg+="Desculpe - Acesso restrito\n"
			msg+="========================\n"
			alert(msg);
			location.href="principal.csp";
		} 
	}
	if (op == 2){
		if (niv!=1 || niv!=2 || niv!=""){
			msg="==========================================\n"
			msg+="   Desculpe - Voce não tem acesso restrito\n"
			msg+="==========================================\n"
			alert(msg);
			location.href="principal.csp";
		}
	}
}
//------------------- conta text box ---
// onKeyPress="max(this);"
// exibir = <font face=verdana size=1> Restam: </font><font face=verdana size=1 id=Restante color=red>255</font>
//-------------------------------------
function max(txarea,tot){ 
    if (tot==""){ var total = 255; } else { var total=tot; }
    var tam = txarea.value.length; 
    var str=""; 
    var str=str+tam;      
    //Digitado.innerHTML = str; 
    Restante.innerHTML = total - str; 
    if (tam > total){          
       aux = txarea.value; 
       txarea.value = aux.substring(0,total); 
       //Digitado.innerHTML = total 
       Restante.innerHTML = 0 
    } 
} 
//------------------------
function AbreCons(cons){
	if (document.getElementById(cons).height == 250){
	document.getElementById(cons).height =430;
	document.getElementById("bt").src='../images/cima.gif';
	} else { 
	document.getElementById(cons).height =250;
	document.getElementById("bt").src='../images/baixo.gif';
	}
}
function AbreCons2(cons,alt,alt2){
	if (document.getElementById(cons).height == alt){
	document.getElementById(cons).height =alt2;
	document.getElementById("bt").src='../images/cima.gif';
	} else { 
	document.getElementById(cons).height =alt;
	document.getElementById("bt").src='../images/baixo.gif';
	}
}
//----------------- escolha de CNPJ ou CPF ------
// onKeyPress='cpf(campo_radion,campo)"
//-----------------------------------------------
function TESTAcpf(QUAL,CNUMB,CTYPE){
  if(!Verify(CNUMB.value, CTYPE)) {
    alert(CTYPE+" inválido!");
	QUAL.value='';
	QUAL.focus();
  }
  return;
}
function ClearStr(str, char){
  while((cx=str.indexOf(char))!=-1) { str = str.substring(0,cx)+str.substring(cx+1);  }
  return(str);
}
function ParseNumb(c){
  c=ClearStr(c,'-');
  c=ClearStr(c,'/');
  c=ClearStr(c,',');
  c=ClearStr(c,'.');
  c=ClearStr(c,'(');
  c=ClearStr(c,')');
  c=ClearStr(c,' ');
  if((parseFloat(c) / c != 1)){ if(parseFloat(c) * c == 0) { return(c); }
    else { return(0); } }
  else { return(c); }
}

function Verify(CNUMB,CTYPE){
  CNUMB=ParseNumb(CNUMB)
  if(CNUMB == 0) {
    return(true);
  } else {
    g=CNUMB.length-2;
    if(TestDigit(CNUMB,CTYPE,g)) {
      g=CNUMB.length-1;
      if(TestDigit(CNUMB,CTYPE,g)) {	
        return(true);
      } else {
        return(false);
      }
    } else {
      return(false);
    }
  }
}
function TestDigit(CNUMB,CTYPE,g){
  var dig=0;
  var ind=2;
  for(f=g;f>0;f--) {
    dig+=parseInt(CNUMB.charAt(f-1))*ind;
    if (CTYPE=='CNPJ'){ if(ind>8) {ind=2} else {ind++} }
    else { ind++ }
  }
  dig%=11;
  if(dig<2) { dig=0; }
  else { dig=11-dig; }
  if(dig!=parseInt(CNUMB.charAt(g))) { return(false); }
  else { return(true); }
}
function cpf(campo,campo2,pr){ 
	var tam = campo2.value.length; 
	if (pr){ 
		if (campo[0].checked == true) { 
			formatar(campo2,'00.000.000/0000-00');
		} else { 
			formatar(campo2,'000.000.000-00');
		} 
	} else { 
		if (campo[0].checked == true) { 
			if (tam!=0){ 						
				TESTAcpf(campo2,campo2,'CNPJ'); 
			} 
		} else { 			
			if (tam!=0){ 
				TESTAcpf(campo2,campo2,'CPF');							 
			} 
		} 
	} 
}
//----------------- Validação de email ----------
//-----------------------------------------------
function email(theElement, nombre_del_elemento )
{
var s = theElement.value;
var filter=/^[A-Za-z][A-Za-z0-9_]*@[A-Za-z0-9_]+.[A-Za-z0-9_.]+[A-za-z]$/;
if (s.length == 0 ) return true;
   if (filter.test(s))
      return true;
   else
     alert("Entre com um email valido");
theElement.focus();
return false;
}
//----------------- click na tabela --------------
// onClick="lincar('destino','tipo','id')"
//-----------------------------------------------
function lincar(destino,tipo,cod,c){
if (c==1) {
	self.parent.location.href=destino+"?"+tipo+"="+cod;
	}
if (c==2) {
	location.href=destino+"?"+tipo+"="+cod;
	}
}
//-------------- atalho para cadastro --------------
// onkeydown='AtalhoKey("pagina.csp",nome_div,iframe,event);'
//------------------------------------------------
function AbreExpande(menu){
	if (menu.style.visibility=="hidden"){
		menu.style.visibility="visible";
		return true;
	} else {
		menu.style.visibility="hidden";
		return false;
	}
}
/*
function AtalhoKey(pagina){
	if (e.shiftKey){ 
		if (e.keyCode==65){ // abrir pagina de cadastro (Sfhit + N )
			alert("To aqui");
		}
	}	
}*/
function AtalhoKey2(pagina,divisao,Vframe){	
	if (AbreExpande(divisao)){
		Vframe.location.href=pagina;
	}		
}
//============== oculto do sistema =======
/*function PressKey(e){
	if (e.ctrlKey){		
		if (e.altKey){
			if (e.shiftKey){
				if (e.keyCode == 65){
					self.parent.principal.location.href="ssmenuadm.csp";
				}	
			}
		}
	}
}*/
 //============== Pastas  ===============
function expira2(emp){	
	if (emp==null || emp==""){
	alert('Sua sessão expirou!\n Efetue novo login!');
	self.parent.location.href="../index.csp";
	return false;
	} else {
	return true;
	}
}
//============== função expira login ========
function expira(emp){	
	if (emp==null || emp==""){
	alert('Sua sessão expirou!\n Efetue novo login!');
	self.parent.location.href="index.csp";
	return false;
	} else {
	return true;
	}
}
//------------------------------------------
//  onKeyUp="Vperce(this);"
//------------------------------------------
function Vperce(campo){
	if (campo.value > 100){
		alert("Descupe percentual acima de 100% nao permitido! \n Verifique!");
		campo.value="";
		campo.focus();
	}
}
//---------------------  trocar formato data ----------
// onBlur="Tdata(this,destino)"
//------------------------------------------------------
function Tdata(campo,campod){
	var valor = campo.value;
	var part = valor.split("/");
	var res = part[2]+part[1]+part[0];
	alert(res);
	campod.value = res;
}
//-------------------------
// valor=TiraVirg(campo.value,campos2);
//-------------------------
function TiraVirg(campo,campo2){	
	c=ClearStr(campo,'.');
	result=c.replace(",",".");
	document.getElementById(campo2).value=parseFloat(result);
}
function TiraVirg2(campo){	
	c=ClearStr(campo,'.');
	result=c.replace(",",".");
	vl=parseFloat(result);
	return vl;
}
function TranfValor(campo){	
	var zero=0.00;
	if (campo==""){ return zero; }
	var c=ClearStr(campo,'.');
	var result=c.replace(",",".");
	var vl=parseFloat(result);	
	if (vl<0){ vl=0; }
	return vl;
}
//-------------------mascara numero real----------
// onKeyPress="return(NumReal(this,',','.',event,1));"
// 1 quando aperta as teclas.
// 0 para quando sair ou carregar
//------------------------------------------------
function NumReal(fld, milSep, decSep, e,tipo) {
if (fld.value.length > 12){ 
return false; }
var sep = 0;
var key = '';
var i = j = 0;
var len = len2 = 0;
var strCheck = '0123456789-';
var aux = aux2 = '';
if (tipo){
var whichCode = (window.Event) ? e.which : e.keyCode;
if (whichCode == 13) return true;  // Enter
var key = String.fromCharCode(whichCode);  // Get key value from key code
if (strCheck.indexOf(key) == -1) return false;  // Not a valid key
}
len = fld.value.length;
for(i = 0; i < len; i++)
if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep)) break;
aux = '';
for(; i < len; i++)
if (strCheck.indexOf(fld.value.charAt(i))!=-1) aux += fld.value.charAt(i);
aux += key;
len = aux.length;
if (len == 0) fld.value = '';
if (len == 1) fld.value = '0'+ decSep + '0' + aux;
if (len == 2) fld.value = '0'+ decSep + aux;
if (len > 2) {
aux2 = '';
for (j = 0, i = len - 3; i >= 0; i--) {
if (j == 3) {
aux2 += milSep;
j = 0;
}
aux2 += aux.charAt(i);
j++;
}
fld.value = '';
len2 = aux2.length;
for (i = len2 - 1; i >= 0; i--)
fld.value += aux2.charAt(i);
fld.value += decSep + aux.substr(len - 2, len);
}
return false;
}
//-------------------------------
//============= somente letras ===============
// onKeyPress="return validaTecla(this,event,Numero);"
// onKeyPress="return validaTecla(this,event,Letra);"
// onKeyPress="return validaTecla(this,event,Nota);"
//============================================
function Numero( caractere ) { 
var strValidos = "0123456789" 
if ( strValidos.indexOf( caractere ) == -1 ) 
return false; 
return true; 
}
function Nota( caractere ) { 
var strValidos = "0123456789-" 
if ( strValidos.indexOf( caractere ) == -1 ) 
return false; 
return true; 
}
function Letra( caractere ) { 
var strValidos = "0123456789abcdefghijlmnopqrstuvxzwyk012êéèâôâíóàáíìùúãõçABCDEFGHIJLMNOPQRSTUVXZWYKÂÊÔÁÉÍÚÀÓÃÕÇ/\\!?@#$%&*-=+[](){};,.| " 
if ( strValidos.indexOf( caractere ) == -1 ) 
return false; 
return true; 
}
function validaTecla(campo, event, tipo) { 
var BACKSPACE= 8; 
var key; 
var tecla; 
CheckTAB=true; 
if(navigator.appName.indexOf("Netscape")!= -1) 
tecla= event.which; 
else 
tecla= event.keyCode; 
key = String.fromCharCode(tecla); 
//alert( 'key: ' + tecla + ' -> campo: ' + campo.value); 
if ( tecla == 13 ) 
return false; 
if ( tecla == BACKSPACE ) 
return true; 
return (tipo(key)); 
} 
//-----------------inicio da validação de data----
// onBlur="return validata(this);"
//------------------------------------------------
function validata(pData){
pData2 = pData;
pData = pData.value;
		if(pData.length<1){			
			return false;
		}
		if (pData.length<10 && pData.length>=1) {
			alert('Data inválida\nInforme a data no formato (dd/mm/aaaa)');
			pData2.focus();
			return false;
		}
		var ano = '' + pData.substring(6,10);
		var mes = '' + pData.substring(3,5);
		var dia = '' + pData.substring(0,2);
					
		if(dia>'31'){
			alert('Data inválida\nDia Inesistente');
			pData2.focus();
			return false;
		}
							
		if(mes>'12'){
			alert('Data inválida\nMes Inesistente');
			pData2.focus();
			return false;
		}

		if(mes=='02'){
			if(ano%4!=0 && dia>'28'){
				alert('Data Inválida\nEste mes tem apenas 28 dias');
				pData2.focus();
				return false;
			}
			else{
				if(dia>'29'){
					alert('Data Inválida\nEste mes tem apenas 29 dias');
					pData2.focus();
					return false;
				}
			}
		}
		if(mes<='07'){
			if(mes%2==0 && dia>'30'){
				alert('Data inválida\nDia Inesistente');
				pData2.focus();
				return false;
			}
		}
		else{
			if(mes>'08'){
				if(mes%2!=0 && dia>'30'){
					alert('Data inválida!\nDia Inesistente');
					pData2.focus();
					return false;
				}
			}
		}
		
		 //return form_save();		
		//alert('Data correta!!!');			
		return true
	}
		function fCvData(pData,De,Para){
	// 1 - (DD/MM/AAAA)
	// 2 - (MM/DD/AAAA)
	// 3 - (AAAAMMDD)
		switch(De){
			case 1:{
				var ano = '' + pData.substring(6,10);
				var mes = '' + pData.substring(3,5);
				var dia = '' + pData.substring(0,2);
				break;			}
			case 2:{
				var ano = '' + pData.substring(6,10);
				var mes = '' + pData.substring(0,2);
				var dia = '' + pData.substring(3,5);
				break;
			}
			case 3:{
				var ano = '' + pData.substring(0,4);
				var mes = '' + pData.substring(4,6);
				var dia = '' + pData.substring(6,8);
				break;
			}
		}
			if(validata(dia+'/'+mes+'/'+ano)!=True){
				alert('Data inválida');
				pData2.focus();
				return null;
			}

		switch(Para){
			case 1:{
				var datafinal = dia+'/'+mes+'/'+ano;
				break;
			}
			case 2:{
				var datafinal = mes+'/'+dia+'/'+ano;
				break;
			}
			case 3:{
				var datafinal = ano+mes+dia;
				break;
			}
		}
		
		return datafinal
	}
//final da validação de data
//-------------- zeros a esquerda ----------
// onBlur="zero(this,8)";
//------------------------------------------
function zero(campo,tamanho){
	var valor=campo.value;
	var total_atual=campo.value.length;
	var total_final=(tamanho - total_atual);
	if (total_atual != total_final){
		for (i=0; i < total_final; i++){
		valor ="0"+valor;
		}
	campo.value = valor;
	}
}
//---------- pular para o proximo campo -----
function pular(campo,campo2,event){
       if(window.event.keyCode == 13 || window.event.keyCode == 40){
		  campo.focus(); 
       }
	   if(window.event.keyCode == 38){
	   if(campo2=="") {
	   //--------------------
	   }
	   else {
		   campo2.focus(); 
	   	}
	  }
   }
//------------- Abrir janela pop up ------
// janela('teste.html','janela','width="400", height="500"');
//-------------------------------------------
function janela(URL,nome,opcao) { 
  window.open(URL,nome,opcao);
}
//----------------Soma Data
// somadata(data,dias,campomostra);
//---------------------------------
function somadata(data,dias,campo) {
   data=data.split('/');
   diafuturo=parseInt(data[0])+parseInt(dias);
   mes=parseInt(data[1]);
   ano=parseInt(data[2]);
   while(diafuturo>numdias(mes,ano)) {
       diafuturo-=numdias(mes,ano);
       mes++;
       if(mes>12) {
           mes=1;
           ano++;
       }
   }
   if(diafuturo<10) { diafuturo='0'+diafuturo; }
  if(mes<10) { mes='0'+mes; }
var novadata=diafuturo+"/"+mes+"/"+ano;
	campo.value=dias;
}
function numdias(mes,ano) {
   if((mes<8 && mes%2==1) || (mes>7 && mes%2==0)) return 31;
   if(mes!=2) return 30;
   if(ano%4==0) return 29;
   return 28;
}

//------------- exibi da hoje no campo ------
// hoje(campo)
//-------------------------------------------
function hoje(data){	
			var dataatual = new Date();
			var dia = dataatual.getDate();
			
			if (dia < 10){
				dia = "0" + dia;}
				
			var mes = (dataatual.getMonth() + 1);
			
			if (mes < 10){
				mes = "0" + mes;}
				
			var ano = dataatual.getYear();	
			
			data.value = (dia + "/" +  mes + "/" + ano);	
}
function hora(vl){
			var vhora = new Date();
			var hora = vhora.getHours();			
			if (hora < 10){
				hora = "0" + hora; }				
				var minut = (vhora.getMinutes() + 1);
			if (minut < 10){
				minut = "0" + minut; }				
				var sec = vhora.getSeconds();	
			if (sec < 10){
				var sec = "0"+sec; }
			vl.value = (hora + ":" +  minut + ":" + sec);	
}
function validV(campos){
var campo = new Array(campos);
var total =3
	// validando 
	for (x=0; x < 3; x++){
		cp = eval("document.form."+campo[x]);
		if (cp.value == ""){ 
			alert("Preencha o campo requerido!");
			cp.focus();
			break;
			}
	}
}
//------------- valida campo em branco ------
// valida(campo1,campo2,campo3,campo4,campo5,campo6)
//-------------------------------------------
function valid(campo1, campo2, campo3, campo4, campo5, campo6, campo7, campo8, campo9, campo10, campo11, campo12, campo13, campo14){
erro = false;
	if (campo1 != null){
		if (campo1.value == ""){
			erro = true;
			campo1.focus();
		}
		else if (campo2 != null){
			if (campo2.value == ""){
				erro = true;
				campo2.focus();
			}
			else if (campo3 != null){
				if (campo3.value == ""){		
					erro = true;
				campo3.focus();
				}
				else if (campo4 != null){
					if (campo4.value == ""){		
						erro = true;
						campo4.focus();
					}
					else if (campo5 != null){
						if (campo5.value == ""){		
							erro = true;
							campo5.focus();
						}
						else if (campo6 != null){
							if (campo6.value == ""){		
								erro = true;
								campo6.focus();
							}
							else if (campo7 != null){
								if (campo7.value == ""){		
								erro = true;
								campo7.focus();
								}
								else if (campo8 != null){
									if (campo8.value == ""){		
									erro = true;
									campo8.focus();
									}
									else if (campo9 != null){
										if (campo9.value == ""){		
										erro = true;
										campo9.focus();
										}
										else if (campo10 != null){
											if (campo10.value == ""){		
											erro = true;
											campo10.focus();
											}
											else if (campo11 != null){
												if (campo11.value == ""){		
												erro = true;
												campo11.focus();
												}
												else if (campo12 != null){
													if (campo12.value == ""){		
													erro = true;
													campo12.focus();
													}
													else if (campo13 != null){
														if (campo13.value == ""){		
														erro = true;
														campo13.focus();
														}
														else if (campo14 != null){
														if (campo14.value == ""){		
														erro = true;
														campo14.focus();
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
	if (erro==false){
		return salvar();
	}
	else{
		alert("Favor preencher todos os campos requeridos. \n Vou indica-lo!");
		return false;
	}
}

//---------- mascara para campos -----------
// onKeyPress="formatar(this,'00/00/000')"
//------------------------------------------
function formatar(src, mask) {
		var i = src.value.length;
		var saida = mask.substring(i,i+1);
		var ascii = event.keyCode;
		//alert(ascii);
		if(saida == "E"){
			event.keyCode=32	
		} else if (saida == "A") {
			if (((ascii >=65) || (ascii >=97)) && ((ascii <= 90) || (ascii <= 122))) { event.keyCode = event.keyCode; }
			else { event.keyCode = 0; }
		} else if (saida == "0") {
			if ((ascii >= 48) && (ascii <= 57)) { return }
			else { event.keyCode = 0 }
		} else if (saida == "#") {
			return;
		} else {
			src.value += saida;
			i += 1
			saida = mask.substring(i,i+1);
			if (saida == "A") {
				if ((ascii >=97) && (ascii <= 122)) { event.keyCode -= 32; }
				else { event.keyCode = 0; }
			} else if (saida == "0") {
				if ((ascii >= 48) && (ascii <= 57)) { return }
				else { event.keyCode = 0 }
			} else { return; }
		}
	}
//------------------------
// onBlur="validHora(this);";
//------------------------
function validHora(valor){
	valor1 = eval("'"+valor.value+"'");
	par = valor1.split(":");
	if (par[0] > 24 || par[0] < 0 || par[0] ==""){
		alert("Hora inválida!");
		valor.focus();
		return false;
	}
	if (par[1] > 59 || par[1] < 0 || par[1] ==""){
		alert("Minutos inválido!");
		valor.focus();
		return false;
	}
	if (par[2] > 59 || par[2] < 0 || par[2] ==""){
		alert("Segundos inválido!");
		valor.focus();
		return false;
	}
}
function verifica_campo_CPF(campo) {
var CPF = campo.value; // Recebe o valor digitado no campo
CPF = ClearStr(CPF,'.');
CPF = ClearStr(CPF,'-');
// Aqui começa a checagem do CPF
var POSICAO, I, SOMA, DV, DV_INFORMADO;
var DIGITO = new Array(10);
DV_INFORMADO = CPF.substr(9, 2); // Retira os dois últimos dígitos do número informado
// Desemembra o número do CPF na array DIGITO
for (I=0; I<=8; I++) {
  DIGITO[I] = CPF.substr( I, 1);
}
// Calcula o valor do 10º dígito da verificação
POSICAO = 10;
SOMA = 0;
   for (I=0; I<=8; I++) {
      SOMA = SOMA + DIGITO[I] * POSICAO;
      POSICAO = POSICAO - 1;
   }
DIGITO[9] = SOMA % 11;
   if (DIGITO[9] < 2) {
        DIGITO[9] = 0;
}
   else{
       DIGITO[9] = 11 - DIGITO[9];
}
// Calcula o valor do 11º dígito da verificação
POSICAO = 11;
SOMA = 0;
   for (I=0; I<=9; I++) {
      SOMA = SOMA + DIGITO[I] * POSICAO;
      POSICAO = POSICAO - 1;
   }
DIGITO[10] = SOMA % 11;
   if (DIGITO[10] < 2) {
        DIGITO[10] = 0;
   }
   else {
        DIGITO[10] = 11 - DIGITO[10];
   }
// Verifica se os valores dos dígitos verificadores conferem
DV = DIGITO[9] * 10 + DIGITO[10];
   if (DV != DV_INFORMADO) {
      alert('CPF inválido');
      campo.value = '';
      campo.focus();
      return false;
   } 
}
function mascara (formato, objeto)
{
campo = eval (objeto);
    if (formato=='CPF')
  {
  caracteres = '01234567890';
  separacoes = 3;
  separacao1 = '.';
  separacao2 = '-';
  conjuntos = 4;
  conjunto1 = 3;
  conjunto2 = 7;
  conjunto3 = 11;
  conjunto4 = 14;
  if ((caracteres.search(String.fromCharCode (window.event.keyCode))!=-1) && campo.value.length < 
  (conjunto4))
  {
  if (campo.value.length == conjunto1) 
      campo.value = campo.value + separacao1;
  else if (campo.value.length == conjunto2) 
      campo.value = campo.value + separacao1;
  else if (campo.value.length == conjunto3) 
      campo.value = campo.value + separacao2;
  }
  else 
  event.returnValue = false;
  }  
}
//============= desabilita a seleção na pagina ==========================
/*document.onselectstart=new Function ("return false");
if (window.sidebar){ document.onmousedown=disableselect; document.onclick=reEnable; }
function disableselect(e){ return false }
function reEnable(){ return true }
//================= desabilita o botao direito do mouse ==================
if (window.Event) 
document.captureEvents(Event.MOUSEUP); 

function nocontextmenu() { 
event.cancelBubble = true 
event.returnValue = false; 
return false; } 
function norightclick(e) { 
if (window.Event) { 
if (e.which == 2 || e.which == 3) 
return false; 
} 
else 
if (event.button == 2 || event.button == 3) { 
event.cancelBubble = true 
event.returnValue = false; 
return false; 
} 
} 
if (document.layers) { 
document.captureEvents(Event.MOUSEDOWN); 
} 
document.oncontextmenu = nocontextmenu; 
document.onmousedown = norightclick; 
document.onmouseup = norightclick;*/


/***********************************************
* Show Hint script- © Dynamic Drive (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit http://www.dynamicdrive.com/ for this script and 100s more.
***********************************************/

/*******
* abre popup centralizada
* <a href="javascript:ssabrircentralizado('PAGINA.htm','600','400');">Abrir janela centralizada</a>
*******/
function ssabrircentralizado(pagina,largura,altura) {

    // Definindo meio da tela    
	var esquerda = (screen.width - largura)/2;    
	var topo = (screen.height - altura)/2;    
	// Abre a nova janela     
	window.open(pagina,'','height=' + altura + ', width=' + largura + ', top=' + topo + ', left=' + esquerda); 
}




var horizontal_offset="9px" //horizontal offset of hint box from anchor link

/////No further editting needed

var vertical_offset="0" //horizontal offset of hint box from anchor link. No need to change.
var ie=document.all
var ns6=document.getElementById&&!document.all

function getposOffset(what, offsettype){
var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
var parentEl=what.offsetParent;
while (parentEl!=null){
totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
parentEl=parentEl.offsetParent;
}
return totaloffset;
}

function iecompattest(){
return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function clearbrowseredge(obj, whichedge){
var edgeoffset=(whichedge=="rightedge")? parseInt(horizontal_offset)*-1 : parseInt(vertical_offset)*-1
if (whichedge=="rightedge"){
var windowedge=ie && !window.opera? iecompattest().scrollLeft+iecompattest().clientWidth-30 : window.pageXOffset+window.innerWidth-40
dropmenuobj.contentmeasure=dropmenuobj.offsetWidth
if (windowedge-dropmenuobj.x < dropmenuobj.contentmeasure)
edgeoffset=dropmenuobj.contentmeasure+obj.offsetWidth+parseInt(horizontal_offset)
}
else{
var windowedge=ie && !window.opera? iecompattest().scrollTop+iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18
dropmenuobj.contentmeasure=dropmenuobj.offsetHeight
if (windowedge-dropmenuobj.y < dropmenuobj.contentmeasure)
edgeoffset=dropmenuobj.contentmeasure-obj.offsetHeight
}
return edgeoffset
}

function showhint(menucontents, obj, e, tipwidth){
if ((ie||ns6) && document.getElementById("hintbox")){
dropmenuobj=document.getElementById("hintbox")
dropmenuobj.innerHTML=menucontents
dropmenuobj.style.left=dropmenuobj.style.top=-500
if (tipwidth!=""){
dropmenuobj.widthobj=dropmenuobj.style
dropmenuobj.widthobj.width=tipwidth
}
dropmenuobj.x=getposOffset(obj, "left")
dropmenuobj.y=getposOffset(obj, "top")
dropmenuobj.style.left=dropmenuobj.x-clearbrowseredge(obj, "rightedge")+obj.offsetWidth+"px"
dropmenuobj.style.top=dropmenuobj.y-clearbrowseredge(obj, "bottomedge")+"px"
dropmenuobj.style.visibility="visible"
obj.onmouseout=hidetip
}
}

function hidetip(e){
dropmenuobj.style.visibility="hidden"
dropmenuobj.style.left="-500px"
}

function createhintbox(){
var divblock=document.createElement("div")
divblock.setAttribute("id", "hintbox")
document.body.appendChild(divblock)
}

if (window.addEventListener)
window.addEventListener("load", createhintbox, false)
else if (window.attachEvent)
window.attachEvent("onload", createhintbox)
else if (document.getElementById)
window.onload=createhintbox


/*
* Cabral - 01.10.2010
* <input type="text" onkeypress="return mascara_telefone(objeto,event);">
*/
function mascara_telefone(objeto,evt){

	//if(!ssleord(objeto, event)) return false;
    //alert (evt.keyCode)
	if(objeto.value.length == 0) objeto.value = '(' + objeto.value;
	if(objeto.value.length == 3) objeto.value = objeto.value + ') ';
	if(objeto.value.length == 9) objeto.value = objeto.value + '-';

}

function mascara_celular(objeto,event){

	if(!ssleord(objeto, event)) return false;
	if(objeto.value.length == 0) objeto.value = '(' + objeto.value;
	if(objeto.value.length == 3) objeto.value = objeto.value + ') ';
	if(objeto.value.length == 10) objeto.value = objeto.value + '-';

}
//-----------------------------------------------------
//Funcao: MascaraMoeda
//Sinopse: Mascara de preenchimento de moeda
//Parametro:
//   objTextBox : Objeto (TextBox)
//   SeparadorMilesimo : Caracter separador de milésimos
//   SeparadorDecimal : Caracter separador de decimais
//   e : Evento
//Retorno: Booleano
//Autor: Gabriel Fróes - www.codigofonte.com.br
//-----------------------------------------------------
function MascaraMoeda(objTextBox, SeparadorMilesimo, SeparadorDecimal, e){
     var sep = 0;  
     var key = '';  
     var i = j = 0;  
     var len = len2 = 0;  
     var strCheck = '0123456789';  
     var aux = aux2 = '';  
     var whichCode = e.keyCode;  
     if (whichCode == 13 || whichCode == 8) return true;
     key = String.fromCharCode(whichCode); // Valor para o código da Chave  
     if (strCheck.indexOf(key) == -1) return false; // Chave inválida  
     len = objTextBox.value.length;  
     for(i = 0; i < len; i++)  
         if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal)) break;  
     aux = '';  
     for(; i < len; i++)  
         if (strCheck.indexOf(objTextBox.value.charAt(i))!=-1) aux += objTextBox.value.charAt(i);  
     aux += key;  
     len = aux.length;  
     if (len == 0) objTextBox.value = '';  
     if (len == 1) objTextBox.value = '0'+ SeparadorDecimal + '0' + aux;  
     if (len == 2) objTextBox.value = '0'+ SeparadorDecimal + aux;  
     if (len > 2) {  
         aux2 = '';  
         for (j = 0, i = len - 3; i >= 0; i--) {  
             if (j == 3) {  
                 aux2 += SeparadorMilesimo;  
                 j = 0;  
             }  
             aux2 += aux.charAt(i);  
             j++;  
         }  
         objTextBox.value = '';  
         len2 = aux2.length;  
         for (i = len2 - 1; i >= 0; i--)  
         objTextBox.value += aux2.charAt(i);  
         objTextBox.value += SeparadorDecimal + aux.substr(len - 2, len);  
     }  
     return false;  
 }
replaceAll = function(string, token, newtoken) {
	while (string.indexOf(token) != -1) {
		string = string.replace(token, newtoken);
	}
	return string;
}


			doVrfy = function(){
				var erros=0;
				$(".camporeq").each(
					function(x){
						if($(this).val() == ""){
							erros++;
						}
					}
				)
			}

			doValidate = function(){
				var erros=0
				var bolErro=false
				var msgErro = new Array();
				var txt=""
			
				$(".camporeq").each(
					function(x){
						if($(this).val() == ""){
							erros++;
							bolErro=true;
							msgErro.push($(this).attr("title"));
						}
					}
				)
				if(erros > 0 && bolErro == true){
					txt="<h4>Atenção: "+erros+" erro(s) localizado(s): </h4>\n"
					txt+="<ol>\n"
					for(i=0;i<erros;i++){
						txt+="<li>- "+msgErro[i]+"</li>\n"
					}	
					txt+="&nbsp;\n<li style=\"list-style:none\"><a href=\"javascript:void(0)\" onclick=\"$('#erros').slideToggle();$('.modal').hide('fast');\"><b>[ Fechar ]</b></a></li>"
					txt+="</ol>\n"
					doMensagem(txt);
					return false;
				} else {
					return true;
				}
				return false;
			}


			doModal = function(){var id = $(".modal");var maskHeight = $(document).height();var maskWidth = $(document).width();$(id).css({'width':maskWidth,'height':maskHeight});$(id).fadeIn(1000);$(id).fadeTo("slow",0.8);var winH = $(window).height();var winW = $(window).width();$(id).css('top',  winH/2-$(id).height()/2);$(id).css('left', winW/2-$(id).width()/2);$(id).fadeIn(6000);}
			doMensagem = function(str,show){doModal();$("#erros").html(str);$("#erros").slideToggle();if(show==1){$("#erros").delay(1200).slideToggle('slow');$(".modal").delay(50).fadeOut('fast');}}
			
    function MakeStaticHeader(gridId, height, width, headerHeight, isFooter) {
        var tbl = document.getElementById(gridId);
        if (tbl) {
        var DivHR = document.getElementById('DivHeaderRow');
        var DivMC = document.getElementById('DivMainContent');
        var DivFR = document.getElementById('DivFooterRow');

        //*** Set divheaderRow Properties ****
        DivHR.style.height = headerHeight + 'px';
        DivHR.style.width = (parseInt(width) - 16) + 'px';
        DivHR.style.position = 'relative';
        DivHR.style.top = '0px';
        DivHR.style.zIndex = '10';
        DivHR.style.verticalAlign = 'top';

        //*** Set divMainContent Properties ****
        DivMC.style.width = width + 'px';
        DivMC.style.height = height + 'px';
        DivMC.style.position = 'relative';
        DivMC.style.top = -headerHeight + 'px';
        DivMC.style.zIndex = '1';

        //*** Set divFooterRow Properties ****
        DivFR.style.width = (parseInt(width) - 16) + 'px';
        DivFR.style.position = 'relative';
        DivFR.style.top = -headerHeight + 'px';
        DivFR.style.verticalAlign = 'top';
        DivFR.style.paddingtop = '2px';

        if (isFooter) {
         var tblfr = tbl.cloneNode(true);
      tblfr.removeChild(tblfr.getElementsByTagName('tbody')[0]);
         var tblBody = document.createElement('tbody');
         tblfr.style.width = '100%';
         tblfr.cellSpacing = "0";
         //*****In the case of Footer Row *******
         tblBody.appendChild(tbl.rows[tbl.rows.length - 1]);
         tblfr.appendChild(tblBody);
         DivFR.appendChild(tblfr);
         }
        //****Copy Header in divHeaderRow****
        DivHR.appendChild(tbl.cloneNode(true));
     }
    }
    function OnScrollDiv(Scrollablediv) {
    document.getElementById('DivHeaderRow').scrollLeft = Scrollablediv.scrollLeft;
    document.getElementById('DivFooterRow').scrollLeft = Scrollablediv.scrollLeft;
    }