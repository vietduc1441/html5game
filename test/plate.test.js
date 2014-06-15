describe("Plate test",function(){
    var plate=null;
    beforeEach(function(){
       plate= WeaponFactory.makePlate(10, ENUM.SHAPE_PLATE.ROUND);
    })
    it("plate has bullets",function(){
        expect(plate.bullets.length).toBeGreaterThan(0);
    })    
})