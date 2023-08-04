const fs = require('fs');
const path = require("path");
let casual;

const roundDate = (millis) => {
  const date = new Date();
  return new Date(Math.floor(date.getTime() / millis) * millis)
}

const casualDate = () => {
  const date = new Date();

  if (casual.integer(0, 1)) {
    date.setHours(date.getHours() - casual.integer(0, 60));
  }

  if (casual.integer(0, 1)) {
    date.setMinutes(date.getMinutes() - casual.integer(0, 60));
  }

  if (casual.integer(0, 5)) {
    date.setDate(date.getDate() - casual.integer(0, 31));
  }

  if (casual.integer(0, 10) === 0) {
    date.setMonth(date.getMonth() - casual.integer(0, 12))
  }

  if (casual.integer(0, 49) === 0) {
    date.setFullYear(date.getFullYear() - casual.integer(0, 1));
  }
  return date;
};

const eksempler = {
  'Lønnstilskudd': [
    "Ny avtale om arbeidstiltak opprettet. Åpne avtale og fyll ut innholdet.",
    "Avtale om arbeidstiltak godkjent.",
    "Du kan nå søke om refusjon.",
    "Mål i avtale endret av veileder.",
    "Oppfølging og tilrettelegging i avtale endret av veileder.",
    "Avtale forkortet.",
    "Avtale forlenget av veileder.",
    "Tilskuddsberegning i avtale endret av veileder.",
    "Avtalen må godkjennes på nytt.",
    "Kontaktinformasjon i avtale endret av veileder.",
  ],
  'Mentor': [
    "Du kan nå søke om refusjon.",
    "Mål i avtale endret av veileder.",
    "Oppfølging og tilrettelegging i avtale endret av veileder.",
    "Avtale forkortet.",
    "Avtale forlenget av veileder.",
    "Avtalen må godkjennes på nytt.",
    "Kontaktinformasjon i avtale endret av veileder.",
  ],
  'Sommerjobb': [
    "Stillingsbeskrivelse i avtale endret av veileder.",
    "Mål i avtale endret av veileder.",
    "Avtale forkortet.",
    "Avtale forlenget av veileder.",
    "Tilskuddsberegning i avtale endret av veileder.",
    "Avtalen må godkjennes på nytt.",
    "Kontaktinformasjon i avtale endret av veileder.",
  ],
  'Arbeidstrening': [
    "Ny avtale om arbeidstiltak opprettet. Åpne avtale og fyll ut innholdet.",
    "Avtale om arbeidstiltak godkjent.",
    "Du kan nå søke om refusjon.",
    "Stillingsbeskrivelse i avtale endret av veileder.",
    "Mål i avtale endret av veileder.",
    "Oppfølging og tilrettelegging i avtale endret av veileder.",
    "Avtale forkortet.",
    "Avtale forlenget av veileder.",
    "Tilskuddsberegning i avtale endret av veileder.",
    "Avtalen må godkjennes på nytt.",
    "Kontaktinformasjon i avtale endret av veileder.",
  ],
};

const saker = [
  "Varsel om permittering 24 ansatte",
  "Søknad om fritak fra arbeidsgiverperioden – gravid ansatt Lena Nilsson",
  "Søknad om fritak fra arbeidsgiverperioden – kronisk sykdom Bo Johnstrøm",
  "Permitteringsmelding 14 ansatte",
  "Lønnskompensasjon ved permittering",
  "Varsel om permittering 12 ansatte",
  "Søknad om fritak fra arbeidsgiverperioden – kronisk sykdom Bo Johnstrøm\n",
  "Refusjon - fritak fra arbeidsgiverperioden - Lena Ek",
  "Søknad om fritak fra arbeidsgiverperioden – gravid ansatt Marie Svensson",
];

const Notifikasjon = (navn) => {
  const merkelapp = casual.random_key(eksempler);
  const tekst = casual.random_element(eksempler[merkelapp]);
  const erUtgåttOppgave = navn === 'Oppgave' && casual.boolean;
  const tilstand = navn === 'Oppgave' ? {tilstand: erUtgåttOppgave ? 'UTGAATT' : casual.random_element(['NY', 'UTFOERT'])} : {};
  const opprettetTidspunkt = casualDate().toISOString();
  const paaminnelseTidspunkt = casual.boolean ? casualDate().toISOString() : null
  return {
    __typename: navn,
    id: Math.random().toString(36),
    merkelapp,
    tekst,
    lenke: `#${casual.word}`,
    opprettetTidspunkt: opprettetTidspunkt,

    ...(navn === "Oppgave"
        ? {utgaattTidspunkt: erUtgåttOppgave ? casualDate().toISOString() : null,
          paaminnelseTidspunkt: paaminnelseTidspunkt,
          frist: casual.boolean ? casualDate().toISOString() : null,
    }
        : {}
    ),
    sorteringTidspunkt: paaminnelseTidspunkt !== null ? paaminnelseTidspunkt : opprettetTidspunkt,
    ...tilstand,
    virksomhet: {
      navn: casual.random_element([
        "Ballstad og Hamarøy",
        "Saltrød og Høneby",
        "Arendal og Bønes Revisjon",
        "Gravdal og Solli Revisjon",
        "Storfonsa og Fredrikstad Regnskap"
      ])
    }
  };
};

const mocks = () => ({
  Query: () => ({
    notifikasjoner: () => ({
      notifikasjoner: [...new Array(10)]
        .map(_ => Notifikasjon(casual.random_element(["Oppgave", "Beskjed"])))
        .sort((a, b) => b.sorteringTidspunkt.localeCompare(a.sorteringTidspunkt)),
      feilAltinn: false,
      feilDigiSyfo: false,
    }),
    saker: () => ({
      saker: [
        casual.random_element(saker),
        casual.random_element(saker),
        casual.random_element(saker),
      ].map((tittel) => (
        {
          tittel,
          lenke: "#",
          virksomhet: {navn: "Gamle Fredikstad og Riksdalen regnskap"},
          sisteStatus: {
            tekst: casual.random_element(["Mottatt", "Under behandling", "Utbetalt"]),
            tidspunkt: casualDate().toISOString()
          },
          frister: casual.boolean ? [
            casual.random_element([null, casualDate().toISOString().slice(0, 10)]),
            casual.random_element([null, new Date().toISOString().replace(/T.*/, "")])
          ] : []
        })),
      totaltAntallSaker: 314,
      sakstyper: Object.keys(eksempler).map(navn => ({ navn, antall: casual.integer(0, 10) })),
    }),
    sakstyper: Object.keys(eksempler).map(navn => ({ navn })),
  }),
  Int: () => casual.integer(0, 1000),
  String: () => casual.string,
  ISO8601DateTime: () => roundDate(5000).toISOString(),
  ISO8601Date: () => roundDate(5000).toISOString().slice(0, 10),
  Virksomhet: () => ({
    navn: casual.catch_phrase,
  }),
  SakMetadata: () => ({
    tittel: casual.random_element(saker)
  })
});

const createApolloServer = ({mocks: apolloServerOptionsMocks, ...apolloServerOptions} = {}) => {
  const {ApolloServer, gql} = require("apollo-server-express");
  casual = require("casual");

  const data = fs.readFileSync(path.join(__dirname, 'bruker.graphql'));
  return new ApolloServer({
    typeDefs: gql(data.toString()),
    mocks: {...mocks(), ...apolloServerOptionsMocks },
    ...apolloServerOptions,
  });
}

function applyNotifikasjonMockMiddleware(middlewareOptions, apolloServerOptions) {
  const apolloServer = createApolloServer(apolloServerOptions);
  apolloServer.start()
    .then(() => {
      apolloServer.applyMiddleware(middlewareOptions)
    })
    .catch(error =>
      console.log("error starting apollo server", {error})
    );
}

module.exports = {
  createApolloServer,
  applyNotifikasjonMockMiddleware,
}
