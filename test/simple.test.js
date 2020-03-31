import tap from 'tap'
import {buildAPI, stopServer} from '../src/api'
import {
  allData,
  exceptOneData,
  exceptManyData,
  onlyOneData,
  onlyManyData
} from './compareData'

tap.test('GET \'/\' route', async t => {
  t.plan(1)

  const conn = buildAPI()

  t.tearDown(() => stopServer(conn))

  const res = await conn.inject({
    method: 'GET',
    url: '/'
  })

  t.same(res.json(), allData)
})

tap.test('GET \'/except/\' route', async t => {
  t.plan(3)

  const conn = buildAPI()

  t.tearDown(() => stopServer(conn))

  let res = await conn.inject({
    method: 'GET',
    url: '/except/'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/except/?fields=participants'
  })

  t.same(res.json(), exceptOneData)

  res = await conn.inject({
    method: 'GET',
    url: '/except/?fields=participants&fields=comments&fields=tags'
  })

  t.same(res.json(), exceptManyData)
})

tap.test('GET \'/only/\' route', async t => {
  t.plan(3)

  const conn = buildAPI()

  t.tearDown(() => stopServer(conn))

  let res = await conn.inject({
    method: 'GET',
    url: '/only/'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/only/?fields=title'
  })

  t.same(res.json(), onlyOneData)

  res = await conn.inject({
    method: 'GET',
    url: '/only/?fields=title&fields=dateStart&fields=dateFinish'
  })

  t.same(res.json(), onlyManyData)
})
