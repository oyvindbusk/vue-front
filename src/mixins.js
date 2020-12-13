export const mixins = {
	methods: {
		rowSelected(items) {
			this.selectedSample = items[0].sampleID;
		}
	}
};
