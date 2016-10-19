$(document).ready(function(){
	


//disable all the fields on page load
$("#bForm").hide();

//Show form on click of addBook Button
$("#addBook").click(function(){

    $("#temp").val("add");
    $("#bForm").show();
    $("#bName").show();
     $("#author").show();
    $("#type").show();
    $("#fAuthor").show();
    $("#fType").show();
    $("#fName").show();

});

//Show BookName textbox on click of  DELETE Book Button
$("#delBook").click(function(){

    $("#temp").val("delete");
    $("#bForm").show();
    $("#author").hide();
    $("#type").hide();
    $("#fAuthor").hide();
    $("#fType").hide();

});


//Show BookName textbox on click of Book DETAILS Button
$("#listBook").click(function(){

    $("#temp").val("getDetails");
    $("#bForm").show();
    $("#author").hide();
    $("#type").hide();
    $("#fAuthor").hide();
    $("#fType").hide();

});

//Show BookName textbox on click of Book DETAILS Button
$("#getAllDetails").click(function(){

   $("#temp").val("getAllDetails");

        submitData("getAllDetails", "", "", "");

});

	
function submitData(buttonType, bookName, author, type){


        $.ajax({
            url : "/"+buttonType,
            type: "POST",
            data: JSON.stringify(
            {bName: bookName, bAuthor:author, bType:type}
          ),
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success    : function(data){
            var temp=$("#temp").val();
            //alert("data value = "+JSON.parse(data));
            
            var htmlText="";
            if(temp=="getDetails"){
                $("#bookList").empty();
                var printData = JSON.parse(data);
                var tData="<tr>";
                htmlText="<tr><th>Book Name</th><th>Author</th><th>Type</th></tr>";
              
                     
                    tData = tData+"<td>"+printData.bName+"</td><td>"+printData.bAuthor+"</td><td>"+printData.bType+"</td>"
                    //console.log('key: ' + key + '\n' + 'value: ' + data[key]);
               
                    
               // }
                tData = tData+"</tr>"
                 htmlText=htmlText+tData;
                $("#bookList").append(htmlText);
                    
                }else if(temp=="getAllDetails"){

                  
                $("#bookList").empty();
                
                var tData="";
                htmlText="<tr><th>Book Name</th><th>Author</th><th>Type</th></tr>";
                for(i in data){


                            var jsonData =JSON.parse(data[i]);
                            tData = tData+"<tr><td>"+jsonData.bName+"</td><td>"+jsonData.bAuthor+"</td><td>"+jsonData.bType+"</td></tr>"
                            
                    }
                     
                    
                    //console.log('key: ' + key + '\n' + 'value: ' + data[key]);
               
                    
               // }
               // tData = tData+"</tr>"
                 htmlText=htmlText+tData;
                $("#bookList").append(htmlText);


                }else{
                    $("#bookList").empty();
                    htmlText="";
                   var tData="<tr>";
                   var dataArray = data.split(":");
                   var dataArrayA = dataArray[0];
                   var dataArrayB = dataArray[1];
                htmlText="<tr><th>"+dataArrayA+"</th></tr>";
                //for(var key in data) {
                    tData = tData+"<td>"+dataArrayB+"</td>"
                    //console.log('key: ' + key + '\n' + 'value: ' + data[key]);
                //}
                tData = tData+"</tr>"
                 htmlText=htmlText+tData;
                $("#bookList").append(htmlText);
                }
            

            //console.log("Pure jQuery Pure JS object");
        }
    });


}


$("#submit").click(function(){

    
    var bookName="", author="", type="";
	
    var buttonType = $("#temp").val();

           bookName=$('#bName').val();
        author=$('#author').val();
        type=$('#type').val();

    submitData(buttonType, bookName, author, type);

});








$("#delete").click(function(){
	
	bookName=$('#bName').val();
$.ajax({
        url : "/delete",
        type: "POST",
        data: JSON.stringify(
            {bName: bookName}
          ),
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success    : function(data){
        	alert("haha"+data);
        	var htmlText;
        	for(var key in data) {
        		htmlText=data[key];
        		alert(data[key]);
	    console.log('key: ' + key + '\n' + 'value: ' + data[key]);
	}
        	
        	
		$("#data").append(htmlText);
            console.log("Pure jQuery Pure JS object");
        }
    });

});


});