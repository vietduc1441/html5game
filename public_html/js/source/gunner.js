define(["source/weaponFactory","source/enum","source/util"],
    function(WeaponFactory,ENUM,Util){
        var Gunner=function(initX,initY,gunX,gunY){
            this.bullets=[];
            this.x=initX;//mouse pos <=> sight pos x
            this.y=initY;//mouse pos <=> sight pos y
            this.angle=-Math.PI/2;//mouse angle
            this.fire=false;//is fired or not
            this.gunX=gunX;//gunner' X
            this.gunY=gunY;//gunner' y

            this.isHit=false;
            
            this.fillStyle= 'rgba(255,0,0, 0.5)';
            this.strokeStyle='rgb(255,0,0)';
            this.sightStyle='#FFFFFF';
            this.edgeWidth=1;
            this.sightSize=30;
            this.numOfFiredBullets=0;
        };
        /*
         * add bullets to a gunner
         * @param {type} type of bullet
         * @param {type} number
         * @returns {undefined}
         */
        Gunner.prototype.addBullets=function (type,number){
            var newbullets=WeaponFactory.makeBullets(type,number);
            var _bullets=this.bullets;
            newbullets.forEach(function (bu){
                _bullets.push(bu);
            });
        };
        /*
         * Start with 1000 bullet Type1
         * @returns {undefined}
         */
        Gunner.prototype.start=function(){
            this.addBullets(ENUM.BULLET.IRON_1,1000);
        };
        /*
         * evtInfo: {mouseX,mouseY,rightClick};
         * Update the postion of the sight according to the pos of
         * the mouse
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
                    this.numOfFiredBullets+=1;
                }
            }
            for (var i=0;i<this.numOfFiredBullets;i++){
                var bullet=this.bullets[i];
                    bullet.update();
            }
        };
        /*
         * shoot a  player
         */
        Gunner.prototype.shoot=function shootAPlayer(player){
            var weapons=player.weapons;
            var countHit=0;
            weapons.forEach(function(weapon){
                countHit+=this.shootWeapon(weapon);
            },this);
            //remove from player
            player.removeDiedWeapons();//TODO:
            player.isShot=this.fire;
            return countHit;
        };
        /*
         * Check collision of fired bullets with weapon of the players
         * which the gunner fires
         */
        Gunner.prototype.shootWeapon=function(weapon){
            var totalHit=0;
            if (weapon.shape===ENUM.SHAPE_PLATE.ROUND){
                for(var i=0;i<this.numOfFiredBullets;i++){
                    var bullet=this.bullets[i];
                    if (bullet.isExploded) continue;
                    var absPosBullet=bullet.calAbsPosition();
                    if (absPosBullet.x<0) continue;
                    var distance=Util.calDistance(absPosBullet.x,absPosBullet.y,weapon.x,weapon.y);
                    if(distance<this.sightSize){
                        weapon.hit();
                        bullet.isExploded=true;
                        totalHit++;
                    }
                }
            }
            return totalHit;
        };
        /*
         * --------------------Render-----------------------------------
         */
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
        };
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
        };
        Gunner.prototype.calAngleToTarget=Util.calAngle;
        Gunner.prototype.renderBody=function(ctx){
            ctx.save();
                ctx.translate(this.gunX, this.gunY);
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
        };
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
        };
        Gunner.prototype.renderGun=function(ctx){
            this.renderBase(ctx);
            this.renderBody(ctx);
        };
        Gunner.prototype.renderBullets=function(ctx){
            //TODO: if out of screen, dont render
            this.bullets.forEach(function(bullet){
                bullet.render(ctx);
            });
        };
        Gunner.prototype.render=function(ctx){
            this.renderGun(ctx);
            this.renderSight(ctx);
            this.renderTarget(ctx);
            this.renderBullets(ctx);
        };
       return Gunner;
    }
);