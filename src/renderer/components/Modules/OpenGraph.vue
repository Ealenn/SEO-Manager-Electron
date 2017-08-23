<template>
  <div class="column" v-if="meta.length > 0">
    <h4 class="ui top attached inverted header">{{ $t('metadata.array.title') }}</h4>
    <div class="ui bottom attached segment">

      <div class="ui cards">
        <div class="card" :style="'width:100%;border-bottom: 3px solid;border-top: 3px solid;border-color:' + google.theme">
          <div class="content">
            <div class="header" v-html="title"></div>
            <div class="description" v-html="google.description"></div>
            <div class="meta"><img :src="favicon" style="height: 20px;width: 20px;" class="ui middle aligned mini image"> {{ url }}</div>
          </div>
        </div>
      </div>

      <h4 class="ui horizontal divider header">
        <i class="twitter icon"></i>
        Twitter
      </h4>
      <div class="ui cards">
        <div class="card" style="width:100%;">
          <div class="content">
            <div class="header" v-html="twitter.title"></div>
            <div class="description">
              <p style="float:left;margin:5px"><img :src="twitter.img" class="ui middle aligned small image"></p>
              <p class="middle aligned" v-html="twitter.description"></p>
            </div>
            <div class="meta">{{ url }}</div>
          </div>
        </div>
      </div>

      <h4 class="ui horizontal divider header">
        <i class="facebook icon"></i>
        Facebook
      </h4>
      <div class="ui cards">
        <div class="card" style="width:100%;">
          <div class="content">
            <div class="header" v-html="facebook.title"></div>
            <div class="description">
              <p style="float:left;margin:5px"><img :src="facebook.img" class="ui middle aligned small image"></p>
              <p class="middle aligned" v-html="facebook.description"></p>
            </div>
            <div class="meta">{{ url }}</div>
          </div>
        </div>
      </div>

      <table class="ui very basic fixed striped table">
        <thead>
          <tr>
            <th>{{ $t('metadata.array.property') }} / {{ $t('metadata.array.name') }}</th>
            <th>{{ $t('metadata.array.content') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in meta">
            <td>{{ item.property || item.name }}</td>
            <td>{{ item.content }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import isUrl from 'validator/lib/isUrl'
  export default {
    data () {
      return {
        google: {
          description: '',
          theme: '#FFF'
        },
        twitter: {
          title: '',
          description: '',
          img: ''
        },
        facebook: {
          title: '',
          description: '',
          img: ''
        }
      }
    },
    computed: {
      meta: function () {
        let metaTags = []
        if (typeof this.$store.state.Website.$ === 'function') {
          var check = function (elem, arg) {
            return elem.attribs.property === arg || elem.attribs.name === arg
          }
          this.$store.state.Website.$('meta').each((index, elem) => {
            metaTags.push({
              property: elem.attribs.property,
              name: elem.attribs.name,
              content: elem.attribs.content
            })
            // Chrome color
            if (check(elem, 'theme-color')) {
              this.google.theme = elem.attribs.content
            }
            // Description
            if (check(elem, 'description')) {
              this.google.description = elem.attribs.content
              this.facebook.description = elem.attribs.content
              this.twitter.description = elem.attribs.content
            }
          })

          // OG
          this.$store.state.Website.$('meta').each((index, elem) => {
            // : Title
            if (check(elem, 'og:title')) {
              this.facebook.title = elem.attribs.content
              this.twitter.title = elem.attribs.content
            }
            // : Description
            if (check(elem, 'og:description')) {
              this.facebook.description = elem.attribs.content
              this.twitter.description = elem.attribs.content
            }
            // : Image
            if (check(elem, 'og:image')) {
              this.facebook.img = elem.attribs.content
              this.twitter.img = elem.attribs.content
            }
          })

          // Twitter
          this.$store.state.Website.$('meta').each((index, elem) => {
            // : Title
            if (check(elem, 'twitter:title')) {
              this.twitter.title = elem.attribs.content
            }
            // : Description
            if (check(elem, 'twitter:description')) {
              this.twitter.description = elem.attribs.content
            }
            // : Image
            if (check(elem, 'twitter:image')) {
              this.twitter.img = elem.attribs.content
            }
          })

          // Default Value
          this.facebook.title = this.facebook.title.length < 1 ? this.title : this.facebook.title
          this.twitter.title = this.twitter.title.length < 1 ? this.title : this.twitter.title

          this.facebook.description = this.facebook.description.length < 1 ? this.google.description : this.facebook.description
          this.twitter.description = this.twitter.description.length < 1 ? this.google.description : this.twitter.description
        }
        return metaTags
      },
      title: function () {
        return this.$store.state.Website.$('title').text()
      },
      url: function () {
        return this.$store.state.Website.url
      },
      favicon: function () {
        var favicon = ''
        this.$store.state.Website.$('link').each(function (i, elem) {
          if (elem.attribs.rel && elem.attribs.rel.indexOf('icon') !== -1) {
            favicon = elem.attribs.href
          }
        })

        if (!isUrl(favicon)) {
          if (!favicon.substring(0, 2) === '//') {
            favicon = this.$store.state.Website.url + favicon
          }
        }

        return favicon
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
</style>
