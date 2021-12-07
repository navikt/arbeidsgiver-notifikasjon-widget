# arbeidsgiver-notifikasjon-widget

> React component som viser notifikasjoner for innlogget arbeidsgiver.

[![NPM](https://img.shields.io/npm/v/@navikt/arbeidsgiver-notifikasjon-widget.svg)](https://www.npmjs.com/package/@navikt/arbeidsgiver-notifikasjon-widget) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @navikt/arbeidsgiver-notifikasjon-widget
```

## Usage

```tsx
import React, { Component } from 'react'

import {NotifikasjonWidget} from "@navikt/arbeidsgiver-notifikasjon-widget";

const miljø = gittMiljo<"local" | "dev-gcp" | "prod-gcp">({
    prod: 'prod-gcp',
    dev: 'dev-gcp',
    other: 'local',
});

const Banner: FunctionComponent<RouteComponentProps & OwnProps> = ({history, sidetittel}) => {
    return (
        <Bedriftsmeny>
           <NotifikasjonWidget miljo={miljø}/>
        </Bedriftsmeny>
    );
};
```

## License

MIT © [navikt](https://github.com/navikt)
