dibujar_seccion = function(x, y, tile, context, mapX, mapY){
		context.beginPath();
			var nuevaX;
			var nuevaY;

	if (!tile || !tile.colour) return;
	context.fillStyle = tile.colour;
	
	if(tile.solid){
		secciones.push(new seccionObj(x,y,tile.id));
	}
	
	switch(tile.id) {
		case 12:
			espina(x,y,context,tile);
			secciones.push(new seccionObj(x,y,tile.id));
			break;
		case 13:
			espina(x,y,context,tile);
			secciones.push(new seccionObj(x,y,tile.id));
			break;
		case 14:
			nuevax = x + (map.tile_size - (map.tile_size / 2));
			nuevaY = y + (map.tile_size - (map.tile_size / 2));
			var dianaObj = new diana(nuevax,nuevaY,map.tile_size);
			dianas.push(dianaObj);
			break;
		case 15:
			var key = "" + mapX + mapY;
			
			var spawnObj = new respawn(respawnPlace.length,x,y,mapX,mapY);
			respawnPlace.push(spawnObj);
			var enemigoObj;
			
			if(enemigos.get(key)){
				enemigos.get(key).enemX = x + enemigos.get(key).desplazamiento;
				enemigos.get(key).xInicial = x;
			}else {
				if(!jefes.get(key)){
					enemigoObj = new enemigo(key,x,y,map.tile_size,mapX,mapY);
					enemigos.set(key, enemigoObj);
				}else if(!enemigosMuertos.get(key)){
					enemigoObj = new enemigo(key,x,y,map.tile_size,mapX,mapY);
					enemigoObj.vida = enemigoObj.vida * player.stats.jugandoL * bonoJefe;
					enemigoObj.vidaI = Number(enemigoObj.vida);
					enemigos.set(key, enemigoObj);
					
				}

			}
			break;
		default:
			context.fillRect(
				x,
				y,
				map.tile_size,
				map.tile_size
			);
			break;
	}
	/*
	if(tile.id == 99){
		console.log(mapX + "   " + mapY);
	}
	*/
	if(tile.id == 99 && !inventario.get("" + mapX + mapY)){
		var art;
		if(!dibArt.get("" + mapX + mapY)){
			art = new articulo("" + mapX + mapY, x, y);
			dibArt.set(art.id, art);
		}else{
			art = dibArt.get("" + mapX + mapY);
			art.x = x;
			art.y = y;
		}
	}
	context.closePath();
};
