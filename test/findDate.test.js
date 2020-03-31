import tap from 'tap'
import {buildAPI, stopServer} from '../src/api'
import {
  findDateData,
  findDateAfterData,
  findDateBeforeData,
  findDateExceptData,
  findDateOnlyData
} from './compareData'

tap.test('GET \'/find_date/\' route', async t => {
  t.plan(4)

  const conn = buildAPI()

  t.tearDown(() => stopServer(conn))

  let res = await conn.inject({
    method: 'GET',
    url: '/find_date/'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/find_date/?after=2019-02-20T12:00:00.000Z&before=2019-02-22T12:00:00.000Z'
  })

  t.same(res.json(), findDateData)

  res = await conn.inject({
    method: 'GET',
    url: '/find_date/?after=2019-02-20T12:00:00.000Z'
  })

  t.same(res.json(), findDateAfterData)

  res = await conn.inject({
    method: 'GET',
    url: '/find_date/?before=2019-02-20T12:00:00.000Z'
  })

  t.same(res.json(), findDateBeforeData)
})

tap.test('GET \'/find_date/except/\' route', async t => {
  t.plan(3)

  const conn = buildAPI()

  t.tearDown(() => stopServer(conn))

  let res = await conn.inject({
    method: 'GET',
    url: '/find_date/except/?after=2019-02-20T12:00:00.000Z'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/find_date/except/?fields=comments'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/find_date/except/?after=2019-02-14T12:00:00.000Z&before=2019-02-20T12:00:00.000Z&fields=comments'
  })

  t.same(res.json(), findDateExceptData)
})

tap.test('GET \'/find_date/only/\' route', async t => {
  t.plan(3)

  const conn = buildAPI()

  t.tearDown(() => stopServer(conn))

  let res = await conn.inject({
    method: 'GET',
    url: '/find_date/only/?after=2019-02-20T12:00:00.000Z'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/find_date/only/?fields=comments'
  })

  t.equal(res.statusCode, 303)

  res = await conn.inject({
    method: 'GET',
    url: '/find_date/only/?after=2019-02-14T12:00:00.000Z&before=2019-02-20T12:00:00.000Z&fields=title&fields=link'
  })

  t.same(res.json(), findDateOnlyData)
})
