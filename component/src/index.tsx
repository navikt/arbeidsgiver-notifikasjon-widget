import React from 'react'
import { ApolloProvider } from '@apollo/client'
import 'nav-frontend-core/dist/main.css'
// import styles from './styles.module.css'
import NotifikasjonWidgetComponent from './NotifikasjonWidget/NotifikasjonWidget'
import { createClient } from './api/graphql'
import '@navikt/ds-css'
import { gittMiljo } from './utils/environment'

export type Props = {
  apiUri?: string,
  miljo: 'local' | 'dev-gcp' | 'prod-gcp';
}

export const NotifikasjonWidget = (props: Props) => {

  const apiurl = props.apiUri ?? gittMiljo({
    prod: '',
    dev: 'https://ag-notifikasjon-proxy.dev.nav.no/api/graphql',
    other: 'http://localhost:8081/api/graphql'
  }, props.miljo)

  const credentials = props.apiUri ?? gittMiljo({
    prod: 'include',
    dev: 'include',
    other: undefined
  }, props.miljo)
  return (
    <ApolloProvider client={createClient(apiurl, credentials)}>
      <NotifikasjonWidgetComponent />
    </ApolloProvider>
  )
}
