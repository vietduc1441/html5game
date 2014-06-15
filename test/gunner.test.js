describe("Gunner", function(){
    var gunner=null;
    var player=null;
    beforeEach(function(){
       gunner= new Gunner(100,100,100,50);
       gunner.addBullets(ENUM.BULLET.IRON_1,4);
       player= new Player("test");
       var plate1=WeaponFactory.makePlate(ENUM.SHAPE_PLATE.ROUND,1);
       var plate2=WeaponFactory.makePlate(ENUM.SHAPE_PLATE.ROUND,1);
       plate1.setPosition(100,100);
       plate2.setPosition(150,150);
       player.weapons.push(plate1);
       player.weapons.push(plate2);
       
   }) 
   it("has bullets",function(){
       expect(gunner.bullets.length).toBeGreaterThan(0);
   })
   it("when fire, increate the numberOfFiredBullets",function(){
       gunner.numOfFiredBullets=0;
       gunner.update({mouseX:10,mouseY:10,mouseDown:true});
       expect(gunner.bullets[0].isFired).toEqual(true);
       expect(gunner.bullets[0].initX).toEqual(100);
       expect(gunner.bullets[0].initY).toEqual(50);
       expect(gunner.numOfFiredBullets).toEqual(1);
       expect(gunner.bullets[1].isFired).toEqual(false);
       expect(gunner.bullets[1].x).toEqual(0);
       expect(gunner.bullets[1].y).toEqual(0);
   })
   it("shoot will cause shootWeapon",function(){
       spyOn(gunner,"shootWeapon");
       gunner.shoot(player);
       expect(gunner.shootWeapon).toHaveBeenCalled();
   })
   it("cal distance to weapon",function(){
       gunner.update({mouseX:400,mouseY:500});
       gunner.shoot(player);
       expect(gunner.getDistance(player.weapons[0])).toEqual(500);
   })
   it("check collision with player",function(){
       gunner.update({mouseX:120,mouseY:120});
       var hitTarget=gunner.shoot(player);
       expect(hitTarget).toEqual(1);
       expect(player.weapons.length).toEqual(1);
   });
   it("can calculate angle between 2 points",function(){
       var angle=gunner.calAngleToTarget(0,0,100,-100);
       expect(angle).toEqual(-Math.PI/4);
       var angle=gunner.calAngleToTarget(0,0,-100,-100);
       expect(angle).toEqual(Math.PI+Math.PI/4);
   })
});