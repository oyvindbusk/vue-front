$(document).ready(function() {
	// init json to add interp data to
	var interpdata = {
		user: $('#hiddenuser').text().replace(/(\r\n|\n|\r)/gm, ''),
		sample: getSample(),
		sampleComment: '',
		variantInterps: {}
	};

	fillTable(); // Get the data from backend and populate variant table:

	// Function to get value on click in variant table and insert in info-card:
	$('#variants').on('select.dt', function(e, dt, type, indexes) {
		var data = getCurrentVariant(e, dt, type, indexes);
		positionID = data[0]['positionID'];
		// If not exists
		if (positionID in interpdata['variantInterps']) {
			console.log('already there');
		} else {
			interpdata['variantInterps'][positionID] = { variantComment: '', class: '' }; // Check if comment or class is present in data from backend, if not.. set to ''
		}
		$('#variant_card_collapsed').collapse('show'); // Unncolapse variant window:

		return data;
	});

	// When detecting changes in comments, print them
	// Obs, this should only be able to input if variant is selected.
	$('#varComments').bind('input propertychange', function() {
		if (this.value.length) {
			console.log(positionID);
			interpdata['variantInterps'][positionID]['variantComment'] = $(this).val();
			console.log($(this).val());
			console.log(interpdata);
		}
	});

	$('#sampleComments').bind('input propertychange', function() {
		if (this.value.length) {
			var val = 'sampleComment';
			interpdata[val] = $(this).val();
			console.log(interpdata);
		}
	});

	$('#sel1').bind('input propertychange', function() {
		if (this.value.length) {
			interpdata['variantInterps'][positionID]['class'] = $(this).val();
			var c = $(this).val();
			console.log(interpdata);
			// Endre i tabell også:
			console.log('aarg');
			console.log($('#variants').DataTable().rows({ selected: true }).data());
			$('#variants')
				.DataTable()
				.rows({ selected: true })
				.every(function(rowIdx, tableLoop, rowLoop) {
					$('#variants')
						.DataTable()
						.cell(rowIdx, 8)
						.data('<span class="btn btn-xs btn-success">Class: ' + c + '</span>');
				})
				.draw();
		}
	});

	// ###############################
	// Logic for the report module:
	// ###############################
	// Opens report-modal on click
	// $('#reportButton').on('click', function() {
	// 	console.log('reportButton clicked');
	// 	$('#reportModal').modal('toggle');
	// 	// Fill with variant info:
	// 	console.log(interpdata);
	// 	console.log(interpdata.variantInterps);
	// 	$('#userParagraph').text('User: ' + interpdata.user + ', Date: ' + yyyymmdd());
	// 	$('#variantList').append('<li class="list-group-item"> New item </li>');
	// });
	// ###############################
	// Logic for the filter module:
	// ###############################

	// When detecting changes in predefined filters, send and recieve data:
	$('#preDefsel').bind('input propertychange', function() {
		if (this.value.length) {
			$('#variants').DataTable().ajax.reload();
			// her kjører getfilters automatisk.. Kan jeg få den til sjekke om preselected filters er satt
			console.log('Preselected is changed');
		}
	});

	// Get available columns from db and insert into selop_2 dropdown selection box:
	function fillSelcol_1(idx) {
		$.getJSON('/api/columns', function(resp) {
			var options = '';
			for (var i = 0; i < Object.values(resp).length; i++) {
				//
				$('#selcol_' + idx).append('<option>' + resp[i] + '</option>');
			}
		});
	}
	fillSelcol_1(1);
	fillSelcol_1(2);

	// Add new element
	$('.add').click(function() {
		// Finding total number of elements added
		var total_element = $('.element').length;
		// last <div> with element class id
		var lastid = $('.element:last').attr('id');
		var split_id = lastid.split('_');
		var nextindex = Number(split_id[1]) + 1;

		var max = 10;
		if (total_element < max) {
			// Adding new div container after last occurance of element class
			$('.element:last').after("<div class='element' id='div_" + nextindex + "'></div>");

			// Adding element to <div>
			//$("#div_" + nextindex).append("<input type='text' placeholder='Enter your skill' id='txt_"+ nextindex +"'>&nbsp;<span id='remove_" + nextindex + "' class='remove'>X</span>");

			// Ading another element to <div> :: BUSK
			//<input type="text" class="form-control" id="firstName" placeholder="" value="" required="">
			$('#div_' + nextindex).append(
				"<div class='input-group mb-3'> \
            <input class='form-check-input' type='checkbox' id='check_" +
					nextindex +
					"'><label class='form-check-label' for='check_" +
					nextindex +
					"'>Keep if missing</label>&nbsp; \
            <select class='custom-select d-block w-100 col-md-2' id='selop_" +
					nextindex +
					"'> \
                  <option value=''>Choose...</option> \
                  <option>Equal to</option> \
                  <option>Not equal to</option> \
                  <option>Starts with</option> \
                  <option>Does not starts with</option> \
                  <option>Contains</option> \
                  <option>Does not contain</option> \
                  <option>Greater than</option> \
                  <option>Less than</option> \
                </select> \
            <select class='custom-select d-block w-100 col-md-2' id='selcol_" +
					nextindex +
					"'><option value=''>Choose...</option></select> \
            <input type='text' class='form-control' placeholder='Value' id='txt_" +
					nextindex +
					"'>&nbsp;<span id='remove_" +
					nextindex +
					"' class='remove col-md-1'>X</span></div>"
			);
		}
		fillSelcol_1(nextindex); // gets the column values for the second selection box
		var values = $("input[name='pname[]']")
			.map(function() {
				return $(this).val();
			})
			.get();
		console.log(values);
	});

	// Remove element
	$('.container').on('click', '.remove', function() {
		var id = this.id;
		//console.log(id)
		var split_id = id.split('_');
		var deleteindex = split_id[1];
		// Remove <div> with id
		$('#div_' + deleteindex).remove();
	});

	// Get filters and show in console:
	// Also print the filters in the card under active filters
	$('#toConsole').click(function() {
		// Set predefined filters to unselected:
		$('#preDefsel').prop('selectedIndex', -1);

		// Get values from text fields:
		var textVal = $("input[id^='txt']")
			.map(function() {
				return $(this).val();
			})
			.get();
		// Get values from ops-field:
		var opVal = $("select[id^='selop']")
			.map(function() {
				return $(this).val();
			})
			.get();
		//  Get values from column selectbox
		var colVal = $("select[id^='selcol']")
			.map(function() {
				return $(this).val();
			})
			.get();
		// Get values from checkbox-field: Bool
		var checkVal = $("input[id^='check']")
			.map(function() {
				return $(this).is(':checked');
			})
			.get();
		// Iterate filters and fill the card on the bottom of the page:
		fillCard(textVal, colVal, opVal, checkVal);

		// Reload variant table:
		// How to send parameters with the reload?
		// Getfilters kjøres automatisk, så trenger ikke gjøre noe annet enn dette
		$('#variants').DataTable().ajax.reload();
	});

	// Reload page on click of Reset Filters:
	$('#resetFilters').on('click', function() {
		console.log('clicked reset filters button');
		// Reset pred filters box:
		$('#preDefsel').val($('#target option:first').val());
		// Have to do this for all the other filters also
		resetRegFilters();
		$('#variants').DataTable().ajax.reload();
	});

	// ###############################
	// Logic IGV:
	// ###############################

	// Start IGV On uncollapse of card body:
	$('#collapseIGV').on('shown.bs.collapse', function() {
		var pos;

		if ($('#variants').DataTable().rows('.selected').any()) {
			console.log('selected');
			var data = $('#variants').DataTable().rows({ selected: true }).data()[0];
			pos = data.chr + ':' + (data.pos - 40) + '-' + (parseInt(data.pos) + 40);
		}
	});
	// ###############################
	// Sending POST data to frontend:
	// ###############################
	// $('#saveInterpButton').on('click', function() {
	// 	postInterpData(true, interpdata);
	// 	console.log('clicked update save interp button');
	// });

	// Testing sending post data to frontend:
	// $('#sendInterpButton').on('click', function() {  This is moved to Vue
	// 	postInterpData(false, interpdata);
	// 	console.log('clicked send interp button');
	// });

	// When detecting changes in comments, print them
	// Obs, this should only be able to input if variant is selected.
	$('#varComments').bind('input propertychange', function() {
		if (this.value.length) {
			console.log(positionID);
			interpdata['variantInterps'][positionID]['variantComment'] = $(this).val();
			console.log($(this).val());
			console.log(interpdata);
		}
	});

	$('#sampleComments').bind('input propertychange', function() {
		if (this.value.length) {
			var val = 'sampleComment';
			interpdata[val] = $(this).val();
			console.log(interpdata);
		}
	});
});
