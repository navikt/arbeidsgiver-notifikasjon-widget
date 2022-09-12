import React, { Ref } from 'react'
import './NotifikasjonBjelle.less'
import Ikon from './NotifikasjonBjelle.svg'
import {Label} from "@navikt/ds-react";

interface Props {
  antallUleste?: number
  erApen: boolean
  onClick?: () => void
  focusableRef: Ref<HTMLButtonElement>
}

export const NotifikasjonBjelle = ({
  antallUleste = 0,
  erApen,
  onClick,
  focusableRef
}: Props) => {
  return (
    <div className='notifikasjon_bjelle'>
      <button
        ref={focusableRef}
        onClick={onClick}
        className={`notifikasjon_bjelle-knapp notifikasjon_bjelle-knapp${
          erApen ? '--open' : ''
        }`}
        aria-label={`Dine notifikasjoner, ${antallUleste} nye.`}
        aria-owns='notifikasjon_panel'
        aria-haspopup='dialog'
        aria-pressed={erApen}
      >
        <div className='notifikasjon_bjelle-ikon'>
          <Ikon />

          <div
            className={`notifikasjon_bjelle-ikon__ulest-sirkel ${
              antallUleste === 0
                ? 'notifikasjon_bjelle-ikon__ulest-sirkel--hide'
                : ''
            }`}
          >
            <Label className='notifikasjon_bjelle-ikon__ulest-antall'>
              {antallUleste < 10 ? antallUleste : '9+'}
            </Label>
          </div>
        </div>
      </button>
      <div
        className={`notifikasjon_bjelle-understrek ${
          erApen ? '' : 'notifikasjon_bjelle-understrek--closed'
        }`}
      />
    </div>
  )
}
