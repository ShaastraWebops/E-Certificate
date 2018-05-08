/*
 In line 46, if pdfconvert() is called, pdfs will be generated.
 TO send mail, call the next line, and comment this line out.
*/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var pdf = require('html-pdf');
var exec = require('child_process').exec;
var util = require('util');
var fs = require('fs');
var sendgrid = require('sendgrid')("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");
var mailsent=0;
const request = require("request");
node_xj = require("xlsx-to-json");

var sheet = 'Sheet28';

  node_xj({
    input: "./uploads/input.xlsx",  // input xls
    output: "./uploads/input.json", // output json
    sheet: sheet // specific sheetname
  }, function(err, result) {
    if(err) {
      console.error(err);
    } else {
      data = result;
      console.log(data.length);
    //  var contents = fs.readFileSync("./uploads/input.json");
      //var data = JSON.parse(contents);
      var ctr = 0;
      for (var i=0;i<data.length;i++) {
      	for(var j=i+1;j<data.length;j++) {
      		if(data[i].festID === data[j].festID) {
      			ctr++;
      			break;
      		}
      	}
      }
      console.log(data);
      console.log("CTR is ", ctr);
      for(var i=0; i<data.length; i++)
     //for(var i=0; i<1; i++)
     {
       if (data[i].festID !== '' && data[i].email !== '') {
         pdfConvert(i,sheet.replace(/ /g,'_'));
         //sendEmail(i);
       }
     }

    }
  });


// var data = require('./list.json');
/*fs.readdir('pdfs', function(err, filenames) {
		if (err) {
			onError(err);
			return;
		}
		filenames.forEach(function(filename) {
			if (filename!=='.pdf') {
			var festID = filename.slice(0,-4);
			var url='http://shaastra.org:8000/api/users/getmember/' +festID ;
			 request.get(url, (error, response) => {
				 var json = JSON.parse(response.body).user;
				 fs.readFile('pdfs/'+ filename,function(err,data){
	               var params = {
	                   to: json.email,
	                   // to: 'attacktitan100@gmail.com',
	                   from: 'webops@shaastra.org',
	                   fromname: 'Shaastra Webops',
	                   subject: 'E-certificate || Shaastra 2018 ',
	                   html : 'Open only in the latest version of Adobe Reader on pc.',
	                   files: [{filename: 'e-certificate.pdf', content: data}]
	               };
	               var email = new sendgrid.Email(params);
	               sendgrid.send(email, function (err, json2) {
	                   if(err){console.log(err);}
	                    mailsent+=1;
	                    console.log("mailsent:",json.email);
											console.log(mailsent);
	               });
	           });
			 });

				}
		});
	});*/
 function sendEmail(i){
     var modifiedFirstName = data[i].festID;
     // var modifiedFirstName = data[i].Name;
     var destinationEmail = data[i].email;
     var text_body = "<html><body>Hello " + data[i].Name+ "!<br><br>PFA the Certificates. <br>"+
     "Open only in the latest Adobe Reader Version in PC.</body></html>";

     var fileName = 'certis_signed/'+ modifiedFirstName + ' (5).pdf';
     fs.readFile(fileName,function(err,data){
              if (err) {console.log(err);}
              else {
             console.log("mail Sent to ",destinationEmail);
             var params = {
                 to: destinationEmail,
                 // to: 'attacktitan100@gmail.com',
                 from: 'studentrelations@shaastra.org',
                 fromname: 'Shaastra Student Relations',
                 subject: 'E-certificate || Shaastra ',
                 html : text_body,
                 files: [{filename: 'e-certificate.pdf', content: data}]
             };
             var email = new sendgrid.Email(params);
             sendgrid.send(email, function (err, json) {
                 if(err)console.log("error mailing @ ",destinationEmail);
                  mailsent+=1;
                 console.log(i);
                  console.log("mailsent:",mailsent);
             });
           }
         });

 }

function pdfConvert(i, eventName){
  //console.log(data[i]);
	 //var url='http://shaastra.org:8000/api/users/getmember/' +data[i].festID.replace(/[^a-zA-Z0-9]/g, '') ;
	//var url='http://shaastra.org:8000/api/users/getmember/SHA1803941' ;
  //  request.get(url, (error, response) => {
  //let json = JSON.parse(response.body).user;
  //var json = data[i];
//if(error){
	//console.log("\n\n\n\n");
	//throw error;
  //}
  //   var dummyContent ='<!DOCTYPE html><html><head></head>'+
        // '<body><img style="width:95% ;" src="../uploads/participation.jpg">'+
        // '<style>  @font-face {font-family: Myfont;  src: url("./OpenSans-SemiboldItalic.ttf");} h2{ text-align: center;color: #053565;font-size:30px;font-family:Myfont;}</style>' +
        // '<div style="padding-left: 10%;">'+
        // '<h2 style="margin-top:-100%;text-align: center;"></h2>'+
        // '<h2 style="margin-top:51.5%;">' + data[i].Name +'</h2>'+
        // '<h2 style="margin-top:4%;">' + data[i].Position + '</h2>'+
        // '<h2 style="margin-top:-1.5%;">' + data[i].SubDept[0].toUpperCase() + data[i].SubDept.slice(1) + '</h2>'+
        // '<h2 style="margin-top:3.5%;">' + data[i].Dept+ '</h2>'+
        // '</div>'+
        // '</body></html>'

// the above one was for coordinator certificates


    var dummyContent ='<!DOCTYPE html><html><head></head>'+
        '<style>  @font-face {font-family: Myfont;  src: url("../OpenSans-SemiboldItalic.ttf");} h2{ position: absolute; text-align: center; top: 0%; width: 0%; margin-left: 0%; color: #053565; font-size: 24px; font-family: Myfont;}</style>'+
        '<body><img style="width:95% ;" src="../s2k18.jpg">'+
         '<h2 style="top: 35%; margin-left: 20%;width: 50%;font-size: 15px;">'+data[i].Name+'</h2>'+
         '<h2 style="top: 43.5%; margin-left: 20%;width: 60%;font-size: 10px;">'+data[i].clg_name+'</h2>'+
        //'<h2 style="top: 35%; margin-left: 20%;width: 50%;">'+ json.name +'</h2>'+
        //'<h2 style="top: 43.5%; margin-left: 24%;width: 60%;font-size: 20px;">'+ json.college+'</h2>'+
         '<h2 style="top: 54%; margin-left: 20%;width: 60%;font-size: 15px;">'+data[i].event+'</h2>'+
        //'<h2 style="top: 54%; margin-left: 20%;width: 50%;">'+data[i].event+'</h2>'+
        '</div></body></html>';
        var festID = data[i].festID;
    var modifiedFirstName = festID.replace(/[^a-zA-Z0-9]/g, '');
    var modifiedEventName = data[i].event.replace(/ /g,"_");

    var htmlFileName = "./htmls/" + modifiedEventName+ modifiedFirstName +".html", pdfFileName = "./pdfs/" + modifiedEventName + "/" +modifiedFirstName +".pdf";
    var htmlcreateName =  __dirname + "/htmls/" +modifiedEventName+ modifiedFirstName +".html"
    // Save to HTML file
    fs.writeFile(htmlcreateName, dummyContent, function(err) {
        console.log("Came");
        if(err) { throw err; }
        util.log("file saved to site.html");

        // var child = exec("firefox -print " + htmlFileName + " -printmode pdf " +  pdfFileName, function(err, stdout, stderr) {
        var child = exec("phantomjs rasterize.js " + htmlFileName + " " + pdfFileName, function(err, stdout, stderr) {
            if(err) { throw err; }
            util.log(stderr);
            mailsent++;
            console.log(mailsent);
            // console.log("came to send mail");
            // sendEmail(i);
        });
    });
    // pdf.create(dummyContent).toFile(pdfFileName, function(err, res){
    //  console.log("created ",res.filename);
     //});
    // console.log('Rendered to ' + htmlFileName + ' and ' + pdfFileName);
//});
}
