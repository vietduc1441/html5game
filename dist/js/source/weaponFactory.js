define(["source/plate","source/bullet"],function(e,t){var n={};return n.makePlate=function(t,n){return new e(t,n)},n.makePlates=function(e,t,n){var r=[];for(var i=0;i<e;i++)r.push(this.makePlate(t,n));return r},n.makeBullet=function(e){return new t(e)},n.makeBullets=function(e,t){var n=[];for(var r=0;r<t;r++)n.push(this.makeBullet(e));return n},n});