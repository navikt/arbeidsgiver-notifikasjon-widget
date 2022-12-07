import React from "react";
import "./Dropdown.css"

interface Props {
  children: React.ReactNode
  erApen: boolean,
}

const Dropdown = ({erApen, children}: Props) => {
  console.log(erApen)
  return erApen ? <div
    role='dialog'
    aria-modal='true'
    aria-labelledby='notifikasjon_panel-header'
    className="Dropdown-panel"
  >
    {children}
  </div> : null
}

export default Dropdown
