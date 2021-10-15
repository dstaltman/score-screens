"use strict"

import './jquery-3.6.0.min.js';
const $ = window.$;
import { testdata } from './testdata.js';

function capitalize(s) {
    if (typeof s !== 'string')
        return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

// data is in json. We know the format ahead of time rather than
// figure it all out from some lookup. Mostly it will be field name
// applies to 'id' in some format based on lef/right player
export function populateAoSScoreData(data) {
    let playerNames = [ 'left', 'right' ];
    let topLevelNames = [
        'armyName',
        'totalScore',
        'grandStrategyName',
        'grandStrategyScore'
    ];
    let aosRoundScoreTableName = 'aosRoundScores';
    let aosRoundNames = [
        'primaryScore',
        'secondaryName',
        'secondaryScore',
        'bonusScore'
    ];

    playerNames.forEach(playerString  => {
        topLevelNames.forEach(dataLabelName => {
            var id = "#" + playerString + capitalize(dataLabelName);
            //console.log(id + ": " + data[playerString][dataLabelName]);
            $(id).html(data[playerString][dataLabelName]);
        });
        var roundNumber = 1;
        for (let roundData of data[playerString][aosRoundScoreTableName]) {
            aosRoundNames.forEach(roundName => {
                var id = "#" + playerString + capitalize(roundName) + roundNumber;
                //console.log(id + ": " + roundData[roundName]);
                $(id).html(roundData[roundName])
            });
            roundNumber++;
        }
    });
}

populateAoSScoreData(testdata);