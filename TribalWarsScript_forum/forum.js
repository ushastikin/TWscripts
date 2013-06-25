javascript:
if (!document.URL.match(/answer=true/)) {
	window.location.href = "{game}&screen=forum&screenmode=view_thread&thread_id=25826&answer=true&page=last";
}
if (document.URL.match(/answer=true/) && document.getElementById('message').value == "+++") {
	document.getElementsByName('send')[0].click();
}
else {
	document.getElementById('message').value = "+++";
}