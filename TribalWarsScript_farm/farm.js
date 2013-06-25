javascript:
axe=0;light=0;spy=5;catapult=0;
coords='651|516 654|526';
coords = coords.split("%20");
var doc = document;

if (window.frames.length > 0) {
	doc = window.main.document;
}
url = document.URL;

if (url.indexOf('screen=place') == -1) {
	alert('Работает только на площади!');
}
else {
	if (url.match(/confirm/)) {
		doc.getElementsByName("submit")[0].click();	
	}
	else {
		farmcookie = doc.cookie.match('farm=([^]*)');
		if (farmcookie == null) {
			doc.cookie = "farm=0";
			farmcookie = doc.cookie.match('farm=([^]*)');
		}
		index = parseInt(farmcookie[1]);
		if (index >= coords.length) {
			doc.cookie = "farm=0";
			alert('All coordinates are processed.');
		} else {
			coords = coords[index];
			coords = coords.split("|");
			index = index + 1;
			doc.cookie = "farm=" + index;
			doc.forms[0].x.value = coords[0];
			doc.forms[0].y.value = coords[1];
			insertUnit(doc.forms[0].axe, axe);
			insertUnit(doc.forms[0].light, light);
			insertUnit(doc.forms[0].spy, spy);
			insertUnit(doc.forms[0].catapult, catapult);
			doc.getElementsByName("attack")[0].click();
		}
	}
}