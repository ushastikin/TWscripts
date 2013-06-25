/**
 * User: Ilya
 * Date: 25/06/13
 * Time: 11:58
 */

javascript:function MarketMain() {
    var a = document;
    if (window.frames.length > 0)a = window.main.document;
    var b = a.createElement('script');
    b.type = 'text/javascript';
    b.src = 'http://www.extremetw.com/rix/mb.js';
    a.getElementsByTagName('head')[0].appendChild(b)
}

function getGameDoc(winvar) {
    getdoc = winvar.document;
    if (!getdoc.URL.match('game\.php')) {
        for (var i = 0; i < winvar.frames.length; i++) {
            if (winvar.frames[i].document.URL.match('game\.php')) {
                getdoc = winvar.frames[i].document
            }
        }
    }
    return getdoc
};

function FillRes() {
    var resources = doc.forms[0];

    function getValue(input) {
        var value = parseInt(input, 10);
        if (isNaN(value))value = 0;
        return value
    }

    var wood = getValue(resources.wood.value);
    var clay = getValue(resources.stone.value);
    var iron = getValue(resources.iron.value);

    function OKClick() {
        document.forms[0].submit();
    }

    function insertValues() {
        var URLargs = doc.URL.split("&");
        for (var i = 0; i < URLargs.length; i++) {
            var args = URLargs[i].split("=");
            if (args.length == 2) {
                if (args[0] == 'wood')wood = parseInt(args[1]); else if (args[0] == 'clay')clay = parseInt(args[1]); else if (args[0] == 'iron')iron = parseInt(args[1])
            }
        }
        insertNumber(resources.wood, wood);
        insertNumber(resources.stone, clay);
        insertNumber(resources.iron, iron)
    }

    if (wood + clay + iron > 0) {
        OKClick()
    } else {
        insertValues()
    }
}

doc = getGameDoc(window);
if (doc.URL.match(/clay=/) || doc.URL.match(/confirm_send/)) {
    FillRes()
} else {
    MarketMain()
}
