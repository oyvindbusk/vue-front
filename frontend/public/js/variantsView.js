$(document).ready(function() {
	// Load all variants:

	// $('#loadAllVars').click(function() {
	// 	if ($.fn.dataTable.isDataTable('#allVariants')) {
	// 		resetRegFilters();
	// 		$('#allVariants').DataTable().ajax.reload();
	// 	} else {
	// 		fillVarTable();
	// 	}
	// });

	// On click of row in table; get the data for the selected row into variable variantData
	$('#allVariants').on('select.dt', function(e, dt, type, indexes) {
		var data = getCurrentVariant(e, dt, type, indexes);
		console.log(data[0]['chr'] + '----');
		// Unncolapse variant window:
		$('#variant_card_collapsed').collapse('show');
		return data;
	});

	// Update object with class if class is present from query on table init:
	// $('#allVariants').on('init.dt', function() {
	// 	setClass.call();
	// });

	// ###############################
	// Logic for the filter module:
	// ###############################

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

	// Get filters and show in console:
	// Also print the filters in the card under active filters
	$('#toConsole').click(function() {
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

		// Reload variant table if exist, otherwise, init:

		if ($.fn.dataTable.isDataTable('#allVariants')) {
			$('#allVariants').DataTable().ajax.reload();
		} else {
			fillVarTable();
		}
	});

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

	// Reload page on click of Reset Filters:
	$('#resetFilters').on('click', function() {
		resetRegFilters();
		$('#allVariants').DataTable().ajax.reload(setClass);
	});
});

// get variants from backend to populate table
function fillVarTable() {
	$('#allVariants').DataTable({
		dom: 'Bflrtip',
		columnDefs: [
			{
				targets: [ 9, 10, 11, 12 ],
				visible: false
			}
		],
		buttons: [ 'csv', 'copy', { extend: 'colvis', columns: ':not(.noVis)' } ],
		ajax: {
			url: '/api/variants',
			data: function(d) {
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
			{ data: 'hets' },
			{ data: 'homs' },
			{ data: 'Status' },
			{ data: 'annotation' },
			{ data: 'geneID' },
			{ data: 'featureType' },
			{ data: 'featureID' }
		],
		initComplete: function(_settings, _json) {
			console.log('DataTables has finished its initialisation.');
			setClass();
		}
	});
}

function setClass() {
	var table = $('#allVariants').DataTable();
	table
		.rows()
		.every(function(rowIdx, _tableLoop, _rowLoop) {
			var d = this.data;
			if (d()['masterClass'].length) {
				console.log(d()['masterClass']);
				table
					.cell(rowIdx, 8)
					.data('<span class="btn btn-xs btn-success">Class: ' + d()['masterClass'] + '</span>');
			}
		})
		.draw();
}
