const moment = require('moment');
require("moment-duration-format");
module.exports = async client => {
  try {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
    client.user.setStatus("iddle");
    setInterval(() => {
      const oynuyor = client.ayarlar.readyFooter;
      const index = Math.floor(Math.random() * (oynuyor.length));
      client.user.setActivity(`${oynuyor[index]}`, { type: "STREAMING", url: "https://www.twitch.tv/ramalaz"
      });
    }, 10000);
  } catch (err) {}


};
