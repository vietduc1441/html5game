define(["require","source/enum","source/weaponFactory","source/util"],
    function(require,ENUM,WeaponFactory,Util){
        var Plate= function(shape,size){
            this.shape=shape;
            this.x=0;
            this.y=0;
            this.dx=0;
            this.dy=0;
            this.angle=Math.PI/2;
            this.size=size;
            this.state=0;
            this.speed=0;
            this.fillStyle= '#0000FF';
            this.strokeBodyStyle='#0000FF';
            this.strokeHitedBodyStyle='#DF0101';
            this.strokeGunStyle="white";
            this.edgeWidth=size/2;
            this.blood=100;
            this.isDied=false;
            this.isHit=false;
            this.bullets=require("source/weaponFactory").makeBullets(ENUM.BULLET.IRON_2,100000);
            this.numOfFiredBullets=0;
            this.isShot=false;
        };
        Plate.prototype.setPosition=function(x,y){
            this.x=x;
            this.y=y;
        };
        Plate.prototype.hit=function(){
            this.isHit=true;
            this.blood-=5;
            if(this.blood<=0){
                this.isDied=true;
            }
        };
        
        Plate.prototype.fireGunner=function(gunner){            
            var firingBullet=this.bullets[this.numOfFiredBullets];
            var angleToGunner=Util.calAngle(this.x,this.y,gunner.gunX,gunner.gunY);
            firingBullet.update(this.x,this.y,angleToGunner);//set started position
            this.numOfFiredBullets++;
        };
        
        Plate.prototype.fire=function(gunners){
            for (var i=0, gunner=gunners[i]; i<gunners.length; i++){
                this.fireGunner(gunner);
            }
        };
        
        Plate.prototype.update=function(gunnersToKill){
            this.x+=this.dx;
            this.y+=this.dy;
            this.isHit=this.isHit&&!this.isHit;
            //update bullets            
            if (gunnersToKill){
                this.fire(gunnersToKill); //fire if play tell
            }
            for (var  i=0; i<this.numOfFiredBullets; i++){
                var bullet=this.bullets[i];
                bullet.update(); //just go forward
            }
        };
        Plate.prototype.render=function(ctx){
            if (this.isHit) {
                this.renderHitedPlate(ctx);
            }
            else{
                this.renderBody(ctx);
                this.renderGun(ctx);
            }
            this.renderBullets(ctx);
        };
        Plate.prototype.renderBullets=function(ctx){
            
            for (var i=0; i<this.numOfFiredBullets; i++){
                this.bullets[i].render(ctx);
            }
        };
        Plate.prototype.renderHitedPlate=function(ctx){
            this.renderBody(ctx);
            this.renderGun(ctx);
        };
        Plate.prototype.renderGun=function(ctx){
            ctx.save();
                ctx.beginPath();
                ctx.translate(this.x,this.y);
                ctx.rotate(this.angle);
                ctx.moveTo(0,0);
                ctx.lineTo(25,0);
                ctx.closePath();
                ctx.strokeStyle=this.strokeGunStyle;
                ctx.lineWidth=5;
                ctx.stroke();
            ctx.restore();
        };
        Plate.prototype.renderBody=function(ctx){
            ctx.save();
                ctx.translate(this.x,this.y);
                ctx.beginPath();
                switch (this.shape){
                    case ENUM.SHAPE_PLATE.ROUND:
                        ctx.arc(0, 0, this.size, 0, 2 * Math.PI, false);
                    break;
                    case ENUM.SHAPE_PLATE.RECT:
                        ctx.rect(0-this.size,0-this.size,this.size*2,this.size*2);
                    break;
                }
                ctx.lineWidth = this.edgeWidth;
                ctx.strokeStyle = this.isHit? this.strokeHitedBodyStyle: this.strokeBodyStyle;
                ctx.stroke();
                ctx.closePath();
            ctx.restore();
        };
        return Plate;
    }
)