var app = new Vue({
	el: '#app',
	data: {
		variantObject: {},
		masterClass: '',
		masterComment: '',
		positionID: '',
		hGVSp: '',
		hGVSc: '',
		usr: '',
		date: '',
		gene: '',
		annotation: '',
		impact: '',
		feature_type: '',
		samples: []
	},
	methods: {
		loadAllVars: function(event) {
			if ($.fn.dataTable.isDataTable('#allVariants')) {
				resetRegFilters();
				$('#allVariants').DataTable().ajax.reload(setClass.call());
			} else {
				fillVarTable();
			}
		},
		postData: function(event) {
			axios
				.post('/api/posttest2', this.variantObject)
				.then((response) => (this.responseData = response.data))
				.catch((error) => {});
			// `event` is the native DOM event
		},
		tableClickUpdate: function(event) {
			// Gets the data from the table, and sets it to the vue-variables:
			$('#allVariants').on('select.dt', (e, dt, type, indexes) => {
				var data = getCurrentVariant(e, dt, type, indexes); // Gets the data for the selected variant
				this.positionID = data[0]['positionID'];
				this.hGVSp = data[0]['hGVSp'];
				this.hGVSc = data[0]['hGVSc'];
				this.gene = data[0]['geneName'];
				this.annotation = data[0]['annotation'];
				this.impact = data[0]['annotationImpact'];
				this.feature_type = data[0]['featureType'];

				// Check if comment or class is present
				if (typeof this.variantObject[this.positionID] != 'undefined') {
					this.masterComment = this.variantObject[this.positionID].masterComment;
					this.masterClass = this.variantObject[this.positionID].masterClass;
				} else {
					this.masterComment = data[0]['masterComment'];
					this.masterClass = data[0]['masterClass'];
				}

				// Add to samples
				this.samples = [];
				data[0]['groupedSamples'].split('|').forEach((value, index, array) => {
					this.samples.push({ info: value });
				});
			});
		},
		onchange: function() {
			// Update object with properties
			// On change of class, add the label to the table row
			if (this.masterClass.length) {
				var c = this.masterClass;
				$('#allVariants')
					.DataTable()
					.rows({ selected: true })
					.every(function(rowIdx, tableLoop, rowLoop) {
						$('#allVariants')
							.DataTable()
							.cell(rowIdx, 8)
							.data('<span class="btn btn-xs btn-success">Class: ' + c + '</span>');
					})
					.draw();
			}
			this.variantObject[this.positionID] = {
				masterClass: this.masterClass,
				usr: this.usr,
				masterComment: this.masterComment,
				date: this.date
			};
		}
	},
	created() {
		this.usr = $('#hiddenuser').text().replace('\n', '');
		// Get todays date in correct format for the re:
		this.date = yyyymmdd(); // Sets the date:
	}
});
