describe("weaponFact",function(){
    var weaponFact= WeaponFactory;
    it("Factory could create weapons",function(){
        var weapons=weaponFact.makePlates(10,ENUM.SHAPE_PLATE.ROUND);
        expect(weapons.length).toBe(10);
    });
    it("Factory could create bullets",function(){
        var bullets=weaponFact.makeBullets(ENUM.BULLET.IRON_1,10);
        expect(bullets.length).toBe(10);
    });
});