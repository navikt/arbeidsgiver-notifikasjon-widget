import React from 'react'
import { ApolloProvider } from '@apollo/client'
import 'nav-frontend-core/dist/main.css'
// import styles from './styles.module.css'
import NotifikasjonWidgetComponent from './NotifikasjonWidget/NotifikasjonWidget'
import { createClient } from './api/graphql'
import '@navikt/ds-css'
import { EnvironmentProvider, useEnvironment, Miljø } from './utils/EnvironmentProvider'
import {AmplitudeProvider} from "./utils/amplitude";

export type Props = {
  apiUri?: string
  miljo: Miljø
}
export {Miljø} from './utils/EnvironmentProvider'

export const NotifikasjonWidget = (props: Props) => {
  return (
    <EnvironmentProvider miljø={props.miljo}>
      <AmplitudeProvider>
        <DecoratedApolloProvider {...props}>
          <NotifikasjonWidgetComponent/>
        </DecoratedApolloProvider>
      </AmplitudeProvider>
    </EnvironmentProvider>
  )
}

const DecoratedApolloProvider = (props: { apiUri?: string }, children: any) => {
  const {gittMiljø} = useEnvironment()

  const apiurl = props.apiUri ?? gittMiljø({
    prod: 'https://ag-notifikasjon-proxy.nav.no/api/graphql',
    dev: 'https://ag-notifikasjon-proxy.dev.nav.no/api/graphql',
    labs: 'https://ag-notifikasjon-proxy.labs.nais.io/api/graphql',
    other: 'http://localhost:8081/api/graphql'
  })

  const credentials = gittMiljø({
    prod: 'include',
    dev: 'include',
    labs: 'include',
    other: undefined
  })

  return (
    <ApolloProvider client={createClient(apiurl, credentials)}>
      {children}
    </ApolloProvider>
  )
}
