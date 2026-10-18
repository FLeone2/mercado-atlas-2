import {existsSync,readFileSync,mkdirSync,rmSync,createWriteStream,renameSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {pipeline} from 'node:stream/promises';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const source=JSON.parse(readFileSync(resolve(root,'data-source.json'),'utf8'));
if(!/^[a-f0-9]{40}$/.test(source.commit)||source.repository!=='FLeone2/mercado-atlas')throw Error('Fonte de dados inválida.');
if(!existsSync(resolve(root,'data/snapshot.json'))){
 const cache=resolve(root,'.cache');mkdirSync(cache,{recursive:true});
 const archive=resolve(cache,'market-source-'+source.commit+'.tar.gz');
 if(!existsSync(archive)){
  console.log('Obtendo a base original do commit '+source.commit+'.');
  const response=await fetch('https://codeload.github.com/'+source.repository+'/tar.gz/'+source.commit);
  if(!response.ok)throw Error('Falha ao obter dados: HTTP '+response.status);
  await pipeline(response.body,createWriteStream(archive+'.part'));renameSync(archive+'.part',archive);
 }
 const staging=resolve(cache,'market-source');rmSync(staging,{recursive:true,force:true});mkdirSync(staging,{recursive:true});
 execFileSync('tar',['-xzf',archive,'-C',staging,'--strip-components=1','mercado-atlas-'+source.commit+'/data']);
 renameSync(resolve(staging,'data'),resolve(root,'data'));rmSync(staging,{recursive:true,force:true});
}
// Verify every file against the existing baseline. Never regenerate it here.
execFileSync(process.execPath,[resolve(root,'tests/data-baseline.test.cjs')],{cwd:root,stdio:'inherit'});
