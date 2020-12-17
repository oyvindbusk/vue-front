var helper_funcs =  {
    set_vis_false(i) {

        if (i.chr === this.filters[0].filtervalue) {
            i.visibility = false;
        }
        return i
    },
    set_vis_true(i) {
        i.visibility = true;
        return i
    }
}

export default helper_funcs 

// filtervalue: "1",
// operator: "eq",
// keepmiss: false,
// columns: "chr"
// },