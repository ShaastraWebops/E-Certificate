var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var pdf = require('html-pdf');
var exec = require('child_process').exec;
var util = require('util');
var fs = require('fs');
var sendgrid = require('sendgrid')();//("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");
var mailsent=0;
const request = require("request");
node_xj = require("xlsx-to-json");
var sheet = 'web dev';
var a=0;
var b=0;
var sendMail = function(i) {
  var modifiedFirstName = data[i].festID;
  if (modifiedFirstName === '') {
    return;
  }
  // var modifiedFirstName = data[i].Name;
  var destinationEmail = data[i].email;
  var text_body = "<html><body>Hello " + data[i].name + "!<br>Greetings from Shaastra.<br><br>"+
  "Thanks for participating in this year's Sampark. Hope you had a good experience. Your e-certificate "+
  "has been attached herewith.<br><br>Hoping you see you in IIT Madras for Shaastra 2018!<br><br>"+
  'Thanks,<br><b>Team Shaastra</b>.<br><br>Follow us on <a href="https://www.facebook.com/Shaastra">Facebook</a> for more updates.</body></html>';
  fs.readFile('rev_signed/'+ data[i].festID +'.pdf',function(err,data2){
          if (err) {
            a++;
          } else {
            b++;
          var params = {
              to: 'akshayanand681@gmail.com',
              // to: 'attacktitan100@gmail.com',
              from: 'sampark@shaastra.org',
              fromname: 'Shaastra Outreach',
              subject: 'E-certificate || Shaastra Sampark ',
              html : text_body,
              files: [{filename: 'e-certificate.pdf', content: data2}]
          };
          console.log(data[i].festID);
          //var email = new sendgrid.Email(params);
          //sendgrid.send(email, function (err, json) {
           //   if(err)console.log("error mailing @ ",destinationEmail);
              // mailsent+=1;
              // console.log("mailsent:",mailsent);
          //});
      }
    });
}
var data;
  node_xj({
    input: "input.xlsx",  // input xls
    output: "output.json",
    sheet: "webopsbankdetails" // specific sheetname
  }, function(err, result) {
    if(err) {
      console.error(err);
    } else {
      data = result;
      for (i=0; i<data.length; i++) {
        sendMail(i);
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

function pdfConvert(){
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
         '<h2 style="top: 35%; margin-left: 20%;width: 50%;font-size: 15px;">'+'D.Shobana'+'</h2>'+
         '<h2 style="top: 43.5%; margin-left: 20%;width: 60%;font-size: 10px;">'+'Rajagiri school of engineering and technology'+'</h2>'+
        //'<h2 style="top: 35%; margin-left: 20%;width: 50%;">'+ json.name +'</h2>'+
        //'<h2 style="top: 43.5%; margin-left: 24%;width: 60%;font-size: 20px;">'+ json.college+'</h2>'+
         '<h2 style="top: 54%; margin-left: 20%;width: 60%;font-size: 15px;">'+'AWS Workshop'+'</h2>'+
        //'<h2 style="top: 54%; margin-left: 20%;width: 50%;">'+data[i].event+'</h2>'+
        '</div></body></html>';
        var festID = 'SHA1809245_3';
    var modifiedFirstName = festID.replace(/[^a-zA-Z0-9]/g, '');
    var htmlFileName = "./htmls/" + modifiedFirstName +".html", pdfFileName = "./pdfs/" + modifiedFirstName +".pdf";
    var htmlcreateName =  __dirname + "/htmls/" + modifiedFirstName +".html"
    // Save to HTML file
    fs.writeFile(htmlcreateName, dummyContent, function(err) {
        console.log("Came");
        if(err) { throw err; }
        util.log("file saved to site.html");

        // var child = exec("firefox -print " + htmlFileName + " -printmode pdf " +  pdfFileName, function(err, stdout, stderr) {
        var child = exec("phantomjs rasterize.js " + htmlFileName + " " + pdfFileName, function(err, stdout, stderr) {
            if(err) { throw err; }
            util.log(stderr);
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
