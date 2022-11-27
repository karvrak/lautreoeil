

module.exports = (oldElo, newElo) =>{

    var elo= [

        'Challenger',
        'Grandmaster',
        'Master',
        'Diamond',
        'Platinum',    
        'Gold',
        'Silver',
        'Bronze',
        'Iron'
    ]
    
    var roman = [
        'I',
        'II',
        'III',
        'IV'
    ]

    var oldSplit = oldElo.split(' ');
    var oldTier
    var oldRank
    var oldLp = parseInt(oldSplit[2])

    var newSplit = newElo.split(' ');
    var newTier
    var newRank
    var newLp = parseInt(newSplit[2])
    
   
    for (var i = 0 ; i < elo.length ; i++) {
        if(elo[i] === oldSplit[0]){
            oldTier = i;
        }
    }

    for (var i = 0 ; i < roman.length ; i++) {
        if(roman[i] === oldSplit[1]){
            oldRank = i;
        }
    }

    for (var i = 0 ; i < elo.length ; i++) {
        if(elo[i] === newSplit[0]){
            newTier = i;
        }
    }

    for (var i = 0 ; i < roman.length ; i++) {
        if(roman[i] === newSplit[1]){
            newRank = i;
        }
    }


    var str ='null'
    if(newTier < oldTier){

        str = `${elo[newTier]} ${roman[newRank]} ${newLp} Lps`;

    }else if ( newRank < oldRank ){

        str = `${elo[oldTier]} ${roman[newRank]} ${newLp} Lps`;

    }else if ( newLp > oldLp ){

        str = `${elo[oldTier]} ${roman[oldRank]} ${newLp} Lps`;

    }
    // Bronze II 25 Lps

    return str
}