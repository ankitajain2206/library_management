var amqp = require('amqplib/callback_api');

//var msg = {"bName":"abc"};
var replyQueue = "replyQ";
var replyKey = "reply";


module.exports.dataInQueue = function(type, msg, callback){
console.log("type of queue = "+type);
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'CRUD';
//listen for reply messages
        ch.assertQueue(replyQueue, {durable: true});
        ch.bindQueue(replyQueue, ex, replyKey);
        ch.consume(replyQueue, function(message) {
            //callback funtion on receiving reply messages
           // console.log("message received raw = "+message);
            console.log("message received = %s",message.content.toString());
            //close connection once receives the reply
            conn.close();
            callback(message.content.toString());
        }, {noAck: true});



        
       
         ch.assertExchange(ex, 'direct', {durable: false});
        ch.publish(ex, type, encode(msg)/*,options = {contentType: "application/JSON", deliveryMode: 1}*/);
         console.log(" [x] Sent %s: " , encode(msg));
         //conn.close();
       });

  //setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
  
}

function encode(doc) {  
  console.log("doc = "+JSON.stringify(doc));
  return new Buffer(JSON.stringify(doc));
}