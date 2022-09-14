import React, {
  KeyboardEvent,
  FunctionComponent,
  useRef,
  useState
} from 'react'
import './NotifikasjonInformasjon.css'
import { Helptext } from '@navikt/ds-icons'
import { BodyShort, Popover } from '@navikt/ds-react';

interface NotifikasjonInformasjonProps {
  onTabEvent?: (
    shiftKey: boolean,
    event: KeyboardEvent<HTMLButtonElement>
  ) => void
}

export const NotifikasjonInformasjon: FunctionComponent<NotifikasjonInformasjonProps> =
  (props) => {
    const [vis, setVis] = useState<boolean>(false)
    const popoverRef = useRef<HTMLButtonElement>(null)

    return (
      <div className='notifikasjon-informasjon'>
        <Popover
          open={vis}
          onClose={() => setVis(false)}
          className="notifikasjon-informasjon-popover"
          placement="top"
          anchorEl={popoverRef.current}
        >
          Notifikasjoner er under utvikling og alle notifikasjoner vises ikke her
          ennå. Gamle notifikasjoner slettes etter hvert.
        </Popover>
        <button
          id='notifikasjon-informasjon-knapp'
          className='notifikasjon-informasjon-knapp'
          onClick={() => setVis(!vis)}
          aria-pressed={vis}
          ref={popoverRef}
          onKeyDown={(event) => {
            if (event.key === 'Tab') {
              props.onTabEvent?.(event.shiftKey, event)
            }
          }}
        >
          <Helptext />
          <BodyShort size="small">Hva vises her?</BodyShort>
        </button>
      </div>
    )
  }
