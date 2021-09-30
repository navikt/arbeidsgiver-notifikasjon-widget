import React from 'react'
import {ApolloProvider} from "@apollo/client";
import 'nav-frontend-core/dist/main.css'
// import styles from './styles.module.css'
import NotifikasjonWidgetComponent from './NotifikasjonWidget/NotifikasjonWidget'
import {createClient} from "./api/graphql";
import '@navikt/ds-css'


export type Props  = {
  apiUri: string,
  miljo: "local" | "dev-gcp" | "prod-gcp";
}

export const NotifikasjonWidget = (props:Props) => {
  return (
    <ApolloProvider client={createClient(props.apiUri)}>
      <NotifikasjonWidgetComponent />
    </ApolloProvider>
  )
}
