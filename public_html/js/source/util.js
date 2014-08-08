define(function(){
    return {
        calDistance:function distanceTo(x1,y1,x2,y2){
                return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
            },
        calAngle: function(x1,y1,x2,y2){
            var tg=(y2-y1)/(x2-x1);
            var angle= Math.atan(tg);
            if ((y2<y1)&&(x2<x1)){
                angle=Math.PI+angle;
            }
            return angle;
        }
    };
});