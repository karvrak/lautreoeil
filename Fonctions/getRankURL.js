
const tierlist = require('../assets/leagueRank/rankpng');
/*
    Function [
        tier BRONZE , rank II , lp 25

        -> Bronze II 25 Lps
    ]
*/
module.exports = (tier) =>{


    switch(tier) {
        case 'IRON':
            return tierlist.iron;
        case 'BRONZE':
            return tierlist.bronze;
        case 'SILVER':
            return tierlist.silver;
        case 'GOLD':
            return tierlist.gold;
        case 'PLATINUM':
            return tierlist.platinum;
        case 'DIAMOND':
            return tierlist.diamond;
        case 'MASTER':
            return tierlist.master;
        case 'GRANDMASTER':
            return tierlist.grandmaster;
        case 'CHALLENGER':
            return tierlist.challenger;
    }

}
