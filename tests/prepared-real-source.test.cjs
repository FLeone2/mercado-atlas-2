const fs=require('node:fs'),vm=require('node:vm'),zlib=require('node:zlib'),assert=require('node:assert/strict'),{webcrypto}=require('node:crypto');
(async()=>{
 const prepared=await require('../scripts/prepare-market.cjs')();
 const source=['workers/performance-cache.js','workers/evolution-market-worker.js'].map(file=>fs.readFileSync('src/market/'+file,'utf8')).join('\n');
 const c=vm.createContext({console,DOMException,TextEncoder,URL,AbortController,crypto:webcrypto,setTimeout});
 vm.runInContext(source.replace(/\}\)\(\);\s*$/,'globalThis.api={installMarketWorker};})();'),c);
 const flags=['includeMarketBaseline','includeHistoryComparisons','includeChannelReference','includeOriginAnalysis','includeMitsubishiProfile','includeInteractive','includeDaily','includeMunicipalLeaders','includeFlow','includeCatalog'];
 const manifest=JSON.parse(fs.readFileSync('data/manifest.json'));let result;
 const port={postMessage(m){if(m.error)throw Error(m.error);if(m.result)result=m.result;}};
 c.api.installMarketWorker(port,{loader:{async load(meta){return JSON.parse(zlib.gunzipSync(fs.readFileSync('data/'+meta.cubePath)));},setNamespace(){},clear(){},stats(){return {};}}});
 for(const [key,path] of Object.entries(prepared.queries)){
  const [filters,options]=JSON.parse(key);result=null;
  await port.onmessage({data:{id:1,manifest,filters,base:'https://example.com/data/',...Object.fromEntries(flags.map((flag,i)=>[flag,options[i]]))}});
  const actual=JSON.parse(fs.readFileSync('public'+path));assert.deepEqual(actual,JSON.parse(JSON.stringify(result)));
  assert.equal(actual.total,filters.marca?1729:268721);
 }
 console.log('PASS: all five prepared results exactly match every production-worker field on full real manifest.');
})().catch(e=>{console.error(e);process.exitCode=1;});
