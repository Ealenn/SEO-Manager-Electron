<template>
    <div class="ui active dimmer" v-if="show">
        <div class="ui text loader">
            {{ $t('loading.default.text') }} <br /> {{ text }}
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
      text: function () {
        return this.$store.state.Loading.text
      },
      show: function () {
        return this.$store.state.Loading.show
      }
    }
  }
</script>

<style scoped>

</style>
