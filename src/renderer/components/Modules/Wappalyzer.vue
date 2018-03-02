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
            <td><img :src="'https://www.wappalyzer.com/images/icons/' + item.icon" class="ui mini image" /></td>
            <td><a href="#" v-on:click="open(item.website)">{{ item.name }}</a></td>
            <td>{{ getCategories(item.categories) }}</td>
            <td>
              <div class="ui tiny progress">
                <div class="bar" :style="'width: ' + item.confidence + '%;background-color:' + getPrcColor(item.confidence)"></div>
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
      },
      getPrcColor: function (prc, inversed = false) {
        if (prc <= 10) {
          return inversed ? '#4CAF50' : '#DD2C00'
        } else if (prc > 10 && prc <= 20) {
          return inversed ? '#8BC34A' : '#FF3D00'
        } else if (prc > 20 && prc <= 30) {
          return inversed ? '#00E676' : '#FF6E40'
        } else if (prc > 30 && prc <= 40) {
          return inversed ? '#69F0AE' : '#FF6D00'
        } else if (prc > 40 && prc <= 50) {
          return inversed ? '#FFD600' : '#FF9100'
        } else if (prc > 50 && prc <= 60) {
          return inversed ? '#FF6D00' : '#FFD600'
        } else if (prc > 60 && prc <= 70) {
          return inversed ? '#FF6D00' : '#69F0AE'
        } else if (prc > 70 && prc <= 80) {
          return inversed ? '#FF6E40' : '#00E676'
        } else if (prc > 80 && prc <= 90) {
          return inversed ? '#FF3D00' : '#8BC34A'
        } else if (prc > 90) {
          return inversed ? '#DD2C00' : '#4CAF50'
        }
      }
    }
  }
</script>

<style scoped>
.column {
  padding-top: 15px
}
</style>
