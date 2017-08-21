<template>
  <div class="ui page dimmer active" v-if="show">
    <div class="content">
      <div class="center">
        <h2 class="ui inverted icon header">
          <i class="frown icon"></i>
          {{ $t('error.default.title') }}
          <div class="sub header">{{ title }}</div>
          <div class="sub header">{{ text }}</div>
        </h2>
        <p><button v-on:click="hideError()" class="ui inverted red button">{{ $t('error.default.close') }}</button></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      hideError: function () {
        this.$store.commit('UPDATE_ERROR', {
          show: false
        })
      }
    },
    computed: {
      text: function () {
        return this.$store.state.Error.text
      },
      title: function () {
        return this.$store.state.Error.title
      },
      show: function () {
        return this.$store.state.Error.show
      }
    }
  }
</script>

<style scoped>

</style>
