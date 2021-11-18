const TeleBot = require('telebot')
const { exec } = require('child_process')
const { send_log, query, count } = require('./query.js')
require('dotenv').config()

const token = process.env.API_KEY
const bot = new TeleBot(token)

bot.on(['/start', '/hello'], (msg) => msg.reply.text('به سریع ترین بات موزیک تلگرام خوش اومدی😉✅ \n اسم موزیک یا لینک یوتوبشو برام بفرست و خودت نتیجه رو ببین‼️🔞 \n اگه حال کردی مارو به دوستات معرفی کن♥️'))

bot.on('/donate', (msg) => msg.reply.text(' [>] https://www.paypal.me/znightfuryz \n [IRAN]> https://idpay.ir/nelody'))

bot.on('/joom', msg => {
    if (msg.from.id === 111733645 || msg.from.id === 214619416)
        msg.reply.text(`All ${count.all} | Success ${count.success}`)
})

bot.on('text', async (msg) => {
    if (['/joom', '/donate', '/start', '/hello'].includes(msg.text)) return

    query(bot, msg)
})

bot.start()

// Interval Test Log
setInterval(() => {
    const chatID = -1001749065212
    const time = new Date().toUTCString()
    const video_url = "https://www.youtube.com/watch?v=YLk3sNjrutA"

    exec(`python3 downloader.py "${video_url}" "${chatID}" "${chatID}"`, (err, stdout, stderr) => {
        if (stderr)
            send_log(bot, `Error: ${time}\n\n${stderr}`)
        else if (err)
            send_log(bot, `Error: ${time}\n\n${err}`)
        else {
            exec(`rm storage/${chatID}*`, () => {
                bot.sendMessage(chatID, `Heartbeat: ${time}`)
            })
        }
    })
}, 30 * 60 * 1000)