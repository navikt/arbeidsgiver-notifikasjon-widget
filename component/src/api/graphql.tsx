import {
  ApolloClient,
  InMemoryCache,
  gql,
} from '@apollo/client'
import { Beskjed } from './graphql-types'

const baseurl = 'http://localhost:8081'
export const createClient = () =>
  new ApolloClient({
    uri: `${baseurl}/api/graphql`,
    cache: new InMemoryCache()
  })

export interface HentNotifikasjonerData {
  notifikasjoner: Beskjed[]
}

export const HENT_NOTIFIKASJONER = gql`
  query hentNotifikasjoner {
    notifikasjoner {
      __typename
      ... on Beskjed {
        brukerKlikk {
          id
          klikketPaa
        }
        virksomhet {
          navn
          virksomhetsnummer
        }
        lenke
        tekst
        merkelapp
        opprettetTidspunkt
        id
      }
      ... on Oppgave {
        brukerKlikk {
          id
          klikketPaa
        }
        virksomhet {
          navn
          virksomhetsnummer
        }
        lenke
        tekst
        merkelapp
        opprettetTidspunkt
        tilstand
        id
      }
    }
  }
`

export const NOTIFIKASJONER_KLIKKET_PAA = gql`
  mutation NotifikasjonKlikketPaa($id: ID!) {
    notifikasjonKlikketPaa(id: $id) {
      ... on BrukerKlikk {
        id
        klikketPaa
      }
      ... on UgyldigId {
        feilmelding
      }
    }
  }
`
