import {buildAPI, runServer} from './api'

const conn = buildAPI()

// eslint-disable-next-line no-console
runServer(conn).then(() => console.log(`\n\nServer listening on ${conn.server.address().port}\n\n`))
