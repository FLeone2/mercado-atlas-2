import {readFileSync,writeFileSync,mkdirSync,rmSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const snapshot=JSON.parse(readFileSync(resolve(root,'data/snapshot.json'),'utf8'));
const queries=Object.fromEntries(Object.entries(snapshot.queries).filter(([key])=>!key.startsWith('phase2_')&&key!=='coverage'));
queries.filter_choices={...queries.filter_choices,rows:queries.filter_choices.rows.filter(row=>'date' in row||'population' in row)};
writeFileSync(resolve(root,'public/data-bootstrap.json'),JSON.stringify({...snapshot,queries}));
const families={market:['workers/performance-cache.js','workers/evolution-market-worker.js'],exploration:['workers/exploration-worker.js'],animations:['workers/performance-cache.js','modules/animations-data.js','modules/animations-worker.js']};
const dir=resolve(root,'public/analysis-workers');rmSync(dir,{recursive:true,force:true});mkdirSync(dir,{recursive:true});
const manifest={};
for(const [family,files] of Object.entries(families)){
 const source=files.map(file=>readFileSync(resolve(root,'src/market',file),'utf8')).join('\n');
 const hash=createHash('sha256').update(source).digest('hex');
 const filename=family+'-'+hash.slice(0,16)+'.js';writeFileSync(resolve(dir,filename),source);
 manifest[family]={path:'/analysis-workers/'+filename,sha256:hash,files};
}
writeFileSync(resolve(dir,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log('Bootstrap e três workers preparados sem alterar data/.');
