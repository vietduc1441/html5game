Plate= function(shape,size){
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
    this.bullets=WeaponFactory.makeBullets(ENUM.BULLET.LAZER,100000);
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
}
Plate.prototype.update=function(){
    this.x+=this.dx;
    this.y+=this.dy;
    this.isHit=this.isHit&&!this.isHit;
};
Plate.prototype.render=function(ctx){
    if (this.isHit) {
        this.renderHitedPlate(ctx);
    }
    else{
        this.renderBody(ctx);
        this.renderGun(ctx);
    }
};
Plate.prototype.renderHitedPlate=function(ctx){
    this.renderBody(ctx);
    this.renderGun(ctx);
}
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
}
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
}