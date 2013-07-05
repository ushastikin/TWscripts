/**
 * Created with JetBrains WebStorm.
 * User: Ilya
 * Date: 05/07/13
 * Time: 08:35
 */

function main() {
    var summaryMap = [];
    try {
        // Count outcoming attacks for each attacker village
        $('#incomings_table tr:has(.attack-icon) td:nth-child(1)').each(function(index, item) {
            // the previous line is in jQuery and not JavaScript.
            var coordinate = $(item).text().match(/\d+\|\d+/g);
            // since match returns the array, the following line converts it
            coordinate = coordinate?coordinate[coordinate.length - 1]:null;

            if (typeof(summaryMap[coordinate]) == "undefined") {
                summaryMap[coordinate] = {counter:0, coordinate:coordinate};
            }
            summaryMap[coordinate].counter++;
        });

        // Inject the attack counter
        var helpSummaryMap = []
        $('#incomings_table tr:has(.attack-icon) td:nth-child(1)').each(function(index, item) {
            // the previous line is in jQuery and not JavaScript.
            var coordinate = $(item).text().match(/\d+\|\d+/g);
            // since match returns the array, the following line converts it
            coordinate = coordinate?coordinate[coordinate.length - 1]:null;

            if (typeof(helpSummaryMap[coordinate]) == "undefined") {
                helpSummaryMap[coordinate] = {counter:0, coordinate:coordinate};
            }
            helpSummaryMap[coordinate].counter++;

            var cell=$(item).closest('tr').find('td:eq(0)');
            cell.html('(' + helpSummaryMap[coordinate].counter + ' of '+ summaryMap[coordinate].counter + ') ' + cell.html());
        });
    }
    catch (objError) {
        var errMsg=String(objError.message||objError||'');
        if(errMsg){
            alert('Error: ' + errMsg);
        }
    }
}

function runningOnIncomingsScreen() {
    var url = document.URL;

// TODO: switch comment for debugging
//    if (url.indexOf('attackerCounter') == -1) {
    if (url.indexOf('mode=incomings') == -1) {
        alert('Работает только на экране атак!');
        return false;
    }
    return true;
}

if (runningOnIncomingsScreen()) {
    main();
}
