import React from 'react'
import styles from './styles.module.css'
import NotifikasjonWidget from './NotifikasjonWidget/NotifikasjonWidget'
import {ConfiguredApolloProvider} from "./api/graphql";

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return (
    <div className={styles.test}>
      til eksempel: {text}
      <ConfiguredApolloProvider>
        <NotifikasjonWidget />
      </ConfiguredApolloProvider>
    </div>
  )
}
