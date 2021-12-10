import React, { createContext, FC, useContext } from 'react'

export type Miljø = 'local' | 'labs' | 'dev' | 'prod'

interface Miljo<T, > {
  prod: T
  dev?: T
  labs?: T
  other: T
}

interface Context {
  miljø: Miljø,
  gittMiljø: <T, >(e: Miljo<T>) => T,
}
const EnvironmentContext = createContext<Context>({miljø: "local", gittMiljø: (e) => e.other})

interface Props {
  miljø: Miljø
}
export const EnvironmentProvider: FC<Props> = ({miljø, children}) => {
  const gittMiljø = <T, >(e: Miljo<T>): T => {
    switch (miljø) {
      case 'prod':
        return e.prod
      case 'dev':
        return e.hasOwnProperty('dev') ? e.dev! : e.other
      case 'labs':
        return e.hasOwnProperty('labs') ? e.labs! : e.other
      default:
        return e.other
    }
  }
  const environment = {
    miljø,
    gittMiljø
  }

  return <EnvironmentContext.Provider value={environment}>
    {children}
  </EnvironmentContext.Provider>
}

export function useEnvironment(): Context {
  return useContext(EnvironmentContext)
}
