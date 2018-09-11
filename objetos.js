function diana(posx, posy, porte){
	this.dianaX = posx;
	this.dianaY = posy;
	this.porte = porte;
};

espina = function(x,y,context,tile){
	var tamanioFigura = map.tile_size;
	var ySpike = y + tamanioFigura;
	var YTop, YBot;
	context.moveTo(x, ySpike);
	if(tile.id == 13){
		context.moveTo(x, y);
		YTop = y;
		YBot = y + tamanioFigura;
	}else{
		YBot = y;
		YTop = y + tamanioFigura;
	}

	var cantPuas = 2;
	var distPua = tamanioFigura / cantPuas;
	
	var centPua = distPua / 2;
	
	for(var i = 0 ; i < cantPuas ; i++){
		var moveX;
		moveX = centPua + (distPua * i);
		context.lineTo(x + moveX, YBot);
		moveX = distPua * (1 + i);
		context.lineTo(x + moveX , YTop);
	}	  
	context.fill();
}

dibujar_diana = function(ctx){
	 for(i1 = 0;i1 < dianas.length;i1++){
		var diabaObj = dianas[i1];
		var porte = diabaObj.porte /2;
		var x = diabaObj.dianaX;
		var y = diabaObj.dianaY;
		var cantDianas = 4;
		ctx.beginPath();
		ctx.fillStyle = "#000000";
		ctx.arc(x, y, porte, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
		porte -= 5;
	var iterator = cantDianas /2;
		for(i = 0; i < iterator; i++){
		  ctx.beginPath();
		  ctx.fillStyle = "#FF0000";
		  ctx.arc(x, y, porte, 0, 2 * Math.PI);
		  ctx.fill();
		  porte -= map.tile_size * 0.1;
			ctx.closePath();
			ctx.beginPath();
		  ctx.fillStyle = "#FFFFFFFF";
		  ctx.arc(x, y, porte, 0, 2 * Math.PI);
		  ctx.fill();
		  porte -= map.tile_size * 0.1;
			ctx.closePath();
		}
	 }
}

