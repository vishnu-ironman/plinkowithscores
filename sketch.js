const World = Matter.World;
const Engine = Matter.Engine;
const Bodies = Matter.Bodies;

var engine,world;
var particles = [];
var plinkos = [];
var divisions = [];
var divisionHeight = 300;
var score = 0;
var count = 0;
var particle;
var gameState = "play";
var canvas;
var bg;
var music
function preload(){
bg = loadImage("p.jpg")
music = loadSound("disco.mp3")
}


function setup() {
  canvas = createCanvas(500,800);

  engine = Engine.create();
  world = engine.world
  
  
  ground = new Ground(250,793,800,3);
  

  for (var k = 5; k <= width; k = k + 81.75) {
    divisions.push(new Divisions(k, height - divisionHeight/2, 7, divisionHeight));
  }

  for (var j = 40;j <= width; j = j + 50) {
    plinkos.push(new Plinko(j,75));
}

for (var j = 15; j <= width - 10; j = j+50) {
    plinkos.push(new Plinko(j,175));
}

for (var j = 40; j <= width; j = j + 50) {
   plinkos.push(new Plinko(j,275));
}

for (var j = 15;j <= width - 10; j = j+50) {
  plinkos.push(new Plinko(j,375));
}

particle = new Particle(mouseX,1500,1500);

  music.loop();
  
}

function draw() {
  background(bg);
  Engine.update(engine);
  console.log(mouseX);
  textSize(30);
  fill("yellow");
  strokeWeight(2);
  stroke("black");
  text("SCORE = " + score + "/2500",15,40);
  text("TURNS = " + count + "/5",310,40);

  strokeWeight(1.5);
  text("100",265,520);
  text("100",183,520);
  text("200",103,520);
  text("200",347,520);
  text("500",20,520);
  text("500",430,520);
  
  ground.display();

  if (gameState === "end") {
    textSize(50);
    fill("violet");
    stroke("black");
     text("GAME OVER",100,240) ;
     text("press space to restart",50,350);
}
 
  for ( var i = 0; i < plinkos.length; i++) {
  
    plinkos[i].display();
  }

  if(particle!==null) {
    particle.display();

    if (particle.body.position.y > 760) {

      if ( particle.body.position.x > 0 && particle.body.position.x < 85  || particle.body.position.x > 415 && particle.body.position.x < 500 ) {

        score = score + 500;
        particle = null;
        if (count === 5){ 
          gameState = "end";
      }
      
      }
      else {
        if (particle.body.position.x < 330 && particle.body.position.x > 165) {
          score = score + 100;
          particle = null;
          if (count===5){
            gameState = "end";
          } 
        } else {
          if (particle.body.position.x < 410 && particle.body.position.x > 335 || particle.body.position.x > 90 && particle.body.position.x < 165) {

            score = score + 200;
            particle = null;
            if (count===5) {
              gameState = "end";
          }
          }
        }
      }
    }
    
  }

  for (var j = 0; j < particles.length; j++) {
    particles[j].display();
  }

  for (var k = 0; k < divisions.length;k++) {
    divisions[k].display();
  }

  if (count === 5 &&  particle.body.position.y > 520){ 
    gameState = "end";
}

  
  }

  

function mousePressed() {
  if (gameState!=="end" && count < 5) {
    count = count+1;
    particle = new Particle(mouseX,10,10);
  }

  
}

function keyPressed(){
  if(keyCode === 32  && gameState =="end" ){
      gameState = "start";
      count = 0;
      score = 0;
  }
}