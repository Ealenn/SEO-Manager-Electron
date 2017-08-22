<template>
  <div class="column" v-if="typeof this.$store.state.Website.$ === 'function'">
    <h4 class="ui top attached inverted header" :style="'background-color:' + this.getPrcColor(score)">
      {{ $t('gpagespeed.panel.title') }} 
      <div class="ui grey horizontal label">{{ score }} / 100</div>
    </h4>
    <div class="ui bottom attached segment">
      <div class="ui active inverted dimmer" v-if="showLoading && !this.$store.state.Loading.show">
        <div class="ui loader"></div>
      </div>
      <div class="ui items">
        <div class="item" v-if="screenshot.data">
          <div class="ui medium image">
            <img :src="'data:' + screenshot.mime_type + ';base64,' + screenshot.data.replace(/_/g,'/').replace(/-/g,'+')">
          </div>
          <div class="content">
            <div class="meta">
              <div class="ui small teal progress">
                <div class="bar" :style="'width: ' + score + '%'"></div>
                <div class="label">{{ score }} / 100</div>
              </div>
            </div>
            <div class="description">
              <ul v-for="(value, key) in arrayPageStats">
                <li>{{ key }} : {{ value }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <table class="ui very basic table">
        <thead>
          <tr>
            <th>{{ $t('gpagespeed.array.title') }}</th>
            <th>{{ $t('gpagespeed.array.description') }}</th>
            <th>{{ $t('gpagespeed.array.impact') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in results" v-if="item.impact > 0" v-bind:key="item.title">
            <td>{{ item.title }}</td>
            <td>{{ item.summary }}</td>
            <td>{{ Math.round(item.impact + 0.5) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  const _ = require('lodash')
  const pagespeed = require('gpagespeed')

  export default {
    data () {
      return {
        showLoading: true,
        arrayPageSpeed: [],
        arrayPageStats: [],
        screenshot: {},
        score: 0
      }
    },
    watch: {
      url: function (val) {
        console.log('GPageSpeed -> LOAD:', val)
        this.showLoading = true
        pagespeed({
          url: this.url,
          key: this.key,
          locale: this.$store.state.local,
          screenshot: true
        }).then(json => {
          this.arrayPageSpeed = json.formattedResults.ruleResults
          this.arrayPageStats = json.pageStats
          this.score = json.ruleGroups.SPEED.score
          this.screenshot = json.screenshot
          this.showLoading = false
        }).catch(error => {
          console.error('GPageSpeed -> ERROR:', error)
          this.showLoading = false
        })
      }
    },
    computed: {
      url: function () {
        return this.$store.state.Website.url
      },
      key: function () {
        return this.$store.state.Pagespeed.key
      },
      results: function () {
        let results = []
        _.forEach(this.arrayPageSpeed, (item) => {
          results.push({
            title: item.localizedRuleName,
            impact: item.ruleImpact,
            summary: this.getSummary(item)
          })
        })
        return _.orderBy(results, ['impact'], ['desc'])
      }
    },
    methods: {
      GoogleComment: function (item) {
        var newValue = item.format
        var link = ['{{BEGIN_LINK}}', '{{END_LINK}}']
        // Delete Links
        _.forEach(link, (item) => {
          newValue = newValue.replace(item, '')
        })
        // Args
        _.forEach(item.args, (value, key) => {
          newValue = newValue.replace('{{' + value.key + '}}', value.value)
        })
        return newValue
      },
      getSummary: function (item) {
        var summary = ''
        if (item.summary) {
          summary = this.GoogleComment(item.summary)
        } else if (item.urlBlocks.length > 0) {
          summary = this.GoogleComment(item.urlBlocks[0].header)
        }
        return summary
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
.content.header {
  text-align: center
}
</style>
