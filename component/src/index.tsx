import React, { createContext, PropsWithChildren, useContext } from 'react'
import { ApolloProvider } from '@apollo/client'
import NotifikasjonWidgetComponent from './NotifikasjonWidget/NotifikasjonWidget'
import { createClient } from './api/graphql'
import '@navikt/ds-css'
import { EnvironmentProvider, Miljø, useEnvironment } from './utils/EnvironmentProvider'
import { AmplitudeProvider } from './utils/amplitude';

export type Props = {
  miljo?: Miljø
}
export {Miljø} from './utils/EnvironmentProvider'
export * as GQL from './api/graphql-types'

export const NotifikasjonWidget = (props: Props) => {
  if (useContext(NotifikasjonWidgetProviderLoadedContext)) {
    return <NotifikasjonWidgetComponent/>
  } else {
    if (props.miljo === undefined) {
      console.error(`
        Unable to load Notifikasjonwidget.
        NotifikasjonWidget is missing property 'miljo'.
        It must be provided by NotifikasjonWidgetProvider or directly as a property.
      `)
      return null
    } else {
      return (
        <NotifikasjonWidgetProvider miljo={props.miljo}>
          <NotifikasjonWidgetComponent/>
        </NotifikasjonWidgetProvider>
      )
    }
  }
}

const NotifikasjonWidgetProviderLoadedContext  = createContext<boolean>(false);

export type ProviderProps = PropsWithChildren<{
  miljo: Miljø;
}>

export const NotifikasjonWidgetProvider = (props: ProviderProps) => {
  return (
    <NotifikasjonWidgetProviderLoadedContext.Provider value={true}>
      <EnvironmentProvider miljø={props.miljo}>
        <AmplitudeProvider>
          <DecoratedApolloProvider>
            {props.children}
          </DecoratedApolloProvider>
        </AmplitudeProvider>
      </EnvironmentProvider>
    </NotifikasjonWidgetProviderLoadedContext.Provider>
  )
};

const DecoratedApolloProvider: React.FC = ({children}) => {
  const {gittMiljø} = useEnvironment()

  const apiurl = gittMiljø({
    prod: 'https://ag-notifikasjon-proxy.nav.no/api/graphql',
    dev: 'https://ag-notifikasjon-proxy.dev.nav.no/api/graphql',
    labs: 'https://ag-notifikasjon-proxy.labs.nais.io/api/graphql',
    other: 'https://ag-notifikasjon-proxy.labs.nais.io/api/graphql',
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
