/* Exact-match acceleration only: custom filters always retain the original worker. */
(function(root){
 const flags=['includeMarketBaseline','includeHistoryComparisons','includeChannelReference','includeOriginAnalysis','includeMitsubishiProfile','includeInteractive','includeDaily','includeMunicipalLeaders','includeFlow','includeCatalog'];
 function preparedMarketKey(request){
  const filters=Object.fromEntries(Object.keys(request.filters??{}).sort().flatMap(field=>{
   const value=request.filters[field];
   if(value==null||value===''||value==='all')return [];
   if(field==='date'||field==='population')return [[field,value]];
   const values=Array.isArray(value)?value:[value];if(values.includes('all'))return [];
   const selected=[...new Set(values.map(v=>String(v??'Não informado')))].sort();return selected.length?[[field,selected]]:[];
  }));
  return JSON.stringify([filters,flags.map(flag=>Boolean(request[flag])&&(flag!=='includeDaily'||Boolean(request.includeInteractive)))]);
 }
 const identities=new WeakMap(),responses=new Map();
 async function loadPreparedMarket(request,prepared){
  if(!prepared||!request.manifest)return null;
  const path=prepared.queries?.[preparedMarketKey(request)];if(!path)return null;
  try{
   let identity=identities.get(request.manifest);
   if(!identity){identity=crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(request.manifest))).then(hash=>Array.from(new Uint8Array(hash),v=>v.toString(16).padStart(2,'0')).join(''));identities.set(request.manifest,identity);}
   if(await identity!==prepared.manifestHash)return null;
   if(!responses.has(path))responses.set(path,fetch(path).then(response=>{if(!response.ok)throw Error('Prepared result unavailable');return response.json();}).catch(()=>{responses.delete(path);return null;}));
   return await responses.get(path);
  }catch{return null;}
 }
 root.preparedMarketKey=preparedMarketKey;root.loadPreparedMarket=loadPreparedMarket;
 if(typeof module!=='undefined'&&module.exports)Object.assign(module.exports,{preparedMarketKey,loadPreparedMarket});
})(globalThis);
