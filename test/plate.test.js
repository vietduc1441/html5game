require(["source/plate","source/enum","source/weaponFactory","source/gunner"],function(Plate,ENUM,WeaponFactory,Gunner){
    describe("Plate ",function(){
        var plate=null;
        var gunner = new Gunner(0,0,0,0);
        
        beforeEach(function(){
           plate= WeaponFactory.makePlate(10, ENUM.SHAPE_PLATE.ROUND);
        });
        
        it("plate has bullets",function(){
            expect(plate.bullets.length).toBeGreaterThan(0);
        });
        it("can fire at gunners",function(){
            var bullet=plate.bullets[0];
            expect(gunner.isHit).toEqual(false);
            plate.fireGunner(gunner);
        });
        
        
    });
});
