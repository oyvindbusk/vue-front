<template>
<div id="app" class="container">
<div v-if="!loading">
<b-container fluid>
      <b-row>
        <b-col sm="2">
          <label for="textarea-small"
            >Sample comment for sample {{ $route.params.id }}:</label
          >
        </b-col>
        <b-col sm="10">
          <b-form-textarea
            id="textarea-small"
            v-model="sessioncomment"
            @keyup="$emit('update:sessioncomment', sessioncomment)"
            size="sm"
            placeholder="Comment here: "
          ></b-form-textarea>
        </b-col>
      </b-row>
    </b-container>
</div>
    </div>
</template>

<script>

export default {


    name: "sessioncomm-component",
    props: ["loading", "sessioncomment"],
    data() {
      return {
        sample_comment: ""
      }
    }
}
</script>