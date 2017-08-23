<template>
  <div id="app" class="ui main container">
    <loading></loading>
    <error></error>

    <translate></translate>
    <website></website>
    
    <wappalyzer></wappalyzer>
    <open-graph></open-graph>
    <microdata></microdata>
    <keywords></keywords>
    <pageSpeed></pageSpeed>
    <w3c-css></w3c-css>
  </div>
</template>

<script>
  import Translate from './Modules/Translate'
  import Error from './Modules/Error'
  import Loading from './Modules/Loading'
  import Website from './Modules/Website'
  import Wappalyzer from './Modules/Wappalyzer'
  import Keywords from './Modules/Keywords'
  import OpenGraph from './Modules/OpenGraph'
  import PageSpeed from './Modules/Pagespeed'
  import W3cCss from './Modules/W3cCss'
  import Microdata from './Modules/Microdata'

  export default {
    name: 'home-page',
    components: {
      Translate,
      Error,
      Loading,
      Website,
      Wappalyzer,
      Keywords,
      OpenGraph,
      PageSpeed,
      W3cCss,
      Microdata
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
