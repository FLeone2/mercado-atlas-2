const assert = require('node:assert/strict');
(async () => {
  const { PAGES, LEGACY, resolveRoute, routeTarget } = await import('../src/app/routes.js');
  assert.equal(Object.keys(LEGACY).length, 13);
  for (const [tab, [page, anchor]] of Object.entries(LEGACY)) {
    const url = new URL('https://example.test/?tab=' + tab + '&f.marca=%5B%22FIAT%22%2C%22VW%22%5D&extra=kept');
    assert.equal(resolveRoute(url).page, page);
    assert.equal(resolveRoute(url).anchor, anchor);
    const target = routeTarget(tab);
    url.pathname = target.path; url.hash = target.anchor; url.searchParams.delete('tab');
    assert.equal(resolveRoute(url).page, page);
    assert.equal(target.path, '/' + PAGES[page].path);
    assert.equal(url.searchParams.get('f.marca'), '["FIAT","VW"]');
    assert.equal(url.searchParams.get('extra'), 'kept');
  }
  assert.equal(resolveRoute(new URL('https://x.test/?tab=models'), {'models:scenarios-workspace':{tab:'forecasts'}}).anchor, 'projecoes');
  assert.equal(resolveRoute(new URL('https://x.test/?tab=explore'), {'explore:market-exploration':{view:'ranking'}}).anchor, 'ranking-comparado');
  assert.equal(resolveRoute(new URL('https://x.test/territorios?tab=models')).page, 'geography');
  assert.throws(() => routeTarget('unknown'));
  console.log('PASS 13 legacy routes, canonical precedence, preserved filters and subviews.');
})().catch(error => { console.error(error); process.exit(1); });
