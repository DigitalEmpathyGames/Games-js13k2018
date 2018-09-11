obtenerSeccion = function (x, y) {
    return (map.data[y] && map.data[y][x]) ? map.data[y][x] : 0;
};
function mayorque(numero1,numero2){
	var mayorMenor ={
		mayor:-10000,
		menor:-10000
		
	}
	if(numero1 > numero2){
		mayorMenor.mayor = numero1;
		mayorMenor.menor = numero2;
	}else if(numero2 > numero1){
		mayorMenor.mayor = numero2;
		mayorMenor.menor = numero1;
	}else{
		mayorMenor.mayor = numero1;
		mayorMenor.menor = numero2;
	}
	return mayorMenor;
}

function colision(x1,y1,x2,y2){
	var mayome = mayorque(x1, x2);
	var xMa = mayome.mayor;
	var xMe = mayome.menor;
	mayome = mayorque(y1, y2);
	var yMa = mayome.mayor;
	var yMe = mayome.menor;
	var chocaX = false;
	var chocaY = false;
	if((xMa >= xMe) && (xMa <= xMe + map.tile_size)){
		chocaX = true;
	}
	
	if((yMa >= yMe) && (yMa <= yMe + map.tile_size)){
		chocaY = true;
	}
	
	var damage = false;
	if(chocaX && chocaY){
		damage = true;
	}
	return damage;
}

dibujar_luz = function (ctx, color, x, y, porte) {
	ctx.beginPath();
		var grd = ctx.createRadialGradient(x, y, 0, x, y, porte);
		grd.addColorStop(0, color);
		grd.addColorStop(1, colorNiebla1);
		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, gameWidth, gameHeight);
	ctx.closePath();
};

cargar_exp = function(cantidad){
	player.stats.exA += cantidad;
	if((player.stats.exA * 100)/ player.stats.exS >= 100){
		player.stats.exA = 0;
		player.stats.exS += player.stats.facNvl;
		player.stats.vidaTotal += player.stats.facNvl;
		player.stats.nivel += 1;
	}
};

tomar_articulo = function(){
	var x = Math.round(player.loc.x / map.tile_size);
    var y = Math.round(player.loc.y / map.tile_size);
	if(dibArt.get("" + x + y)){
		var art = dibArt.get("" + x + y);
		inventario.set(art.id,art);
		dibArt.delete(art.id);
	}
	if(!enemigosMuertos.get(articulos.get("" + x + y))){
		luchando = true;
		game.current_map.keys[10].solid = 1;
		game.current_map.keys[10].colour = colorsolido;
		game.current_map.keys[14].id =1;
	}

}

dibujar_presentacion = function(ctx, color, x, y, porte){
	
	var y0 = y - porte/2;
	var y1 = y + porte/2;
	var x01 = x + porte/2;
	var x11 = x + porte * 2;
	var x02 = x - porte/2;
	var x12 = x - porte * 2;

	ctx.beginPath();
		var grd = ctx.createLinearGradient(x01,y0,x11,y1);
		grd.addColorStop(0,"#FFFFFF00");
		grd.addColorStop(1,"#FFFFFF");

		ctx.fillStyle = grd;
		ctx.fillRect(x,y - porte,porte,porte * 3);
	ctx.closePath();
	ctx.beginPath();
		var grd = ctx.createLinearGradient(x02,y0,x12,y1);
		grd.addColorStop(0,"#FFFFFF00");
		grd.addColorStop(1,"#FFFFFF");
		ctx.fillStyle = grd;
		ctx.fillRect(x - porte,y - porte,porte,porte * 3);
	ctx.closePath();
};