const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),{webcrypto,createHash}=require('node:crypto');
const source=fs.readFileSync('src/market/modules/prepared-market.js','utf8');
function setup(fetch){const c=vm.createContext({crypto:webcrypto,TextEncoder,fetch});vm.runInContext(source,c);return c;}
const manifest={months:[{month:'2026-09',cubePath:'immutable.gz'}]},manifestHash=createHash('sha256').update(JSON.stringify(manifest)).digest('hex');
const request={manifest,filters:{date:'2026-09',population:'light'}};
test('Exact prepared query normalizes empty/all categories, array order and option defaults',()=>{
 const c=setup();const key=c.preparedMarketKey;
 assert.equal(key(request),key({...request,includeDaily:true,filters:{...request.filters,uf:[],marca:'all'}}));
 assert.equal(key({filters:{uf:['SP','RJ','SP']}}),key({filters:{uf:['RJ','SP']}}));
 for(const variation of [{includeInteractive:true},{includeCatalog:true},{filters:{...request.filters,marca:['FIAT']}},{filters:{...request.filters,date:'2026-08'}}])assert.notEqual(key(request),key({...request,...variation}));
});
test('Manifest changes and missing queries fall back without fetching; identical queries reuse response',async()=>{
 let calls=0;const result={total:268721,groups:{marca:[{name:'MITSUBISHI',count:1729}]}};
 const c=setup(async()=>{calls++;return {ok:true,json:async()=>result};});
 const prepared={manifestHash,queries:{[c.preparedMarketKey(request)]:'/prepared-market/hash.json'}};
 assert.equal(await c.loadPreparedMarket({...request,manifest:{...manifest,version:2}},prepared),null);
 assert.equal(await c.loadPreparedMarket({...request,includeCatalog:true},prepared),null);assert.equal(calls,0);
 assert.deepEqual(await c.loadPreparedMarket(request,prepared),result);assert.deepEqual(await c.loadPreparedMarket(request,prepared),result);assert.equal(calls,1);
});
test('Unavailable prepared assets safely fall back and can be retried',async()=>{
 let calls=0;const c=setup(async()=>({ok:++calls>1,json:async()=>({total:1})}));
 const prepared={manifestHash,queries:{[c.preparedMarketKey(request)]:'/prepared-market/retry.json'}};
 assert.equal(await c.loadPreparedMarket(request,prepared),null);assert.equal((await c.loadPreparedMarket(request,prepared)).total,1);
});
