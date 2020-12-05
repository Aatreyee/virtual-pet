var dog,dogImg;
var happyDog,happyDogImg;
var database;
var foodS;
var foodStock;

function preload()
{
    dogImg=loadImage("images/dogImg.png");
    happyDogImg=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  database=firebase.database();
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale=0.2;
  var foodStock=database.ref("Food");
  foodStock.on("value",readStock);
  
}


function draw() {  
    background(46,139,87);
    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDogImg);
    }
    fill("white");
    stroke(4);
    text ("Note:Press up arrow to feed Drago Milk!! "  ,500,50);
    
    if (foodS!==undefined){
    textSize(18);
    fill(255);
    text("Food Remaining: "+foodS, width/2-100,450);
  }
  
    drawSprites();
  
}

function readStock(data){
    foodS=data.val();
}

function writeStock(x){
      if(x<=0){
        x=0;
      }else{
        x=x-1;
      }

    database.ref('/').update({
    Food:x
    });

}



