var restify = require('restify');
var builder = require('botbuilder');
var util = require('util');
var request = require('request');


// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 5607, function () {
   console.log('%s listening to %s', server.name, server.url); 
});


// Send email
var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aimcognitivegurgaon@gmail.com',//sikoxfeimmo2iyf6@ethereal.email
        pass: 'Gurgaon@2016'//jt1u5aKpVZgBTgq5Yf
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: 'aimcognitivegurgaon@gmail.com', // sender address
    to: 'shubg101@gmail.com', // list of receivers
    subject: 'Remedy ticket', // Subject line
    text: 'Your form has been submitted. Please note your request no #1233432. We will reach out to you shortly.' // plain text body
    //html: '<b>Hello world?</b>' // html body
};


// Connect to MongoDB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/shbm_test";


// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "65e38b0f-c734-452a-8a9b-e65eeec5d762",
    appPassword: "mhdiSH550]~=:wraLOWUK03"
});


server.post('/api/messages', connector.listen());

var smg = "I want help with outlook";

var obj = new Object();


var bot = new builder.UniversalBot(connector, function (session) {

    if (session.message && session.message.value) {
        // A Card's Submit Action obj was received
        processSubmitAction(session, session.message.value);
        return;
    }

    session.send('Hi, I will help you with creating a Remedy request or a Tivoli Monitoring Request.');
    session.send('Please choose one of the following');

    var card = {
            'contentType': 'application/vnd.microsoft.card.adaptive',
            'content': {
                '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
                'type': 'AdaptiveCard',
                'version': '1.0',
                'body': [
                    {
                        'type': 'Container',
                        'speak': '<s>Hello!</s><s>Welcome to Tivoli Monitoring</s>',
                        'items': [
                            {
                                'type': 'ColumnSet',
                                'columns': [
                                    {
                                        'type': 'Column',
                                        'size': 'auto',
                                        'items': [
                                            {
                                                'type': 'Image',
                                                'url': 'https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAASzAAAAJDQyNjMyMzlkLTI0OTgtNGZlYS1hNzMxLWIyZmQ2NGQ3ZWE5Mg.png',
                                                'size': 'medium',
                                                'style': 'person'
                                            }
                                        ]
                                    },
                                    {
                                        'type': 'Column',
                                        'size': 'shrink'
                                    },
                                    {
                                        'type': 'Column',
                                        'size': 'stretch',
                                        'items': [
                                            {
                                                'type': 'TextBlock',
                                                'text': "Hello!",
                                                'weight': 'bolder'
                                            },
                                            {
                                                'type': 'TextBlock',
                                                'text': "Welcome to Tivoli Monitoring",
                                                'wrap': true,
                                                'weight': 'bolder'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                'actions': [
                    // Remedy Request Form
                    {
                        'type': 'Action.ShowCard',
                        'title': 'Remedy Request',
                        'speak': '<s>Remedy Request</s>',
                        'size': 'stretch',
                        'card': {
                            'type': 'AdaptiveCard',
                            'body': [
                                {
                                    'type': 'TextBlock',
                                    'text': 'Fill the following form',
                                    'speak': '<s>Please fill out the following form</s>',
                                    'weight': 'bolder',
                                    'size': 'large'
                                },
                                {
                                    'type': 'TextBlock',
                                    'text': 'Please specify the business need',
                                    'weight': 'bolder'
                                },
                                {
                                    'type': 'Input.Text',
                                    'id': 'business_need',
                                    'speak': '<s>Please specify the business need for the remedy request</s>',
                                    'style': 'text'
                                },
                                {
                                    'type': 'TextBlock',
                                    'text': 'Name',
                                    'weight': 'bolder'
                                },
                                {
                                    'type': 'Input.Text',
                                    'id': 'name',
                                    'speak': '<s>Please enter your name</s>'
                                },
                                {
                                    'type': 'TextBlock',
                                    'text': 'Project Name',
                                    'weight': 'bolder'
                                },
                                {
                                    'type': 'Input.Text',
                                    'id': 'project_name',
                                    'speak': '<s>Please enter your project name</s>'
                                },
                                {
                                    'type': 'TextBlock',
                                    'text': 'Manager\'s Name',
                                    'weight': 'bolder'
                                },
                                {
                                    'type': 'Input.Text',
                                    'id': 'manager_name',
                                    'speak': '<s>Please enter your manager\'s name</s>'
                                },
                                {
                                    'type': 'TextBlock',
                                    'text': 'Source IP Address',
                                    'weight': 'bolder'
                                },
                                {
                                    'type': 'Input.Text',
                                    'id': 'source_ip',
                                    'speak': '<s>Please enter your Source IP Address</s>'
                                },
                                {
                                    'type': 'TextBlock',
                                    'text': 'Destination IP Address',
                                    'weight': 'bolder'
                                },
                                {
                                    'type': 'Input.Text',
                                    'id': 'destination_ip',
                                    'speak': '<s>Please enter your Destination IP Address</s>'
                                },
                                {
                                    'type': 'TextBlock',
                                    'text': 'Port Address',
                                    'weight': 'bolder'
                                },
                                {
                                    'type': 'Input.Text',
                                    'id': 'port',
                                    'speak': '<s>Please enter port address</s>'
                                },
                            ],
                            'actions': [
                                {
                                    'type': 'Action.Submit',
                                    'title': 'Submit',
                                    'speak': '<s>Submit</s>',
                                    'data': {
                                        'type': 'remedyRequest'
                                    }
                                }
                            ]
                        }
                    },
                    // Tivoli Monitoring Request Form
                    {
                        'type': 'Action.ShowCard',
                        'title': 'Tivoli Monitoring Request',
                        'speak': '<s>Tivoli Monitoring</s>',
                        'card': {
                            'type': 'AdaptiveCard',
                            'body': [
                                {
                                    'type': 'TextBlock',
                                    'text': 'Fill the following form',
                                    'speak': '<s>Please fill out the following form</s>',
                                    'weight': 'bolder',
                                    'size': 'large'
                                },
                                {
                                    'type': 'TextBlock',
                                    'text': 'Please specify the business need',
                                    'weight': 'bolder'
                                },
                                {
                                    'type': 'Input.Text',
                                    'id': 'business_need',
                                    'speak': '<s>Please specify the business need for the tivoli monitoring request</s>',
                                    'style': 'text'
                                },
                                {
                                    'type': 'TextBlock',
                                    'text': 'Name',
                                    'weight': 'bolder'
                                },
                                {
                                    'type': 'Input.Text',
                                    'id': 'name',
                                    'speak': '<s>Please enter your name</s>'
                                },
                                {
                                    'type': 'TextBlock',
                                    'text': 'Project Name',
                                    'weight': 'bolder'
                                },
                                {
                                    'type': 'Input.Text',
                                    'id': 'project_name',
                                    'speak': '<s>Please enter your project name</s>'
                                },
                                {
                                    'type': 'TextBlock',
                                    'text': 'Manager\'s Name',
                                    'weight': 'bolder'
                                },
                                {
                                    'type': 'Input.Text',
                                    'id': 'manager_name',
                                    'speak': '<s>Please enter your manager\'s name</s>'
                                },
                                {
                                    'type': 'TextBlock',
                                    'text': 'Source IP Address',
                                    'weight': 'bolder'
                                },
                                {
                                    'type': 'Input.Text',
                                    'id': 'source_ip',
                                    'speak': '<s>Please enter your Source IP Address</s>'
                                },
                                {
                                    'type': 'TextBlock',
                                    'text': 'Destination IP Address',
                                    'weight': 'bolder'
                                },
                                {
                                    'type': 'Input.Text',
                                    'id': 'destination_ip',
                                    'speak': '<s>Please enter your Destination IP Address</s>'
                                },
                                {
                                    'type': 'TextBlock',
                                    'text': 'Port Address',
                                    'weight': 'bolder'
                                },
                                {
                                    'type': 'Input.Text',
                                    'id': 'port',
                                    'speak': '<s>Please enter port address</s>'
                                },
                            ],
                            'actions': [
                                {
                                    'type': 'Action.Submit',
                                    'title': 'Submit',
                                    'speak': '<s>Submit</s>',
                                    'data': {
                                        'type': 'tivoliRequest'
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        };

    var msg = new builder.Message(session).addAttachment(card);
    session.send(msg);
});

/*
// Help
bot.dialog('support', require('./support'))
    .triggerAction({
        matches: [/help/i, /support/i, /problem/i]
    });
*/

// log any bot errors into the console
bot.on('error', function (e) {
    console.log('And error ocurred', e);
});


function processSubmitAction(session, value) {
    var defaultErrorMessage = 'Please complete all the search parameters';
    console.log(value.type);

    switch (value.type) {
        case 'remedyRequest':
            // Search, validate parameters
            var s = validateRemedyRequest(value);
            if (s != '') {
                // proceed to search
                
                var arr = s.split('|');
                MongoClient.connect(url,function(err,db) {
                    if (err) throw err;
                    db.collection("remedyRequest").insert([{name:arr[0], project:arr[1], manager:arr[2], businessNeed:arr[3], 
                        sourceIP:arr[4], destinationIP:arr[5],port:arr[6]}]);
                    console.log("inserted data");
                    db.close();
                });
                session.beginDialog('remedySubmit', value);
            } else {
                session.send(defaultErrorMessage);
            }
            break;

        case 'tivoliRequest':
            var s = validateTivoliRequest(value);
            if (s != '') {

                var arr = s.split('|');
                MongoClient.connect(url,function(err,db) {
                    if (err) throw err;
                    db.collection("tivoliRequest").insert([{name:arr[0], project:arr[1], manager:arr[2], businessNeed:arr[3], 
                        sourceIP:arr[4], destinationIP:arr[5],port:arr[6]}]);
                    console.log("inserted data");
                    db.close();
                });
                session.beginDialog('tivoliSubmit', value);
            } else {
                session.send(defaultErrorMessage);
            }
            break;

        default:
            // A form data was received, invalid or incomplete since the previous validation did not pass
            session.send(defaultErrorMessage);
    }
}

function validateRemedyRequest(remedyRequest) {
    if (!remedyRequest) {
        return false;
    }

    // Business Need
    var empBusinessNeed = (typeof remedyRequest.business_need === 'string' && remedyRequest.business_need != '');

    // Name
    var empName = (typeof remedyRequest.name === 'string' && remedyRequest.name != '');//Date.parse(remedyRequest.checkin);

    // Project Name
    var empProject = (typeof remedyRequest.project_name === 'string' && remedyRequest.project_name != '');

    // Manager's Name
    var empManager = (typeof remedyRequest.manager_name === 'string' && remedyRequest.manager_name != '');

    // SourceIP
    var empSourceIP = (typeof remedyRequest.source_ip === 'string' && remedyRequest.source_ip != '');

    // DestinationIP
    var empDestinationIP = (typeof remedyRequest.destination_ip === 'string' && remedyRequest.destination_ip != '');

    // Port
    var empPort = (typeof remedyRequest.port === 'string' && remedyRequest.port  != '');

    if(empBusinessNeed && empName && empProject && empManager && empSourceIP && empDestinationIP && empPort)
        return (remedyRequest.name + '|' + remedyRequest.project_name + '|' + remedyRequest.manager_name + '|' + 
                remedyRequest.business_need + '|' + remedyRequest.source_ip + '|' + remedyRequest.destination_ip + 
                '|' + remedyRequest.port + 'abc');
    else return '';
}

function validateTivoliRequest(tivoliRequest) {
    if (!tivoliRequest) {
        return false;
    }

    // Business Need
    var empBusinessNeed = (typeof tivoliRequest.business_need === 'string' && tivoliRequest.business_need != '');

    // Name
    var empName = (typeof tivoliRequest.name === 'string' && tivoliRequest.name != '');//Date.parse(tivoliRequest.checkin);

    // Project Name
    var empProject = (typeof tivoliRequest.project_name === 'string' && tivoliRequest.project_name != '');

    // Manager's Name
    var empManager = (typeof tivoliRequest.manager_name === 'string' && tivoliRequest.manager_name != '');

    // SourceIP
    var empSourceIP = (typeof tivoliRequest.source_ip === 'string' && tivoliRequest.source_ip != '');

    // DestinationIP
    var empDestinationIP = (typeof tivoliRequest.destination_ip === 'string' && tivoliRequest.destination_ip != '');

    // Port
    var empPort = (typeof tivoliRequest.port === 'string' && tivoliRequest.port  != '');

    if(empBusinessNeed && empName && empProject && empManager && empSourceIP && empDestinationIP && empPort)
        return (tivoliRequest.name + '|' + tivoliRequest.project_name + '|' + tivoliRequest.manager_name + '|' + 
                tivoliRequest.business_need + '|' + tivoliRequest.source_ip + '|' + tivoliRequest.destination_ip + 
                '|' + tivoliRequest.port);
    else return '';
}


bot.dialog('remedySubmit', [
    function(session){
        session.send('Thank You. Your request has been submitted. We will reach you shortly.');

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    }]);

bot.dialog('tivoliSubmit', [
    function(session){
        session.send('Thank You. Your request has been submitted. We will reach you shortly.');

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    }]);
