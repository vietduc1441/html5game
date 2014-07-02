describe("test bullet",function(){
    var bullet=null;
    beforeEach(function(){
        bullet=new Bullet(ENUM.BULLET.IRON_1);
    })
    it("can calculate absoluted position",function(){
        bullet.update(100,100,Math.PI/4);//init
        bullet.update();//increate x
        dump(bullet)
        expect(bullet.x).toEqual(10);
        var absPos=bullet.calAbsPosition();
        expect(absPos.x).toEqual(100+10*Math.cos(Math.PI/4));
        expect(absPos.y).toEqual(100+10*Math.sin(Math.PI/4));
    })
})
