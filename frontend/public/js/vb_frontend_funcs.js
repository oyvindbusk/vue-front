// Gets the sample id from the selected row in the mainView.
function getRow() {
	return $('table > tbody > tr.selected');
}
// Get todays date in correct format for the re:
function yyyymmdd() {
	var now = new Date();
	var y = now.getFullYear();
	var m = now.getMonth() + 1;
	var d = now.getDate();
	return '' + y + (m < 10 ? '0' : '') + m + (d < 10 ? '0' : '') + d;
}

// Func to get vales for samplecomment, variantcomment and class:
function getInterpData() {
	var sampleComment = $('#sampleComments').val();
	var varComment = $('#varComments').val();
	var classVal = $('#sel1').val();

	var variantIdentifier = $('#var_info_h5').text().replace(/(Variant info for posID: )/gm, '');
	var signoff = true;

	var interpData = {
		sampleComment: sampleComment,
		varComment: varComment,
		class: classVal,
		varID: variantIdentifier,
		signOff: signoff
	};
	return interpData;
}

// ###############################
// Filters
// ###############################
// Return count of filters
function returnCount() {
	return parseInt($('.element:last').attr('id').split('_')[1]);
}

// Insert filters into the card to display:
function fillCard(textVal, colVal, opVal, checkVal) {
	// First empty present li-elements
	$('#filterLi').empty();
	var numFilters = returnCount();
	var i;
	for (i = 0; i < numFilters; i++) {
		$('#filterLi').append(
			"<li><small class='text-muted'>Operation: </small>" +
				opVal[i] +
				"<small class='text-muted'> Column:</small> " +
				colVal[i] +
				"<small class='text-muted'> Value:</small> " +
				textVal[i] +
				" <small class='text-muted'>Keep: </small>" +
				checkVal[i] +
				'</li>'
		);
	}
}

// Function to reset all filters back to original (empty) state
function resetRegFilters() {
	$("input[id^='txt']").each(function() {
		$(this).val($('#target option:first').val());
	});
	$("select[id^='selop']").each(function() {
		$(this).val($('#target option:first').val());
	});
	$("select[id^='selcol']").each(function() {
		$(this).val($('#target option:first').val());
	});
	$("input[id^='check']").each(function() {
		$(this).prop('checked', false);
	});
}

// Filters are built by column(string), op(string(lessThan, moreThan, equalTo, notEqualTo,contains, notContains)), value(string), keepIfMiss(bool)
function getFilters() {
	// Get values from text fields:
	var textVal = $("input[id^='txt']")
		.map(function() {
			return `{"text":` + `"${$(this).val()}"}`;
		})
		.get();
	// Get values from ops-field:
	var opVal = $("select[id^='selop']")
		.map(function() {
			return `{"op":` + `"${$(this).val()}"}`;
		})
		.get();
	//  Get values from column selectbox
	var colVal = $("select[id^='selcol']")
		.map(function() {
			return `{"cols":` + `"${$(this).val()}"}`;
		})
		.get();
	// Get values from checkbox-field: Bool
	var checkVal = $("input[id^='check']")
		.map(function() {
			return `{"check":` + `"${$(this).is(':checked')}"}`;
		})
		.get();
	// Iterate filters and fill the card on the bottom of the page:

	// Get values from the preselected field:
	// If select, send filters with message to use filterchain:
	var preSelVal = $('#preDefsel').val();
	if (preSelVal != null) {
		if (preSelVal.length > 1) {
			return `{"columns": "filterChain"}`;
		}
	}

	var filters = `{"columns": [${colVal}], "ops": [${opVal}], "text": [${textVal}], "check": [${checkVal}]}`;
	console.log(`${filters}`);
	return filters;
}

// get the samplename from
function getSample() {
	var url = window.location.href;
	var sample_id = url.split('/').pop();
	return sample_id.toString();
}

// get variants from backend to populate table
function fillTable(callback) {
	$('#variants').DataTable({
		columnDefs: [
			{
				targets: [ 7 ],
				visible: false
			}
		],
		dom: 'Bflrtip',
		buttons: [ 'csv', 'copy', { extend: 'colvis', columns: ':not(.noVis)' } ],
		ajax: {
			url: '/api', // Blah, this goes trough the frontend, but should be able to get data directly from backend..
			data: function(d) {
				d.sample_id = function() {
					return getSample();
				}; // sample id for the query
				d.filters = function() {
					return getFilters();
				}; // Get the filters
			}
		},
		select: true,
		columns: [
			{ data: 'chr' },
			{ data: 'pos' },
			{ data: 'refn' },
			{ data: 'altn' },
			{ data: 'hGVSc' },
			{ data: 'hGVSp' },
			{ data: 'geneName' },
			{ data: 'annotation' },
			{ data: 'Status' }
		],
		initComplete: function(settings, json) {
			console.log('DataTables has finished its initialisation.');
		}
	});
}

// Get data for the current variant:
function getCurrentVariant(e, dt, type, indexes) {
	var data = dt.rows(indexes).data();
	// Fill data in card
	$('#var_info_h5').text('Variant info for posID: ' + data[0]['positionID']);
	$('#var_info_card_text').html(
		'Chr:  <strong>' +
			data[0]['chr'] +
			'</strong>  Pos:  <strong>' +
			data[0]['pos'] +
			' </strong>  Ref:  <strong>' +
			data[0]['refn'] +
			' </strong> Alt:  <strong>' +
			data[0]['altn'] +
			'</strong>'
	);
	$('#var_info_card_text_2').html(
		'Qual:  <strong>' +
			data[0]['qual'] +
			'</strong>  Depth:  <strong>' +
			data[0]['dp'] +
			' </strong>  AD:  <strong>' +
			data[0]['ad'] +
			' </strong> gt:  <strong>' +
			data[0]['gt'] +
			'</strong>'
	);
	$('#var_info_card_text_3').html(
		'Gene:  <strong>' +
			data[0]['geneName'] +
			'</strong>  Annotation:  <strong>' +
			data[0]['annotation'] +
			' </strong>  Annotation impact:  <strong>' +
			data[0]['annotationImpact'] +
			' </strong>  hGVSc:  <strong>' +
			data[0]['hGVSc'] +
			' </strong> hGVSp:  <strong>' +
			data[0]['hGVSp'] +
			'</strong>\
   			<br>Feature type:  <strong>' +
			data[0]['featureType'] +
			'</strong>'
	);
	$('#var_info_card_text_5').html(
		'Previous comments:  <strong>' +
			data[0]['comments'] +
			'<br></strong>  Previous classes:  <strong>' +
			data[0]['classes'] +
			'<br></strong>  het|hom:  <strong>' +
			data[0]['gtcount'] +
			'</strong>'
	);
	// Link card:
	$('#link_card_href_1').attr(
		'href',
		'https://gnomad.broadinstitute.org/variant/' +
			data[0]['chr'] +
			'-' +
			data[0]['pos'] +
			'-' +
			data[0]['refn'] +
			'-' +
			data[0]['altn']
	);
	$('#link_card_href_2').attr(
		'href',
		'https://www.omim.org/search/?index=entry&sort=score+desc%2C+prefix_sort+desc&start=1&limit=10&search=' +
			data[0]['geneName']
	);
	return data;
}

// ###############################
// IGV logic
// ###############################

// ###############################
// Post data logic
// ###############################
function postInterpData(save, data) {
	console.log(data.user);
	console.log(data.sample);
	console.log(data.variantInterps);

	var senddata = {
		username: data.user,
		sampleID: data.sample,
		sampleComment: data.sampleComment,
		variantInterps: JSON.stringify(data.variantInterps)
	};
	console.log(senddata);
	$.post(
		'/api/posttest',
		senddata, // Make a function that gets the data from the forms with class and comment
		function(data, status, xhr) {
			// success callback function
			//alert('status: ' + status );
			console.log('status sending POST: ' + status);
		}
	);
}
