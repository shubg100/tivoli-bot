var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 5627, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "65e38b0f-c734-452a-8a9b-e65eeec5d762",
    appPassword: "mhdiSH550]~=:wraLOWUK03"
});

server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector);

bot.dialog('/', function(session){
    session.send('You said <b>' + session.message.text + '<b>');
});