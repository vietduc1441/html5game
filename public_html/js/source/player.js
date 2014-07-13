define(["source/weaponFactory","source/enum"],function(WeaponFactory,ENUM){
    var Player=function(name,role){
        this.name=name;
        this.role=role;
        this.weapons=[];
    };
    Player.prototype.start=function(){
        var plates=WeaponFactory.makePlates(10,ENUM.SHAPE_PLATE.ROUND,15);
    //    var roundPlates=WeaponFactory.makePlates(10,ENUM.SHAPE_PLATE.RECT,10);
        this.addWeapon(plates);    
    //    this.addWeapon(roundPlates);    
        this.weapons.forEach(function(plate,index){
            plate.setPosition(index*100, 10);
        });
    };
    Player.prototype.addWeapon=function(weapons){
        var _weapons=this.weapons;
        weapons.forEach(function(item){
            _weapons.push(item);    
        });    
    };
    Player.prototype.connect=function(){

    }
    Player.prototype.update=function(){
        this.weapons.forEach(function(weapon){
            weapon.update();
        },this)
    }
    Player.prototype.render= function(ctx){
        this.weapons.forEach(function(weapon){
            weapon.render(ctx);        
        })
    }
    Player.prototype.removeDiedWeapons=function(){
        var weapons=this.weapons;    
        for (var i=weapons.length-1; i>=0; i--){
            var weapon=weapons[i];
            if (weapon.isDied) weapons.splice(i,1);
        }
    }
    return Player;
})