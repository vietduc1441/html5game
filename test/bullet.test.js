describe("test bullet",function(){
    var bullet=null;
    forEach(function(){
        bullet=new Bullet(ENUM.BULLET.IRON_1)
    })
    it("can calculate absoluted position",function(){
        bullet.update(100,100,Math.PI/4);//init
        bullet.update();//increate x
        var absPos=bullet.calAbsPosition();
        expect(absPos.x).equalTo();
        expect(absPos.y).equalTo();
    })
})