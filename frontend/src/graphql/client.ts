import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { getStoredAuthToken } from '@/utils/authToken'

const httpLink = createHttpLink({
  uri: 'http://ec2-35-180-196-42.eu-west-3.compute.amazonaws.com:5000/graphql'
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: getStoredAuthToken()
        ? `Bearer ${getStoredAuthToken()}`
        : undefined
    }
  }
})

const cache = new InMemoryCache()

export const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient(
  {
    link: authLink.concat(httpLink),
    cache
  }
)