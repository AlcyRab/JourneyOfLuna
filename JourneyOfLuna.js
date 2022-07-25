window.addEventListener('load', function(){
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	canvas.width = 800;//800 640
	canvas.height = 600;//600 480
	let enemies = [];
	let score = 0;
	let gameOver = false;

	class InputHandler{
		constructor(){
			this.keys = [];
			window.addEventListener("keydown", e => {
				if((	e.key === "s" ||
						e.key === "w" ||
						e.key === "a" ||
						e.key === "d" ||
						e.key === "e" ||
						e.key === "f" ||
						e.key === " ")
						&& this.keys.indexOf(e.key) === -1){
					this.keys.push(e.key);
				}
			});

			window.addEventListener("keyup", e => {
				if(		e.key === "s" || 
						e.key === "w" || 
						e.key === "a" || 
						e.key === "d" ||
						e.key === "e" ){
						//e.key === "f"){ 
						//e.key === " "){
					this.keys.splice(this.keys.indexOf(e.key), 1);
				}
			});
		}
	}

	class Player{
		constructor(gameWidth, gameHeight){
			this.gameWidth = gameWidth;
			this.gameHeight = gameHeight;
			this.width = 100;
			this.height = 155;
			this.x = 10;
			this.y = gameHeight - (this.height+ 40);
			this.image = document.getElementById("playerImage");
			this.frameX = 0;
			this.frameY = 0;
			this.frameMax = 7;
			this.fps = 20;
			this.frameTimer = 0;
			this.frameInterval = 1000/this.fps
			this.speedX = 0;
			this.speedY = 0;
			//Jump variables and attack
			this.vy = 0;
			this.pos = 0;
			//this.gravity = 1;
			this.jump = false;
			this.attack = false;
		}

		draw(context){
			context.fillStyle = "white";
			context.strokeRect(this.x+this.width/4, this.y+this.height-30, this.width/2, this.height-130);
			//context.strokeStyle = "white";
			//context.beginPath();
			//context.arc(this.x + this.width/2, this.y + this.height - 5, this.width/4, 0, Math.PI, true);
			//context.stroke();
			context.drawImage(this.image, (this.frameX * this.width), (this.frameY * this.height), this.width, this.height, this.x, this.y, this.width, this.height);
		}

		update(input, deltaTime, enemies){
			enemies.forEach(enemy =>{
				if(		(this.x+this.width/4) < enemy.x + (enemy.width/1.5) &&
					 	(this.x+this.width/4) + (this.width/2) > enemy.x &&
					 	(this.y+this.height-30) < (enemy.y+enemy.height-30) + (enemy.height-150) &&
					 	(this.y+this.height-30) + (this.height-130) > (enemy.y+enemy.height-30)){
					gameOver = true;
				}
			})

			this.x += this.speedX;
			this.y += this.speedY + this.vy;
			if(input.keys.indexOf("d") > -1){
				this.speedX = 2.5;
				this.frameY = 0;
				if (this.frameTimer > this.frameInterval){
					if (this.frameX < this.frameMax) {this.frameX++}//this.rep = 1;}
					else {this.frameX = 0;}
					this.frameTimer = 0;
				}

				else{
				this.frameTimer += deltaTime;
				}
			}
			else if(input.keys.indexOf("a") > -1){
				this.speedX = -2.5;
				this.frameY = 1;
				if (this.frameTimer > this.frameInterval){
					if (this.frameX < this.frameMax) {this.frameX++}//this.rep = 1;}
					else {this.frameX = 0;}
					this.frameTimer = 0;	
				}

				else{
				this.frameTimer += deltaTime;
				}
			}
			else{
				this.speedX = 0;
			}

			if(input.keys.indexOf("w") > -1){
				this.speedY = -2.5;
				if (input.keys.indexOf("d") > -1 || input.keys.indexOf("a") > -1){}
				
				else if (this.frameTimer > this.frameInterval){
					if (this.frameX < this.frameMax) {this.frameX++}//this.rep = 1;}
					else {this.frameX = 0;}
					this.frameTimer = 0;	
				}

				else{
				this.frameTimer += deltaTime;
				}
			}
			
			else if(input.keys.indexOf("s") > -1){
				this.speedY = 2.5;
				if (input.keys.indexOf("d") > -1 || input.keys.indexOf("a") > -1){}
				else if (this.frameTimer > this.frameInterval){
					if (this.frameX < this.frameMax) {this.frameX++}//this.rep = 1;}
					else {this.frameX = 0;}
					this.frameTimer = 0;	
				}

				else{
				this.frameTimer += deltaTime
				}
			}
			else{
				this.speedY = 0;
			}

			//Trigger Attack
			if(input.keys.indexOf("f") > -1){
				if (this.attack == false){this.frameX = 0}
				this.frameY = 2;
				this.width = 150;
				this.attack = true;

				if (this.frameTimer > this.frameInterval){
					if (this.frameX < 3) {this.frameX++}//this.rep = 1;}
					else {
						this.frameX = 0;
						this.frameY = 0;
						this.attack = false;
						this.width = 100;
						input.keys.splice(input.keys.indexOf(" "), 1);
					}
					this.frameTimer = 0;
				}

				else{
				this.frameTimer += deltaTime;
				}
				//Attack();	
			}
			
				 

			//Jump function
			if (this.jump == false && input.keys.indexOf(" ") > -1){
				input.keys.splice(input.keys.indexOf(" "), 1);
				this.pos = this.y;
				this.vy = -15;
				this.jump = true;
			}

			if (this.jump == true && this.y != this.pos){
				this.vy += 1;
				if (this.y >= this.pos){
					this.y = this.pos;
					this.vy = 0;
					this.jump = false;
				}
			}

			if(this.y < 235 && this.jump == false){
				this.y = 235;
			}

			if(this.x < 0){
				this.x = 0;
			}

			if(this.x > this.gameWidth - player.width){
				this.x = this.gameWidth - player.width;
			}
	
			if(this.y > this.gameHeight - player.height){
				this.y = this.gameHeight - player.height;
			}

		}
		
	}

	class Background{ 
		constructor(gameWidth, gameHeight){
			this.gameWidth = gameWidth;
			this.gameHeight = gameHeight;
			this.image = document.getElementById("backgroundImage");
			this.x = 0;
			this.y = 0;
			this.width = 3200;
			this.height = 600;
			this.speed = 5;
		}

		draw(context){
			context.drawImage(this.image, this.x, this.y, this.width, this.gameHeight);
			context.drawImage(this.image, this.x + this.width, this.y, this.width*(this.gameHeight/this.height), this.gameHeight);
		}

		update(){
			this.x -= this.speed;
			if (this.x < (-this.width/*+this.gameWidth*/)){
				this.x = 0;
			}
		}
	}
	class Screen{
		constructor(gameWidth, gameHeight){
			this.gameWidth = gameWidth;
			this.gameHeight = gameHeight;
			this.image = document.getElementById("screen");
			this.x = 0;
			this.y = 0;
			this.width = 3200;
			this.height = 600;
			this.speed = 0;
		}

		draw(context){
			context.drawImage(this.image, this.x, this.y, this.width, this.gameHeight);
			context.drawImage(this.image, this.x + this.width, this.y, this.width*(this.gameHeight/this.height), this.gameHeight);
		}

		update(){
			this.x -= this.speed;
			if (this.x < (-this.width/*+this.gameWidth*/)){
				this.x = 0;
			}
		}
	}

	class Enemy{
		constructor(gameWidth, gameHeight){
			this.gameWidth = gameWidth;
			this.gameHeight = gameHeight;
			this.width = 100;
			this.height = 180;
			this.x = gameWidth;
			this.y = player.y -25;
			this.image = document.getElementById("enemyImage");
			this.frameX = 0;
			this.frameMax = 7;
			this.fps = 10;
			this.frameTimer = 0;
			this.frameInterval = 1000/this.fps
			this.speed = 2 + Math.random()*10;
			this.markedForDeletion = false;
		}

		draw(context){
			context.drawImage(this.image, (this.frameX * this.width), 0, this.width, this.height, this.x, this.y, this.width, this.height);
			context.strokeRect(this.x, this.y+this.height-30, this.width/1.5, this.height-150);
			//context.beginPath();
			//context.arc(this.x + this.width/2, this.y + this.height - 5, this.width/4, 0, Math.PI, true);	
			//context.stroke()
		}
		update(deltaTime){
			this.x -= this.speed;
			if (this.y > (player.y-25) && this.frameTimer > this.frameInterval){
				this.y -= this.speed;
			}
			else if(this.y < (player.y-25) && this.frameTimer > this.frameInterval){
				this.y += this.speed;
			}
			else{

			}
			
			if (this.frameTimer > this.frameInterval){
					if (this.frameX < this.frameMax) {this.frameX++}//this.rep = 1;}
					else {this.frameX = 0;}
					this.frameTimer = 0;
				}

				else{
				this.frameTimer += deltaTime;
				}
			if( this.x < 0- this.width){
				this.markedForDeletion = true
				score += 200;
			};
		}
	}

	const input = new InputHandler();
	const player = new Player(canvas.width, canvas.height);
	const citybackground = new Background(canvas.width, canvas.height);
	const screen = new Screen(canvas.width, canvas.height);

	function handleEnemies(deltaTime){
		if (enemyTimer > enemyInterval + randomEnemyInterval){
			enemies.push(new Enemy(canvas.width, canvas.height));
			randomEnemyInterval = Math.random() * 2000 + 500;
			enemyTimer = 0;
		}else {
			enemyTimer +=deltaTime;
		}

		enemies.forEach(enemy =>{
			enemy.draw(ctx);
			enemy.update(deltaTime);
			return (enemy.y)
		})
		enemies = enemies.filter(enemy => !enemy.markedForDeletion);
	}

	function displayStatusText(context){
		context.font = "40px Helvetica";
		context.fillStyle = "black";
		context.fillText("Score: "+ score, 20, 50);
		context.fillStyle = "white";
		context.fillText("Score: "+ score, 22, 52);

		if (gameOver) {
			context.font = "40px Helvetica";
			context.fillStyle = "black";
			context.fillText("Game Over!", 300, 100);
			context.fillStyle = "white";
			context.fillText("Game Over!", 302, 102);

		}
	}

	/*function Attack(){
		this.image = document.getElementById("playerImage");
	}*/

	let lastTime = 0;
	let enemyTimer = 0;
	let enemyInterval = 2000;
	let randomEnemyInterval = Math.random() * 1000 + 500;

	function animate(timeStamp){
		const deltaTime = timeStamp - lastTime;
		lastTime = timeStamp;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		citybackground.draw(ctx);
		citybackground.update();

		if(!player.front){
			player.draw(ctx);
			player.update(input, deltaTime, enemies);
			handleEnemies(deltaTime);
		}else{
			handleEnemies(deltaTime);
			player.draw(ctx);
			player.update(input, deltaTime, enemies);
		}
		
		screen.draw(ctx);
		screen.update();

		displayStatusText(ctx);

		if(!gameOver) {requestAnimationFrame(animate);}
	}

	animate(0);
})