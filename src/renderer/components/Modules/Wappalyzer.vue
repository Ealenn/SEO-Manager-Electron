<template>
  <div class="column" v-if="typeof this.$store.state.Website.$ === 'function'">
    <h4 class="ui top attached inverted header">{{ $t('wappalyzer.panel.title') }}</h4>
    <div class="ui bottom attached segment">
      <div class="ui active inverted dimmer" v-if="showLoading && !this.$store.state.Loading.show">
        <div class="ui loader"></div>
      </div>
      <table class="ui very basic table">
        <thead>
          <tr>
            <th></th>
            <th>{{ $t('wappalyzer.array.name') }}</th>
            <th>{{ $t('wappalyzer.array.categories') }}</th>
            <th>{{ $t('wappalyzer.array.confidence') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in arrayWappalyzer">
            <td><img :src="'https://wappalyzer.com/images/icons/' + item.icon" class="ui mini image" /></td>
            <td><a href="#" v-on:click="open(item.website)">{{ item.name }}</a></td>
            <td>{{ getCategories(item.categories) }}</td>
            <td>
              <div class="ui tiny progress">
                <div class="bar" :style="'width: ' + item.confidence + '%'"></div>
                <div class="label">{{ item.confidence }} %</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  const _ = require('lodash')
  const wappalyzer = require('wappalyzer')

  export default {
    data () {
      return {
        showLoading: true,
        arrayWappalyzer: []
      }
    },
    watch: {
      url: function (val) {
        console.log('Wappanalyzer -> LOAD:', val)
        this.showLoading = true
        wappalyzer.analyze(this.$store.state.Website.url)
          .then(json => {
            this.arrayWappalyzer = json
            this.showLoading = false
          })
          .catch(error => {
            console.error('Wappanalyzer -> ERROR:', error)
            this.showLoading = false
          })
      }
    },
    computed: {
      url: function () {
        return this.$store.state.Website.url
      }
    },
    methods: {
      getCategories: function (categories) {
        let strCategories = ''
        _.forEach(categories, (value, key) => {
          _.forEach(value, (item) => {
            strCategories += item + ' '
          })
        })
        return strCategories
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style scoped>
.column {
  padding-top: 15px
}
</style>
