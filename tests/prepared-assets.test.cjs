const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'public/analysis-workers/manifest.json')));
for (const worker of Object.values(manifest)) {
  const original = worker.files.map(file => fs.readFileSync(path.join(root, 'src/market', file), 'utf8')).join('\n');
  const emitted = fs.readFileSync(path.join(root, 'public', worker.path), 'utf8');
  assert.equal(emitted, original);
  assert.equal(createHash('sha256').update(emitted).digest('hex'), worker.sha256);
}
const source = JSON.parse(fs.readFileSync(path.join(root, 'data/snapshot.json')));
const boot = JSON.parse(fs.readFileSync(path.join(root, 'public/data-bootstrap.json')));
assert.deepEqual(boot.filters, source.filters);
assert.deepEqual(boot.marketManifest, source.marketManifest);
for (const [key, query] of Object.entries(boot.queries)) if (key !== 'filter_choices') assert.deepEqual(query, source.queries[key]);
assert.deepEqual(boot.queries.filter_choices.rows, source.queries.filter_choices.rows.filter(r => 'date' in r || 'population' in r));
console.log('PASS external workers byte-identical, hashed paths and bootstrap contracts.');
