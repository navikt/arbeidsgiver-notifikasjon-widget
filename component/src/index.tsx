import React from 'react'
import {ApolloProvider} from "@apollo/client";
import 'nav-frontend-core/dist/main.css'
// import styles from './styles.module.css'
import NotifikasjonWidgetComponent from './NotifikasjonWidget/NotifikasjonWidget'
import {createClient} from "./api/graphql";
import '@navikt/ds-css'
import {AmplitudeProvider} from "./NotifikasjonWidget/AmplitudeProvider";


interface Props {
  apiUri: string,
  lokal: boolean
}

export const NotifikasjonWidget = (props: Props) => {
  return (
    <ApolloProvider client={createClient(props.apiUri)}>
      <AmplitudeProvider lokal={props.lokal}>
      <NotifikasjonWidgetComponent />
      </AmplitudeProvider>
    </ApolloProvider>
  )
}
