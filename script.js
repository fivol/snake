var start1 = false;
var x = 4
var x1 = 4
var y = []
var y1 = []
var math
var math1
var course = 'right';
var right = true
var left = true
var down = true
var up = true
var bal = 0
var inter
var speed = 0
var side = 10
var ax = 0
var ax1 = 0
var CountP = 30
var GA;
var iP = 0
var maxMove = 12
var iMove = 0
var iGeneration = 1
var velosity = 150
var pastBal = 0
var show =true;
var data = [
	[0,0]
];
var plus=0;
var g
var best=0;
var water=[];

function fitness() {
	iMove++
	
	var l=[0,0,0,0]
	if (x1 > ax1) l[0]=1
	else if(x1<ax1)l[2]=1
	if (x > ax) l[1]=1
	else if (x < ax) l[3] = 1
	//proverka na nedostupnost
	var grid=[]
	// var temp;
	// temp=[0,0,0,0,0,0]
	for (var i = 0; i < side; i++){ grid[i]=[0,0,0,0,0,0,0,0,0,0];}//alert(grid)}
	for (var i = 0; i < y.length; i++){grid[y[i]][y1[i]]=1;}
	var du=0;var dr=0;var dl=0;var dd=0;
	if(grid[x][norm(x1+1)])dd=1;
	if(grid[x][norm(x1-1)])du=1;
	if(grid[norm(x+1)][x1])dr=1;
	if(grid[norm(x-1)][x1])dl=1;
	if(grid[x][x1]&&iMove>3)killer()
	grid[x][x1]=1
	// grid[ax,ax1]=2;
	var d=[du,dl,dd,dr];
	water=[]
	// alert(2)
	dd=[x,norm(x1+1)]
	du=[x,norm(x1-1)]
	dr=[norm(x+1),x1]
	dl=[norm(x-1),x1]
	// water=[du,dd]
	// water.pop1(1) 
	var d1=[du,dl,dd,dr];
	// alert(d1)
	// alert(d)
	for (var a = 0; a < 4; a++) {
		if(d[a]==0){
			water=[d1[a]]
			var t=1
			var c=0
			while(t&&c<20){
				c++;
				var i=water.length-1
				while (i>=0	) {
					var q=[norm(water[i][0]+1),water[i][1]]
					var q1=[norm(water[i][0]-1),water[i][1]]
					var q2=[water[i][0],norm(water[i][1]+1)]
					var q3=[water[i][0],norm(water[i][1]-1)]
					var qq=[0,0,0,0]
					for (var k = 0; k < water.length; k++) {
						if(water[k][0]==q[0]&&water[k][1]==q[1])qq[0]=1;
						if(water[k][0]==q1[0]&&water[k][1]==q1[1])qq[1]=1;
						if(water[k][0]==q2[0]&&water[k][1]==q2[1])qq[2]=1;
						if(water[k][0]==q3[0]&&water[k][1]==q3[1])qq[3]=1;
					}

					// alert(qq)
					if(!qq[0])water.push(q)
					if(!qq[1])water.push(q1)
					if(!qq[2])water.push(q2)
					if(!qq[3])water.push(q3)
					pop1(i)
					i--;
				}
				// alert(water)
				var i=0
				while(i<water.length){
					if(grid[water[i][0]][water[i][1]]==1){;pop1(i)}else{i++;} }

				for (var i = 0; i < water.length; i++) {
					if(water[i][0]%9==0||water[i][1]%9==0){t=0;}
				}
				if(water.length>150){alert(a)}
			}
			// alert(c)
			d[a]=t
		}
	}
	// alert(d)

	document.getElementById("fitness").innerHTML =  d[0]+' '+d[1]+' '+d[2]+' '+d[3];
	var r=0;
	for (var i = 0; i < 4; i++){
		if(l[i]&&d[i])l[i]=0
		if(l[i]==0)r++
	}
	if(r==4)
		for (var i = 0; i < 4; i++) 
			if(d[i]==0) l[i]=1

	
	if (l[0] > 0.5) {
		turn(37)
	} else if (l[1] > 0.5) {
		turn(38)
	} else if (l[2] > 0.5) {
		turn(39)
	} else if (l[3] > 0.5) {
		turn(40)
	}//turn(39)
	//37 up 38 left 39 dowm 40 right
	if ((iMove > maxMove && iP < CountP)) {
		//killer()
	}
}
function norm(x){
	return (x+side)%side
}
function plot_update() {
	var x = iGeneration; // current time
	var y = bal - pastBal
	pastBal = bal
	plus++;
	data.push([plus,bal]);
	g.updateOptions({
		'file': data
	});//iMove=0;
}
function pop1(a) {
	for (var i = a; i < water.length-1; i++) {
		water[i]=water[i+1]
	}
	water.pop()
}
function plot() {
	g = new Dygraph(document.getElementById("div_g"), data, {
	
		//labels: ['x', 'A', 'B' ],
          connectSeparatedPoints: true,
          drawPoints: true
	});

}

function killer() {
	iGeneration++;
	// setCell(x,x1,5)
	setCell(y[0],y1[0],6)
	// alert('game over')
	//alert("game over")
	clearMatrix()
	if(GA.Population[iP].fitness>best)best=GA.Population[iP].fitness; y = []
	y1 = []
	tale();
	eat();
	iP++
	plot_update()
	bal=0;
	iMove = 0
	if (iP == CountP) {
		GA.evolvePopulation() 
		iGeneration++
		iP = 0
		plot_update()
		best=0
	}
}

function createMatrix(length, width) {
	var matrix = document.getElementById('matrix');
	for (var i = 0; i < length; i++) {
		var div1 = document.createElement('div');
		div1.className = 'name';
		matrix.appendChild(div1);

		for (var a = 0; a < width; a++) {
			var div = document.createElement('div');
			div.className = 'name';
			div1.appendChild(div);
		}
	}
}


function setCell(col, row, val) {
	if(show){
	var matrix = document.getElementById('matrix');
	var cell1 = matrix.children[col];
	var cell = cell1.children[row];

	if (val == 1)
		cell.style.backgroundColor = '#98FB98';
	else if (val == 5)
		cell.style.backgroundColor = '#98FB22';
	else if (val == 6)
		cell.style.backgroundColor = '#984A22';
	else if (val == 2)
		cell.style.background = 'url(img/3.png)';
	else if (val == 0)
		cell.style.backgroundColor = 'transparent';
	else if (val == 1024)
		cell.style.background = '';
}}

function clearMatrix() {
	for (var i = 0; i < side; i++) {
		for (var a = 0; a < side; a++) {
			setCell(i, a, 1024)
		}
	}
}

//ñîçäàíèå õâîñòà
function tale() {
	y.push(x)
	y.push(x)
	y1.push(x1)
	y1.push(x1)
}
//òåëåïîðò
function border() {
	x=(x+side)%side;
	x1=(x1+side)%side
}
//âûáîð íàïðàâëåíèÿ
function course1() {
	if ((course == 'right') && (right)) x1++
		if ((course == 'left') && (left)) x1--
			if ((course == 'down') && (down)) x++
				if ((course == 'up') && (up)) x--
}
//ñîçäàíèå åäû
function eat() {
	// plot_update();
	var k=1;
	// if(y.length>=side*side-2)killer()
	while(k==1){
		math = Math.floor(Math.random() * side)
		math1 = Math.floor(Math.random() * side)
		k=0;
		for (var i = 0; i < y.length; i++) {
			if (y[i] == math && y1[i] == math1) k=1;
		}if(x==math && x1==math1)k=1
	}
	ax = math
	ax1 = math1
	setCell(math, math1, 2);
}
//ïðîâåðêà (ñúåë ëè åäó)
function eatok() {
	if ((x == math) && (x1 == math1)) {
		//speed++
		setCell(math, math1, 1024);
		setCell(math, math1, 5);
		bal++
		//iMove = 0
		GA.Population[iP].fitness++ 
		document.getElementById('bal').innerHTML = bal + ' б'
		eat()
			y.push(y[y.length-1])
			y1.push(y1[y1.length-1])
	}
}
//ñêîðîñòíîé ðåæèì

//ïðîâóðêà íà êîíåö èãðû
function over() {
	for (var i = 0; i < y.length; i++) {
		if ((y[i] == x) && (y1[i] == x1)) {
			alert('Game over')
			clearInterval(interval)
			clearInterval(inter1)
		}
	}
}
//äâèæåíèå
function move() {

	//ïîãàñèëè
	fitness()
	//setCell(x, x1, 0);
	// for (var i = 0; i < y.length; i++) {
	// 	setCell(y[i], y1[i], 0)
	// }
	//âûáðàëè êóðñ

	setCell(y[y.length-1], y1[y1.length-1], 0)
	for (var i = y.length - 1; i > 0; i--) {
		y[i] = y[i - 1]
		y1[i] = y1[i - 1]
	}
	y[0] = x
	y1[0] = x1
	course1()
	border()
		//ïðîâåðêè
		//çàæãëè
	setCell(x, x1, 5);
	setCell(y[0],y1[0], 1)
	// for (var i = 0; i < y.length; i++) {
	// setCell(y[i], y1[i], 1)
	// }
	eatok()
		//ïðîâåðêè
		///////////////////////////////////////////////////////////// over()
}
//óïðàâëåíèå êëàâèøàìè
function turn(keyCode) {
	if ((keyCode == 37) && (left)) {
		course = 'left'
			// right = false											
		left = true
		down = true
		up = true
	} else if ((keyCode == 38) && (up)) {
		course = 'up'
		right = true
		left = true
			// down = false
		up = true
	} else if ((keyCode == 39) && (right)) {
		course = 'right'
		right = true
			// left = false
		down = true
		up = true
	} else if ((keyCode == 40) && (down)) {
		course = 'down'
		right = true
		left = true
		down = true
			// up = false
	}
}
document.onkeydown = function(e) {
		var keyCode = e.keyCode;
		turn(keyCode)
	}
	//ñòàðò çìåéêè
function restart() {
	if (start1) {
		clearMatrix()
		clearInterval(interval)
		clearInterval(inter1)
		y = []
		y1 = []
		course = 'right';
		right = true
		left = true
		down = true
		up = true
		bal = 0
		speed = 0
			// createMatrix(20, 20)
		tale();
		eat();

		inter1 = setInterval(move, 200);
		// interval = setInterval(eatok, 10);
	} else {
		start1 = true;
		tale();
		eat();
		inter1 = setInterval(move, velosity);
		//interval = setInterval(eatok, 1);
	}

}

window.onload = function() {
	// alert(1)
	plot();
	GA = new GeneticAlgorithm(CountP, 3);
	GA.reset();	
	GA.createPopulation(); 
	createMatrix(side, side)
	restart()
	document.getElementById('button').onclick = function() {
		// alert(JSON.stringify(GA.population[iP].toJSON())) // alert()
	}
	document.getElementById('kill').onclick = function() {
		killer()
	}
	document.getElementById('set_speed').onclick = function() {
		velosity=parseInt(document.getElementById('speed').value)
		clearInterval(inter1)
		inter1 = setInterval(move, velosity)
	}
	document.getElementById('show').onclick = function() {
		clearMatrix();
		show=!show;
	}
}