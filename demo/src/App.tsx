import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { NotifikasjonWidget } from '@navikt/arbeidsgiver-notifikasjon-widget'
import { Router } from 'react-router-dom';
import './App.css'
import { createBrowserHistory, History } from 'history';
import { MOCK_ORGANISASJONER } from './MockOrganisasjoner';

const history: History = createBrowserHistory();

const App = () => {
  return <div className={"typo-normal bakgrunnsside"}>
    <Router history={history}>
      <Bedriftsmeny
        organisasjoner={MOCK_ORGANISASJONER}
        onOrganisasjonChange={() => null}
        history={history}>
        <NotifikasjonWidget apiUri="http://localhost:8081/api/graphql" miljo={"local"} />
      </Bedriftsmeny>
    </Router>
  </div>
}

export default App
