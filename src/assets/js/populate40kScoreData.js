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
export function populate40kScoreData(data) {
    // Update round number and round order
    let roundData = [ 'roundNum', 'roundOrder' ];
    roundData.forEach(roundString => {
        var id = "#" + roundString;
        console.log(roundString);
        console.log(data);
        if (typeof(data[roundString]) === 'string') {
            $(id).html(data[roundString]);
        }
        else {
            $(id).html(data[roundString]);
        }
    });

    let playerNames = [ 'left', 'right' ];
    let topLevelNames = [
        'armyName',
        'playerName',
        'playerStatus',
        'commandPoints',
        'secondaryName0',
        'secondaryName1',
        'secondaryName2'
    ];
    let totalScoreTopName = 'totalScore';
    let roundScoreTableName = '40kRoundScores';
    let roundNames = [
        'primaryScore',
        'secondaryScore0',
        'secondaryScore1',
        'secondaryScore2'
    ];


    // Iterate through both players to update the data
    // We'll put data from the json file in the right spots
    // We'll also process any information that should be computed. Such as Total Score
    playerNames.forEach(playerString  => {
        // primaries, secondaries, and total score updated per player
        var totalScore = 0;
        var primaryTotal = 0;
        var secondaryTotal = 0;

        topLevelNames.forEach(dataLabelName => {
            var id = "#" + playerString + capitalize(dataLabelName);
            if (typeof(data[playerString][dataLabelName]) === 'string') {
                $(id).html(data[playerString][dataLabelName].toUpperCase());
            }
            else {
                $(id).html(data[playerString][dataLabelName]);
            }

            // Add up the score if we this field has 'Score' in the name
            if (dataLabelName.includes("Score")) {
                if (!isNaN(data[playerString][dataLabelName])) {
                    if (dataLabelName.includes('primary')) {
                        primaryTotal += parseInt(data[playerString][dataLabelName]);
                    }
                    else if(dataLabelName.includes('secondary')) {
                        secondaryTotal += parseInt(data[playerString][dataLabelName]);
                    }
                }
            }
        });
        var roundNumber = 1;
        for (let roundData of data[playerString][roundScoreTableName]) {
            roundNames.forEach(roundName => {
                var id = "#" + playerString + capitalize(roundName) + roundNumber;
                if (typeof(roundData[roundName]) === 'string') {
                    $(id).html(roundData[roundName].toUpperCase())
                }
                else {
                    $(id).html(roundData[roundName])
                }

                // Add up the score if we this field has 'Score' in the name
                if (roundName.includes("Score")) {
                    if (!isNaN(roundData[roundName])) {
                        if (roundName.includes('primary')) {
                            primaryTotal += parseInt(roundData[roundName]);
                        }
                        else if (roundName.includes('secondary')) {
                            secondaryTotal += parseInt(roundData[roundName]);
                        }
                    }
                }
            });
            roundNumber++;
        }

        // Cap primaries and secondaries at 45 points per how scoring works
        if (primaryTotal > 45) {
            primaryTotal = 45;
        }
        if (secondaryTotal > 45) {
            secondaryTotal = 45;
        }
        totalScore = primaryTotal + secondaryTotal;

        // Update the total score tag
        var id = "#" + playerString + capitalize(totalScoreTopName);
        $(id).html(totalScore);
    });
}

function updateFile() {
    fetch('assets/data/data40k.json')
    .then(response => response.json())
    //.then(data => console.log(data))
    .then(data => populate40kScoreData(data));
}

setInterval(updateFile, 1000);