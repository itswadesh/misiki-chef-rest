<template>
  <div>
    This is the landing page.
    Please log in to get credentials to visit secret page "Page A"

    <form
      @submit.prevent="onSubmit"
      v-if="!isAuthenticated"
    >
      <table>
        <tbody>
          <tr>
            <td>
              <label>Username</label>
            </td>
            <td>
              <input
                type="text"
                v-model="credentials.email"
                required
              >
            </td>
          </tr>
          <tr>
            <td>
              <label>Password</label>
            </td>
            <td>
              <input
                type="password"
                v-model="credentials.password"
                required
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="submitting">Submitting ....</div>
      <button type="submit">Submit</button>
    </form>
    <div v-else>
      You are logged in!
      <button
        type="button"
        @click="onLogout"
      >Logout</button>
    </div>
    {{products}}
    <div
      style="color: red;"
      v-if="error"
    >{{error}}</div>
    <div v-if="successfulData">{{successfulData}}</div>
  </div>
</template>

<script>
import authenticateUserGql from '../gql/user/authenticateUser.gql'
import getProducts from '../gql/product/products.gql'
export default {
  head() {
    return {
      title: 'Startpage'
    }
  },
  data() {
    return {
      products: [],
      isAuthenticated: false,
      submitting: false,
      error: null,
      credentials: {
        email: '',
        password: ''
      },
      successfulData: null
    }
  },
  async mounted() {
    try {
      const res = (
        await this.$apollo.query({
          query: getProducts,
          variables: {},
          fetchPolicy: 'no-cache'
        })
      ).data
      this.products = res.products
      this.isAuthenticated = !!this.$apolloHelpers.getToken()
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
    }
  },
  methods: {
    async onSubmit() {
      this.submitting = true
      const credentials = this.credentials
      try {
        const res = await this.$apollo
          .mutate({
            mutation: authenticateUserGql,
            variables: credentials
          })
          .then(({ data }) => data && data.authenticateUser)
        await this.$apolloHelpers.onLogin(res.token, undefined, { expires: 7 })
        this.successfulData = res
        this.isAuthenticated = true
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
      }
    },
    async onLogout() {
      await this.$apolloHelpers.onLogout()
      this.isAuthenticated = false
    }
  }
}
</script>