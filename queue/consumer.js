var amqp = require('amqplib/callback_api');
var data = require('../data.js');
var jQuery = require('jquery');


var response="OK";
var replyQueue = "reply";


amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'CRUD';

    ch.assertExchange(ex, 'direct', {durable: false});

    ch.assertQueue('messageQ', {durable: true,exclusive:true}, function(err, q) {
      console.log(' [*] Waiting for data. To exit press CTRL+C');

     
      ch.bindQueue(q.queue, ex, "add");
      ch.bindQueue(q.queue, ex, "delete");
      ch.bindQueue(q.queue, ex, "getDetails");
      ch.bindQueue(q.queue, ex, "getAllDetails");
     

      ch.consume(q.queue, function(msg) {
        console.log(" [x] Routing Key = %s and msg =  '%s'", msg.fields.routingKey, msg.content.toString());
        console.log(" [x] Simple msg = "+msg+" JSON.stringify(JSON.parse(msg.content.toString())) = "+JSON.stringify(JSON.parse(msg.content.toString())));
        var finalMsgProducer = JSON.parse(msg.content.toString());
        console.log(typeof finalMsgProducer);
        var strJson =  JSON.stringify(finalMsgProducer);
        console.log(typeof strJson);
        var bName = msg.bName;
        console.log("book name = "+bName);

/* Here we will check if the request in queue is for add, delete, getBook or for getAllBooks
accordingly data is fetched or added in redis database */
          if(msg.fields.routingKey=="add"){ //if routing key is for add
              data.addBook(finalMsgProducer, function(res){
                console.log("response after adding book = "+res);
                response = res;
                replyTo(res);
              });
          }else if(msg.fields.routingKey=="delete"){

              data.deleteBook(finalMsgProducer, function(res){

                  console.log("response after deleting book = "+res);
                  response=res;
                  replyTo(res);

              });

          }else if(msg.fields.routingKey=="update"){

              /*data.deleteBook(msg, function(res){

                  console.log("response after deleting book = "+res);
                  response=res;

              });
*/
          }else if(msg.fields.routingKey=="getDetails"){

              data.getBook(finalMsgProducer, function(res){

                  console.log("response after getting the book details = "+res);
                  response=res;
                  replyTo(res);

              });

          }else if(msg.fields.routingKey=="getAllDetails"){

              data.getAllBook(function(res){

                  console.log("response after getting all the book details = "+res);
                  response=res;
                  replyTo(res);

              });

          }
      




      }, {noAck: false});
    });


////callback funtion on receiving messages, reply to the reply_to header
function replyTo(response){
                
 ch.publish(ex, replyQueue, new Buffer(response), /*options = {contentType: "application/JSON", deliveryMode: 1},*/ function(err, ok) {
                    if (err != null) {
                        ch.nack(response);
                    }
                    else {
                      console.log("replying to producer with msg = "+response);
                        ch.ack(response);
                    }
                });
}

  });
});



