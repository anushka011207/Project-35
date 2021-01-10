//Create variables here
var database;
var dog, happyDog, dogImg, happyDogImg;
var foodS, foodStock;

function preload()
{
  //load images here
  dogImg = loadImage('images/Dog.png');
  happyDogImg = loadImage('images/happydog.png');
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250,250,30,30);
  dog.addImage(dogImg);

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)) {
    foodStock = foodStock-1;
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  //add styles here
  textSize(4);
  fill("white");
  stroke(1);
  text("Note: Press UP_ARROW key to feed the dog milk!", 100, 350);

}

function readStock(data)  {
  foodS=data.val();
}

function writeStock(x)  {

  if(x<=0)  {
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  });
}