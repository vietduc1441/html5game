require(["source/player"],function(Player){
    describe("Player",function(){
        var player=null;
        beforeEach(function(){
            player= new Player("Player");
            player.start();
        });
        it("Player is inited",function(){
//            console.debug(player)
//            expect(player).not.toBeNull();
        });
        it("Player has weapon",function(){
          expect(player.weapons.length).toBeGreaterThan(0);  
        });
        it("renders will cause render of weapon",function(){
           player.weapons.forEach(function(wep){
               spyOn(wep,"render");
           }) 
           player.render();
           expect(player.weapons[0].render).toHaveBeenCalled();
        });
    })
})