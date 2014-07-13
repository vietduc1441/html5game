requirejs.config({    
    baseUrl: 'js',
    paths: {
        source: 'source',
        lib: '../lib'
    }
});
require(["lib/requirejs-domready/domReady"],function(domReady){
    domReady(function(){
        require(["source/game"],loadGame);
    });
    function loadGame(Game){
            var game= new Game();
            game.start();
            game.run();
    }
})