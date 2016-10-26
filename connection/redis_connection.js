var redis = require("redis");


var RedisConnection = (function () {
    var instance;
 
    function createInstance() {
        var client = redis.createClient();

        client.on("error", function (err) {
          console.log("Error " + err);
        });

        return client;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

module.exports={

  RedisConnection : RedisConnection

};