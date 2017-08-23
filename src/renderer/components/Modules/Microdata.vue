<template>
  <div class="column" v-if="typeof this.$store.state.Website.$ === 'function'">
    <h4 class="ui top attached inverted header">
      Microdata / RDFa-lite / JSON-LD
    </h4>
    <div class="ui bottom attached segment">
      <tree-view :data="parsed" :options="{maxDepth: 4}"></tree-view>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        parsed: {}
      }
    },
    watch: {
      $: function (new$) {
        var WAE = require('web-auto-extractor').default
        this.parsed = WAE().parse(new$('html'))
      }
    },
    computed: {
      $: function () {
        return this.$store.state.Website.$
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
.column {
  padding-top: 15px
}
.content.header {
  text-align: center
}
</style>
