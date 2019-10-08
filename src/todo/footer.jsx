import '../assets/styles/footer.styl'
// import Style from '../assets/styles/footer.styl'

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Footer',
  data () {
    return {
      str: 'yang'
    }
  },
  computed: {
    name () {
      return this.str;
    },
    ...mapGetters({
      author: 'fullName'
      // info: 'a/info'

    }),
    ...mapState({
      mail: (state) => (state.firstName + state.copyright)
      // username: (state) => (state.a.username)
    })
  },
  render () {
    return (
      <div id='footer'
        /* id={Style.footer} */
      >
        <span>{this.mail} Written by {this.author}</span>
        {/* <p>: {this.username}</p> */}
        <p>: {this.info}</p>
      </div>
    )
  },
  mounted () {

  }
}
