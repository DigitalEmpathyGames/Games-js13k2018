
function datoTxtVolatil(texto, posx, posy, color){
	var D = new Date();
	this.id = "" + D.getHours() + D.getMinutes() + D.getSeconds() + D.getMilliseconds() +Math.floor((Math.random() * 100) + 1) ;
	this.x = posx;
	this.y = posy;
	this.iniX = posx;
	this.iniY = posy;
	this.texto = texto;
	this.velocidad = velVolatiles;
	this.limite = posy - limVolatil;
	this.color = color;
};



dibujar_jugador = function (context) {

	context.beginPath();
	context.fillStyle = "#FF0000";
	var sprFrente = sprites[0];
	var tamTil = map.tile_size / sprFrente.length;
	var desp = map.tile_size / 2;
	dibujar_luz(context, colorFuente, player.screen.x + desp, player.screen.y + desp, 70);
	for(i = 0;i < sprFrente.length; i++){
		for(i2 = 0; i2 < sprFrente[i].length;i2 ++){
			context.fillStyle = elegirColor(sprFrente[i][i2], true);
			var posX = player.loc.x + (tamTil * i2);
			var posY = player.loc.y + (tamTil * i);
			context.fillRect(
				posX - camera.x,
				posY - camera.y,
				tamTil,
				tamTil
			);
		}
	}	
	context.fill();
	context.closePath();
	player.screen.x = player.loc.x - camera.x;
	player.screen.y = player.loc.y - camera.y;
	if(player.damage){
		player.tiempoDmg -= frameTime;
		if(player.recoil){
			player.recoil = false;
			player.vel.y = -4;
			player.vel.x -= 4;
		}
		
		if(player.tiempoDmg < 0){
			player.recoil = true;
			player.damage = false;
			player.tiempoDmg = Number(player.tTDmg);
		}
	}
    
};

comprobarDisparo = function(){
	 for(i = 0;i < dianas.length;i++){
		var dianaObj = dianas[i];
		var maynor = mayorque(mirax,dianaObj.dianaX);
		var dx = maynor.mayor - maynor.menor;
		maynor = mayorque(miray,dianaObj.dianaY);
		var dy = maynor.mayor - maynor.menor;
		var distancia = Math.sqrt(dx * dx + dy * dy);
		if(distancia <= (dianaObj.porte /2)){
			var dispDmg =  new datoTxtVolatil("-" + player.stats.nivel,mirax,miray, colorFVida);
			textoVolatil.set(dispDmg.id, dispDmg);
			game.current_map.keys[10].solid = 0;
			game.current_map.keys[10].colour = colorFondo;
		}
	}
	if(((mirax >= player.screen.x) && (mirax <= player.screen.x + map.tile_size)) && ((miray >= player.screen.y) &&(miray <= player.screen.y + map.tile_size))){
		player.stats.vidaActual += player.stats.nivel;
		var dispSalud =  new datoTxtVolatil("+" + player.stats.nivel,mirax,miray, colorVida);
		textoVolatil.set(dispSalud.id, dispSalud);
		if(player.stats.vidaActual > player.stats.vidaTotal){
			player.stats.vidaActual = Number(player.stats.vidaTotal);
		}	
	}
	enemigos.forEach(disparoEnemigos);
};

