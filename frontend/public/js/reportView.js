var specialElementHandlers = {
	'#editor': function(element, renderer) {
		return true;
	}
};

function genPDF() {
	var doc = new jsPDF();

	doc.fromHTML($('#reportTarget').html(), 15, 15, {
		width: 170,
		elementHandlers: specialElementHandlers
	});

	//doc.addPage();

	//doc.text(20, 20, 'TEST. Page 2!!');

	doc.save('Test.pdf');
}

// https://www.youtube.com/watch?v=CnprxD_sJFE
// https://www.youtube.com/watch?v=8IckQQhwedg
