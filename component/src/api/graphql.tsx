import {
  ApolloClient,
  InMemoryCache,
  gql, TypedDocumentNode,
} from '@apollo/client'
import {Query} from "./graphql-types";

export const createClient = (uri: string) =>
  new ApolloClient({
    uri,
    cache: new InMemoryCache()
  })

export const HENT_NOTIFIKASJONER: TypedDocumentNode<Pick<Query, "notifikasjoner">> = gql`
  query hentNotifikasjoner {
    notifikasjoner{
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
