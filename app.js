// const express = require('express');
const http = require('http');
const path = require('path');
const restify = require('restify');
const builder = require('botbuilder');
const botbuilder_azure = require('botbuilder-azure');

// Create HTTP server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   // console.log('%s listening to %s', server.name, server.url); 
    console.log(`\n${ server.name } listening to ${ server.url }`);
    console.log(`\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator`);
    console.log(`\nTo talk to your bot, open loggerBot.bot file in the Emulator`);
});

require('dotenv-extended').load();

// Create chat connector for communicating with the Bot Framework Service
let connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId, //'c150192f-48d3-4bc5-82b0-1f0f9abb258f',
    appPassword: process.env.MicrosoftAppPassword, //'warTCL96+)ejurFGVP904|)',
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Hello World! in Bot
// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
// let bot = new builder.UniversalBot(connector, function (session) {
//     session.send("收到：%s，字串長度：%s", session.message.text, session.message.text.length);
// });

// Listen for messages from users 
server.post('/api/messages', connector.listen());

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var tableName = 'botdata';
// var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
// var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

// Create your bot with a function to receive messages from the user
// This default message handler is invoked if the user's utterance doesn't
// match any intents handled by other dialogs.
var bot = new builder.UniversalBot(connector, function (session, args) {
    session.send('You reached the default message handler. You said \'%s\'.', session.message.text);
});

// bot.set('storage', tableStorage);

// Make sure you add code to validate these fields
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v2.0/apps/' + luisAppId + '?subscription-key=' + luisAPIKey;

// Main dialog with LUIS
// Create a recognizer that gets intents from LUIS, and add it to the bot
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
bot.recognizer(recognizer);

// Add a dialog for each intent that the LUIS app recognizes.
// See https://docs.microsoft.com/bot-framework/nodejs/bot-builder-nodejs-recognize-intent-luis 
bot.dialog('GreetingDialog',
    (session) => {
        session.send('You reached the Greeting intent. You said \'%s\'.', session.message.text);
        session.endDialog();
    }
).triggerAction({
    matches: 'Greeting'
})

bot.dialog('HelpDialog',
    (session) => {
        session.send('You reached the Help intent. You said \'%s\'.', session.message.text);
        session.endDialog();
    }
).triggerAction({
    matches: 'Help'
})

bot.dialog('CancelDialog',
    (session) => {
        session.send('You reached the Cancel intent. You said \'%s\'.', session.message.text);
        session.endDialog();
    }
).triggerAction({
    matches: 'Cancel'
})

bot.dialog('QingjiaDialog',
    (session) => {
        session.send('You said \'%s\'.', session.message.text);
        session.endDialog();
    }
).triggerAction({
    matches: '請假'
})

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(1337, '127.0.0.1');
// console.log('Server running at http://127.0.0.1:1337/');

// class MainDialog 
// { 
//     // Previous Code Sample
    
//     async onTurn(turnContext) 
//     {
//         // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
//         if (turnContext.activity.type === ActivityTypes.Message) {
            
//             // Previous Code Sample
            
//             if (didBotWelcomeUser === false) 
//             {
//                 // Previous Code Sample
//             }
//             else 
//             {
//                 // This example hardcodes specific uterances. You should use LUIS or QnA for more advance language understanding.
//                 let text = turnContext.activity.text.toLowerCase();
//                 switch (text) 
//                 {
//                     case "hello":
//                     case "hi":
//                         await turnContext.sendActivity(`You said "${turnContext.activity.text}"`);
//                         break;
//                     case "intro":
//                     case "help":
//                     default :
//                         await turnContext.sendActivity(`This is a simple Welcome Bot sample. You can say 'intro' to 
//                                                         see the introduction card. If you are running this bot in the Bot 
//                                                         Framework Emulator, press the 'Start Over' button to simulate user joining a bot or a channel`);
//                     case "$$":
//                     	await turnContext.sendActivity('人進得來，貨出得去，智邦發大財');
//                 }
//             }
//         }
       
//        // Previous Sample Code
//     } 
// }

// LUIS

// require('dotenv').config();

// let request = require('request');
// let querystring = require('querystring');

// function getLuisIntent(utterance) {
//     let endpoint =
//     	"https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/";
//         // "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/";

//     // Set the LUIS_APP_ID environment letiable 
//     // to df67dcdb-c37d-46af-88e1-8b97951ca1c2, which is the ID
//     // of a public sample application.    
//     let luisAppId = '16d9d88d-f6a5-43f6-b4ab-62e710d56458';

//     // Set the LUIS_SUBSCRIPTION_KEY environment letiable
//     // to the value of your Cognitive Services subscription key
//     let queryParams = {
//         "subscription-key": '239aedd1b455497abf9eb26ed7068805',
//         "timezoneOffset": "0",
//         "verbose":  true,
//         "q": utterance
//     }

//     let luisRequest =
//         endpoint + luisAppId +
//         '?' + querystring.stringify(queryParams);

//     request(luisRequest,
//         function (err,
//             response, body) {
//             if (err)
//                 console.log(err);
//             else {
//                 let data = JSON.parse(body);

//                 console.log(`Query: ${data.query}`);
//                 console.log(`Top Intent: ${data.topScoringIntent.intent}`);
//                 console.log('Intents:');
//                 console.log(data.intents);
//             }
//         });
// }

// // Pass an utterance to the sample LUIS app
// getLuisIntent('turn on the left light');