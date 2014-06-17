Bullet= function(type){
    this.strength=1;
    this.type=type;
    this.initX=0;
    this.initY=0;
    this.x=0;
    this.y=0;
    this.dx=10;
    this.dy=00;
    this.angle=0;
    this.isFired=false;
    this.isExploded=false;
}
Bullet.prototype.update=function(x ,y, angle){
    if(this.isFired){
        this.x+=this.dx;
        this.y+=this.dy;
    }
    else{
        this.initX=x;
        this.initY=y;   
        this.angle=angle;
        this.isFired=true;
    }
}
Bullet.prototype.calAbsPosition=function(){
    var result={
        x:this.initX+this.x*Math.cos(this.angle),
        y:this.initY+this.x*Math.sin(this.angle),
        
    }
    return result;
}
Bullet.prototype.render=function(ctx){
    if (this.isFired&&!this.isExploded){
        ctx.save();
            ctx.translate(this.initX,this.initY);
            ctx.rotate(this.angle);
            ctx.translate(this.x+50,this.y);
            ctx.beginPath();
                ctx.moveTo(0,2);
                ctx.lineTo(2,4);
                ctx.lineTo(4,-2);
            ctx.closePath();
            ctx.fillStyle="#FF8000";
            ctx.fill();
        ctx.restore();
    }
}