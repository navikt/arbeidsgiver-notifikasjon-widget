import React, { createContext, PropsWithChildren, useContext } from 'react'
import { ApolloProvider } from '@apollo/client'
import NotifikasjonWidgetComponent from './NotifikasjonWidget/NotifikasjonWidget'
import { createClient } from './api/graphql'
import '@navikt/ds-css'
import { AmplitudeProvider } from './utils/amplitude';

export type Props = {
  apiUrl: string
}
export {Miljø} from './utils/EnvironmentProvider'
export * as GQL from './api/graphql-types'

export const NotifikasjonWidget = (props: Props) => {
  if (useContext(NotifikasjonWidgetProviderLoadedContext)) {
    return <NotifikasjonWidgetComponent/>
  } else {
    if (props.apiUrl === undefined) {
      console.error(`
        Unable to load Notifikasjonwidget.
        NotifikasjonWidget is missing property 'apiUrl'.
        It must be provided by NotifikasjonWidgetProvider or directly as a property.
      `)
      return null
    } else {
      return (
        <NotifikasjonWidgetProvider apiUrl={props.apiUrl}>
          <NotifikasjonWidgetComponent/>
        </NotifikasjonWidgetProvider>
      )
    }
  }
}

const NotifikasjonWidgetProviderLoadedContext  = createContext<boolean>(false);

export type ProviderProps = PropsWithChildren<{
  apiUrl: string;
}>

export const NotifikasjonWidgetProvider = ({apiUrl, children}: ProviderProps) => {
  return (
    <NotifikasjonWidgetProviderLoadedContext.Provider value={true}>
        <AmplitudeProvider><ApolloProvider client={createClient(apiUrl)}>
          {children}
        </ApolloProvider>
        </AmplitudeProvider>
    </NotifikasjonWidgetProviderLoadedContext.Provider>
  )
};
