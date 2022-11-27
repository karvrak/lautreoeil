const fs = require("fs")

module.exports = async bot => {
    
    fs.readdirSync("./Events").filter(f => f.endsWith(".js")).forEach(async file => {
        
        let event = require(`../Events/${file}`)
        bot.on(file.split(".js").slice(0,-1), event.bind(null, bot))
        console.log(`Events ${file.split(".js").slice(0,-1)} Loaded`)
    })
}
