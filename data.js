var redis = require("redis");
var client = redis.createClient();

//var exports = module.exports={}
	
client.on("error", function (err) {
    console.log("Error " + err);
});

module.exports.addBook = function(bookObject, callBack){

console.log(bookObject.bName);
var bookName = bookObject.bName;
var bookId= generateUUID();

	client.set(bookName, bookId, function(err, res){

		if(err){

			console.log("Error in setting the value in set = "+err);
			console.log("Response is = "+res);
			callBack(res);
		}else{

			//client.hmset("books", bookId, ["bookName", bookObject.bName, "bookAuthor", bookObject.bAuthor, "bookType", bookObject.bType], function (err, res) {
				client.hmset("books", bookId, JSON.stringify(bookObject), function (err, res) {

				if(err){

					console.log("Error in setting a value in HAsh = "+err);
					console.log("Response is = "+res);
					callBack(res);
				}else{
					console.log("Data Successfully Added in set and HAsh");
					callBack(res);
				}
			});
		}
	});
	

}





module.exports.getBook = function(book,callback){
	var bookName = book.bName;

	console.log("Book to be get = "+bookName);
	var bookId;
	client.get(bookName, function(err, res){
		if(err){
			console.log("error");
			callback(res);	
		}else{
			console.log("book Id = "+res);
			bookId = res;
			client.hget("books",bookId, function(err, res){

				if(err){
					console.log("error"+err);
					callBack(res);
				}else{
		
						console.log("data in data.js = "+res);
					//for(var key in res) {
   						 //console.log('key: ' + key + '\n' + 'value: ' + res[key]);
		  			//}
	 				callback(res);	
				}
			});
		}
	});
}



module.exports.getAllBook = function(callback){

			client.hgetall('books', function(err, res){

				if(err){
					console.log("error"+err);
					callBack(res);
				}else{
		
						//console.log("data in data.js = "+JSON.stringify(res));
					//for(var key in res) {
   						 //console.log('key: ' + key + '\n' + 'value: ' + res[key]);
		  			//}
	 				callback(JSON.stringify(res));	
				}
			});
}

	
module.exports.deleteBook = function(book, callback){

	var bookName = book.bName;
	console.log("Book to be deleted = "+bookName);
	var bookId;
	var returnMsg ="";
	client.get(bookName, function(err, res){
			if(err){
				console.log("error in getting bookId = "+err);
				returnMsg="Cannot fetch bookId";
				callback(res);
			}else{
				console.log("book Id = "+res);
				bookId = res;
				client.hdel("books",bookId, function(err, res){

					if(err){
						console.log("error in deleting from hash = "+err);
						returnMsg="error in deletion";
						callback(res);
					}else{
		
						client.del(bookName, function(err, res){
							if(err){
								console.log("error in deleting book entry from list = "+err);
								returnMsg="error in deletion";
								callback(res);
							}else{
								if(res===1){
									returnMsg="Successfully deleted book details";
								console.log("response after deletion = "+res);
								callback("Success");
							}
							}

						});
   						// console.log("response after del = "+res);
   						
			
	 					//callback(res);	
						}
		
		
			});
	
		}
	});

}



//Generating UUID and this will be used as key to store value
function generateUUID(){
    var d = new Date().getTime();
   
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}