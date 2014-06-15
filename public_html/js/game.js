Game= function(){
    this.players=[];//throw sauces
    this.gunners=[];//shooter
    this.ctx=null;
    this.theCanvas=null;
    this.currentGameState=ENUM.GAME_STATE.INIT;
    this.keyPressList={};
    this.isMouseDown=false;
    this.background={width:800,
        height:600,
        color:"#000000"
        };
    this.mouseX=this.background.width/2;
    this.mouseY=this.background.height/2;
};

Game.prototype.addPlayer= function(name){
    var newPlayer= new Player(name);
    this.players.push(newPlayer);
    return newPlayer;
}
Game.prototype.addGunner= function(name){
    var newGunner= new Gunner(this.background.width/2,this.background.height/2,
                                this.background.width/2,this.background.height);
    this.gunners.push(newGunner);
    return newGunner;
}
Game.prototype.drawBackground=function(){
    this.ctx.fillStyle = this.background.color;
    this.ctx.fillRect(0, 0, this.background.width, this.background.height);
    this.drawBorder();
}
Game.prototype.drawBorder=function(){
    this.ctx.strokeStyle="#FF0000";
    this.ctx.strokeRect(1,1,this.background.width-1,this.background.height-1);
}
Game.prototype.getContext=function(){
    this.theCanvas=document.getElementById("game");
    this.ctx= this.theCanvas.getContext("2d");
    this.ctx.height=this.theCanvas.height;
    this.ctx.width=this.theCanvas.width;
}
Game.prototype.registerKey=function(){
    var self=this;
    document.onkeydown = function(e){
      e=e?e:window.event;
      self.keyPressList[e.keyCode] = true;
   }
   document.onkeyup = function(e){
      e = e?e:window.event;
      self.keyPressList[e.keyCode] = false;
   };
}
Game.prototype.registerMouse=function(){
    document.addEventListener("mousemove",this.updateMousePosition.bind(this),false);
    document.addEventListener("mousedown",this.updateMouseDownClick.bind(this),false);
    document.addEventListener("mouseup",this.updateMouseUpClick.bind(this),false);
};

Game.prototype.updateMouseUpClick=function(evt){
    this.isMouseDown=false;
}
Game.prototype.updateMouseDownClick=function(evt){
    this.isMouseDown=true;
}
Game.prototype.updateMousePosition=function(evt){
    var rect = this.theCanvas.getBoundingClientRect();
    this.mouseX= evt.clientX - rect.left;
    this.mouseY= evt.clientY - rect.top;
    if (this.mouseY>this.background.height) this.mouseY=this.background.height;
    if (this.mouseX>this.background.width) this.mouseX=this.background.width;
};
Game.prototype.start= function(){
    this.getContext();
    this.registerKey();
    this.registerMouse();
    var newPlayer=this.addPlayer("player1");
    var newGunner=this.addGunner("gunner1");
    newPlayer.start();
    newGunner.start();
    this.switchGameState(ENUM.GAME_STATE.INIT);    
};
Game.prototype.update=function(){
    this.players.forEach(function(player){
        player.update();
    });
    this.gunners.forEach(function(gunner){
        gunner.update({mouseX:this.mouseX,mouseY:this.mouseY,
                        mouseDown:this.isMouseDown||this.keyPressList['13']
                        ,leftKey:this.keyPressList['37']||this.keyPressList['65']
                        ,rightKey:this.keyPressList['39']||this.keyPressList['68']});
    },this);
    if (this.currentGameState===ENUM.GAME_STATE.PLAY){
        this.checkCollision();
    }
};
Game.prototype.render=function(){
    var _ctx=this.ctx;//
    this.players.forEach(function(player){
        player.render(_ctx);
    });
    this.gunners.forEach(function(gunner){
        gunner.render(_ctx);
    });
};
Game.prototype.checkCollision=function(){
    this.gunners.forEach(function(gunner){
        this.players.forEach(function(player){
            gunner.shoot(player);
        },this);
    },this);
};
Game.prototype.switchGameState=function(newState){
    this.currentGameState=newState;
    switch (this.currentGameState){
        case ENUM.GAME_STATE.INIT:
            this.currentGameStateFunction= this.initGame;  
            break;
        case ENUM.GAME_STATE.LEVEL_UP:
            this.currentGameStateFunction= this.levelUp;            
            break;
         case ENUM.GAME_STATE.PLAY:
            this.currentGameStateFunction= this.play;            
            break;
    }
};
Game.prototype.levelUp=function(){
    this.players.forEach(function(player){
        player.weapons.forEach(function(weapon){
            weapon.dy=10;
        });
    });
    this.switchGameState(ENUM.GAME_STATE.PLAY);
}
Game.prototype.drawTitle=function(){
    var ctx=this.ctx;
    ctx.save();
    ctx.font="20px Georgia";
    ctx.fillStyle="white";
    ctx.fillText("Press space to start game!",this.background.height/2,this.background.width/2);
    ctx.restore();
}
Game.prototype.initGame=function(){
    this.drawBackground();
    this.render();
    this.drawTitle();
    this.checkKeys();
};
Game.prototype.checkKeys=function(){
    if (this.currentGameState===ENUM.GAME_STATE.INIT&&this.keyPressList["32"]){
        this.switchGameState(ENUM.GAME_STATE.LEVEL_UP);
    }
};
Game.prototype.play=function(){
    this.drawBackground();
    this.update();
    this.render();
    this.checkKeys();
};
Game.prototype.run=function(){       
    this.currentGameStateFunction();
    window.requestAnimationFrame(this.run.bind(this));
};
