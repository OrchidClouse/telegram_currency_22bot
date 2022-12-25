const TelegramBot = require('node-telegram-bot-api');

const token = '5877705613:AAFBg2PN_qoTLaYciKfOsVWhMVdLjyU9Vfk';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/greet/, function greeting(msg){
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет!')
  });
