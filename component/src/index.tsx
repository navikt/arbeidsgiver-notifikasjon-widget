import React from 'react'
import { ApolloProvider } from '@apollo/client'
import 'nav-frontend-core/dist/main.css'
// import styles from './styles.module.css'
import NotifikasjonWidgetComponent from './NotifikasjonWidget/NotifikasjonWidget'
import { createClient } from './api/graphql'
import '@navikt/ds-css'
import { gittMiljo } from './utils/environment'

export type Miljø = 'local' | 'labs' | 'dev' | 'prod'
export type Props = {
  apiUri?: string,
  miljo: Miljø;
}

export const NotifikasjonWidget = (props: Props) => {

  const apiurl = props.apiUri ?? gittMiljo({
    prod: 'https://ag-notifikasjon-proxy.nav.no/api/graphql',
    dev: 'https://ag-notifikasjon-proxy.dev.nav.no/api/graphql',
    labs: 'https://ag-notifikasjon-proxy.labs.nais.io/api/graphql',
    other: 'http://localhost:8081/api/graphql'
  }, props.miljo)

  const credentials = gittMiljo({
    prod: 'include',
    dev: 'include',
    labs: 'include',
    other: undefined
  }, props.miljo)
  return (
    <ApolloProvider client={createClient(apiurl, credentials)}>
      <NotifikasjonWidgetComponent />
    </ApolloProvider>
  )
}
