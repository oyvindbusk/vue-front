<template>
{{sessioncomment}}
<b-container fluid>
      <b-row>
        <b-col sm="2">
          <label for="textarea-small"
            >Sample comment for sample {{ $route.params.id }}:</label
          >
        </b-col>
        <b-col sm="10">
          <b-form-textarea v-if="this.$store.getters.sessioncomment"
            id="textarea-small"
            v-model="sample_comment"
            size="sm"
            placeholder="Comment here: "
            @blur="setChanged()"
          ></b-form-textarea>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>

export default {


    name: "sessioncomm-component",
    data() {
      return {
        sample_comment: ""
      }
    }
}
</script>