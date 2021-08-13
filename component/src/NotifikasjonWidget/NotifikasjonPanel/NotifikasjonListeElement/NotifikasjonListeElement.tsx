import React from 'react'
import { Undertekst, UndertekstBold } from '../../../typography'
import { datotekst } from '../dato-funksjoner'
import './NotifikasjonListeElement.less'
import { Notifikasjon, OppgaveTilstand } from '../../../api/graphql-types'
import IkonBeskjed from './ikon-beskjed.svg'
import IkonOppgave from './ikon-oppgave.svg'
import IkonOppgaveUtfoert from './ikon-oppgave-utfoert.svg'
import { Next as HoyreChevron } from '@navikt/ds-icons'

interface Props {
  notifikasjon: Notifikasjon
  indeks: number
  antall: number
  onKlikketPaaLenke: (notifikasjon: Notifikasjon) => void
  onTabEvent?: (shiftKey: boolean) => void
  gåTilForrige: () => void
  gåTilNeste: () => void
  erValgt: boolean
}

export const NotifikasjonListeElement = (props: Props) => {
  const notifikasjon = props.notifikasjon

  const date = new Date(notifikasjon.opprettetTidspunkt)

  let ikon
  switch (props.notifikasjon.__typename) {
    case 'Beskjed':
      ikon = <IkonBeskjed />
      break
    case 'Oppgave':
      ikon =
        props.notifikasjon.tilstand === OppgaveTilstand.Utfoert ? (
          <IkonOppgaveUtfoert />
        ) : (
          <IkonOppgave />
        )
      break
    default:
      console.error(
        // @ts-ignore
        `ukjent notifikasjonstype ${props.notifikasjon.__typename}: ignorerer`
      )
      return null
  }

  const erUtfoert =
    notifikasjon.__typename === 'Oppgave' &&
    notifikasjon.tilstand === OppgaveTilstand.Utfoert
  return (
    <a
      tabIndex={props.erValgt ? 0 : -1}
      href={props.notifikasjon.lenke}
      className='notifikasjon_liste_element'
      id={'notifikasjon_liste_element-indeks-' + props.indeks}
      onKeyDown={(event) => {
        if (event.key === 'Tab') {
          props.onTabEvent?.(event.shiftKey)
        }
        if (event.key === 'ArrowUp' || event.key === 'Up') {
          props.gåTilForrige()
        }
        if (event.key === 'ArrowDown' || event.key === 'Down') {
          props.gåTilNeste()
        }
      }}
      onClick={() => {
        props.onKlikketPaaLenke(notifikasjon)
      }}
    >
      <div className='notifikasjon_liste_element-lenkepanel'>
        <div className='notifikasjon_liste_element-lenkepanel-ikon'>{ikon}</div>
        <div className='notifikasjon_liste_element-lenkepanel-tekst'>
          <div
            aria-label={notifikasjon.brukerKlikk?.klikketPaa ? '' : 'ulest.'}
          />
          {notifikasjon.brukerKlikk?.klikketPaa ? (
            notifikasjon.tekst
          ) : (
            <strong>{notifikasjon.tekst}</strong>
          )}
        </div>
        <div className='notifikasjon_liste_element-lenkepanel-chevron'>
          <HoyreChevron />
        </div>
      </div>

      <Undertekst className='notifikasjon_liste_element-virksomhetsnavn'>
        {notifikasjon.virksomhet.navn.toUpperCase()}
      </Undertekst>

      <div className='notifikasjon_liste_element-metadata'>
        <Undertekst className='notifikasjon_liste_element-metadata-dato'>
          {notifikasjon.__typename} {erUtfoert ? 'utført' : 'sendt'}{' '}
          {datotekst(date)}
        </Undertekst>

        <UndertekstBold
          aria-label={'merkelapp ' + notifikasjon.merkelapp}
          className='notifikasjon_liste_element-metadata-merkelapp'
        >
          {notifikasjon.merkelapp.toUpperCase()}
        </UndertekstBold>
      </div>
    </a>
  )
}
