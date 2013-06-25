/**
 * User: Ilya
 * Date: 25/06/13
 * Time: 11:13
 */

javascript:
function main() {
    var w = $(window).width();
    var h = $(window).height();
    var n = document.createElement('div');
    n.id = 'win_coord';
    $(n).css({
        'z-index': '9999',
        'border': 'solid 2px gold',
        'width': '500px',
        'height': '200px',
        'position': 'absolute',
        'top': h / 2 - 100 + 'px',
        'left': w / 2 - 250 + 'px',
        'background': 'url(http://ru7.voyna-plemyon.ru/graphic/index/main_bg.jpg)'
    });
    $(n).html('<h4 width=\'100%\' align=\'center\'>%D0%A2%D0%B8%D0%BF %D1%81%D0%B1%D0%BE%D1%80%D0%B0</h4><div style=\'width: 70px; text-align: center; float: left\'><a href=\'javascript: hand();\'>%D1%80%D1%83%D1%87%D0%BD%D0%B0%D1%8F</a></div>' + '<div style=\'width: 430px; text-align: center; float: left\'><a href=\'javascript: automatic();\'>%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F</a><br>' + '<input type=\'radio\' name=\'type\' value=\'barb\' checked=\'checked\'>%D0%92%D0%B0%D1%80%D0%B2%D0%B0%D1%80%D1%8B %D1%81 <input type=\'text\' size=\'5\' name=\'barb_min\' value=\'0\'> %D0%BF%D0%BE <input type=\'text\' size=\'5\' name=\'barb_max\' value=\'12140\'> %D0%BE%D1%87%D0%BA%D0%BE%D0%B2<br>' + '<input type=\'radio\' name=\'type\' value=\'player\'>%D0%98%D0%B3%D1%80%D0%BE%D0%BA <input type=\'text\' size=\'15\' name=\'player\'> %D1%81 <input type=\'text\' size=\'5\' name=\'player_min\' value=\'0\'> %D0%BF%D0%BE <input type=\'text\' size=\'5\' name=\'player_max\' value=\'12140\'> %D0%BE%D1%87%D0%BA%D0%BE%D0%B2<br>' + '<input type=\'radio\' name=\'type\' value=\'ally\'>%D0%9F%D0%BB%D0%B5%D0%BC%D1%8F <input type=\'text\' size=\'15\' name=\'ally\'> %D1%81 <input type=\'text\' size=\'5\' name=\'ally_min\' value=\'0\'> %D0%BF%D0%BE <input type=\'text\' size=\'5\' name=\'ally_max\' value=\'12140\'> %D0%BE%D1%87%D0%BA%D0%BE%D0%B2' + '</div>');
    $('body').append(n);
}
function hand() {
    cord = {
        cord: ''
    };
    $('#win_coord').remove();
    $('#map').click(function(e) {
        mous = {
            x: e.pageX,
            y: e.pageY
        };
        $('#map_wrap a[id!=map]').css({
            'display': 'none',
            'left': '-100px',
            'top': '-100px'
        });
        x = $('#map_coord_x div');
        for (i = 0; i < x.length; i++) {
            offset = $(x[i]).offset();
            if (offset.left + 53 >= mous.x && offset.left <= mous.x) {
                cord.x = $(x[i]).html();
                break;
            }
        }
        y = $('#map_coord_y div');
        for (i = 0; i < y.length; i++) {
            offset = $(y[i]).offset();
            if (offset.top + 38 >= mous.y && offset.top <= mous.y) {
                cord.y = $(y[i]).html();
                break;
            }
        }
        r = 3 - cord.y.length;
        switch (r) {
            case 2:
                cord.y = '00' + cord.y;
                break;
            case 1:
                cord.y = '0' + cord.y;
                break;
        }
        c = cord.x + '|' + cord.y;
        if (cord.cord.indexOf(c) == -1 && typeof TWMap.villages[cord.x + cord.y] !== "undefined") {
            TWMap.villages[cord.x + cord.y].name += '(%D0%BE%D1%82%D0%BC%D0%B5%D1%87%D0%B5%D0%BD%D0%BE)';
            cord.cord += cord.x + '|' + cord.y + ' ';
        }
        $('#coord').val(cord.cord);
    });
    $('#map_config').append('<textarea id=\'coord\' style=\'width: 250px; height: 300px\'></textarea>');
}
function automatic() {
    rad = $('#win_coord input[type=radio]');
    for (i = 0; i < rad.length; i++) {
        if (rad[i].checked) {
            stype = $(rad[i]).val();
        }
    }
    switch (stype) {
        case 'barb':
            min = $('input[name=barb_min]').val();
            max = $('input[name=barb_max]').val();
            $('#map_config').append('<a href=\"javascript: update(\'barb\', \'0\', ' + min + ', ' + max + ');\">%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%B8%D1%82%D1%8C</a>');
            select([0], min, max);
            break;
        case 'player':
            nik = $('input[name=player]').val();
            min = $('input[name=player_min]').val();
            max = $('input[name=player_max]').val();
            $('#map_config').append('<a href=\"javascript: update(\'player\', \'' + nik + '\', ' + min + ', ' + max + ');\">%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%B8%D1%82%D1%8C</a>');
            select_player(nik, min, max);
            break;
        case 'ally':
            name = $('input[name=ally]').val();
            min = $('input[name=ally_min]').val();
            max = $('input[name=ally_max]').val();
            $('#map_config').append('<a href=\"javascript: update(\'ally\', \'' + name + '\', ' + min + ', ' + max + ');\">%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%B8%D1%82%D1%8C</a>');
            select_ally(name, min, max);
            break;
    }
}
function update(stype, name, min, max) {
    switch (stype) {
        case 'barb':
            select([0], min, max);
            break;
        case 'player':
            select_player(name, min, max);
            break;
        case 'ally':
            select_ally(name, min, max);
            break;
    }
}
function select_player(nik, min, max) {
    for (var i in TWMap.players) {
        if (TWMap.players[i].name == nik) {
            select([parseInt(i)], min, max);
            break;
        }
    }
}
function select_ally(name, min, max) {
    for (var i in TWMap.allies) {
        if (TWMap.allies[i].name == name) {
            id = i;
            break;
        }
    }
    owner = [];
    for (var i in TWMap.players) {
        if (TWMap.players[i].ally == id) {
            owner[owner.length] = parseInt(i);
        }
    }
    select(owner, min, max);
}
function select(owner, min, max) {
    vill = {
        cor: ''
    };
    $('#win_coord').remove();
    for (var i in TWMap.villages) {
        p = TWMap.villages[i].points.split('.');
        for (z = 0; z < p.length; z++) {
            point = p[z] + p[z + 1];
        }
        for (j = 0; j < owner.length; j++) {
            if (TWMap.villages[i].owner == owner[j] && parseInt(point) >= min && parseInt(point) <= max) {
                del = i.split('');
                y = '';
                for (z = del.length - 3; z < del.length; z++) {
                    y += del[z];
                }
                x = Math.floor(i / 1000);
                y = parseInt(y);
                sx = Math.floor(TWMap.size[0] / 2);
                sy = Math.floor(TWMap.size[1] / 2);
                min_x = TWMap.pos[0] - sx;
                max_x = TWMap.pos[0] + sx;
                min_y = TWMap.pos[1] - sy;
                max_y = TWMap.pos[1] + sy;
                if (x >= min_x && x <= max_x && y >= min_y && y <= max_y) {
                    vill.cor += x + '|' + y + ' ';
                }
                break;
            }
        }
    }
    if (!$('#coord').length) {
        $('#map_config').append('<textarea id=\'coord\' style=\'width: 250px; height: 300px\'></textarea>');
    }
    $('#coord').val(vill.cor);
}
function runningOnMapScreen() {
    var url = document.URL;

    if (url.indexOf('screen=map') == -1) {
        alert('Работает только на экране карты!');
        return false;
    }
    return true;
}
if (runningOnMapScreen()) {
    main();
}
