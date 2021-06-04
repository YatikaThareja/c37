class Game{
constructor(){}
    getState(){
    var gameStateref=db.ref('gameState');
    gameStateref.on("value",function(data){
        gameState=data.val();

    })
    }
    update(state){
        db.ref("/").update({
            gameState:state
        })
    }
    async start(){
        if (gameState===0){
            player=new Player();
            var playerCountRef=await db.ref("playerCount").once("value");
            if (playerCountRef.exists()){
                playerCount=playerCountRef.val();
                player.getCount();
            }
            
            form=new Form();
            form.display();
        }
        car1=createSprite(100,200);
        car2=createSprite(300,200);
        car3=createSprite(500,200);
        car4=createSprite(700,200);
        cars=[car1,car2,car3,car4];

    }
    play(){
        form.hide();
       // textSize(30);
       // text("GAME START",120,100);
        Player.getPlayerInfo();
        console.log(allPlayers)
        if(allPlayers!==undefined){
            var index=0;
            var x =0;
            var y;
            
           // var display_position=130;
            for (var i in allPlayers){
                index++
                x=x+200
                y=displayHeight-allPlayers[i].distance
                cars[index-1].x=x;
                cars[index-1].y=y;

                if(index===player.index){
                    cars[index-1].shapeColor="red"
                    camera.position.x=displayWidth/2;
                    camera.position.y=cars[index-1].y;

                }//else{
                   // cars[index-1].shapeColor="black"

                //}
               // display_position+=20;
                //textSize(15);
                //text(allPlayers[i].name+":"+allPlayers[i].distance,120,display_position);

            }
        }
        if(keyIsDown(UP_ARROW) && player.index!==null){
          player.distance+=50;
          player.update();
        }

        drawSprites();

    }

    
}
