document.getElementById('hide').onclick = function(){
	document.getElementsByTagName('aside')[0].style.left = '-160px';
	document.getElementById('hide').style.display = 'none';
	document.getElementById('show').style.display = 'block';
}
document.getElementById('show').onclick = function(){
	document.getElementsByTagName('aside')[0].style.left = '0';
	document.getElementById('show').style.display = 'none';
	document.getElementById('hide').style.display = 'block';
}
