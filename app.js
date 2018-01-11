var restify = require('restify');
var builder = require('botbuilder');
var util = require('util');
var request = require('request');
var dateFormat = require('dateformat');
var moment = require('moment-timezone');
var randnum = require('random-number-between');
var emoji = require('node-emoji');
var mongodb = require('mongodb');

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
var MongoClient = mongodb.MongoClient;
//var url = "mongodb://0.0.0.0:27017/shbm_test";
var url = "mongodb://fplmongodb:0PpoJZCtQJJi6ficNyLHYkK8ywZY8qumIwGp9aXl3sl6zBIemxVEPOJL2ldblFpT5Gtp1Q3lPd7BgCp68odWUg==@fplmongodb.documents.azure.com:10255/DB?ssl=true&sslverifycertificate=false";

var Grid = mongodb.Grid;

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "65e38b0f-c734-452a-8a9b-e65eeec5d762",
    appPassword: "mhdiSH550]~=:wraLOWUK03"
});

server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector);

//LUIS Details
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/4dd2ff5b-e667-45db-a0ee-f8dbc33c1574?subscription-key=f881dc2522724445aeb8914560e6e563&verbose=true&timezoneOffset=0&q=';

// This Url can be obtained by uploading or creating your model from the LUIS portal: https://www.luis.ai/
// for fixing default message issue
var recognizer = new builder.LuisRecognizer(model).onEnabled((context, callback) => {
	var enabled = context.dialogStack().length === 0;
	callback(null, enabled);
});

bot.recognizer(recognizer);

//getString()
function getString() {
    //session.endDialog();
    console.log("i am in getString function");
    var rand = randnum(0, 5, 1);
    var retrymessage = ['Kindly select from below options only', 'Sorry its an invalid choice, request you select from below options only', 'Ohh you made a wrong selection, kindly select from below options only','Can you please try once More by selecting from below options', 'Hey, I think you selected an incorrect option, please select one of the following', 'Hey you made an incorrect choice, request you to select from below options only'];
    return retrymessage[rand];
};

function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

// Conversation Start
bot.on('conversationUpdate', function(message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function(identity) {
            if (identity.id === message.address.bot.id) {
                bot.beginDialog(message.address, '/startup');
                console.log("conversation")
            }
        });
    }
});

bot.dialog('/startup', [
    function(session) {
    session.privateConversationData = {};
    /////////mukesh
     var now = new Date();
        var currentdate = dateFormat(now, "isoDateTime");
        //var currentday = dateFormat(now, "dddd");
        var jun = moment(currentdate);
        var datetime = jun.tz('America/New_York').format('dddd MMM DD YYYY hh:mm:ss A hh');
        console.log(datetime)
        var datetime1 = datetime.split(' ')
        var currentday = datetime1[0]  //saturday
        var mm = datetime1[5]           
        var time = datetime1[6]
         session.privateConversationData.time_of_day = datetime1[5]
        session.privateConversationData.time_digit = datetime1[6] 
        console.log(session.privateConversationData.time_digit, session.privateConversationData.time_of_day);
        if ((session.privateConversationData.time_of_day == 'AM') && ((session.privateConversationData.time_digit === "01") || (session.privateConversationData.time_digit === "02") || (session.privateConversationData.time_digit === "03") ||(session.privateConversationData.time_digit === "12"))) {
            session.send("Hi, Good Evening !! ");
        } else if ((session.privateConversationData.time_of_day == 'AM') && ((session.privateConversationData.time_digit === "04") || (session.privateConversationData.time_digit === "05") || (session.privateConversationData.time_digit === "06") || (session.privateConversationData.time_digit === "07") || (session.privateConversationData.time_digit === "08") || (session.privateConversationData.time_digit === "09") || (session.privateConversationData.time_digit === "10") || (session.privateConversationData.time_digit === "11"))) {
            session.send("Hi, Good Morning !! ");
        } else if ((session.privateConversationData.time_of_day == 'PM') && ((session.privateConversationData.time_digit === "01") || (session.privateConversationData.time_digit === "02") || (session.privateConversationData.time_digit === "03"))) {
            session.send("Hi, Good Afternoon !! ");
        } else if ((session.privateConversationData.time_of_day == 'PM') && ((session.privateConversationData.time_digit === "04") || (session.privateConversationData.time_digit === "05") || (session.privateConversationData.time_digit === "6") || (session.privateConversationData.time_digit === "7") || (session.privateConversationData.time_digit === "8") || (session.privateConversationData.time_digit === "9") || (session.privateConversationData.time_digit === "10") || (session.privateConversationData.time_digit === "11"))) {
            session.send("Hi, Good Evening !! ");
        }
        /* session.send("This is **Neeva** your Virtual Assistant. We will be providing you the following services.\n1. **WMS**\n2. **Firewall**\n3. **Outlook/Remote Access Support**");   
        session.send("Incase you want to come out of any services please type **Main Menu** \nTo end the conversation at any point type **Exit**")  ;   
        session.beginDialog('/Loginbot'); */
                //builder.Prompts.choice(session, "Welcome to FPL Intelligent Bot Services. Please choose one of the services", ['WMS', 'Firewall','Outlook/Remote Access\nSupport'], {
                builder.Prompts.choice(session, "This is **Neeva** your Virtual Assistant. We will be providing you the following services.\n1. **WMS**\n2. **Firewall**\n3. **Outlook/Remote Access Support**\n4. **Tivoli** \n\nIncase you want to come out of any services please type **Main Menu** \nTo end the conversation at any point type **Exit**. \nPlease choose one of the services", ['WMS', 'Firewall','Outlook/Remote Access\nSupport', 'Tivoli'], {
            retryPrompt: getString(),
            listStyle: builder.ListStyle.button,
            maxRetries: 2
        });
            
    },
    function(session, results) {
        if (results.response) {
            console.log('sfksdh', results.response)
            var selection = results.response.entity;
            // route to corresponding dialogs
            switch (selection) {
                case "WMS":
                    session.endDialog();
                    session.replaceDialog('/wmsinitiate');
                    break;
                case "Firewall":
                    //session.send(msg);
                    session.endDialog();
                    session.replaceDialog('/Firewall');
                    break;
                case "Outlook/Remote Access\nSupport":
                    session.endDialog();
                    session.replaceDialog('/ITSupport');
                    break;
                case "Tivoli":
                    session.endDialog();
                    session.replaceDialog('/Tivoli');
                    break;
            }
        } else {
            session.endDialog();
            session.replaceDialog('/Greeting11');
        }
    }
]);


bot.dialog('/Greeting11', [
    function(session, args, next) {
        builder.Prompts.choice(session, "I am sorry. You have exceeded maximum number of attempts. Let us start over. Please choose one of the services", ['WMS', 'Firewall', 'Outlook/Remote Access\nSupport', 'Tivoli'], {
            retryPrompt: getString(),
            listStyle: builder.ListStyle.button,
            maxRetries: 2
        });
    },
    function(session, results) {
        if (results.response) {
            var selection = results.response.entity;
            // route to corresponding dialogs
            switch (selection) {
                case "WMS":
                    session.endDialog();
                    session.replaceDialog('/wmsinitiate');
                    break;
                case "Firewall":
                    //session.send(msg);
                    session.endDialog();
                    session.replaceDialog('/Firewall');
                    break;
                case "Outlook/Remote Access\nSupport":
                    session.endDialog();
                    session.replaceDialog('/Re-EnterITSupport');
                    break;
                case "Tivoli":
                    session.endDialog();
                    session.replaceDialog('/Tivoli');
                    break;
            }
        } else {

            session.endDialog();
            session.replaceDialog('/Greeting11');
        }
    }
]);

bot.dialog('/Tivoli', [
    function(session){
        builder.Prompts.choice(session, "How may I help you with Monitor Request", ["Drive Space Monitor Request", "File System - Space Free"], {
            retryPrompt: "Please choose among the following options",
            listStyle: builder.ListStyle.button,
            maxRetries: 2
        });
    },
    function(session, results){
        if (results.response) {
            // route to corresponding dialogs
            switch (results.response.entity) {
                case "Drive Space Monitor Request":
                    session.privateConversationData.requestType = "Drive Space Monitor";
                    session.replaceDialog('/requestType');
                    break;
                case "File System - Space Free":
                    session.privateConversationData.requestType = "File System Monitor";
                    session.replaceDialog('/requestType');;
                    break;
            }
        }
    }
]).triggerAction({matches: 'Tivoli'});

bot.dialog('/TivoliandExit', [
    function(session){
        builder.Prompts.choice(session, "How may I help you with Monitor Request", ["Drive Space Monitor Request", "File System - Space Free", "Exit"], {
            retryPrompt: "Please choose among the following options",
            listStyle: builder.ListStyle.button,
            maxRetries: 2
        });
    },
    function(session, results){
        if (results.response) {
            // route to corresponding dialogs
            switch (results.response.entity) {
                case "Drive Space Monitor Request" :
                    session.privateConversationData.requestType = "Drive Space Monitor";
                    session.replaceDialog('/requestType');
                    break;
                case "File System - Space Free" :
                    session.privateConversationData.requestType = "File System Monitor";
                    session.replaceDialog('/requestType');;
                    break;
                case "Exit" :
                    session.replaceDialog('/beforeExit');
                    break;
            }
        }
    }
]);

bot.dialog('/requestType', [
    function(session){
        builder.Prompts.choice(session, "Is this monitor setup for Single servers or Multiple servers?", ["Single Server", "Multiple Servers"], {
            retryPrompt: "Please choose among the following options",
            listStyle: builder.ListStyle.button,
            maxRetries: 2
        });
    },
    function(session, results){
        if(results.response){
            // route to corresponding dialogs
            switch (results.response.entity) {
                case "Single Server":
                     session.replaceDialog('/SingleServer');
                     break;
                case "Multiple Servers":
                     session.replaceDialog('/MultipleServers');;
                     break;
            }
        }
    }
]).triggerAction({matches: 'requestType'});
/*
bot.dialog('/FileSystem', [
    function(session){
        builder.Prompts.choice(session, "Is this monitor setup for Single servers or Multiple servers?", ["Single Server", "Multiple Servers"], {
            retryPrompt: "Please choose among the following options",
            listStyle: builder.ListStyle.button,
            maxRetries: 2
        });
    },
    function(session, results){
        if(results.response){
            // route to corresponding dialogs
            switch (results.response.entity) {
                case "Single Server":
                     session.replaceDialog('/SingleServerDS');
                     break;
                case "Multiple Servers":
                     session.replaceDialog('/MultipleServersDS');;
                     break;
            }
        }
    }
]).triggerAction({matches: 'Drive Space'});
*/
bot.dialog('/SingleServer', [
    function(session){
        // handle Submit button
        if (session.message && session.message.value) {
            // A Card's Submit Action obj was received
            processSubmitAction(session, session.message.value);
            return;
        }
        
        var card = {
            'contentType': 'application/vnd.microsoft.card.adaptive',
            'content': {
                '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
                'type': 'AdaptiveCard',
                'version': '1.0',
                'body': [
                {
                    'type': 'Container',
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
                'actions': 
                [
                    // Server Request Form
                    {
                        'type': 'Action.ShowCard',
                        'title': session.privateConversationData.requestType,
                        'size': 'stretch',
                        'wrap': true,
                        'card': {
                            'type': 'AdaptiveCard',
                            'body': [
                            {
                                'type': 'TextBlock',
                                'text': 'Fill the following form',
                                'weight': 'bolder',
                                'size': 'large'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Request Type',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.ChoiceSet',
                                'id': 'request_type',
                                'style': 'text',
                                'style': 'compact',
                                'choices': [
                                {
                                    'title': 'Add',
                                    'value': 'Add'
                                },
                                {
                                    'title': 'Modify',
                                    'value': 'Modify' 
                                },
                                {
                                    'title': 'Delete',
                                    'value': 'Delete' 
                                }
                                ]
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Server Type',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.ChoiceSet',
                                'id': 'server_type',
                                'style': 'text',
                                'style': 'compact',
                                'choices': [
                                {
                                    'title': 'Prod',
                                    'value': 'Prod'
                                },
                                {
                                    'title': 'Test',
                                    'value': 'Test' 
                                },
                                {
                                    'title': 'Dr',
                                    'value': 'Dr' 
                                },
                                {
                                    'title': 'QA',
                                    'value': 'QA' 
                                }
                                ]
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Host/Server Name',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'host_name'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'DIR Compress',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'dir_compress'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'DIR Delete',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'dir_delete'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'File Extension',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.ChoiceSet',
                                'id': 'file_extension',
                                'style': 'text',
                                'style': 'compact',
                                'choices': [
                                {
                                    'title': '.log',
                                    'value': '.log'
                                },
                                {
                                    'title': '.txt',
                                    'value': '.txt' 
                                }
                                ]
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Backup Server',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'backup_server'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Backup DIR',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'backup_dir'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Dr Host name',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'drhost_name'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Host/Server ALIAS Name',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'alias'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Server OS',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.ChoiceSet',
                                'id': 'server_os',
                                'style': 'text',
                                'style': 'compact',
                                'choices': [
                                {
                                    'title': 'Linux',
                                    'value': 'Linux'
                                },
                                {
                                    'title': 'Unix',
                                    'value': 'Unix'
                                },
                                {
                                    'title': 'Windows',
                                    'value': 'Windows' 
                                }
                                ]
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Monitor Information',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.ChoiceSet',
                                'id': 'monitor_info',
                                'style': 'compact',
                                'choices': [
                                {
                                    'title': 'E Drive',
                                    'value': 'E'
                                },
                                {
                                    'title': 'F Drive',
                                    'value': 'F' 
                                }
                                ]
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Severity',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.ChoiceSet',
                                'id': 'severity',
                                'style': 'compact',
                                'choices': [
                                {
                                    'title': '2',
                                    'value': '2'
                                },
                                {
                                    'title': '3',
                                    'value': '3' 
                                },
                                {
                                    'title': '4',
                                    'value': '4' 
                                },
                                {
                                    'title': '5',
                                    'value': '5' 
                                }
                                ]
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Monitor Threshold Percentage',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Number',
                                'id': 'monitor_threshold'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Remedy Auto Tag',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'remedy_autotag'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Email ID Group Name',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'email_id_group'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Additional Information',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'add_info'
                            } 
                            ],
                            'actions': [
                            {
                                'type': 'Action.Submit',
                                'title': 'Submit',
                                'data': {
                                    'type': 'SingleServer'
                                }
                            }
                            ]
                        }
                    },
                    {
                        'type': 'Action.Submit',
                        'title': 'Cancel',
                        'data': 
                        {
                            'type': 'cancel'
                        }
                    },
                    {
                        'type': 'Action.Submit',
                        'title': 'Exit',
                        'data': 
                        {
                            'type': 'exit'
                        }
                    }
                ]
            }
        };

        session.privateConversationData.formName = "Tivoli Monitor Request";
        session.send('I can certailnly help you with that. Let me pull up the template for you.');
        session.send(new builder.Message(session).addAttachment(card));
        session.send('Waiting for inputs...');
    }
]);

bot.dialog('/MultipleServers', [
    function(session){
        // handle Submit button
        if (session.message && session.message.value) {
            // A Card's Submit Action obj was received
            processSubmitAction(session, session.message.value);
            return;
        }
        
        var card2 = {
            'contentType': 'application/vnd.microsoft.card.adaptive',
            'content': {
                '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
                'type': 'AdaptiveCard',
                'version': '1.0',
                'body': [
                {
                    'type': 'Container',
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
                                'size': 'small',
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
                                'weight': 'bolder',
                                'fontSizes': 'large',
                                'fontFamily': '"Comic Sans MS", cursive, sans-serif'
                            },
                            {
                                'type': 'TextBlock',
                                'text': "Welcome to Tivoli Monitoring",
                                'wrap': true,
                                'weight': 'bolder',
                                'fontSizes': 'large',
                                'fontFamily': '"Comic Sans MS", cursive, sans-serif'
                            }
                            ]
                        }
                        ]
                    }
                    ]
                }
                ],
                'actions': 
                [
                    // Server Request Form
                    {
                        'type': 'Action.ShowCard',
                        'title': session.privateConversationData.requestType,
                        'size': 'stretch',
                        'wrap': true,
                        'card': {
                            'type': 'AdaptiveCard',
                            'body': [
                            {
                                'type': 'TextBlock',
                                'text': 'Fill the following form',
                                'weight': 'bolder',
                                'size': 'large'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Request Type',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.ChoiceSet',
                                'id': 'request_type',
                                'style': 'text',
                                'style': 'compact',
                                'choices': [
                                {
                                    'title': 'Add',
                                    'value': 'Add'
                                },
                                {
                                    'title': 'Modify',
                                    'value': 'Modify' 
                                },
                                {
                                    'title': 'Delete',
                                    'value': 'Delete' 
                                }
                                ]
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Server Type',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.ChoiceSet',
                                'id': 'server_type',
                                'style': 'text',
                                'style': 'compact',
                                'choices': [
                                {
                                    'title': 'Prod',
                                    'value': 'Prod'
                                },
                                {
                                    'title': 'Test',
                                    'value': 'Test' 
                                },
                                {
                                    'title': 'Dr',
                                    'value': 'Dr' 
                                },
                                {
                                    'title': 'QA',
                                    'value': 'QA' 
                                }
                                ]
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Host/Server Name',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'host_name'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'DIR Compress',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'dir_compress'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'DIR Delete',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'dir_delete'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'File Extension',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.ChoiceSet',
                                'id': 'file_extension',
                                'style': 'text',
                                'style': 'compact',
                                'choices': [
                                {
                                    'title': '.log',
                                    'value': '.log'
                                },
                                {
                                    'title': '.txt',
                                    'value': '.txt' 
                                }
                                ]
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Backup Server',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'backup_server'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Backup DIR',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'backup_dir'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Dr Host name',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'drhost_name'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Host/Server ALIAS Name',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'alias'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Server OS',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.ChoiceSet',
                                'id': 'server_os',
                                'style': 'text',
                                'style': 'compact',
                                'choices': [
                                {
                                    'title': 'Linux',
                                    'value': 'Linux'
                                },
                                {
                                    'title': 'Unix',
                                    'value': 'Unix'
                                },
                                {
                                    'title': 'Windows',
                                    'value': 'Windows' 
                                }
                                ]
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Monitor Information',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.ChoiceSet',
                                'id': 'monitor_info',
                                'style': 'compact',
                                'choices': [
                                {
                                    'title': 'E Drive',
                                    'value': 'E'
                                },
                                {
                                    'title': 'F Drive',
                                    'value': 'F' 
                                }
                                ]
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Severity',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.ChoiceSet',
                                'id': 'severity',
                                'style': 'compact',
                                'choices': [
                                {
                                    'title': '2',
                                    'value': '2'
                                },
                                {
                                    'title': '3',
                                    'value': '3' 
                                },
                                {
                                    'title': '4',
                                    'value': '4' 
                                },
                                {
                                    'title': '5',
                                    'value': '5' 
                                }
                                ]
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Monitor Threshold Percentage',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Number',
                                'id': 'monitor_threshold'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Remedy Auto Tag',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'remedy_autotag'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Email ID Group Name',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'email_id_group'
                            },
                            {
                                'type': 'TextBlock',
                                'text': 'Additional Information',
                                'weight': 'bolder'
                            },
                            {
                                'type': 'Input.Text',
                                'id': 'add_info'
                            } 
                            ],
                            'actions': [
                            {
                                'type': 'Action.Submit',
                                'title': 'Submit',
                                'data': {
                                    'type': 'SingleServer'
                                }
                            }
                            ]
                        }
                    },
                    {
                        'type': 'Action.Submit',
                        'title': 'Cancel',
                        'data': 
                        {
                            'type': 'cancel'
                        }
                    },
                    {
                        'type': 'Action.Submit',
                        'title': 'Exit',
                        'data': 
                        {
                            'type': 'exit'
                        }
                    }
                ]
            }
        };

        session.privateConversationData.formName = "Tivoli Monitor Request";
        session.send('I can certailnly help you with that. Let me pull up the template for you.');
        session.send(new builder.Message(session).addAttachment(card2));
        session.send('Waiting for inputs\.\.\.');
    }
]);

bot.dialog('/sendConfirmationCard', [
    function (session) {
        // create the card based on selection
        var card;
        if(session.privateConversationData.requestType == "Drive Space Monitor"){
            card = createHeroCard(session, 'Tivoli Monitoring', 'Drive Space Monitor', '_Here you go, your new Monitor request has been created!!\nYour ticket number is __#SR' + randomString(5) + '___', 'https://upload.wikimedia.org/wikipedia/en/5/56/2015_Florida_Power_%26_Light_Logo.png');
        }
        else if(session.privateConversationData.requestType == "File System Monitor"){
            card = createHeroCard(session, 'Tivoli Monitoring', 'File System Monitor', '_Here you go, your new Monitor request has been created!!\nYour ticket number is __#SR' + randomString(5) + '___', 'https://upload.wikimedia.org/wikipedia/en/5/56/2015_Florida_Power_%26_Light_Logo.png');
        }

        // attach the card to the reply message
        var msg = new builder.Message(session).addAttachment(card);
        session.send(msg);
        session.beginDialog('/AnythingMore');
    }
]);

bot.dialog('/AnythingMore', [
    function(session){
        builder.Prompts.choice(session, "How may I help you more on Tivoli Services?", ["Drive Space Monitor Request", "File System - Space Free", "No"], {
            retryPrompt: "Please choose among the following options",
            listStyle: builder.ListStyle.button,
            maxRetries: 2
        });
    },
    function(session, results){
        switch(results.response.entity){
            case "Drive Space Monitor Request": 
                session.replaceDialog('/DriveSpace');
                break;
            case "File System - Space Free": 
                session.replaceDialog('/Tivoli');
                break;
            case "No":  
                session.replaceDialog('/beforeExit');
                break;
        }
    }
]);

bot.dialog('/Feedback', [
    function(session){
        builder.Prompts.text(session, 'Overall, How would you rate the service you received during this contact with bot?');
    },
    function(session, results){
        session.send('Thank you for your valuable feedback.\nI\'m still learning and I believe I will be able to provide a better service next time.');
    }
]);

bot.dialog('/cancelForm',[
    function(session){
        builder.Prompts.choice(session, "Are you sure you want to quit __" + session.privateConversationData.formName + "__ form?", "Yes|No",{
            retryPrompt: "Please choose among the following",
            listStyle: builder.ListStyle.button,
            maxRetries: 2
        });
    },
    function(session, results){
    console.log(session.privateConversationData.formName);
        switch(results.response.entity){
            case 'Yes': 
                session.privateConversationData.requestType = "";
                session.replaceDialog('/TivoliandExit');
                break;
            case 'No' : 
                if(session.privateConversationData.formName == "Tivoli Monitor Request"){
                    session.replaceDialog("/SingleServer");
                }/*
                else if(session.privateConversationData.formName=="Firewall Request Form"){
                    session.replaceDialog("/new_firewall_request");
                }
                else if(session.privateConversationData.formName=="New Firewall Request Additional Info Form"){
                    session.replaceDialog('/new_firewall_rest_info_request');
                }*/   
                break;              
        }
    }
]);

bot.dialog('tivoliSubmit', [
    function(session){
        session.send('Thank You. Your request has been submitted. We will reach out shortly.');

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
        session.replaceDialog('/sendConfirmationCard');
    }
]);

bot.dialog('/beforeExit', [
    function(session){
        builder.Prompts.choice(session, "Before we exit, Would you like to try the other services?", ["WMS", "Firewall", "Outlook/Remote Access\n Support", "Exit"], {
            retryPrompt: "Please choose among the following options",
            listStyle: builder.ListStyle.button,
            maxRetries: 2
        });
    },
    function(session, results){
        switch(results.response.entity){
            case 'WMS' :
                break;
            case 'Firewall' :
                break;
            case 'Outlook/Remote Access\n Support' :
                break;
            case "Exit" :
                session.replaceDialog('/Exit');
                break;
        }
    }
])

bot.dialog('/Exit', [
    function(session) 
    {
        console.log('in exit intent !!!!!!!!!!');
        session.send('Exiting...');
        session.endDialog();
        session.replaceDialog('/Gettingfeedback');
    }
]).triggerAction({
    matches: 'Exit',
    intentThreshold:0.60
});

//Gettingfeedback Dialog
bot.dialog('/Gettingfeedback', [
    function(session) {
        console.log("in Feedback");
        //console.log("in Feedback******",session);
        var feed1 = emoji.emojify(':star2: :star2: :star2: :star2: :star2:')
        var feed2 = emoji.emojify(':star2: :star2: :star2: :star2:')
        var feed3 = emoji.emojify(':star2: :star2: :star2:')
        var feed4 = emoji.emojify(':star2: :star2: ')
        var feed5 = emoji.emojify(':star2:')
        //Please rate me on the services provided ?
        //Please provide your feedback.Could you indicate your choice amongst the following?
        builder.Prompts.choice(session, "Overall, How would you rate the service you received during this chat with bot?", [feed1 + '\nExcellent', feed2 + '\nGood', feed3 + '\nOK', feed4 + '\nBad', feed5 + '\nTerrible'], {
            retryPrompt: getString(),
            listStyle: builder.ListStyle.button,
            maxRetries: 2
        });
    },
    function(session, results) {
        console.log(results.response.entity)
        //console.log(results.response.index)
        switch (results.response.index) {
            case 0:
                console.log("0", results.response.index)
                session.send("Thank you for your valuable feedback . I am happy that I was able to resolve your query with no concerns");
                // session.send("Thank you for Valuable Feedback");
                MongoClient.connect(url, function(err, db) {
                    if (err) {
                        throw (err);
                    }
                    console.log('1311', err);
                    console.log('1312', db);
                    db.collection('feedback_tivoli').insert([{userID: '12345', feedback: '5 Star'}]);
                    console.log("Connected correctly to server for intent update for Greeting");
                    
                    db.close();
                });
                session.endDialog();
                session.replaceDialog('/SubmitFeedback');
                break;
            case 1:
                console.log("1", results.response.index)
                session.send("Thank you for your valuable feedback . I am still learning and I am happy that I was able to resolve your query ");
                // session.send("Thank you for Valuable Feedback");
                MongoClient.connect(url, function(err, db) {
                    if (err) {
                        throw (err);
                    }
                    db.collection('feedback_tivoli').insert([{userID: '12345', feedback: '4 Star'}]);
                    console.log("Connected correctly to server for intent update for Greeting");
                    db.close();
                });
                //session.endConversation();
                //session.end();
                session.endDialog();
                session.replaceDialog('/SubmitFeedback');
                break;
            case 2:
                console.log("2", results.response.index)
                session.send("Thank you for your valuable feedback . I am still learning and I believe I will be able to service you better next time");
                // session.send("Thank you for Valuable Feedback");
                MongoClient.connect(url, function(err, db) {
                    if (err) {
                        throw (err);
                    }
                    db.collection('feedback_tivoli').insert([{userID: '12345', feedback: '3 Star'}]);
                    console.log("Connected correctly to server for intent update for Greeting");
                    db.close();
                });
                //session.endDialogWithResult();
                session.endDialog();
                session.replaceDialog('/SubmitFeedback');
                break;
            case 3:
                console.log("3", results.response.index)
                session.send("Thank you for your valuable feedback and it matters a lot . I am sorry that I am not able to provide the best service this time. I will notify my makers on training me better to serve you ahead. ");
                // session.send("Thank you for Valuable Feedback");
                MongoClient.connect(url, function(err, db) {
                    if (err) {
                        throw (err);
                    }
                    db.collection('feedback_tivoli').insert([{userID: '12345', feedback: '2 Star'}]);
                    console.log("Connected correctly to server for intent update for Greeting");
                    db.close();
                });
                session.endDialog();
                session.replaceDialog('/SubmitFeedback');
                break;
            case 4:
                console.log("4", results.response.index)
                session.send("Thank you for your valuable feedback  and it matters a lot . Sorry for the inconvenience. I am still learning and I will notify my support team on training me better on the topics that you needed help.");
                // session.send("Thank you for Valuable Feedback");
                MongoClient.connect(url, function(err, db) {
                    if (err) {
                        //console.log('Issue in connecting MONGODB at feedback case 4');                    
                        throw (err);
                    }
                    db.collection('feedback_tivoli').insert([{userID: '12345', feedback: '1 Star'}]);
                    console.log("Connected correctly to server for intent update for Greeting");
                    db.close();
                });
                session.endDialog();
                session.replaceDialog('/SubmitFeedback');
                break;
            default:
                console.log("3", results.response.index)
                session.endDialog();
                session.replaceDialog('/SubmitFeedback');
                break;
        }
        //session.replaceDialog('/Endconversation');
    }
]);

bot.dialog('/SubmitFeedback', function(session) {
    var msg = new builder.Message(session).addAttachment(feedback_form);
    console.log("session.message",session.message.value)
    if (session.message && session.message.value) {
        console.log(session.message.value)
        switch(session.message.value.type)
        {
            case 'OK' :
            session.send("Your feedback is valuable to us.");
            session.replaceDialog('/Endconversation');
            break;

            case 'Not_Interested' :  session.replaceDialog('/Endconversation');
            break;
        }
        return;                 
    }
    session.send(msg);
});

bot.dialog('/Endconversation', [
    function(session) {
        var now = new Date();
        var currentdate = dateFormat(now, "isoDateTime");
        var jun = moment(currentdate);
        var datetime = jun.tz('America/New_York').format('dddd MMM DD YYYY hh:mm:ss A hh');
        console.log(datetime)
        var datetime1 = datetime.split(' ')
        var currentday = datetime1[0]  //saturday
        var mm = datetime1[5]           //01 time
        var time = datetime1[6]
        
        if ((mm == 'PM') && (currentday == 'Friday')&&((time === "05") || (time === "04") || (time === "06") || (time === "03") || (time === "07"))) {
            console.log("Happy Weekend")
            setTimeout(function() {
                session.send('Thank you for using ***Next Era Energy Virtual Assistant***. Have a Happy Weekend');
                session.replaceDialog('/delete');
                session.endConversation();
            }, 1000);
               
        }
        
        else if ((mm == 'PM') && ((time === "12") || (time === "01") || (time === "02") || (time === "03") || (time === "04"))) {
            //session.send(" good Afternoon !! ");
            setTimeout(function() {
                session.send('Thank you for using ***Next Era Energy Virtual Assistant***. Have a great Day Ahead.');
                session.replaceDialog('/delete');
                session.endConversation();
            }, 1000);
            
            //session.send("Thank you for using FPL Intelligent Bot Services. Have a wonderful good afternoon");

        } 
        else if ((mm == 'PM') && ((time === "05") || (time === "06") || (time === "07") || (time === "08") || (time === "09") || (time === "10") || (time === "11"))) {
            //session.send(" good Evening !!");
            setTimeout(function() {
                session.send('Thank you for using ***Next Era Energy Virtual Assistant***. Have a Great Evening Ahead.');
                session.replaceDialog('/delete');
                session.endConversation();
            }, 1000);
            
            //session.send("Thank you for using FPL Intelligent Bot Services. Have a wonderful good evening");
        } 
        else if ((mm == 'AM') && ((time === "01") || (time === "02") || (time === "03") || (time === "12"))) {
            //session.send(" good Evening !!");
            setTimeout(function() {
                session.send('Thank you for using ***Next Era Energy Virtual Assistant***. Have a Great Evening Ahead.');
                session.replaceDialog('/delete');
                session.endConversation();
            }, 1000);
            
            
            //session.send("Thank you for using FPL Intelligent Bot Services. Have a wonderful good evening");
        } 
        else if ((mm == 'AM') && ((time === "04") || (time === "05") || (time === "06") || (time === "07") || (time === "08") || (time === "09") || (time === "10") || (time === "11"))) {
            //session.send(" good Morning !!");
            setTimeout(function() {
                session.send('Thank you for using ***Next Era Energy Virtual Assistant***. Have a Great Day Ahead. ')
                session.replaceDialog('/delete');
                session.endConversation();
            }, 1000);
            //session.replaceDialog('/delete');
            //session.endConversation();
            //session.send("Thank you for using FPL Intelligent Bot Services. Have a wonderful good morning");
        } 
        else {
            setTimeout(function() {
                session.send('Thank you for using ***Next Era Energy Virtual Assistant***. Have a wonderful time Ahead.');
                session.replaceDialog('/delete');
                session.endConversation();
            }, 1000);
        }
    }
]);

bot.dialog('/delete', function(session){
    session.privateConversationData = {};
    session.endDialog();
});

/*
// Help
bot.dialog('support', require('./support'))
    .triggerAction({
        matches: [/help/i, /support/i, /problem/i]
    });
*/

// log any bot errors into the console
bot.on('error', function (e){
    console.log('And error ocurred', e);
});


function processSubmitAction(session, value) {
    var defaultErrorMessage = 'Please complete all the search parameters';
    console.log(value.type);
    console.log(session.message);
    switch (value.type) {
        case 'SingleServer':
            console.log('Inside SingleServer');
            // Search, validate parameters
            var s = validateTivoliRequest(value);
            console.log(s);
            if (s != '') {
                // proceed to search
                
                var arr = s.split('|');
                MongoClient.connect(url,function(err,db) {
                    if (err) throw err;
                    db.collection("tivoliSingleServer").insert([{requestName:session.privateConversationData.requestType, requestType:arr[0], serverType:arr[1], host_serverName:arr[2], 
                    	DIRCompress:arr[3], DIRDelete:arr[4], fileExtension:arr[5], backupServer:arr[6], backupDIR:arr[7], drhostName:arr[8], alias:arr[9], 
                    	serverOS:arr[10], monitorInfo:arr[11], severity:arr[12], monitorThreshold:arr[13], remedyAutoTag:arr[14], 
                    	emailIDGroupName:arr[15], additionalInfo:arr[16]
                    }]);
                    console.log("inserted data");
                    db.close();
                });
                session.beginDialog('tivoliSubmit', value);
            } else {
                session.send(defaultErrorMessage);
            }
            
            break;

        case 'MultipleServers':
            console.log('Inside MultipleServers');
            // Search, validate parameters
            var s = validateTivoliRequest(value);
            console.log(s);
            if (s != '') {
                // proceed to search
                
                var arr = s.split('|');
                MongoClient.connect(url,function(err,db) {
                    if (err) throw err;
                    db.collection("tivoliMultipleServers").insert([{requestName:session.privateConversationData.requestType, requestType:arr[0], serverType:arr[1], host_serverName:arr[2], 
                    	DIRCompress:arr[3], DIRDelete:arr[4], fileExtension:arr[5], backupServer:arr[6], backupDIR:arr[7], drhostName:arr[8], alias:arr[9], 
                    	serverOS:arr[10], monitorInfo:arr[11], severity:arr[12], monitorThreshold:arr[13], remedyAutoTag:arr[14], 
                    	emailIDGroupName:arr[15], additionalInfo:arr[16]
                    }]);
                    console.log("inserted data");
                    db.close();
                });
                session.beginDialog('tivoliSubmit', value);
            } else {
                session.send(defaultErrorMessage);
            }
            
            break;

        case 'cancel':
            session.replaceDialog('/cancelForm');
            break;

        case 'exit':
            session.replaceDialog('/Exit');
            break;
        default:
            // A form data was received, invalid or incomplete since the previous validation did not pass
            session.send(defaultErrorMessage);
    }
}

function validateTivoliRequest(value) {
    if (!value) {
        console.log('false');
        return false;
    }

    console.log('Validating.......');
    console.log(value.request_type);
    
    if(typeof(value.dir_compress === 'string'))
        var val1 = formatInputs(value.dir_compress);
    if(typeof(value.dir_delete === 'string'))
        var val2 = formatInputs(value.dir_delete);
    if(typeof(value.dir_delete === 'string'))
        var val3 = formatInputs(value.backup_dir);
    
    console.log(val1 + "|" + val2 + "|" + val3 + "|");

    var a = (typeof value.request_type === 'string' && value.request_type != '');
    var b = (typeof value.server_type === 'string' && value.server_type != '');
    var c = (typeof value.host_name === 'string' && value.host_name != '');
    var d = (typeof value.dir_compress === 'string' && value.dir_compress != '') && /(?:[\w]\:)((\\|\/)[A-Za-z_\-\s0-9\.]+)+/.test(val1);
    var e = (typeof value.dir_delete === 'string' && value.dir_delete != '') && /(?:[\w]\:)((\\|\/)[A-Za-z_\-\s0-9\.]+)+/.test(val2);
    var f = (typeof value.file_extension === 'string' && value.file_extension != '');
    var g = (typeof value.backup_server === 'string' && value.backup_server != '');
    var h = (typeof value.backup_dir === 'string' && value.backup_dir != '') && (/(?:[\w]\:)((\\|\/)[A-Za-z_\-\s0-9\.]+)+/.test(val3));
    var i = (typeof value.drhost_name === 'string' && value.drhost_name != '');
    var j = (typeof value.alias === 'string' && value.alias != '');
    var k = (typeof value.server_os === 'string' && value.server_os != '');
    var l = (typeof value.monitor_info === 'string' && value.monitor_info != '');
    var m = (typeof value.severity === 'string' && value.severity != '');
    var n = (typeof value.monitor_threshold === 'string' && value.monitor_threshold != '');
    var o = (typeof value.remedy_autotag === 'string' && value.remedy_autotag != '');
    var p = (typeof value.email_id_group === 'string' && value.email_id_group != '');
    var q = (typeof value.add_info === 'string' && value.add_info != '');
    console.log(a+b+c+d+e+f+g+h+i+j+k+l+m);
    console.log(d,e,h);
    console.log(typeof(i));
    console.log(typeof(value.severity));


    if(a && b && c && d && e && f && g && h && i && j && k && l && m && n && o && p && q){
        return (value.request_type + '|' + value.server_type + '|' + value.host_name + '|' + value.dir_compress + '|' + value.dir_delete + '|' + 
        	value.file_extension + '|' + value.backup_server + '|' + value.backup_dir + '|' + value.drhost_name + '|' + value.alias + '|' + 
            value.server_os + '|' + value.monitor_info + '|' + value.severity + '|' + value.monitor_threshold + '|' + value.remedy_autotag + 
            '|' + value.email_id_group + '|' + value.add_info + '|');
        console.log('Returning values...');
    }
    else return '';
}

/*
bot.dialog('/card', function(session){
    // attach the card to the reply message
    var msg = new builder.Message(session).addAttachment(firewall_card);
    session.send(msg);
})
*/

function createHeroCard(session, title, subtitle, text, image) {
    return new builder.HeroCard(session)
        .title(title)
        .subtitle(subtitle)
        .text(text)
        .images([
            builder.CardImage.create(session, image)
        ]);
}

var feedback_form = {
        'contentType': 'application/vnd.microsoft.card.adaptive',
        'content': {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.0",
        "body": [
            {
                "type": "Container",
                "items": [
                    {
                        "type": "TextBlock",
                        "text": "Feedback Form",
                        "weight": "bolder",
                        "size": "medium"
                    },
                    {
                        "type": "ColumnSet",
                        "columns": [
                            {
                                "type": "Column",
                                "width": "auto",
                                "items": [
                                ]
                            },
                            {
                                "type": "Column",
                                "width": "stretch"

                            }
                        ]
                    }
                ]
            },
            {
                "type": "Container",
                "items": [
                    {
                        "type": "TextBlock",
                        "text": "Please provide your feedback",
                        "wrap": true
                    }
                ]
            }
        ],
        "actions": [
                {
                            "type": "Action.Submit",
                            "title": "Not Interested",
                            "data": {
                            "type": "Not_Interested"
                            }
                        
            },
            {
                "type": "Action.ShowCard",
                "title": "Comment",
                "card": {
                    "type": "AdaptiveCard",
                    "body": [
                        {
                            "type": "Input.Text",
                            "id": "comment",
                            "isMultiline": true,
                            "placeholder": "Enter your comment"
                        }
                    ],
                    "actions": [
                        {
                            "type": "Action.Submit",
                            "title": "Submit",
                            'data': {
                                'type': 'OK'
                            }
                        }
                    ]
                }
            }
        ]
    }

};


function formatInputs(input){
    var s="";
    var s1=input.trim();
    for(var i=0; i<s1.length; i++){
        s+=input.charAt(i);
        if(input.charAt(i)=="\\")
            s+="\\";
    }
    return s;
}