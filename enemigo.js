
function enemigo(id, posx, posy, porte, mapX, mapY){
	// estos son los nuevos
	this.gravedad = 7;
	this.saltando = false;
	this.cayendo = true;
	this.desplazamiento = 0;
	this.salto ={
		impulso: 1,
		fuerza: 2,
		velocidad: 4,
		altSalto:0,
		secciones:0,
		facSec: [1,1,1,0.5],
		indSec: 0,
		
		seccionesX:0,
		fuerzaX: 4,
		longitudX: 4,
		facSecX: [0.5,1,1,1,1,1,1,0.5],
		indSecX: 0,
		desplazamiento:0,
		subiendo:true,
		acumular:true,
		acumulador:0
	};
	this.sentidoX = -1;
	this.xInicial = Number(posx);
	this.yInicial = Number(posy);
	this.velocidad = 3;
	this.id = id;
	this.vida = 10;
	this.vidaI = 10;
	this.nivel = 1;
	this.enSuelo = false;
	var spra = Math.floor((Math.random() * 4) + 1);
	this.espera = Number(spra);
	this.esperaI = Number(spra);
	this. randColor = Math.floor(Math.random() * 10) + 1;
	//estos son los viejos
	

	this.enemX = posx;
	this.enemY = posy;
	this.porte = porte;
	
	this.sentidoY = 1;
	this.distSpawnX = 0;
	this.distSpawnY = 0;
	
	this.velocidadY = map.tile_size /20;
	//this.gravedad = map.tile_size /10;
	this.mapx = mapX;
	this.mapy = mapY;
	this.movEnemigoX = map.tile_size;
	this.movEnemigoY = map.tile_size;
	this.xy = "" + mapX + mapY;
	this.reSaltar = true;
	this.subiendo = false;
	this.bajando = false;
	this.activado = false;
	this.altSalto = 100;
	this.espera = 2;
	this.esperaTope = 2;
	this.saltos = 1;
	this.saltosTope = 1;
	this.topeY = false;
	this.posInMap = true;
	this.topeX = 0;
	this.accion = 0;
	/*
	this.salto ={
		subi : false,
		baje :false
	};
	*/
};

function respawn (id, posx, posy, mapX, mapY){
	this.id = id;
	this.spawnX = posx;
	this.spawnY = posy;
	this.mapx = mapX;
	this.mapy = mapY;
};

equiparObjeto = function(idArt){
	switch (idArt){
		case "Pntln":
			player.stats.pantalon = true;
			var dispDmg2 =  new datoTxtVolatil("PANTALON EQUIPADO - DOBLE SALTO",player.screen.x,player.screen.y, colorFuente);
			textoVolatil.set(dispDmg2.id, dispDmg2);
			limites.maxSaltos = 2;
		break;
		default:
		break;
	}
};

function disparoEnemigos(value, key, mapaEntrante) {
	if(cmpDisEne){
		if(miray && mirax){
			if(((mirax >= value.enemX) && (mirax <= value.enemX + map.tile_size)) && ((miray >= value.enemY) &&(miray <= value.enemY + map.tile_size))){
				value.vida -= player.stats.nivel;
				var dispDmg =  new datoTxtVolatil("-" + player.stats.nivel,mirax,miray, colorFVida);
				textoVolatil.set(dispDmg.id, dispDmg);
				
				if(value.vida < 1){
					var jefeObj = jefes.get(value.id);
					var exp = player.stats.jugandoL * facExp;
					if(jefeObj){
						luchando = false;
						game.current_map.keys[10].solid = 0;
						game.current_map.keys[10].colour = colorFondo;
						equiparObjeto(jefeObj.art);
						exp *= bonoJefe;
					}
					
					cargar_exp(exp);
					dispDmg =  new datoTxtVolatil("+" + exp,mirax,miray, colorPelo);
					textoVolatil.set(dispDmg.id, dispDmg);
					enemigosMuertos.set(value.id, "undefined");
					mapaEntrante.delete(value.id);

				}	
			}
		}

	}
}
dibujar_VEnemigo = function(enemigo,context){
	var XV = (enemigo.enemX + map.tile_size/2) - enemigo.vidaI /2;
	ctx.beginPath();
		ctx.fillStyle = colorDVida;
		ctx.fillRect(XV - depVida, enemigo.enemY - depVida - grosorVida * espacioLinea, enemigo.vidaI + depVida * 2, grosorVida + depVida * 2);
	ctx.closePath();
	ctx.beginPath();
		ctx.fillStyle = colorFVida;
		ctx.fillRect(XV, enemigo.enemY - grosorVida * espacioLinea, enemigo.vidaI, grosorVida);
	ctx.closePath();
	
	ctx.beginPath();
		ctx.fillStyle = colorVida;
		ctx.fillRect(XV, enemigo.enemY - grosorVida * espacioLinea, enemigo.vida, grosorVida);
	ctx.closePath();
};	
dibujar_enemigo = function(enemigo,context){
	var desp = map.tile_size / 2;
	dibujar_luz(context, luzEnemigo, enemigo.enemX + desp, enemigo.enemY + desp, 70);
	var sprFrente = sprites[0];
	var tamTil = map.tile_size / sprFrente.length;
	context.beginPath();
	

	for(i = 0;i < sprFrente.length; i++){
		for(i2 = 0; i2 < sprFrente[i].length;i2 ++){
			
			if(jefes.get(enemigo.id)){
				context.fillStyle = elegirColor(sprFrente[i][i2], false);
			}else{
				var color = elegirColor(sprFrente[i][i2], false);
				if(color != "#00000000"){
					context.fillStyle = elegirColor(enemigo.randColor, false);
				}else{
					context.fillStyle = color;
				}
				
			}
			
			var posX = enemigo.enemX + (tamTil * i2);
			var posY = enemigo.enemY + (tamTil * i);
			context.fillRect(
				posX,
				posY,
				tamTil,
				tamTil
			);
		}
	}
	
	context.fill();
	context.closePath();
	dibujar_VEnemigo(enemigo,context);
}

var elegirAccion = function(){
	return (Math.floor(Math.random() * 2)); 
}

var elegirTiempoAccion = function(){
	return (Math.floor(Math.random() * 3) + 1); 
}


caminar = function(enemyObj){
	if(respawnPlace.length > 0){
		enemyObj.desplazamiento += enemyObj.velocidad * enemyObj.sentidoX;
	}else{
		enemyObj.enemX += enemyObj.velocidad * enemyObj.sentidoX - camera.x;
	}
}

function moverEnemigos(enemyObj,key,mapaEntrante, ctx) {
		if(enemyObj.cayendo){
			enemyObj.enemY += enemyObj.gravedad;
		}else if(enemyObj.saltando){
			saltando(enemyObj);
		}
		
		if(!enemyObj.saltando){
			caminar(enemyObj);
		}

		if((enemyObj.enemX < -(map.tile_size / 2)) || ((enemyObj.enemX + map.tile_size) > (map.tile_size / 2) + gameWidth) ){
			enemigos.delete(enemyObj.id);
		}

		var arrColi = coliciones(enemyObj); 

		if(arrColi[2] || arrColi[7]){
			enemyObj.sentidoX *= -1;
			enemyObj.desplazamiento += enemyObj.velocidad * 2 * enemyObj.sentidoX;
		}
		if(arrColi[4] || arrColi[5]){
			enemyObj.enSuelo = true;
			if(arrColi[4] && arrColi[5]){
				var manyoma = mayorque(arrColi[4], arrColi[5]);
				enemyObj.enemY = manyoma.menor;
			}else if(arrColi[4]){
				enemyObj.enemY = arrColi[4];
			}else{
				enemyObj.enemY = arrColi[5];
			}

		}else{
			enemyObj.enSuelo = false;
		}
		dibujar_enemigo(enemyObj,ctx);
		comprobarDmg = true;
		cmpDisEne = true;
}

guardarColision = function (xSec,ySec,xTerSec, yTerSec, xEne, yEne,xTerEne,yTerEne, colisionar){

	if((xEne >= xSec && xEne <= xTerSec) && (yEne >= ySec && yEne <= yTerSec)){
		colisionar[0] = yTerSec + 1;
		colisionar[7] = xTerSec + 1;
	}
	
	if((xTerEne >= xSec && xTerEne <= xTerSec) && (yEne >= ySec && yEne <= yTerSec) ){
		colisionar[1] = yTerSec + 1;
		colisionar[2] = xSec - map.tile_size;
	}
	
	if((xTerEne >= xSec && xTerEne <= xTerSec) && (yTerEne >= ySec && yTerEne <= yTerSec)){
		colisionar[3] = xSec - map.tile_size;
		colisionar[4] = ySec - map.tile_size;
	}
	
	if((xEne >= xSec && xEne <= xTerSec)&&(yTerEne >= ySec && yTerEne <= yTerSec)){
		colisionar[5] = ySec - map.tile_size;
		colisionar[6] = xTerSec + 1;
	}
}

coliciones = function (enemyObj){
	var colisionar =[];
	colisionar[9] = undefined;
	for(i = 0; i < secciones.length;i++){
		var xSec = secciones[i].x;
		var ySec = secciones[i].y;
		var xTerSec =  xSec + map.tile_size ;
		var yTerSec =  ySec + map.tile_size - 3;
		var xEne = enemyObj.enemX;
		var yEne = enemyObj.enemY;
		var xTerEne =  xEne + map.tile_size;
		var yTerEne =  yEne + map.tile_size;
		guardarColision(xSec,ySec,xTerSec, yTerSec, xEne, yEne,xTerEne,yTerEne, colisionar);
	
	}
	
	return colisionar;
}

saltando = function(enemyObj){
	var sentido;
	var movimiento;
	var movimientoX;
	
	if(enemyObj.salto.subiendo){
		sentido = -1;
		movimiento = enemyObj.salto.fuerza + enemyObj.salto.velocidad;
	}else{
		sentido = 1;
		movimiento = enemyObj.gravedad;
	}
	
	
	
	if(enemyObj.salto.acumular){
		enemyObj.salto.acumular = false;
		enemyObj.salto.acumulador = 0;
		enemyObj.salto.altSalto = enemyObj.salto.fuerza * map.tile_size * enemyObj.salto.impulso;
		enemyObj.salto.secciones = enemyObj.salto.altSalto / 3.5;
		enemyObj.salto.seccionesX = enemyObj.salto.altSalto / 7;
		enemyObj.salto.longitudX = enemyObj.salto.fuerzaX * map.tile_size;
	}

	enemyObj.salto.acumulador += movimiento;
	
	var topeAcumulador = enemyObj.salto.facSec[enemyObj.salto.indSec] * enemyObj.salto.secciones;
	
	movimientoX = enemyObj.salto.seccionesX * enemyObj.salto.facSecX[enemyObj.salto.indSecX];
	
	enemyObj.salto.desplazamiento = Number(topeAcumulador);
	

	var movYProy;
	if(enemyObj.salto.acumulador <= topeAcumulador){
		movYProy = movimiento * sentido;
	}else{
		movYProy = (topeAcumulador - enemyObj.salto.acumulador) * sentido;
	}
	
	var eneProy = new enemigo(enemyObj.id,enemyObj.enemX,enemyObj.enemY + movYProy,enemyObj.porte,enemyObj.mapx,enemyObj.mapx);
	var arrColi = coliciones(eneProy);
	
	enemyObj.desplazamiento += movimientoX /(topeAcumulador / movimiento) * enemyObj.sentidoX;
	
	enemyObj.enemX =  enemyObj.xInicial + enemyObj.desplazamiento;
	

	
	if(enemyObj.salto.acumulador <= topeAcumulador){
		if(arrColi[0] || arrColi[1]){
			if(arrColi[0] && arrColi[1]){
				var manyoma = mayorque(arrColi[0], arrColi[1]);
				enemyObj.enemY = manyoma.mayor;
			}else if(arrColi[0]){
				enemyObj.enemY = arrColi[0];
			}else{
				enemyObj.enemY = arrColi[1];
			}
		}else if(arrColi[4] || arrColi[5]){
			if(arrColi[4] && arrColi[5]){
				var manyoma = mayorque(arrColi[4], arrColi[5]);
				enemyObj.enemY = manyoma.mayor;
			}else if(arrColi[4]){
				enemyObj.enemY = arrColi[4];
			}else{
				enemyObj.enemY = arrColi[5];
			}
		}else{
			enemyObj.enemY += movimiento * sentido;
		}
		
	}else{
		enemyObj.salto.acumulador -= movimiento;
		if(arrColi[0] || arrColi[1]){
			if(arrColi[0] && arrColi[1]){
				var manyoma = mayorque(arrColi[0], arrColi[1]);
				enemyObj.enemY = manyoma.mayor;
			}else if(arrColi[0]){
				enemyObj.enemY = arrColi[0];
			}else{
				enemyObj.enemY = arrColi[1];
			}

		}else if(arrColi[4] || arrColi[5]){
			if(arrColi[4] && arrColi[5]){
				var manyoma = mayorque(arrColi[4], arrColi[5]);
				enemyObj.enemY = manyoma.mayor;
			}else if(arrColi[4]){
				enemyObj.enemY = arrColi[4];
			}else{
				enemyObj.enemY = arrColi[5];
			}
		}else{
			enemyObj.enemY += movimiento * sentido;
		}
		enemyObj.salto.acumular = true;
		enemyObj.salto.indSec += sentido * -1;
		enemyObj.salto.indSecX += 1;
		if(enemyObj.salto.subiendo){
			if(enemyObj.salto.indSec >= enemyObj.salto.facSec.length){
				enemyObj.salto.indSec = enemyObj.salto.facSec.length - 1;
				enemyObj.salto.subiendo = false;
			}
		}else{
			if(enemyObj.salto.indSec < 0){
				enemyObj.saltando = false;
				enemyObj.salto.subiendo = true;
				enemyObj.cayendo = true;
				enemyObj.salto.indSec = 0;
				enemyObj.salto.indSecX = 0;
			}
		}
		
		arrColi = coliciones(enemyObj);
		if(arrColi[0] || arrColi[1]){
			if(arrColi[0] && arrColi[1]){
				var manyoma = mayorque(arrColi[0], arrColi[1]);
				enemyObj.enemY = manyoma.mayor;
			}else if(arrColi[0]){
				enemyObj.enemY = arrColi[0];
			}else{
				enemyObj.enemY = arrColi[1];
			}
		}else if(arrColi[4] || arrColi[5]){
			if(arrColi[4] && arrColi[5]){
				var manyoma = mayorque(arrColi[4], arrColi[5]);
				enemyObj.enemY = manyoma.mayor;
			}else if(arrColi[4]){
				enemyObj.enemY = arrColi[4];
			}else{
				enemyObj.enemY = arrColi[5];
			}
		}
		
	}
	

	
}

reiniciarEnemigos = function(){
	enemigos.forEach(function (value, key, mapaEntrante) {
		value.enemX = Number(value.xInicial);
		value.enemY = Number(value.yInicial);
		value.vida = Number(value.vidaI);
	});
}

procesoEnemigo = function(enemigos, ctx){
	enemigos.forEach(function (value, key, mapaEntrante) {
		var jefeObj = jefes.get(value.id);
		if(!jefeObj){
			moverEnemigos(value, key, mapaEntrante, ctx);
		}else{
			if(inventario.get(jefeObj.idArt)){
				if(value.enSuelo){
					value.espera -= frameTime;

					if(value.espera<0){
						value.velocidad = Math.floor((Math.random() * 10) + 1) 
						value.esperaI = Number(Math.floor((Math.random() * 5) + 1) );
						value.espera = Number(value.esperaI);
					}
				}
				if(player.stats.vidaActual > 0){
					luchando = true;
				}
				moverEnemigos(value, key, mapaEntrante, ctx);
			}
		}
			
		
		
		
	});
	
	
}

resetearSpawn = function(){
	respawnPlace =[];
}
