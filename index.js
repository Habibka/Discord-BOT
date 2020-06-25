const Discord = require("discord.js");
const {
    prefix,
    token,
    giyphyToken,
    meaning_of_life
} = require("./config.json");
const client = new Discord.Client();
const GphApiClient = require("giphy-js-sdk-core")
giphy = GphApiClient(giyphyToken);



client.once("ready", () => {
    console.log("Ready!")
})
let meme

// sending meme on interval

setInterval(function () {
    meme = client.channels.cache.get("723043219255984138")


    meme.send(giphy.search('gifs', {
            "q": "fail"
        })
        .then((response) => {
            let totalResponses = response.data.length;
            let responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
            let responseFinal = response.data[responseIndex];

            meme.send("test brata", {
                files: [responseFinal.images.fixed_height.url]
            })
        }).catch(() => {
            meme.send("greshka brat");
        }))
}, 1000 * 60 * 60)
// sending meme when you time a !meme


client.on("message", message => {

    if (message.content.startsWith(`${prefix}meme`)) {
        giphy.search('gifs', {
                "q": "fail"
            })
            .then((response) => {
                let totalResponses = response.data.length;
                let responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                let responseFinal = response.data[responseIndex];

                message.channel.send("test brata", {
                    files: [responseFinal.images.fixed_height.url]
                })
            }).catch(() => {
                message.channel.send("greshka brat");
            })
    }

    // kick a member
    if (message.member.hasPermission([`KICK_MEMBERS`, `BAN_MEMBERS`])) {
        if (message.content.startsWith(`${prefix}kick`)) {
            let member = message.mentions.members.first();
            member.kick().then((member) => {
                message.channel.send("trqbva da e kiknat nqkoi")
            }).catch(() => {
                message.channel.send("dai nqkvo ima kato horata")
            })
        }
    }



    //For kick 
    //if (message.member.hasPermission([`KICK_MEMBERS`, `BAN_MEMBERS`])) {
    // console.log(message.content);

    // if (message.content.startsWith(`${prefix}kick`)) {
    // message.channel.send(`This server name is: ${message.guild.name}`)

    //   let member = message.mentions.members.first();
    //  member.kick().then((member) => {

    //   giphy.search('gifs', {"q": "fail"})
    //  .then((response) => {
    //     let totalResponses = response.date.length;
    //      let responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
    //      let responseFinal = response.date[responseIndex];

    //   message.channel.send(":wave: " + member.displayName + " has been kicked!", {
    //       files: [responseFinal.images.fixed_height.url]
    //   })
    //  }).catch(()=> {
    //      message.channel.send("WTF")
    //  })
    //  })
    // } else {
    //      message.channel.send("WTF dude");
    //  }
    //}
})

client.login(token);