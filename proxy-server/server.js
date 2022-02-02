import express from 'express'
import httpProxyMiddleware from 'http-proxy-middleware'
import {createLogger, transports, format} from 'winston'
import require from './esm-require.js'
import cookieParser from 'cookie-parser'

const apiMetricsMiddleware = require('prometheus-api-metrics')
const {createProxyMiddleware} = httpProxyMiddleware

const {
  PORT = 3000,
  BRUKER_API_URL = 'http://localhost:8081',
  PROXY_LOG_LEVEL = 'info',
  NAIS_CLUSTER_NAME = 'local',
} = process.env
const log = createLogger({
  transports: [
    new transports.Console({
      timestamp: true,
      format: format.json()
    })
  ]
})

const app = express()
app.disable('x-powered-by')
app.use(cookieParser())

app.use(
  '/api/graphql',
  createProxyMiddleware({
    target: BRUKER_API_URL,
    secure: true,
    xfwd: true,
    logLevel: PROXY_LOG_LEVEL,
    logProvider: _ => log,
    onError: (err, req, res) => {
      log.error(`${req.method} ${req.path} => [${res.statusCode}:${res.statusText}]: ${err.message}`)
    },
    onProxyReq: (proxyReq, req, _res) => {
      proxyReq.setHeader('Authorization', `Bearer ${req.cookies['selvbetjening-idtoken']}`)
    },
    onProxyRes(proxyRes, _req, _res) {
      proxyRes.headers['Access-Control-Allow-Credentials'] = 'true'
    }
  })
)

app.use(
  apiMetricsMiddleware({
    metricsPath: '/internal/metrics'
  })
)
app.get('/internal/alive', (req, res) => res.sendStatus(200))
app.get('/internal/ready', (req, res) => res.sendStatus(200))

try {
  app.listen(PORT, () => {
    log.info(`Server listening on port ${PORT}`)
  })
} catch (error) {
  log.error(`Server failed to start ${error}`)
  process.exit(1)
}

if (NAIS_CLUSTER_NAME === 'labs-gcp') {
  require('@navikt/arbeidsgiver-notifikasjoner-brukerapi-mock');
}
