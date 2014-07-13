define(["source/plate","source/bullet"],function(Plate,Bullet){
    var WeaponFactory={};
    WeaponFactory.makePlate=function(shape,size){
        return new Plate(shape,size);
    };
    WeaponFactory.makePlates=function(number,shape,size){
        var plates= [];
        for (var i=0; i<number; i++){
            plates.push(this.makePlate(shape,size));
        }
        return plates;
    };
    WeaponFactory.makeBullet=function(type){
        return new Bullet(type);
    };
    WeaponFactory.makeBullets=function(type, number){
        var bullets= [];
        for (var i=0; i< number; i++){
            bullets.push(this.makeBullet(type));
        }
        return bullets;
    };
    return WeaponFactory;
});
