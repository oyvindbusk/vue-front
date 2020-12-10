<template>
    <div>
        <b-container col="xs">
            <div class="form-group" v-for="(input,k) in inputs" :key="k">
                <b-col sm="9">
                    <input type="text" class="form-control" v-model="input.name" /> <input type="text" class="form-control" v-model="input.name2" />
                </b-col>
                <span>
          <b-button v-on:click="remove(k)" v-show="k || ( !k && inputs.length > 1)">Button 1</b-button>
          <b-button v-on:click="add(k)" v-show="k == inputs.length-1">Button 2</b-button>
      </span>
            </div>
        </b-container>
    </div>
</template>

<script>
export default {
    name: "filter-component",
    data() {
        return {
            inputs: [{
                name: "",
                name2: ""
            }]
        };
    },
    methods: {
        add() {
            this.inputs.push({ name: "", name2: "" });
        },
        remove(index) {
            this.inputs.splice(index, 1);
        }
    }
}
</script>