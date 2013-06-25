function main() {
	w=$(window).width();
	h=$(window).height();
	n=document.createElement('div');
	n.id='win_coord';
	$(n).css({'z-index':'9999','border':'solid 2px gold','width':'500px','height':'200px','position':'absolute','top':h/2-100+'px','left':w/2-250+'px','background':'url(http://ru7.voyna-plemyon.ru/graphic/index/main_bg.jpg)'});
	$(n).html('<h4%20width=\'100%\'%20align=\'center\'>%D0%A2%D0%B8%D0%BF%20%D1%81%D0%B1%D0%BE%D1%80%D0%B0</h4><div%20style=\'width:%2070px;%20text-align:%20center;%20float:%20left\'><a%20href=\'javascript:%20hand();\'>%D1%80%D1%83%D1%87%D0%BD%D0%B0%D1%8F</a></div>'+%20'<div%20style=\'width:%20430px;%20text-align:%20center;%20float:%20left\'><a%20href=\'javascript:%20automatic();\'>%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F</a><br>'+%20'<input%20type=\'radio\'%20name=\'type\'%20value=\'barb\'>%D0%92%D0%B0%D1%80%D0%B2%D0%B0%D1%80%D1%8B%20%D1%81%20<input%20type=\'text\'%20size=\'5\'%20name=\'barb_min\'%20value=\'0\'>%20%D0%BF%D0%BE%20<input%20type=\'text\'%20size=\'5\'%20name=\'barb_max\'%20value=\'12140\'>%20%D0%BE%D1%87%D0%BA%D0%BE%D0%B2<br>'+%20'<input%20type=\'radio\'%20name=\'type\'%20value=\'player\'%20checked=\'checked\'>%D0%98%D0%B3%D1%80%D0%BE%D0%BA%20<input%20type=\'text\'%20size=\'15\'%20name=\'player\'>%20%D1%81%20<input%20type=\'text\'%20size=\'5\'%20name=\'player_min\'%20value=\'0\'>%20%D0%BF%D0%BE%20<input%20type=\'text\'%20size=\'5\'%20name=\'player_max\'%20value=\'12140\'>%20%D0%BE%D1%87%D0%BA%D0%BE%D0%B2<br>'+%20'<input%20type=\'radio\'%20name=\'type\'%20value=\'ally\'>%D0%9F%D0%BB%D0%B5%D0%BC%D1%8F%20<input%20type=\'text\'%20size=\'15\'%20name=\'ally\'>%20%D1%81%20<input%20type=\'text\'%20size=\'5\'%20name=\'ally_min\'%20value=\'0\'>%20%D0%BF%D0%BE%20<input%20type=\'text\'%20size=\'5\'%20name=\'ally_max\'%20value=\'12140\'>%20%D0%BE%D1%87%D0%BA%D0%BE%D0%B2'+%20'</div>');
	$('body').append(n);
}

function hand() {
	cord%20=%20{cord:%20''};%20$('#win_coord').remove();%20$('#map').click(function(e)%20{%20mous%20=%20{x:e.pageX,%20y:%20e.pageY};%20$('#map_wrap%20a[id!=map]').css({'display':'none',%20'left':%20'-100px',%20'top':%20'-100px'});%20x%20=%20$('#map_coord_x%20div');%20for%20(i=0;i<x.length;i++)%20{%20offset%20=%20$(x[i]).offset();%20if(offset.left+53>=mous.x%20&&%20offset.left<=mous.x)%20{%20cord.x%20=%20$(x[i]).html();%20break;%20}%20}%20y%20=%20$('#map_coord_y%20div');%20for%20(i=0;i<y.length;i++)%20{%20offset%20=%20$(y[i]).offset();%20if(offset.top+38>=mous.y%20&&%20offset.top<=mous.y)%20{%20cord.y%20=%20$(y[i]).html();%20break;%20}%20}%20r%20=%203-cord.y.length;%20switch%20(r)%20{%20case%202:%20cord.y%20=%20'00'+cord.y;%20break;%20case%201:%20cord.y%20=%20'0'+cord.y;%20break;%20}%20c%20=%20cord.x+'|'+cord.y;%20if(cord.cord.indexOf(c)==-1%20&&%20typeof%20TWMap.villages[cord.x+cord.y]!=="undefined")%20{%20TWMap.villages[cord.x+cord.y].name+='(%D0%BE%D1%82%D0%BC%D0%B5%D1%87%D0%B5%D0%BD%D0%BE)';%20cord.cord%20+=%20cord.x+'|'+cord.y+'%20';%20}%20$('#coord').val(cord.cord);%20});%20$('#map_config').append('<textarea%20id=\'coord\'%20style=\'width:%20250px;%20height:%20300px\'></textarea>');
}

function automatic() {
	rad=$('#win_coord input[type=radio]');
	for(i=0; i<rad.length; i++) {
		if($(rad[i]).attr('checked')==true) {
			type=$(rad[i]).val();
			break;
		}
	}
	type='player';
	switch(type) {
		case 'barb':
			min=$('input[name=barb_min]').val();
			max=$('input[name=barb_max]').val();
			$('#map_config').append('<a%20href=\"javascript:%20update(\'barb\',%20\'0\',%20'+min+',%20'+max+');\">%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%B8%D1%82%D1%8C</a>');
			select([0], min, max);
			break;
		case 'player':
			nik=$('input[name=player]').val();
			min=$('input[name=player_min]').val();
			max=$('input[name=player_max]').val();
			$('#map_config').append('<a%20href=\"javascript:%20update(\'player\',%20\''+nik+'\',%20'+min+',%20'+max+');\">%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%B8%D1%82%D1%8C</a>');
			select_player(nik, min, max);
			break;
		case 'ally':
			name=$('input[name=ally]').val();
			min=$('input[name=ally_min]').val();
			max=$('input[name=ally_max]').val();
			$('#map_config').append('<a%20href=\"javascript:%20update(\'ally\',%20\''+name+'\',%20'+min+',%20'+max+');\">%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%B8%D1%82%D1%8C</a>');
			select_ally(name, min, max);
			break;
	}
}

function update(type, name, min, max) {
	switch(type) {
		case 'barb': select([0], min, max);
			break;
		case 'player': select_player(name, min, max);
			break;
		case 'ally': select_ally(name, min, max);
			break;
	}
}
	
function select_player(nik, min, max) {
	for(var i in TWMap.players) {
		if(TWMap.players[i].name==nik) {
			select([parseInt(i)], min, max);
			break;
		}
	}
}

function select_ally(name, min, max) {
	for(var i in TWMap.allies) {
		if(TWMap.allies[i].name==name) {
			id=i;
			break;
		}
	}
	owner=[];
	for(var i in TWMap.players) {
		if(TWMap.players[i].ally == id) {
			owner[owner.length]=parseInt(i);
		}
	}
	select(owner, min, max);
}

function select(owner, min, max) {
	vill={cor:''};
	$('#win_coord').remove();
	for(var i in TWMap.villages) {
		p=TWMap.villages[i].points.split('.');
		for(z=0; z<p.length-1;z++) {
			point=p[z]+p[z+1];
		}
		for(j=0; j<owner.length; j++) {
			if(TWMap.villages[i].owner==owner[j] && parseInt(point)>=min && parseInt(point)<=max) {
				del=i.split('');
				y='';
				for(z=del.length-3; z<del.length; z++) {
					y+=del[z];
				}
				x=Math.floor(i/1000);
				y=parseInt(y);
				sx=Math.floor(TWMap.size[0]/2);
				sy=Math.floor(TWMap.size[1]/2);
				min_x=TWMap.pos[0]-sx;
				max_x=TWMap.pos[0]+sx;
				min_y=TWMap.pos[1]-sy;
				max_y=TWMap.pos[1]+sy;
				if(x>=min_x && x<=max_x && y>=min_y && y<=max_y) {
					vill.cor+=x+'|'+y+' ';
				}
				break;
			}
		}
	}
	if(!$('#coord').length) {
		$('#map_config').append('<textarea%20id=\'coord\'%20style=\'width:%20250px;%20height:%20300px\'></textarea>');
	}
	document.getElementById('coord').value = vill.cor;
}
	
main();