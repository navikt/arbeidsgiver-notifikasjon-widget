#!/usr/bin/env node
const fs = require('fs');
const casual = require('casual');
const path = require("path");
const {ApolloServer, gql} = require("apollo-server");

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
const startApolloMock = () => {
  const data = fs.readFileSync(path.join(__dirname, 'bruker.graphql'));
  const typeDefs = gql(data.toString());
  const Notifikasjon = (navn) => {
    const merkelapp = casual.random_key(eksempler);
    const tekst = casual.random_element(eksempler[merkelapp]);

    return {
      __typename: navn, //casual.boolean ? 'Beskjed' : 'Oppgave',
      id: Math.random().toString(36),
      merkelapp,
      tekst,
      lenke: `#${casual.word}`,
      opprettetTidspunkt: casualDate().toISOString(),
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
  const notifikasjoner = [...new Array(10)]
    .map(_ => Notifikasjon(casual.random_element(["Oppgave", "Beskjed"])))
    .sort((a, b) => b.opprettetTidspunkt.localeCompare(a.opprettetTidspunkt))
  const leggTilOgReturnerNotifikasjoner = () => {
    notifikasjoner.splice(0, 0, Notifikasjon(casual.random_element(["Oppgave", "Beskjed"])));
    if (notifikasjoner.length > 200) {
      notifikasjoner.splice(0, notifikasjoner.length - 200)
    }
    notifikasjoner.sort((a, b) => b.opprettetTidspunkt.localeCompare(a.opprettetTidspunkt));
    return notifikasjoner
  }
  new ApolloServer({
    typeDefs,
    cors: {
      origin: true,
      credentials: true,
    },
    mocks: {
      Query: () => ({
        notifikasjoner: () => ({
          notifikasjoner: leggTilOgReturnerNotifikasjoner(),
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
                virksomhet: { navn: "Gamle Fredikstad og Riksdalen regnskap" },
                sisteStatus: {
                  tekst: casual.random_element(["Mottatt", "Under behandling", "Utbetalt"]),
                  tidspunkt: casualDate().toISOString()
                }
            })),
          totaltAntallSaker: 314
        })
      }),
      Int: () => casual.integer(0, 1000),
      String: () => casual.string,
      ISO8601DateTime: () => roundDate(5000).toISOString(),
      Virksomhet: () => ({
        navn: casual.catch_phrase,
      }),
    }
  }).listen({
    port: 8081,
    path: '/api/graphql',
  }).then(({url}) => {
    console.log(`🚀 gql server ready at ${url}`)
  });
}

startApolloMock()
