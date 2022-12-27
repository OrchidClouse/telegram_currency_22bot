const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
let url = 'https://v6.exchangerate-api.com/v6/api-token/latest/USD';
const token = 'telegram token';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/start/, function(msg){
    bot.sendMessage(msg.from.id, `
    commands:
    /convert - convert currencies, usage: /convert <from> <to> <amount>
    (To use, specify the name of the currency in 3 characters. For example: /convert USD EUR 100)
    /info - info about the bot`);
});

bot.onText(/convert (.+) (.+) (.+)/, function(msg, match){
    const from = match[1].toUpperCase();
    const to = match[2].toUpperCase();
    const value = match[3];
    const updateUrl = url.replace(url.substring(67,70), from);
request.get(
    updateUrl,
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let parsed_response = JSON.parse(body);
            let result = parsed_response['conversion_rates'][from] * parsed_response['conversion_rates'][to];
            bot.sendMessage(msg.from.id, Math.round(result * value));
        }
    }
);
});

bot.onText(/info/, function(msg){
    bot.sendMessage(msg.from.id, `
    Provider: https://www.exchangerate-api.com

    Developed by: @froyaroom
    `)
});
