$(document).ready(function() {
	// Gets data for the samples table from backend
	$('#samples').DataTable({
		ajax: {
			url: '/api/samples'
		},
		select: true,
		columns: [ { data: 'sample_id' } ]
	});

	// Redirects to interpret/sample_ID
	$('#interpretButton').on('click', function() {
		var selrow = getRow().find('td:eq(0)').text();
		window.location.href = '/interpret/' + selrow;
		return false;
	});
});
