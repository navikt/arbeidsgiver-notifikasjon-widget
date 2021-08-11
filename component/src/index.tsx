import React from 'react'
import styles from './styles.module.css'
import NotifikasjonWidget from './NotifikasjonWidget/NotifikasjonWidget'

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return (
    <div className={styles.test}>
      til eksempel: {text}
      <NotifikasjonWidget />
    </div>
  )
}
