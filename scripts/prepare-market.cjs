// Use the production calculation worker; no second implementation of any metric.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),zlib=require('node:zlib'),{createHash,webcrypto}=require('node:crypto');
const {preparedMarketKey}=require('../src/market/modules/prepared-market.js');
const root=path.join(__dirname,'..'),hash=value=>createHash('sha256').update(value).digest('hex');
module.exports=async function prepareMarket(){
 const manifestText=fs.readFileSync(path.join(root,'data/manifest.json'),'utf8'),manifest=JSON.parse(manifestText);
 const source=['workers/performance-cache.js','workers/evolution-market-worker.js'].map(file=>fs.readFileSync(path.join(root,'src/market',file),'utf8')).join('\n');
 const context=vm.createContext({console,DOMException,TextEncoder,URL,AbortController,crypto:webcrypto,setTimeout});
 vm.runInContext(source.replace(/\}\)\(\);\s*$/,'globalThis.api={installMarketWorker};})();'),context);
 const snapshot=JSON.parse(fs.readFileSync(path.join(root,'data/snapshot.json'))),filters=Object.fromEntries(snapshot.filters.map(f=>[f.id,f.defaultValue??'all']));
 const dir=path.join(root,'public/prepared-market');fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir,{recursive:true});
 const queries={},cubes=new Map();
 const loader={async load(meta){const file=meta.cubePath;if(!cubes.has(file))cubes.set(file,JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'data',file)))));return cubes.get(file);},setNamespace(){},clear(){},stats(){return {};}};
 let response;const port={postMessage(message){if(message.result||message.error)response=message;}};context.api.installMarketWorker(port,{loader});
 for(const options of [{},{filters:{...filters,marca:['MITSUBISHI']}},{includeMitsubishiProfile:true},{includeInteractive:true},{includeHistoryComparisons:true}]){
  response=null;const request={id:1,manifest,base:'https://example.com/data/',filters,...options};
  await port.onmessage({data:request});if(!response?.result)throw Error(response?.error??'Missing prepared result');
  const json=JSON.stringify(response.result),filename=hash(json)+'.json';fs.writeFileSync(path.join(dir,filename),json);queries[preparedMarketKey(request)]='/prepared-market/'+filename;
  console.log('Prepared market',JSON.stringify(options),zlib.gzipSync(json).length,'gzip bytes');
 }
 return {manifestHash:hash(JSON.stringify(manifest)),queries};
};
