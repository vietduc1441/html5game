require(["source/game","source/enum"],function(Game,ENUM){    
    describe("Game", function(){
        var game=null;
        beforeEach(function(){
            game=new Game();
            spyOn(game, "getContext").andCallFake(function(){
                var elm=document.createElement("canvas");
                elm.setAttribute("id","game");
                this.ctx= elm.getContext("2d");
                this.ctx.height=100;
                this.ctx.width=100;
            });
            spyOn(game, "drawBackground").andCallFake(function() {
                return true;
            });
            game.start();
            game.players.forEach(function(player){
                spyOn(player,"render");
                spyOn(player,"update");
            });
            game.gunners.forEach(function(gunner){
                spyOn(gunner,"render");
                spyOn(gunner,"update");
            });
        });
        it("context obj is not null",function(){
            expect(game.ctx).not.toBe(null);
        });
        it("could start and have 1 player", function(){
//            expect(game).not.toBe(null);
            expect(game.players.length).toBeGreaterThan(0);
        });
        it("could start and have 1 gunner", function(){
            var length=game.gunners.length;
            expect(length).toBeGreaterThan(0);
        });
        it("renders will cause render in players",function(){
            game.render();
            expect(game.players[0].render).toHaveBeenCalled();
        });
        it("will change status to play if user press space",function(){        
            game.switchGameState(ENUM.GAME_STATE.INIT);
            game.currentGameStateFunction();
            game.keyPressList[32]=true;
            game.currentGameStateFunction();
            expect(game.currentGameState).toBe(ENUM.GAME_STATE.LEVEL_UP)
        });
        it("update will cause player and gunner update",function(){
            game.update();
            expect(game.players[0].update).toHaveBeenCalled();
            expect(game.gunners[0].update).toHaveBeenCalled();
        });
        it("check collision, will trigger gunner shoot player",function(){
            game.gunners.forEach(function(gunner){
                spyOn(gunner,"shoot");
            });
            game.checkCollision();
            expect(game.gunners[0].shoot).toHaveBeenCalled();
        });
    });
});