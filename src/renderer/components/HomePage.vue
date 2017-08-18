<template>
  <div id="app" class="ui main container">
    <loading></loading>
    <translate></translate>
    <website></website>
  </div>
</template>

<script>
  import Translate from './Modules/Translate'
  import Loading from './Modules/Loading'
  import Website from './Modules/Website'

  export default {
    name: 'home-page',
    components: {
      Translate,
      Loading,
      Website
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
#app {
  padding-top: 10px
}
</style>
