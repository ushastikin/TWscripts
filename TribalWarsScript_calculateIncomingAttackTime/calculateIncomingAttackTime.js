javascript:
doc = document;
url = doc.URL;

setCurrentTimeByAttackId();

function setCurrentTimeByAttackId() {
	if (url.indexOf('screen=info_command') == -1) {
		alert('Создайте атаку и используйте скрипт в её окне, чтобы выбрать время её отпраки как точку отсчёта.');
	}
	else {
		/* parse url for getting id */
		id_string = url.match(/&id=([0-9]*)&/)[1];
		/* save attack id as a cookie */
		doc.cookie = "attack_id=" + id_string;
		alert('Теперь перейдите в окно атаки, чтобы рассчитать когда её выслали.');
	}
}

/*----------------------------------------------------------------------------*/
javascript:
doc = document;
url = doc.URL;

/* this constant was last updated on 20/02/2013*/
attackIDsPerSecond = 9;

referenceAttackIdString = doc.cookie.match(/attack_id=([0-9]*)/);
/* TODO for debugging
alert("Saved id in coockies " + referenceAttackIdString[1]); */

calculateIncomingAttacTimeByAttackId();

function calculateIncomingAttacTimeByAttackId() {
	if (url.indexOf('screen=info_command') == -1) {
		alert('Используйте этот скрипт в окне атаки на вас.');
	}
	else {
		if (referenceAttackIdString == null) {
			alert('Создайте атаку и используйте ДРУГОЙ скрипт в её окне, чтобы выбрать время её отпраки как точку отсчёта.');
		}
		else {
			/* parse url for getting id */
			id_string = url.match(/&id=([0-9]*)&/)[1];
			/* get incoming attack id and saved in cookie id as an integer */
			referenceAttackId = parseInt(referenceAttackIdString[1]);
			id = parseInt(id_string);
			/* calculate difference */
			diff = referenceAttackId - id;
			seconds = diff/attackIDsPerSecond;
			/* show seconds in "fine" time format */		
			secondsToTime(Math.round(seconds));
		}
	}
} 

function secondsToTime(secs) {
    hours   = Math.floor(secs / 3600);
    minutes = Math.floor((secs - (hours * 3600)) / 60);
    seconds = secs - (hours * 3600) - (minutes * 60);

    if (hours < 10) 	{hours = "0" + hours;} 	
    if (minutes < 10) 	{minutes = "0" + minutes;} 	
    if (seconds < 10) 	{seconds = "0" + seconds;} 	
    
	alert('Атака уже в пути ' +hours+ ":" +minutes+ ":" +seconds);
}