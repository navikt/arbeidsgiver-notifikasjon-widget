import React from 'react'
import {ApolloProvider} from "@apollo/client";
import 'nav-frontend-core/dist/main.css'
// import styles from './styles.module.css'
import NotifikasjonWidgetComponent from './NotifikasjonWidget/NotifikasjonWidget'
import {createClient} from "./api/graphql";

interface Props {
  apiUri: string
}

export const NotifikasjonWidget = (props: Props) => {
  return (
    <ApolloProvider client={createClient(props.apiUri)}>
      <NotifikasjonWidgetComponent />
    </ApolloProvider>
  )
}
