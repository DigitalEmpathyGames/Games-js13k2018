/*
Copyright (c) 2013 dissimulate at codepen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/* Customisable map data */

var canvas = document.getElementById("canvas");

var selladores = {
	salto : true,
	disparo: false
};
var mirax,miray;
disparar = function () {
	selladores.disparo = true;
}

getMiraCoor = function(event){
	var rect = canvas.getBoundingClientRect();
	mirax = event.clientX - rect.left;
    miray = event.clientY - rect.top;
}

resetMira = function(){
	mirax = undefined;
    miray = undefined;
}

canvas.addEventListener("click", disparar);
canvas.addEventListener("mousemove", getMiraCoor);
canvas.addEventListener("mouseout", resetMira);










/* Clarity engine */

var Clarity = function () {

    this.alert_errors   = false;
    this.log_info       = true;
    this.tile_size      = 16;
    this.limit_viewport = false;
    this.jump_switch    = 0;
    
    this.viewport = {
        x: 200,
        y: 200
    };
    

    
    this.key = {
        left: false,
        right: false,
        up: false
    };

    window.onkeydown = this.keydown.bind(this);
    window.onkeyup   = this.keyup.bind(this);
};

Clarity.prototype.error = function (message) {

    if (this.alert_errors) alert(message);
    if (this.log_info) console.log(message);
};

Clarity.prototype.log = function (message) {

    if (this.log_info) console.log(message);
};

Clarity.prototype.set_viewport = function (x, y) {

    this.viewport.x = x;
    this.viewport.y = y;
};

Clarity.prototype.keydown = function (e) {

    var _this = this;

    switch (e.keyCode) {
    case 37:
        _this.key.left = true;
        break;
    case 38:
        _this.key.up = true;
        break;
    case 39:
        _this.key.right = true;
        break;
		
    case 65:
        _this.key.left = true;
        break;
    case 87:
        _this.key.up = true;
        break;
    case 68:
        _this.key.right = true;
        break;
		
    case 97:
        _this.key.left = true;
        break;
    case 118:
        _this.key.up = true;
        break;
    case 100:
        _this.key.right = true;
        break;
		
    }
};

Clarity.prototype.keyup = function (e) {

    var _this = this;

    switch (e.keyCode) {
    case 37:
        _this.key.left = false;
        break;
    case 38:
        _this.key.up = false;
        break;
    case 39:
        _this.key.right = false;
        break;
    case 65:
        _this.key.left = false;
        break;
    case 87:
        _this.key.up = false;
        break;
    case 68:
        _this.key.right = false;
        break;
		
    case 97:
        _this.key.left = false;
        break;
    case 118:
        _this.key.up = false;
        break;
    case 100:
        _this.key.right = false;
        break;
		
    }
};

Clarity.prototype.load_map = function (map) {

	luchando = false;
			
    if (typeof map      === 'undefined'
     || typeof map.data === 'undefined'
     || typeof map.keys === 'undefined') {

        this.error('Error: Invalid map data!');

        return false;
    }

    this.current_map = map;

    this.current_map.background = map.background || '#333';
    this.current_map.gravity = map.gravity || {x: 0, y: 0.3};
    this.tile_size = map.tile_size || 16;

    var _this = this;
    
    this.current_map.width = 0;
    this.current_map.height = 0;

    map.keys.forEach(function (key) {

        map.data.forEach(function (row, y) {
            
            _this.current_map.height = Math.max(_this.current_map.height, y);

            row.forEach(function (tile, x) {
                
                _this.current_map.width = Math.max(_this.current_map.width, x);

                if (tile == key.id)
                    _this.current_map.data[y][x] = key;
            });
        });
    });
    
    this.current_map.width_p = this.current_map.width * this.tile_size;
    this.current_map.height_p = this.current_map.height * this.tile_size;

    player.loc.x = map.player.x * this.tile_size || 0;
    player.loc.y = map.player.y * this.tile_size || 0;
    player.colour = map.player.colour || '#000';
  
    this.key.left  = false;
    this.key.up    = false;
    this.key.right = false;

    
    player.vel = {
        x: 0,
        y: 0
    };

	game.current_map.keys[14].id =14;
//	game.current_map.keys[10].solid = 0;
//	game.current_map.keys[10].colour = colorFondo;

    return true;
};

/*
Clarity.prototype.obtenerSeccion = function (x, y) {
    return (this.current_map.data[y] && this.current_map.data[y][x]) ? this.current_map.data[y][x] : 0;
};

*/


Clarity.prototype.draw_map = function (context, fore) {
	

    for (var y = 0; y < this.current_map.data.length; y++) {

        for (var x = 0; x < this.current_map.data[y].length; x++) {

            if ((!fore && !this.current_map.data[y][x].fore) || (fore && this.current_map.data[y][x].fore)) {

                var t_x = (x * this.tile_size) - camera.x;
                var t_y = (y * this.tile_size) - camera.y;
                
                if(t_x < -this.tile_size
                || t_y < -this.tile_size
                || t_x > this.viewport.x
                || t_y > this.viewport.y) continue;
                dibujar_seccion(
                    t_x,
                    t_y,
                    this.current_map.data[y][x],
                    context,
					x,
					y
                );
            }
        }
    }

    if (!fore) this.draw_map(context, true);
};

moverEnemigo = function(){
	
}

Clarity.prototype.move_player = function () {

    var tX = player.loc.x + player.vel.x;
    var tY = player.loc.y + player.vel.y;

    var offset = Math.round((this.tile_size / 2) - 1);

	
	
    var tile = obtenerSeccion(
        Math.round(player.loc.x / this.tile_size),
        Math.round(player.loc.y / this.tile_size)
    );
     
    if(tile.gravity) {
        
        player.vel.x += tile.gravity.x;
        player.vel.y += tile.gravity.y;
        
    } else {
        
        player.vel.x += this.current_map.gravity.x;
        player.vel.y += this.current_map.gravity.y;
    }
    
	
	
    if (tile.friction) {

        player.vel.x *= tile.friction.x;
        player.vel.y *= tile.friction.y;
    }

    var t_y_up   = Math.floor(tY / this.tile_size);
    var t_y_down = Math.ceil(tY / this.tile_size);
    var y_near1  = Math.round((player.loc.y - offset) / this.tile_size);
    var y_near2  = Math.round((player.loc.y + offset) / this.tile_size);

	
	
	
    var t_x_left  = Math.floor(tX / this.tile_size);
    var t_x_right = Math.ceil(tX / this.tile_size);
    var x_near1   = Math.round((player.loc.x - offset) / this.tile_size);
    var x_near2   = Math.round((player.loc.x + offset) / this.tile_size);

    var top1    = obtenerSeccion(x_near1, t_y_up);
    var top2    = obtenerSeccion(x_near2, t_y_up);
    var bottom1 = obtenerSeccion(x_near1, t_y_down);
    var bottom2 = obtenerSeccion(x_near2, t_y_down);
    var left1   = obtenerSeccion(t_x_left, y_near1);
    var left2   = obtenerSeccion(t_x_left, y_near2);
    var right1  = obtenerSeccion(t_x_right, y_near1);
    var right2  = obtenerSeccion(t_x_right, y_near2);

	
	
    if (tile.jump && this.jump_switch > 15) {

        player.can_jump = true;
        
        this.jump_switch = 0;
        
    } else this.jump_switch++;
    
    player.vel.x = Math.min(Math.max(player.vel.x, -this.current_map.vel_limit.x), this.current_map.vel_limit.x);
    player.vel.y = Math.min(Math.max(player.vel.y, -this.current_map.vel_limit.y), this.current_map.vel_limit.y);
    
    player.loc.x += player.vel.x;
    player.loc.y += player.vel.y;
    
    player.vel.x *= .9;
	
    if (left1.solid || left2.solid || right1.solid || right2.solid) {
        /* fix overlap */

        while (obtenerSeccion(Math.floor(player.loc.x / this.tile_size), y_near1).solid
            || obtenerSeccion(Math.floor(player.loc.x / this.tile_size), y_near2).solid)
            player.loc.x += 0.1;

        while (obtenerSeccion(Math.ceil(player.loc.x / this.tile_size), y_near1).solid
            || obtenerSeccion(Math.ceil(player.loc.x / this.tile_size), y_near2).solid)
            player.loc.x -= 0.1;

        /* tile bounce */

        var bounce = 0;

        if (left1.solid && left1.bounce > bounce) bounce = left1.bounce;
        if (left2.solid && left2.bounce > bounce) bounce = left2.bounce;
        if (right1.solid && right1.bounce > bounce) bounce = right1.bounce;
        if (right2.solid && right2.bounce > bounce) bounce = right2.bounce;

        player.vel.x *= -bounce || 0;
        
    }
    
    if (top1.solid || top2.solid || bottom1.solid || bottom2.solid) {

        /* fix overlap */
        
        while (obtenerSeccion(x_near1, Math.floor(player.loc.y / this.tile_size)).solid
            || obtenerSeccion(x_near2, Math.floor(player.loc.y / this.tile_size)).solid)
            player.loc.y += 0.1;

        while (obtenerSeccion(x_near1, Math.ceil(player.loc.y / this.tile_size)).solid
            || obtenerSeccion(x_near2, Math.ceil(player.loc.y / this.tile_size)).solid)
            player.loc.y -= 0.1;

        /* tile bounce */
        
        var bounce = 0;
        
        if (top1.solid && top1.bounce > bounce) bounce = top1.bounce;
        if (top2.solid && top2.bounce > bounce) bounce = top2.bounce;
        if (bottom1.solid && bottom1.bounce > bounce) bounce = bottom1.bounce;
        if (bottom2.solid && bottom2.bounce > bounce) bounce = bottom2.bounce;
        
        player.vel.y *= -bounce || 0;

        if ((bottom1.solid || bottom2.solid) && !tile.jump) {
            player.on_floor = true;
            player.can_jump = true;
			booles.saltando = false;
        }
        
    }

    // adjust camera

    var c_x = Math.round(player.loc.x - this.viewport.x/2);
    var c_y = Math.round(player.loc.y - this.viewport.y/2);
    var x_dif = Math.abs(c_x - camera.x);
    var y_dif = Math.abs(c_y - camera.y);
	
	if(player.stats.vidaActual < 1){
		luchando = false;
	}
    
    if(x_dif > 5) {
        
        var mag = Math.round(Math.max(1, x_dif * 0.1));
    
        if(c_x != camera.x) {
            if(!luchando){
				camera.x += c_x > camera.x ? mag : -mag;
			}
            if(this.limit_viewport) {
                
                camera.x = 
                    Math.min(
                        this.current_map.width_p - this.viewport.x + this.tile_size,
                        camera.x
                    );
                
                camera.x = 
                    Math.max(
                        0,
                        camera.x
                    );
            }
        }
    }
    
    if(y_dif > 5) {
        
        var mag = Math.round(Math.max(1, y_dif * 0.1));
        
        if(c_y != camera.y) {
            
            camera.y += c_y > camera.y ? mag : -mag;
        
            if(this.limit_viewport) {
                
                camera.y = 
                    Math.min(
                        this.current_map.height_p - this.viewport.y + this.tile_size,
                        camera.y
                    );
                
                camera.y = 
                    Math.max(
                        0,
                        camera.y
                    );
            }
        }
    }
    
    if(this.last_tile != tile.id && tile.script) {
    
        eval(this.current_map.scripts[tile.script]);
    }
    
    this.last_tile = tile.id;
};

Clarity.prototype.update_player = function () {
	if (this.key.up) {
       // if (player.can_jump && player.vel.y > -this.current_map.vel_limit.y) {
		  if (player.can_jump) {
			player.can_jump = false;
			if(powerUp.saltos > 0){
				//player.vel.y -= this.current_map.movement_speed.jump;
				player.vel.y = -10;
			}				
			booles.saltando = true;
			player.on_floor = false;
			powerUp.saltos -= 1;
		}
    }else{
		booles.saltando = false;
	}

    if (this.key.left) {

        if (player.vel.x > -this.current_map.vel_limit.x)
            player.vel.x -= this.current_map.movement_speed.left;
    }
    if (this.key.right) {

        if (player.vel.x < this.current_map.vel_limit.x)
            player.vel.x += this.current_map.movement_speed.left;
    }

    this.move_player();
};

elegirColor = function (indice, jugador){
	var color;
	if(player.damage && indice != 0 && jugador){
		return "#FFFFFF";
	}
	switch(indice){
		case 0:
			color = "#00000000";
		break;
		case 1:
			color = colorContorno;
		break;
		case 2:
			if(player.stats.pelo){
				color = colorPelo;
			}else{
				color = colorsolido;
			}
		break;
		case 3:
			if(player.stats.piel){
				color = colorPiel;
			}else{
				color = colorsolido;
			}
		
		break;
		case 4:
			if(player.stats.poleron){
				color = colorPoleron;
			}else{
				color = colorsolido;
			}
		
		break;
		case 5:
			if(player.stats.lentes){
				color = colorLentes;
			}else{
				color = colorsolido;
			}
		
		break;
		case 6:
			if(player.stats.pantalon || !jugador){
				color = colorPantalon;
			}else{
				color = colorsolido;
			}
		
		break;
		case 7:
		color = '#FFD9AD';
		break;
		case 8:
		color = '#FFFFFF';
		break;
		case 9:
		color = '#2F762C';
		break;
		case 10:
		color = '#364052';
		break;
	}
	return color;
};



Clarity.prototype.update = function () {
    this.update_player();
	if(player.on_floor){
			powerUp.saltos = limites.maxSaltos;
	}
	if(!booles.saltando){
		player.can_jump = true;
	}


};

Clarity.prototype.draw = function (context) {

    this.draw_map(context, false);
	if(dianas.length > 0){
		dibujar_diana(context);
	}
    dibujar_jugador(context);
};

/* Setup of the engine */

window.requestAnimFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
    return window.setTimeout(callback, 1000 / 60);
  };


var game = new Clarity();
    game.set_viewport(canvas.width, canvas.height);
    game.load_map(map);

    /* Limit the viewport to the confines of the map */
    game.limit_viewport = true;





function comprobarDamage(){
	if(enemigos.size > 0 && frameTime && comprobarDmg){
		var spawn = respawnPlace[0];
		if(spawn){
			var key = "" + spawn.mapx + spawn.mapy;
			var enemyObj = enemigos.get(key);
			if(enemyObj){
				if(colision(enemyObj.enemX,enemyObj.enemY, player.screen.x, player.screen.y)){
				player.stats.factorVidaAct -= frameTime;
				if(player.stats.factorVidaAct < 0){
					player.stats.vidaActual -= 4 * player.stats.jugandoL * enemyObj.nivel;
					player.stats.factorVidaAct = Number(player.stats.factorVida);
					player.damage = true;
				}
				
			}
			}

		}

		
	}else if(enemigos.size < 1){
		comprobarDmg = false;
		cmpDisEne = false;
	}
	

}

var Loop = function() {


	
	var fps = 60,
    start = Date.now(),
    frameDuration = 1000 / fps,
    lag = 0;

	  var current = Date.now(),
		  elapsed = current - start;
	  start = current;
	  lag += elapsed;
	
//	ctx.beginPath();
	ctx.fillStyle = colorFondo;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
//	ctx.beginPath();
  	dianas =[];
  
	 game.update();
	 game.draw(ctx);
	 
	 if(enemigos.size > 0 && frameTime){
		 procesoEnemigo(enemigos,ctx);
	 }
	comprobarDamage();
	resetearSpawn();
	secciones = [];


		

	dibArt.forEach(function (value, key, mapaEntrante) {
		dibujar_presentacion(ctx, "#FFFFFF",value.x + map.tile_size/2 ,value.y, portePres);
	});
	

dibujar_niebla(ctx);
	
	if(frameTime){
		esperaTexto -= frameTime;
		var lugar = Math.round(player.loc.x / map.tile_size);
		if(player.on_floor && (lugar == 2 || lugar == 3)){
			if(esperaTexto < 0){
				var dispDmg2 =  new datoTxtVolatil("DEBO ENCONTRAR MI PANTALON PARA NO ESTAR FUELA DE LA LINEA DE MODA",player.screen.x,player.screen.y, colorFuente);
				textoVolatil.set(dispDmg2.id, dispDmg2);
				esperaTexto = Number(esperaT);
			}
		}
	}
dibujar_volatiles(ctx);
dibujar_vida(ctx);

	if(player.stats.vidaActual <1){
		luchando = false;
		game.load_map(map);
		player.stats.vidaActual = Number(player.stats.vidaTotal);
		camera.x = 0;
		camera.y = 0;
		inventario = new Map();
		reiniciarEnemigos();
		cmpDisEne = false;
	}
	if(mirax != undefined && miray != undefined){
		dibujarMira(ctx);
		if(selladores.disparo){
			comprobarDisparo();

		}
	  
		selladores.disparo = false;
	}


  lag += frameDuration;
  frameTime = lag / 1000;

  window.requestAnimFrame(Loop);
  
};

Loop();;