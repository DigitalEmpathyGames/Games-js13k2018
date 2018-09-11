var existenEnemigos = true;
var enemigos = new Map();
var enemigosMuertos = new Map();
var textoVolatil = new Map();
var inventario = new Map();
var dibArt = new Map();
var	velVolatiles = 1;
var	limVolatil = 250;
var scrArt = "tomar_articulo();";
var luchando = false;              
var reinicio = false;
var comprobarDmg = false;
var cmpDisEne = false;
var bonoJefe = 4;
var esperaTexto = 0;
var esperaT = 3;
articulo = function(id,x,y){
	this.id=id;
	this.x=x;
	this.y=y;
};
var jefes = new Map([
	["594",
		{idArt:"569",
		art:"Pntln"}
	]
]);

var articulos = new Map([
	["569",
		"594"
	]
]);

var respawnPlace = [];
var frameTime;

var respawnInfo = [];

var gameWidth = 800;
var gameHeight = 600;
//var colorNiebla1 = "#736aa200";
//var colorNiebla2 = "#5f4d8bFF";
//var colorFondo = '#d3ccd4';

var colorNiebla2 = "#000000";
var colorNiebla1 = "#00000000";


var colorVida = '#00FF00';
var colorFVida = '#FF0000';
var colorDVida = '#FFFFFF';
var colorFuente = "#FFFFFF";
var colorMira = "#FFFFFF";
var colorContorno = "#000000";
var colorPelo = "#e89632";
var colorPiel = "#e6d4d6";
var colorLentes = "#CBCCFF";
var colorPoleron = "#555555";
var colorPantalon = "#FF0000";

var colorFondo = '#000000';
var colorsolido = '#221e15';
var luzEnemigo = '#555555';

var portePres = 25;

var grosorVida = 15;
var xVida = 25;
var yVida = 40;
var depVida = 2;
var facExp = 2;
var largoLinea = 20;
var sizeLetra = 10;
var espacioLinea = 1.5;
var espacioLetra = 0.2;

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = gameWidth;
canvas.height = gameHeight;

function datosDisparo (aObjetivo,objetivo){
	this.achunta = aObjetivo;
	this.objeto = objetivo;
};

var camera = {
        x: 0,
        y: 0
    };
var dianas = [];

var secciones = [];
function seccionObj (x,y,id){
	this.x = x;
	this.y = y;
	this.id = id;
};

var limites = {
	maxSaltos:1
};

var powerUp ={
	dobleSalto :false,
	saltos : limites.maxSaltos,
	velocidad : false,
	balas :10
};

var booles = {
	saltando : false
};

var player = {
	
		stats: {
			vidaActual: 20, 
			vidaTotal:20,
			factorVida : 0.2,
			factorVidaAct : 0,
			nivel: 1,
			exS: 50,
			exA: 0,
			facNvl: 20,
			jugandoL: 1,
			pantalon:false,
			poleron:false,
			pelo:false,
			piel:false,
			lentes:false,
			nivelSuperado:false
			
		},

        loc: {
            x: 0,
            y: 0
        },
        
        vel: {
            x: 0,
            y: 0
        },
		
        screen: {
            x: 0,
            y: 0
        },
        
        can_jump: true,
		damage: false,
		recoil: true,
		tiempoDmg: 0.2,
		tTDmg: 0.2
    };

var map = {

    tile_size: 50,

    /*
    
    Key vairables:
    
    id       [required] - an integer that corresponds with a tile in the data array.
    colour   [required] - any javascript compatible colour variable.
    solid    [optional] - whether the tile is solid or not, defaults to false.
    bounce   [optional] - how much velocity is preserved upon hitting the tile, 0.5 is half.
    jump     [optional] - whether the player can jump while over the tile, defaults to false.
    friction [optional] - friction of the tile, must have X and Y values (e.g {x:0.5, y:0.5}).
    gravity  [optional] - gravity of the tile, must have X and Y values (e.g {x:0.5, y:0.5}).
    fore     [optional] - whether the tile is drawn in front of the player, defaults to false.
    script   [optional] - refers to a script in the scripts section, executed if it is touched.
    
    */
    
    keys: [
        {id: 0, colour: '#333', solid: 0},
      //  {id: 1, colour: '#888', solid: 0},
		{id: 1, colour: colorFondo, solid: 0},
        {id: 2,colour: colorsolido,solid: 1,bounce: 0.0},
        {id: 3,colour: 'rgba(121, 220, 242, 0.4)',friction: {x: 0.9,y: 0.9},gravity: {x: 0,y: 0.1},jump: 1,fore: 1},
        {id: 4,colour: '#777',jump: 1},
        {id: 5,colour: '#E373FA',solid: 1,bounce: 1.1},
        {id: 6,colour: '#666',solid: 1,bounce: 0},
        {id: 7,colour: '#73C6FA',solid: 0,script: 'change_colour'},
        {id: 8,colour: '#FADF73',solid: 0,script: 'next_level'},
        {id: 9,colour: '#C93232',solid: 0,script: 'death'},
        {id: 10,colour: '#221e15',solid: 1},
        {id: 11,colour: '#0FF',solid: 0,script: 'unlock'},
		{id: 12,colour: colorsolido,solid: 0,script: 'spike'},
		{id: 13,colour: colorsolido,solid: 0,script: 'spike'},
		{id: 14, colour: colorFondo, solid: 0},
		{id: 15, colour: '#FADF73', solid: 0},
		{id: 16, colour: colorFondo, solid: 0, script: 'cerrar'},
		{id: 99, colour: colorFondo, solid: 0, script: 'getArt'}
    ],

    /* An array representing the map tiles. Each number corresponds to a key */
    data: [
[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 
[2, 2, 1, 13, 13, 13, 1, 1, 1, 13, 13, 1, 1, 1, 13, 1,1, 1, 13, 13, 13, 13, 13, 1, 1, 1, 1, 13, 13, 13, 1, 1,1, 13, 13, 13, 1, 1, 1, 1, 1, 13, 13, 1, 1, 1, 2, 2,2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2], 
[2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 2, 2,2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2], 
[2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2,2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2], 
[2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 13, 13, 13, 1, 1, 1, 1, 1, 1, 1, 2, 2,2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 1, 1, 2, 2], 
[2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2,2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2], 
[2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2,2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2], 
[2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 13, 1, 1, 1, 2, 10, 10,10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2], 
[2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 2, 2, 1, 1, 15, 1, 1, 1, 12, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 10,10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2], 
[2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 12, 1, 1, 1, 1, 1, 1, 10, 10,10, 1, 1, 1, 1, 1, 1, 1, 99, 1, 1, 1, 1, 1, 2, 2], 
[2, 2, 2, 2, 2, 2, 2, 12, 12, 12, 2, 2, 2, 2, 2, 2,2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 
[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2] 
    ],

    /* Default gravity of the map */
    
	// gravedad hacia el X e Y del canvas
	
    gravity: {
        x: 0,
        y: 0.5
    },
    
    /* Velocity limits */

	//combinado con movement_speed. el personaje s emovera mas rapido
    vel_limit: {
        x: 22,
        y: 16
    },

    /* Movement speed when the key is pressed */
    
    movement_speed: {
        jump: 10,
        left: 0.6,
        right: 0.3
    },
    
    /* The coordinates at which the player spawns and the colour of the player */
	// Donde en el canvas aparece el personaje
    player: {
        x: 3,
        y: 2,
        colour: '#FF9900'
    },
    
    /* scripts refered to by the "script" variable in the tile keys */

		//Textos que aparecen
    scripts: {
        /* you can just use "this" instead of your engine variable ("game"), but Codepen doesn't like it */
        change_colour: 'game.player.colour = "#"+(Math.random()*0xFFFFFF<<0).toString(16);',
        next_level: 'alert("Yay! You won! Reloading map.");game.load_map(map);',
        death: 'alert("You died!");game.load_map(map);',
		unlock: 'game.current_map.keys[10].solid = 0;game.current_map.keys[10].colour = "#000000";',
		spike: 'player.stats.vidaActual -= player.stats.vidaTotal / 2;',
		cerrar: 'game.current_map.keys[10].solid = 1;game.current_map.keys[10].colour = "#221e15";game.current_map.keys[14].id =1;',
		getArt: scrArt
    }
};

var movEnemigo = map.tile_size;

var caracter = new Map(
[

	["+", [
        [0,0,0],
        [0,1,0],
        [1,1,1],
        [0,1,0],
        [0,0,0]
    ]],
	["-", [
        [0,0,0],
        [0,0,0],
        [1,1,1],
        [0,0,0],
        [0,0,0]
    ]],
	[" ", [
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]],
	["0", [
        [1,1,1],
        [1,0,1],
        [1,0,1],
        [1,0,1],
        [1,1,1]
    ]],
	["1", [
        [0,1,1],
        [0,0,1],
        [0,0,1],
        [0,0,1],
        [0,0,1]
    ]],
	["2", [
        [1,1,1],
        [0,0,1],
        [1,1,1],
        [1,0,0],
        [1,1,1]
    ]],
	["3", [
        [1,1,1],
        [0,0,1],
        [1,1,1],
        [0,0,1],
        [1,1,1]
    ]],
	["4", [
        [1,0,1],
        [1,0,1],
        [1,1,1],
        [0,0,1],
        [0,0,1]
    ]],
	["5", [
        [1,1,1],
        [1,0,0],
        [1,1,1],
        [0,0,1],
        [1,1,1]
    ]],
	["6", [
        [1,1,1],
        [1,0,0],
        [1,1,1],
        [1,0,1],
        [1,1,1]
    ]],
	["7", [
        [1,1,1],
        [0,0,1],
        [0,0,1],
        [0,0,1],
        [0,0,1]
    ]],
	["8", [
        [1,1,1],
        [1,0,1],
        [1,1,1],
        [1,0,1],
        [1,1,1]
    ]],
	["9", [
        [1,1,1],
        [9,0,1],
        [9,9,1],
        [0,0,1],
        [0,0,1]
    ]],
	["A", 	[
        [1,1,1],
        [1,0,1],
        [1,1,1],
        [1,0,1],
        [1,0,1]
    ]],
	["B", [
        [1,1,1],
        [1,0,1],
        [1,1,0],
        [1,0,1],
        [1,1,1]
    ]],
	["C", [
        [1,1,1],
        [1,0,0],
        [1,0,0],
        [1,0,0],
        [1,1,1]
    ]],
	["D", [
        [1,1,0],
        [1,0,1],
        [1,0,1],
        [1,0,1],
        [1,1,0]
    ]],
	["E", [
        [1,1,1],
        [1,0,0],
        [1,1,0],
        [1,0,0],
        [1,1,1]
    ]],
	["F", [
        [1,1,1],
        [1,0,0],
        [1,1,0],
        [1,0,0],
        [1,0,0]
    ]],
	["G", [
        [1,1,1],
        [1,0,0],
        [1,0,0],
        [1,0,1],
        [1,1,1]
    ]],
	["H", [
        [1,0,1],
        [1,0,1],
        [1,1,1],
        [1,0,1],
        [1,0,1]
    ]],
	["I", [
        [1,1,1],
        [0,1,0],
        [0,1,0],
        [0,1,0],
        [1,1,1]
    ]],
	["J", [
        [0,0,1],
        [0,0,1],
        [0,0,1],
        [1,0,1],
        [1,1,1]
    ]],
	["K", [
        [1,0,1],
        [1,0,1],
        [1,1,0],
        [1,0,1],
        [1,0,1]
    ]],
	["L", [
        [1,0,0],
        [1,0,0],
        [1,0,0],
        [1,0,0],
        [1,1,1]
    ]],
	["M", [
        [1,0,1],
        [1,1,1],
        [1,0,1],
        [1,0,1],
        [1,0,1]
    ]],
	["N", [
        [1,1,1],
        [1,0,1],
        [1,0,1],
        [1,0,1],
        [1,0,1]
    ]],
	["O", [
        [1,1,1],
        [1,0,1],
        [1,0,1],
        [1,0,1],
        [1,1,1]
    ]],
	["P", [
        [1,1,1],
        [1,0,1],
        [1,1,1],
        [1,0,0],
        [1,0,0]
    ]],
	["Q", [
        [1,1,1],
        [1,0,1],
        [1,0,1],
        [1,1,1],
        [0,0,1]
    ]],
	["R", [
        [1,1,1],
        [1,0,1],
        [1,1,0],
        [1,0,1],
        [1,0,1]
    ]],
	["S", [
        [1,1,1],
        [1,0,0],
        [1,1,1],
        [0,0,1],
        [1,1,1]
    ]],
	["T", [
        [1,1,1],
        [0,1,0],
        [0,1,0],
        [0,1,0],
        [0,1,0]
    ]],
	["U", [
        [1,0,1],
        [1,0,1],
        [1,0,1],
        [1,0,1],
        [1,1,1]
    ]],
	["V", [
        [1,0,1],
        [1,0,1],
        [1,0,1],
        [1,0,1],
        [0,1,0]
    ]],
	["W", [
        [1,0,1,0,1],
        [1,0,1,0,1],
        [1,0,1,0,1],
        [1,0,1,0,1],
        [0,1,0,1,0]
    ]],
	["X", [
        [1,0,1],
        [1,0,1],
        [0,1,0],
        [1,0,1],
        [1,0,1]
    ]],
	["Y", [
        [1,0,1],
        [1,0,1],
        [1,1,1],
        [0,1,0],
        [0,1,0]
    ]],
	["Z", [
        [1,1,1],
        [0,0,1],
        [0,1,0],
        [1,0,0],
        [1,1,1]
    ]]
]
);

escribir = function(ctx, frase, x, y, colorTexto){
	var lineas = Math.ceil(frase.length / largoLinea);
	var xLinea,yLinea;
	yLinea = y - ( (3 * sizeLetra * lineas) / 2);
	for(i = 0; i< lineas; i++){
		
		var lineaS ="";
		if(i < (lineas - 1)){
			lineaS = frase.substring(largoLinea * i,largoLinea * (i + 1));
		}else{
			lineaS = frase.substring(largoLinea * i);
		}	
		xLinea = x - (lineaS.length * sizeLetra) / 2;
		var letras = lineaS.split("");
		for(iLetra = 0; iLetra < letras.length; iLetra ++){
			var letra = caracter.get(letras[iLetra]);
			for(yC = 0;yC < letra.length; yC++){
				var tamY;
				tamY = sizeLetra / letra.length;
				for(xC = 0; xC < letra[yC].length;xC ++){
					var color;
					var tamX;
					tamX = sizeLetra / letra[yC].length;
					
						if(letra[yC][xC] == 0){
							color = colorFuente + "00";
						}else{
							color = colorTexto;
						}
					
						ctx.fillStyle = color;
						ctx.fillRect(xLinea + (iLetra * sizeLetra) + (xC * tamX) , yLinea + (yC * tamY), tamX, tamY);
					
				}
				
			}
			xLinea += sizeLetra * espacioLetra;	
		}
		yLinea += sizeLetra * espacioLinea;		
		
		
		
	}
}

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

        function matrix(m){
            return m;
        };
		
        function evaluate(x){
            return x;
        };

var sprites = [
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0],
        [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
        [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
        [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 3, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
        [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 3, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
        [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 3, 3, 1, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
        [0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 2, 1, 3, 3, 1, 2, 2, 2, 2, 2, 2, 1, 3, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0],
        [0, 1, 2, 1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 1, 1, 3, 3, 3, 1, 2, 2, 1, 1, 1, 1, 3, 1, 3, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 0],
        [0, 2, 1, 2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 0, 1, 2, 0],
        [0, 1, 0, 1, 2, 2, 2, 2, 1, 1, 1, 5, 5, 5, 5, 1, 5, 1, 3, 3, 3, 3, 1, 5, 1, 5, 5, 5, 5, 1, 1, 1, 2, 2, 2, 2, 1, 0, 1, 0],
        [0, 0, 0, 1, 2, 2, 2, 2, 1, 1, 5, 5, 8, 5, 5, 8, 5, 1, 1, 1, 1, 1, 1, 5, 5, 8, 5, 5, 8, 5, 1, 1, 2, 2, 2, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 2, 2, 2, 1, 1, 5, 8, 5, 5, 8, 5, 5, 1, 3, 3, 3, 3, 1, 5, 8, 5, 5, 8, 5, 5, 1, 1, 2, 2, 2, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 2, 2, 2, 1, 1, 8, 5, 5, 8, 5, 5, 5, 1, 3, 3, 3, 3, 1, 8, 5, 5, 8, 5, 5, 5, 1, 1, 2, 2, 2, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 5, 5, 5, 5, 5, 5, 5, 1, 3, 3, 3, 3, 1, 5, 5, 5, 5, 5, 5, 5, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 2, 1, 2, 2, 2, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 2, 2, 2, 1, 2, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 1, 0, 1, 2, 2, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 2, 2, 1, 0, 1, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 1, 2, 1, 0, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 0, 1, 2, 1, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 4, 4, 4, 1, 3, 3, 3, 3, 1, 4, 4, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 4, 1, 4, 4, 1, 1, 1, 1, 4, 4, 1, 4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 3, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 3, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 1, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 6, 6, 6, 6, 1, 1, 6, 6, 6, 6, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 6, 6, 6, 1, 0, 0, 1, 6, 6, 6, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 6, 6, 6, 1, 0, 0, 1, 6, 6, 6, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
];


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





