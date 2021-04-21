const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;
var database;
var form;

function preload() {
    
    backgroundImg=loadImage(bg)
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(45, 305, 300, 170);

    stage = new Ground(600,Math.round(random(300,700)),300,30)

    box1 = new Box(600,30,250,100);
    box2 = new Box(600,90,250,100);
    
    pig1 = new Pig(980,40);
    pig3 = new Pig(810, 220);

    

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
    database=firebase.database();
    form=new Form();

}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    
    box2.display();
    box1.display();
    ground.display();
    pig1.display();
    pig1.score();
    

   
    pig3.display();
    pig3.score();
    

   

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display(); 
    form.display();   
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32  && bird.body.speed<1){
        bird.trajectory=[];
        gameState="onSling";
        Matter.Body.setPosition(bird.body,{x:200,y:50});
       slingshot.attach(bird.body);
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}