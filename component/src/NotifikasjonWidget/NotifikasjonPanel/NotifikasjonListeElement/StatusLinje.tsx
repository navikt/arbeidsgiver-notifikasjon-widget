import React, { FC, ReactNode } from 'react'
import { BodyShort, Tag } from '@navikt/ds-react'
import './StatusLinje.less'
import { Notifikasjon, OppgaveTilstand } from '../../../api/graphql-types'
import { StopWatch } from '@navikt/ds-icons'
import { formatterDato, fristDatotekst } from '../dato-funksjoner'

export interface StatusLinjeProps {
  notifikasjon: Notifikasjon
}

export const StatusLinje: FC<StatusLinjeProps> = ({ notifikasjon }) => {
  if (notifikasjon.__typename !== 'Oppgave') {
    return null
  }

  switch (notifikasjon.tilstand) {
    case OppgaveTilstand.Utfoert:
      return (
        <Tag variant='success' style={{ width: 'fit-content', borderColor: 'transparent' }}>
          Fullført
        </Tag>
      )

    case OppgaveTilstand.Utgaatt:
      return (
        <Tag variant='neutral' style={{ width: 'fit-content', borderColor: 'transparent' }}>
          <StatusIkonMedTekst icon={<StopWatch aria-hidden={true} />}>
            Fristen gikk ut {fristDatotekst(new Date(notifikasjon.utgaattTidspunkt))}
          </StatusIkonMedTekst>
        </Tag>
      )

    case OppgaveTilstand.Ny:
      if (!notifikasjon.frist && !notifikasjon.paaminnelseTidspunkt) {
        return null
      } else {
        let innhold
        if (!notifikasjon.frist && notifikasjon.paaminnelseTidspunkt) {
          innhold = <>Påminnelse</>
        } else if (notifikasjon.frist && !notifikasjon.paaminnelseTidspunkt) {
          innhold = <>Frist {formatterDato(new Date(notifikasjon.frist))}</>
        } else {
          innhold = <>Påminnelse &ndash; Frist {formatterDato(new Date(notifikasjon.frist))}</>
        }
        return <StatusMedFristPaminnelse> {innhold} </StatusMedFristPaminnelse>
      }
    default:
      return null
  }
}

type StatusMedFristPaminnelseProps = {
  children: ReactNode
}

const StatusMedFristPaminnelse = ({ children }: StatusMedFristPaminnelseProps) => {
  return <Tag variant='warning' style={{ width: 'fit-content', borderColor: 'transparent' }}>
    <StatusIkonMedTekst icon={<StopWatch aria-hidden={true} />}>
      {children}
    </StatusIkonMedTekst>
  </Tag>
}

type StatusIkonMedTekstProps = {
  icon: ReactNode;
  className?: string;
  children: ReactNode;
}

const StatusIkonMedTekst: FC<StatusIkonMedTekstProps> = ({ icon, className, children }) =>
  <BodyShort className={`oppgave_status_text ${className}`} size='small'>
    {icon} {children}
  </BodyShort>
