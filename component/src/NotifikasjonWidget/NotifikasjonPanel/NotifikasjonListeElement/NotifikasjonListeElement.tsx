import React from 'react'
import { datotekst } from '../dato-funksjoner'
import './NotifikasjonListeElement.less'
import { Notifikasjon, OppgaveTilstand } from '../../../api/graphql-types'
import IkonBeskjed from './ikon-beskjed.svg'
import IkonOppgave from './ikon-oppgave.svg'
import IkonOppgaveUtfoert from './ikon-oppgave-utfoert.svg'
import IkonOppgaveUtgaatt from './ikon-oppgave-utgaatt.svg'
import { Next as HoyreChevron, StopWatch } from '@navikt/ds-icons'
import { useAmplitude } from '../../../utils/amplitude'
import {BodyShort, Detail} from "@navikt/ds-react";

interface Props {
  notifikasjon: Notifikasjon
  antall: number
  onKlikketPaaLenke: (notifikasjon: Notifikasjon) => void
  onTabEvent?: (shiftKey: boolean) => void
  gåTilForrige: () => void
  gåTilNeste: () => void
  erValgt: boolean
}

export const NotifikasjonListeElement = (props: Props) => {
  const { loggPilTastNavigasjon } = useAmplitude()
  const notifikasjon = props.notifikasjon

  const date = new Date(notifikasjon.opprettetTidspunkt)
  let utgaattDate = null;

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
          props.notifikasjon.tilstand === OppgaveTilstand.Utgaatt ? (
            <IkonOppgaveUtgaatt />
          ) : (
            <IkonOppgave />
          )
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
    notifikasjon.tilstand === OppgaveTilstand.Utfoert;
  const erUtgaatt =
    notifikasjon.__typename === 'Oppgave' &&
    notifikasjon.tilstand === OppgaveTilstand.Utgaatt;
  if (notifikasjon.__typename === 'Oppgave' && notifikasjon.tilstand === OppgaveTilstand.Utgaatt) {
    utgaattDate = new Date(notifikasjon.utgaattTidspunkt)
  }
  return (
    <a
      tabIndex={props.erValgt ? 0 : -1}
      href={props.notifikasjon.lenke}
      className='notifikasjon_liste_element'
      id={'notifikasjon_liste_element-id-' + props.notifikasjon.id}
      onKeyDown={(event) => {
        loggPilTastNavigasjon()
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
          {notifikasjon.brukerKlikk?.klikketPaa ? (
            notifikasjon.tekst
          ) : (
            <strong>{notifikasjon.tekst}</strong>
          )}
        </div>
        <div
          aria-label={notifikasjon.brukerKlikk?.klikketPaa ? '' : 'ikke besøkt'}
        />
        <div className='notifikasjon_liste_element-lenkepanel-chevron'>
          <HoyreChevron />
        </div>
        {erUtgaatt && utgaattDate && (
          <BodyShort className='notifikasjon_liste_element-metadata-utgaattdato' size='small'>
            <StopWatch/> Fristen gikk ut {datotekst(utgaattDate)}
          </BodyShort>
        )}
      </div>

      <Detail className='notifikasjon_liste_element-virksomhetsnavn' size="small">
        {notifikasjon.virksomhet.navn.toUpperCase()}
      </Detail>

      <div className='notifikasjon_liste_element-metadata'>
        <BodyShort className='notifikasjon_liste_element-metadata-dato' size='small'>
          {(notifikasjon.__typename + (erUtfoert ? ' utført ' : ' sendt ') + datotekst(date))}
        </BodyShort>

        <Detail
          size='small'
          aria-label={'merkelapp ' + notifikasjon.merkelapp}
          className='notifikasjon_liste_element-metadata-merkelapp'
        >
          {notifikasjon.merkelapp.toUpperCase()}
        </Detail>
      </div>
    </a>
  )
}
