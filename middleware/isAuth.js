import me from '~/gql/user/me.gql'
export default async function ({ app, error }) {
  const client = app.apolloProvider.defaultClient
  try {
    const res = await client.query({ query: me })
    if (!res) {
      error({ statusCode: 403, message: 'You are not allowed to see this' })
    }
  } catch (e) {
    error({ statusCode: 403, message: e.toString() })
  }
}