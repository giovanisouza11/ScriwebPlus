var AImageSfc = new Image();
AImageSfc.src = "/img_sfc/botoes_sfc.png";
var canvasSfc1;
var contextSfc1;
var valor_chave_sfc = new Array(21);
let titulo_sfc = 'ScriSfc';

//desenha os botoes
function draw_botoes_sfc() {
        canvasSfc1 = document.getElementById("tela2");
	contextSfc1 = canvasSfc1.getContext("2d");
        canvasSfc1.width = 220;
        canvasSfc1.height = 500;

	for(i=1; i<11; i++)
                contextSfc1.drawImage(AImageSfc, 70*valor_chave_sfc[i], 45*(i-1), 70, 45, 7,(i-1)*47, 70, 45);
    	for(i=11; i<21; i++)
                contextSfc1.drawImage(AImageSfc, 140+(70*valor_chave_sfc[i]), 45*(i-11), 70, 45, 79,(i-11)*47, 70, 45);
}

//Verifica QUAL botao foi acionado
//Separa em dois grupos: 0 a 10: comandos do software, 11 a 20: edicao do SFC
function trocar_botao_sfc() {
	var posicaoysfc = parseInt((window.event.clientY-1)/47);
	var posicaoxsfc = parseInt((window.event.clientX-425)/72);
	if (posicaoxsfc == 1)
		posicaoysfc = posicaoy + 10;
	if ((posicaoysfc >=0) && (posicaoysfc < 21))
	{
		for(var i=11; i<21; i++)
			valor_chave_sfc[i] = 0;
		if((posicaoysfc >=3) && (posicaoysfc < 8))
			for(var i=2; i<8; i++)
				valor_chave_sfc[i] = 0;

		valor_chave_sfc[posicaoysfc]=1;
		draw_botoes_sfc();
	}
	if (valor_chave_sfc[10]==1){
        	window.open("About", "SCriWeb");//, "height=600,width=600");
	    	valor_chave_sfc[10]=0;
	}
	if (valor_chave_sfc[9]==1){
        	window.open("Help", "SCriWeb");//, "height=800,width=1000");
	    	valor_chave_sfc[9]=0;
	}
	if (valor_chave_sfc[8]==1){
         	var modal = document.getElementById("myModal");
		var modalb = document.getElementById("myBody");
		var t_modal = modal.getElementsByTagName("h2")
		t_modal[0].innerHTML = "CONFIG";
		modalb.innerHTML = "<p>Endereço do CLP (1 a 30): <input type=number id='input1' max=30 min=0 size=2></p>"; 
		modalb.innerHTML = modalb.innerHTML+ "<p>Tempo de Scan: <input type=number id='input2' max=10 maxlength=3 size=3></p>"; 
		modalb.innerHTML = modalb.innerHTML+ "<p>Tempo de Atualização(Num de Scan):<input type=number id='input3' max=10 maxlength=3 size=3></p>"; 
		modalb.innerHTML = modalb.innerHTML+ "<p>Número máximo de lógicas:<input type=number id='input4' max = 200 maxlength=3 size=3></p>"; 
		document.getElementById('input1').value = localStorage.num_clp;
		document.getElementById('input2').value = localStorage.tempo_scan;
		document.getElementById('input3').value = localStorage.tempo_atualizacao;
		document.getElementById('input4').value = localStorage.num_linhas;
		var btn = document.createElement('button');
		btn.setAttribute('type','button')
		btn.appendChild(document.createTextNode('OK'));
		btn.onclick = function() {
			//config(document.getElementById('input1').value);
			localStorage.setItem("num_clp", document.getElementById('input1').value);
			localStorage.setItem("tempo_scan", document.getElementById('input2').value);
			localStorage.setItem("tempo_atualizacao", document.getElementById('input3').value);
			localStorage.setItem("num_linhas", document.getElementById('input4').value);
			modal.style.display = "none";
		};
		modalb.appendChild(btn);
		var span = document.getElementById("close2");
		modal.style.display = "block";
		span.onclick = function() {
			modal.style.display = "none";
		};
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
	
	   valor_chave_sfc[8]=0;
	}
	if (valor_chave_sfc[1]==1){
        	var inputCSV = document.createElement('input');
		inputCSV.type = 'file';
		inputCSV.accept = '.CSV';
	    	inputCSV.click();
		inputCSV.onchange = function() {
			//inputCSV.setPropertie('accept', '.csv');
			var file = this.files[0];
		    	leitorDeSfc.readAsText(file);
			titulo_sfc = file.name.slice(0,file.name.length -4);
		};
		valor_chave_sfc[1]=0;
		valor_chave_sfc[4]==0;
		valor_chave_sfc[5]==0;
		valor_chave_sfc[6]==0;
		valor_chave_sfc[7]==1;
	}
	if (valor_chave_sfc[2]==1){
	    let texto = '_id, nomecep, var_1, tipo, var_2, ver, R-W, pisca, funcao' + '\n';
	    for (var i=0; i<(larray.length/9); i++) {
			for (var j=0; j<9; j++)
			    texto += larray[(i*9)+j]+',';
			texto += '\n';
		}
		compila_sfc();
		//texto += '\n\n';
		//for (var i=0; i<(booleano.length); i++) {
			//for (var j=0; j<2; j++)
		//	texto += booleano[i]+' , ';
		//}
        //let titulo ='scriweb';
        var blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
        saveAs(blob, titulo_sfc + ".csv");
        valor_chave_sfc[2]=0;
	}
	if (valor_chave_sfc[3]==1){
		compila_sfc();
		//let texto = '';
		//for (var i=0; i<(booleano.length); i++) {
			//for (var j=0; j<2; j++)
		//	texto += booleano[i]+',';
		//}

                //socket.emit('programax', texto+','+num_clp); 
		clp_programa = booleano;
		clp_cria_memoria();
		//alert(clp_programa);
		I = clpI;
		valor_chave_sfc[3]=0;
		valor_chave_sfc[7]=1;
	}

	if (valor_chave_sfc[4]==1){
		comandos = 1;
		run_CLP();
		clp_comandos = 1;
	}
	if (valor_chave_sfc[5]==1){
		run_CLP();
		comandos = 2;
		clp_comandos = 2;
		//valor_chave[5]=0;
	}
	if (valor_chave_sfc[6]==1){
		run_CLP();
		if (comandos == 3)
			clp_comandos = 4;
		else {
			comandos = 3;
			clp_comandos = 3;
		}
		//valor_chave[6]=0;
	}
	if (valor_chave_sfc[7]==1){
		comandos = 0;
		stop_CLP();
		monitora_ladder(larray);
		clp_comandos = 0;
		//socket.emit('comandosx', 0+ ','+  num_clp);
	}
}


//leitura de arquivos
//Fonte https://tableless.com.br/file-api-trabalhando-com-arquivos-locais-usando-javascript/
var leitorDeCSV1 = new FileReader();
leitorDeSfc.addEventListener('load', leSfc);


function pegaSfc(inputFile) {
	var file = inputFile.files[0];
	leitorDeSfc.readAsText(file);
}

function leSfc(evt) {
	var fileArr = evt.target.result.split('\n');
	draw_sfc(fileArr);
}