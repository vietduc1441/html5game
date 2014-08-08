require(["source/player","source/gunner"],function(Player,Gunner){
    describe("Player",function(){
        var player=null;
        var gunner=null;
        beforeEach(function(){
            player= new Player("Player");
            player.start();
            gunner= new Gunner(0,0,0,0);
            player.trackGunners([gunner]);
        });
        it("Player is inited",function(){
            expect(player).not.toBeNull();
        });
        it("Player has weapon",function(){
          expect(player.weapons.length).toBeGreaterThan(0);  
        });
        it("renders will cause render of weapon",function(){
           player.weapons.forEach(function(wep){
               spyOn(wep,"render");
               
           }) ;
           player.render();
           expect(player.weapons[0].render).toHaveBeenCalled();
        });
        it("player can add gunners show it knows positions of those gunner to fire",function(){
            player.trackGunners([gunner]);
            expect(player.trackedGunners.length).toEqual(1);
        });
        it("is shot, will cause all weapon fire back",function(){
            player.isShot=true;
            var weapon=player.weapons[0];
            spyOn(weapon,"fire");
            player.fireGunners();
            
            expect(player.trackedGunners).not.toBe(null);
            expect(weapon.fire).toHaveBeenCalled();
            
        });
      
    });
});