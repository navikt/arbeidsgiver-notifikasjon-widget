import React from 'react'

import 'nav-frontend-core/dist/main.css'

interface TypoProp {
  className?: string
}

export const Undertittel: React.FC<TypoProp> = props =>
  <h2 className={`typo-undertittel ${props.className ?? ''}`}>
    {props.children}
  </h2>

export const Undertekst: React.FC<TypoProp> = props =>
  <p className={`typo-undertekst ${props.className ?? ''}`}>
    {props.children}
  </p>

export const UndertekstBold: React.FC<TypoProp> = props =>
  <p className={`typo-undertekst-bold ${props.className ?? ''}`}>
    {props.children}
  </p>

export const Element: React.FC<TypoProp> = props =>
  <p className={`typo-element ${props.className ?? ''}`}>
    {props.children}
  </p>
