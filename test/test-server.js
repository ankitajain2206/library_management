var chai = require('chai');
var serverhttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(serverhttp);
var retObj;
var res = {
	send : function (obj){
		retObj = obj;
	}
}

describe('books', function() {
  it('should list ALL books on /getAllDetails POST', function(){

  		chai.request(server)
  			.post('/getAllDetails')
  			.send({'bName':'', 'author':'', 'type':''})
  			.end(function(err, res){
  
  				res.should.have.status(200);
  				done();
  			});


  });
  it('should list a SINGLE book on /getDetails POST', function(){
  	chai.request(server)
  			.post('/getDetails')
  			.send({'bName':'bb1', 'author':'', 'type':''})
  			.end(function(err, res){
  				
  				res.should.have.status(200);
  				done();
  			});


  });
  it('should add a SINGLE book on /add POST', function(){
  	chai.request(server)
  			.post('/add')
  			.send({'bName':'bb2', 'author':'aa2', 'type':'tt2'})
  			.end(function(err, res){
  					res.body.should.be.a('object');
			      res.body.should.have.property('SUCCESS');
			      res.body.SUCCESS.should.be.a('object');
			      res.body.SUCCESS.should.have.property('bName');
			      res.body.SUCCESS.should.have.property('author');
			      res.body.SUCCESS.should.have.property('type');
			      res.body.SUCCESS.bName.should.equal('bb2');
			      res.body.SUCCESS.author.should.equal('aa2');
			      res.body.SUCCESS.type.should.equal('tt2');
  				res.should.have.status(200);
  				done();
  			});
  });
  it('should delete a SINGLE book on /delete POST', function(){
  	chai.request(server)
  			.post('/delete')
  			.send({'bName':'bb2', 'author':'', 'type':''})
  			.end(function(err, res){
  				  res.should.have.status(200);
		          res.should.be.json;
		          res.body.should.be.a('object');
		          res.body.should.have.property('REMOVED');
		          res.body.REMOVED.should.be.a('object');
		          res.body.REMOVED.should.have.property('bName');
		          res.body.REMOVED.bName.should.equal('bb2');
          
  				done();
  			});
  });
});
