import {createRoot} from 'react-dom/client';
import {lazy,Suspense,useEffect,useState} from 'react';
import '@fontsource/dm-serif-display/latin-400.css';
import './styles/fonts.css';
import './styles/legacy/app.css';
import.meta.glob('./styles/legacy/*.css',{eager:true});
import './styles/atlas.css';
import './styles/editorial.css';
import {DataAppProvider} from './kit/index.js';
const Experience=lazy(()=>import('./app/Experience.jsx'));
function Loading(){return <div className="at-boot" role="status"><span className="editorial-boot-brand">Mercado Atlas</span><span>Preparando novas perspectivas…</span></div>;}
function App(){
 const [snapshot,setSnapshot]=useState(null),[error,setError]=useState(null);
 useEffect(()=>{let alive=true;fetch('/data-bootstrap.json').then(r=>{if(!r.ok)throw new Error('A base inicial não está disponível.');return r.json()}).then(s=>{if(alive)setSnapshot(s)}).catch(e=>alive&&setError(e));return()=>{alive=false};},[]);
 useEffect(()=>{let full;
  const load=event=>{full??=fetch('/data/snapshot.json').then(r=>{if(!r.ok)throw new Error('Não foi possível carregar as referências históricas.');return r.json()});full.then(s=>{setSnapshot(s);event.detail.resolve();}).catch(e=>{full=null;event.detail.reject(e)});};
  window.addEventListener('atlas:full-snapshot',load);return()=>window.removeEventListener('atlas:full-snapshot',load);
 },[]);
 return error?<div className="at-boot" role="alert"><h1>Não foi possível abrir o mercado.</h1><p>{error.message}</p><button onClick={()=>location.reload()}>Tentar novamente</button></div>:snapshot?<DataAppProvider snapshot={snapshot}><Suspense fallback={<Loading/>}><Experience/></Suspense></DataAppProvider>:<Loading/>;
}
createRoot(document.getElementById('root')).render(<App/>);
