/**
 * Created with JetBrains WebStorm.
 * User: Ilya
 * Date: 05/07/13
 * Time: 08:35
 * To change this template use File | Settings | File Templates.
 */

/*
 Author	: Dale McKay
 Email	: dalesmckay@gmail.com
 Notes	: thanks to slowtarget for some initial ideas/functions

 TODO	:
 ____________________________________________________________

 Copyright (C) 2010 Dale McKay, all rights reserved
 version 1.0, 9 April 2010

 This software is provided 'as-is', without any express or implied warranty. In no event will the author be held liable for any damages arising from the use of this software.

 Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
 The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
 Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
 This notice may not be removed or altered from any source distribution.
 ____________________________________________________________

 */

function AttackCounter(){
    try{
        var _name='Attack Counter';
        var _version=7.03;
        var _min_game_version=7.00;
        var _author={
            name:'dalesmckay',
            email:'dalesmckay@gmail.com'
        };
        var _debugID = _name.replace(/\s/g,'');
        var _debugEnabled=true;
        var _win=(window.main||self),$=_win.$;

        alert(JSON.stringify(_win.game_data));

        // Check Permissions.
        if(_win.game_data.world=='zz2'){
            if([16467].indexOf(parseInt(_win.game_data.player.id,10))<0){
                alert('Hi '+_win.game_data.player.name+'!\n\nYour scripts have been disabled by dalesmckay\nSend him a mail if you wish to help with testing');
                return false;
            }
        }


        if($('#' + _debugID + '_done').length > 0){
            throw("This script has already been executed.\nPlease refresh the browser\nand try again.");
        }

        var _gameVersion = _win.game_data.version.match(/[\d|\.]+/g);
        _gameVersion = (_gameVersion?parseFloat(_gameVersion[1]):-1);

        /* HACK: fix null mode */
        if(!_win.game_data.mode){
            var vmode=$('#overview_menu td[class="selected"] a').attr('href');
            vmode=vmode?vmode.match(/mode\=(\w*)/i):null;
            _win.game_data.mode=vmode?vmode[1]:null;
        }

        var _worldConfig = $(fnAjax('/interface.php','GET',{'func':'get_config'},'xml',false)).find('config');
        var _unitConfig = $(fnAjax('/interface.php','GET',{'func':'get_unit_info'},'xml',false)).find('config');
        /*
         var _buildingConfig = $(fnAjax('/interface.php','GET',{'func':'get_building_info'},'xml',false)).find('config');
         */

        var _isPremium = ($('#quickbar_outer').length>0);
        var _hasChurch = (parseInt(_worldConfig.find('game church').text()||'0',10)>0);
        var _hasPaladin = (parseInt(_worldConfig.find('game knight').text()||'0',10)>0);
        var _hasArchers = (parseInt(_worldConfig.find('game archer').text()||'0',10)>0);
        var _hasMilitia = (_unitConfig.find('militia').length>0);
        var _hasVillageNotes = ($('[src*="note.png"],[class*="note-icon"]').length>0);

        fnPrintVersion();

        if(!fnHasMinVersion(_min_game_version)){
            throw('This script requires v'+_min_game_version.toFixed(2)+' or higher.\nYou are running: v'+_gameVersion.toFixed(2));
        }

        if(_win.game_data.mode != 'incomings'){
            throw("This script must be run from\nthe Overviews->Incoming page");
        }

        return{
            execute:function(){fnQueryIncomingAttacks();}
        };
    }
    catch(objError){
        fnHandleError(objError);
    }



    function fnPrint(msg,id){
        if($('#' + _debugID).length <= 0){
            $('body').append('<div id="' + _debugID + '"></div>');
        }

        $('#' + _debugID).append('<span id="'+((typeof(id)=='undefined')?'':id)+'">'+msg+'</span><br/>');
    }

    function fnDebug(msg){
        if((typeof(_debugEnabled) != "undefined") && _debugEnabled){
            fnPrint(msg);
        }
    }

    /* TODO: possibly add a max_version parameter */
    function fnHasMinVersion(min_version){
        return (_gameVersion >= min_version);
    }

    function fnHandleError(objError){
        var errMsg=String(objError.message||objError||'');
        if(errMsg){
            fnPrint('Error: ' + errMsg);
            alert('Error: ' + errMsg);
        }
    }

    function fnAjax(url,method,params,type,isAsync){
        var error = null;
        var payload = null;

        $.ajax({
            'async':isAsync,
            'url':url,
            'data':params,
            'dataType':type,
            'type':String(method||'GET').toUpperCase(),
//            'error':function(req,status,err){error='ajax: ' + status;},
            'error':function(request, textStatus, errorThrown){
                alert("Status: " + textStatus);
                alert("Error: " + errorThrown + " in line " + errorThrown.number);
            },
            'success':function(data,status,req){payload=data;}
        });

        if(error){
            throw(error);
        }

        return payload;
    }

    function fnPrintVersion(){
        fnPrint('<span style="color:red;">Provide the following info when asking for help:</span>');
        fnPrint("=========================");
        fnPrint(_author.name + "'s " + _name + ": v" + _version.toFixed(2));
        fnPrint("=========================");
        fnPrint("Premium: "+(_isPremium?"yes":"no"));
        fnPrint("Church : "+(_hasChurch?"yes":"no"));
        fnPrint("Statue : "+(_hasPaladin?"yes":"no"));
        fnPrint("Archer : "+(_hasArchers?"yes":"no"));
        fnPrint("Militia: "+(_hasMilitia?"yes":"no"));
        fnPrint("Notes  : "+(_hasVillageNotes?"yes":"no"));
        fnPrint("Sitter : "+(_win.location.href.match(/t\=\d+/i)?"yes":"no"));
        fnPrint("=========================");
        fnPrint("Version: "+_win.game_data.version);
        fnPrint("World  : "+_win.game_data.world);
        fnPrint("Screen : "+_win.game_data.screen);
        fnPrint("Mode   : "+_win.game_data.mode);
        fnPrint("URL    : "+_win.location.href);
        fnPrint("Browser: "+navigator.userAgent);
        fnPrint("=========================");
    }

    function fnQueryIncomingAttacks(){
        fnDebug('CALL: '+_debugID+'::fnQueryIncomingAttacks');

        try{
            var summary = [];

            /* Count incoming attacks for each village */
            $('#incomings_table tr:has(.attack-icon) td:nth-child(2)').each(function(i,e){
                var coords=$(e).text().match(/\d+\|\d+/g);
                coords = coords?coords[coords.length - 1]:null;
                if(typeof(summary[coords])=="undefined")
                    summary[coords] = {tally:0,html:$(e).closest('tr').find('td:eq(1)').html()};

                summary[coords].tally++;
            });

            $('#incomings_table tr:has(.attack-icon) td:nth-child(2)').each(function(i,e){
                var coords=$(e).text().match(/\d+\|\d+/g);
                coords = coords?coords[coords.length - 1]:null;

                /* Inject the attack tally */
                var cell=$(e).closest('tr').find('td:eq(0)');
                cell.html('(' + summary[coords].tally + ') ' + cell.html());
            });

            /* Convert Associative Array to Indexed Array for sorting */
            var count=0;
            var attackSummary=[];
            for(var coords in summary){
                if(summary.hasOwnProperty(coords))
                    attackSummary[count++]=summary[coords];
            }

            /* Sort the Attack Summary in descending order by tally */
            attackSummary.sort(function(a,b){return b.tally - a.tally;});

            /* Display results in a new Popup Window */
            var docSource='\
				<html>\
					<head>\
						<title>'+_author.name + "'s " + _name + ": v" + _version.toFixed(2)+'</title>\
						<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>\
						<link rel="stylesheet" type="text/css" href="/style.php"/>\
					</head>\
					<body>\
						<h3>Attack Summary:</h3><hr>\
					</body>\
				</html>\
			';

            var popup=window.open('about:blank','dalesmckay_tw_'+_debugID,'width=400,height=480,scrollbars=yes');
            popup.document.open('text/html','replace');
            popup.document.write(docSource);
            popup.document.close();
            void(0);
            popup.focus();

            var eleDIV=popup.document.createElement("div");
            eleDIV.setAttribute("id","div_attack_summary");
            popup.document.body.appendChild(eleDIV);

            var resultTable=popup.document.createElement("table");
            resultTable.setAttribute("id","table_attack_summary");
            resultTable.setAttribute("class","vis");
            resultTable.setAttribute("width","100%");
            eleDIV.appendChild(resultTable);

            /* Create the Table Header */
            curRow=resultTable.insertRow(0);
            curRow.setAttribute("style","white-space:nowrap");
            curTH=popup.document.createElement("th");
            curTH.appendChild(popup.document.createTextNode("Village"));
            curRow.appendChild(curTH);
            curTH=popup.document.createElement("th");
            curTH.appendChild(popup.document.createTextNode("Attack Count"));
            curRow.appendChild(curTH);

            /* Create Table Content */
            for(var ii=0; ii < attackSummary.length; ii++){
                curRow=resultTable.insertRow(-1);
                curRow.setAttribute("class",(ii%2)?"row_b":"row_a");
                curRow.setAttribute("style","white-space:nowrap");

                curTD=popup.document.createElement("td");
                curTD.innerHTML=attackSummary[ii].html;
                curRow.appendChild(curTD);

                /* Force the link target to the main window */
                curTD.getElementsByTagName("a")[0].setAttribute("target","tw.main");

                curTD=popup.document.createElement("td");
                curTD.setAttribute("align","right");
                curTD.innerHTML=attackSummary[ii].tally;
                curRow.appendChild(curTD);
            }

            fnPrint('<br/>execution completed',_debugID + '_done');
        }
        catch(objError){
            fnHandleError(objError);
        }
    }
}


if(typeof(scriptOb)=="undefined"){
    var scriptObj = new AttackCounter;
    scriptObj.execute();
}

void(0);
