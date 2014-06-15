Gunner=function(initX,initY,gunX,gunY){
    this.bullets=[];
    this.x=initX;//mouse pos
    this.y=initY;//mouse pos
    this.angle=0;//mouse angle
    this.fire=false;
    this.gunX=gunX;
    this.gunY=gunY;
    
    this.fillStyle= 'rgba(255,0,0, 0.5)';
    this.strokeStyle='rgb(255,0,0)';
    this.sightStyle='#FFFFFF';
    this.edgeWidth=1;
    this.sightSize=30;
    this.numOfFiredBullets=0;
}
Gunner.prototype.addBullets=function (type,number){
    var newbullets=WeaponFactory.makeBullets(type,number);
    var _bullets=this.bullets;
    newbullets.forEach(function (bu){
        _bullets.push(bu);
    })
}
/*
 * Start with 1000 bullet Type1
 * @returns {undefined}
 */
Gunner.prototype.start=function(){
    this.addBullets(ENUM.BULLET.IRON_1,1000);
}
/*
 * evtInfo: {mouseX,mouseY,rightClick};
 */
Gunner.prototype.update=function(evtInfo){
    this.x=evtInfo.mouseX;
    this.y=evtInfo.mouseY;
    this.fire=evtInfo.mouseDown;
    this.moveLeft=evtInfo.leftKey;
    this.moveRight=evtInfo.rightKey;
    if(this.moveLeft){
        this.gunX+=-10;
    }
    if(this.moveRight){
        this.gunX+=10;
    }
    this.angle=this.calAngleToTarget(this.gunX,this.gunY,this.x,this.y);
    if (this.fire){
        if (this.numOfFiredBullets<this.bullets.length){
            this.bullets[this.numOfFiredBullets].update(this.gunX,this.gunY,this.angle);
            this.bullets[this.numOfFiredBullets].isFired=true;
            this.numOfFiredBullets+=1;
        }
    }
    for (var i=0;i<this.numOfFiredBullets;i++){
        var bullet=this.bullets[i];
            bullet.update();
    }
}
Gunner.prototype.shoot=function shootAPlayer(player){
    var weapons=player.weapons;
    var countHit=0;
    weapons.forEach(function(weapon){
        countHit+=this.shootWeapon(weapon);
    },this);
    //remove from player
    player.removeHitWeapons();
    return countHit;
}
Gunner.prototype.getDistance=function distanceTo(weapon){
    return Math.sqrt((this.x-weapon.x)*(this.x-weapon.x)+(this.y-weapon.y)*(this.y-weapon.y));
}
Gunner.prototype.shootWeapon=function(weapon){
    if (weapon.shape===ENUM.SHAPE_PLATE.ROUND){
        var distance=this.getDistance(weapon);
        if(distance<this.sightSize){
            weapon.hit();
            return 1;
        }
    }
    return 0;
}
Gunner.prototype.renderSight=function(ctx){
    ctx.save();
        ctx.translate(this.x,this.y);
        ctx.beginPath();
        ctx.arc(0,0,this.sightSize,0,2*Math.PI);
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
        ctx.lineWidth = this.edgeWidth;
        ctx.strokeStyle = this.strokeStyle;
        ctx.stroke();
        ctx.closePath();
    ctx.restore();
}
Gunner.prototype.renderTarget=function(ctx){
    ctx.save();
        ctx.translate(this.x,this.y);
        ctx.beginPath();
        ctx.moveTo(0,0-this.sightSize);
        ctx.lineTo(0,  this.sightSize);
        ctx.moveTo(0-this.sightSize,0);
        ctx.lineTo(this.sightSize,0);
        ctx.closePath();
        ctx.strokeStyle=this.sightStyle;
        ctx.stroke();
    ctx.restore(); 
}
Gunner.prototype.calAngleToTarget=function(x1,y1,x2,y2){
    var tg=(y2-y1)/(x2-x1);
    var angle= Math.atan(tg);
    if ((y2<y1)&&(x2<x1)){
        angle=Math.PI+angle;
    }
    return angle;
}
Gunner.prototype.renderBody=function(ctx){
    ctx.save();
        ctx.translate(this.gunX,this.gunY);
        ctx.rotate(this.angle);
        ctx.beginPath();
        //the lower part
        ctx.moveTo(0,0);
        ctx.lineTo(20,0);
        ctx.strokeStyle="#FFFFFF";
        ctx.lineWidth=this.sightSize/2;
        ctx.lineCap="round";
        ctx.stroke();
        //the top
        ctx.moveTo(20,0);
        ctx.lineTo(50,0);
        ctx.strokeStyle="#FFFFFF";
        ctx.lineWidth=this.sightSize/4;
        ctx.lineCap="round";
        ctx.stroke();
        
        ctx.closePath();
    ctx.restore();
}
Gunner.prototype.renderBase=function(ctx){
    ctx.save();
        ctx.translate(this.gunX, this.gunY);
        ctx.beginPath();
        ctx.arc(0,0,this.sightSize,0,Math.PI,true);
        ctx.fillStyle=this.fillStyle;
        ctx.fill();
        ctx.strokeStyle=this.strokeStyle;
        ctx.lineWidth=this.sightSize/2;
        ctx.stroke();
        ctx.closePath();
    ctx.restore();
}
Gunner.prototype.renderGun=function(ctx){
    this.renderBase(ctx);
    this.renderBody(ctx);
}
Gunner.prototype.renderBullets=function(ctx){
    this.bullets.forEach(function(bullet){
        bullet.render(ctx);
    });
}
Gunner.prototype.render=function(ctx){
    
    this.renderGun(ctx);
    this.renderSight(ctx);
    this.renderTarget(ctx);
    this.renderBullets(ctx);
}