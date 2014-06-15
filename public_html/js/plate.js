Plate= function(shape,size){
    this.shape=shape;
    this.x=0;
    this.y=0;
    this.dx=0;
    this.dy=0;
    this.angle=0;
    this.size=size;
    this.state=0;
    this.speed=0;
    this.fillStyle= '#0000FF';
    this.strokeStyle='#0000FF';
    this.edgeWidth=size/2;
    this.isHit=false;
    
};
Plate.prototype.setPosition=function(x,y){
    this.x=x;
    this.y=y;
};
Plate.prototype.hit=function(){
    this.isHit=true;
}
Plate.prototype.update=function(){
    this.x+=this.dx;
    this.y+=this.dy;
};
Plate.prototype.render=function(ctx){
    if (this.isHit) {
        this.renderDestroyedPlate(ctx);
    }
    else{
        this.renderBody(ctx);
    }
};
Plate.prototype.renderDestroyedPlate=function(ctx){
    return null;
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
    ctx.strokeStyle = this.strokeStyle;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}