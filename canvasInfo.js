dibujar_niebla = function (ctx) {
	ctx.beginPath();
		var grd = ctx.createRadialGradient(gameWidth/2, gameHeight/2, 200, gameWidth/2, gameHeight/2, 350);
		grd.addColorStop(0, colorNiebla1);
		grd.addColorStop(1, colorNiebla2);
		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, gameWidth, gameHeight);
	ctx.closePath();
};

dibujar_vida = function (ctx) {

	escribir(ctx, "NIVEL " + player.stats.nivel, xVida * 1.6, yVida, colorFuente);

	ctx.beginPath();
		ctx.fillStyle = colorDVida;
		ctx.fillRect(xVida - depVida, yVida - depVida, player.stats.vidaTotal + depVida * 2, grosorVida + depVida * 2);
	ctx.closePath();
	ctx.beginPath();
		ctx.fillStyle = colorFVida;
		ctx.fillRect(xVida, yVida, player.stats.vidaTotal, grosorVida);
	ctx.closePath();
	
	ctx.beginPath();
		ctx.fillStyle = colorVida;
		ctx.fillRect(xVida, yVida, player.stats.vidaActual, grosorVida);
	ctx.closePath();
	
	var nuevoY = 50;
	var nuevoX = 0;
	escribir(ctx, "EXP", xVida + nuevoX, yVida + nuevoY, colorFuente);

	ctx.beginPath();
		ctx.fillStyle = colorDVida;
		ctx.fillRect(xVida - depVida + nuevoX, yVida - depVida  + nuevoY, 100 + depVida * 2,grosorVida + depVida * 2 );
	ctx.closePath();
	ctx.beginPath();
		ctx.fillStyle = colorsolido;
		ctx.fillRect(xVida + nuevoX, yVida  + nuevoY, 100,grosorVida);
	ctx.closePath();
	
	ctx.beginPath();
		ctx.fillStyle = colorPelo;
		ctx.fillRect(xVida + nuevoX, yVida  + nuevoY, (player.stats.exA * 100)/ player.stats.exS, grosorVida);
	ctx.closePath();
	
};

dibujarMira = function (ctx){
	var radio = 30;
	ctx.beginPath();
	ctx.fillStyle = colorMira;
	ctx.strokeStyle=colorMira;
		ctx.arc(mirax, miray, radio, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fillRect(mirax,miray - (radio *2),2,radio * 4);
		ctx.fillRect(mirax - (radio *2),miray,radio * 4,2);
	ctx.closePath();
};

mover_textos = function(value, key, mapaEntrante, ctx){
	value.y -= value.velocidad;
	escribir(ctx, value.texto, value.x, value.y, value.color);
			if(value.y < value.limite){
				mapaEntrante.delete(value.id);
			}
};

dibujar_volatiles = function(ctx){
	textoVolatil.forEach(function (value, key, mapaEntrante) {
		mover_textos(value, key, mapaEntrante, ctx);
	});
}