<template>
  <div id="app" class="ui main container">
    <loading></loading>
    <error></error>

    <translate></translate>
    <website></website>
    <open-graph></open-graph>
    <keywords></keywords>
  </div>
</template>

<script>
  import Translate from './Modules/Translate'
  import Error from './Modules/Error'
  import Loading from './Modules/Loading'
  import Website from './Modules/Website'
  import Keywords from './Modules/Keywords'
  import OpenGraph from './Modules/OpenGraph'

  export default {
    name: 'home-page',
    components: {
      Translate,
      Error,
      Loading,
      Website,
      Keywords,
      OpenGraph
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
