import React from 'react'
import {ApolloProvider} from "@apollo/client";
import 'nav-frontend-core/dist/main.css'
// import styles from './styles.module.css'
import NotifikasjonWidgetComponent from './NotifikasjonWidget/NotifikasjonWidget'
import {createClient} from "./api/graphql";

// interface Props {
//   text: string
// }

export const NotifikasjonWidget = () => {
  return (
    <ApolloProvider client={createClient()}>
      <NotifikasjonWidgetComponent />
    </ApolloProvider>
  )
}
