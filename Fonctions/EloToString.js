

/*
    Function [
        tier BRONZE , rank II , lp 25

        -> Bronze II 25 Lps
    ]
*/
module.exports = (tier, rank, lp) =>{


    let str ='';

    str += tier.charAt(0)
    str += (tier.substring(1)).toLowerCase()
    str+= ` ${rank}`
    str+= ` ${lp} Lps`

    return str
}
