require(["source/util"],function(Util){
    describe("Test Util",function(){    
        it("calculate distance to weapon",function(){
            expect(Util.calDistance(0,0,300,400)).toEqual(500);
        });
    })  
});

