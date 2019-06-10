var form = document.getElementById('story-form');
if (form.attachEvent) {
	form.attachEvent("submit", handleForm);
} else {
	form.addEventListener("submit", handleForm);
}

function handleForm(e) {
	if (e.preventDefault) e.preventDefault();
	var formLength = form.length
	console.log("lomake hoidossa. Kenttiä: "+ formLength)

	for (i = 0; i < formLength; i++){
		console.log(form[i].id +": "+ form[i].value)
	}


	//return false to prevent the default form behavior
	return false;
}

