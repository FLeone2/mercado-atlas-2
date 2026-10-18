import {useEffect,useRef,useState} from 'react';
import {useDataApp,ScopedDashboard,Dialog,Icon,Progressive,AnalysisBoundary} from '../kit/index.js';
import {DashboardContent,EditorialFilters,EditorialPeriod,EditorialFlow,EditorialHistorical,EditorialCatalog} from 'virtual:market';
import {PAGES,resolveRoute} from './routes.js';

const CHAPTERS={
 dashboard:[['pulso','', 'dashboard',{}]],
 history:[['volume-participacao','Trajetórias e composição','history',{evolutionOverride:'all'}]],
 competition:[['ranking','O ranking completo','ranking',{rankingOverride:'list'}],['ranking-conectado','Dois períodos, lado a lado','ranking',{rankingOverride:'connected',skipCatalog:true}],['ranking-piramide','A distribuição das posições','ranking',{rankingOverride:'pyramid',skipCatalog:true}],['participacao-crescimento','Como a concorrência se transforma','competition',{}],['mitsubishi-segmento','Mitsubishi em perspectiva','explore',{explorationOverride:'mitsubishi',skipCatalog:true}]],
 segments:[['segmentos-carrocerias','Segmentos e carrocerias','segments',{}],['piramide','A composição do mercado','structure',{}],['propulsao','As tecnologias do mercado','technology',{}],['nacionais-importados','Nacionais, importados e origens','origin',{}],['canais-conexoes','Canais e conexões','flow',{}]],
 geography:[['brasil-municipios','', 'geography',{}],['leituras-mapa','Diferentes leituras do território','maps',{}]],
 models:[['contexto','Economia em contexto','models',{scenarioOverride:'context'}],['distribuicoes','Distribuições e composição histórica','models',{scenarioOverride:'diagnostic'}],['economia-mercado','Economia e mercado','models',{scenarioOverride:'economy'}],['retrato-regional','Um retrato regional','models',{scenarioOverride:'regional'}],['projecoes','Projeções e validação','models',{scenarioOverride:'forecasts'}],['cenarios','Cenários e hipóteses','models',{scenarioOverride:'simulations'}],['referencias-historicas','Referências históricas e cenários congelados','historical',{}]],
 explore:[['criar-grafico','Seu ponto de partida','explore',{explorationOverride:'chart',skipCatalog:true}],['ranking-comparado','Ranking comparado','explore',{explorationOverride:'ranking',skipCatalog:true}],['piramide-parametrizavel','A pirâmide em detalhe','structure',{skipCatalog:true}],['perfil-mitsubishi','O perfil da Mitsubishi','explore',{explorationOverride:'mitsubishi',skipCatalog:true}],['formatos','Todos os formatos, novas perspectivas','catalog',{}]],
 animations:[['corridas','Quem ocupa cada posição','animations',{animationOverride:'races'}],['bolhas','Participação e crescimento em movimento','animations',{animationOverride:'bubbles'}],['mix','A transformação do mix','animations',{animationOverride:'mix'}],['brasil-tempo','O Brasil ao longo do tempo','animations',{animationOverride:'maps'}]],
 quality:[['cobertura','', 'quality',{}]]
};
const ANCHORS={
 tendencia:'overview-trend',indicadores:'overview-total',marcas:'overview-brands',combustiveis:'overview-fuel',canais:'overview-channels',
 'comparar-anos':'compare-years','ritmo-sazonalidade':'seasonality','crescimento':'evolution-growth','composicao-tempo':'evolution-composition','explorar-faixa':'brush',
 'modelos-lado-a-lado':'model-duel','mudanca':'share-decomposition','concentracao':'competitive-reading','trajetorias':'catalogo-ranking-bump',
 'eletrificacao-tempo':'propulsao','origem-marcas':'nacionais-importados','varejo-venda-direta':'territory-channels','presenca-populacao':'penetration-map','rede-mitsubishi':'geo-dealer-network',
 'validacao':'projecoes','lideranca':'corridas','dados-exatos':'corridas',confianca:'cobertura',fontes:'quality-register-heading',reconciliacao:'official-reconciliation','regras-auditoria':'quality-update-heading'
};
function Chapter({entry,index,manifest}){
 const [id,title,tab,options]=entry;const ref=useRef(null);
 useEffect(()=>{
  if(tab!=='animations')return;
  const observer=new IntersectionObserver(entries=>{if(entries.every(e=>!e.isIntersecting))window.dispatchEvent(new Event('atlas:pause-players'));});
  if(ref.current)observer.observe(ref.current);return()=>observer.disconnect();
 },[tab]);
 return <section id={id} ref={ref} className="editorial-chapter" aria-label={title||'Análises do mercado'}>
  {title&&<header className="editorial-chapter-heading"><span className="editorial-index">{String(index+1).padStart(2,'0')}</span><h2>{title}</h2></header>}
  <Progressive eager={index===0} height={650}>
   <AnalysisBoundary><ScopedDashboard tab={['flow','historical','catalog','maps'].includes(tab)?'explore':tab}>
    {tab==='flow'?<EditorialFlow/>:tab==='historical'?<Historical/>:tab==='catalog'?<Catalog manifest={manifest}/>:tab==='maps'?<Catalog manifest={manifest} maps/>:<DashboardContent embedded tabOverride={tab} {...options}/>}
   </ScopedDashboard></AnalysisBoundary>
  </Progressive>
 </section>;
}
function Historical(){
 const [ready,setReady]=useState(false);const [error,setError]=useState(null);
 useEffect(()=>{let alive=true;window.dispatchEvent(new CustomEvent('atlas:full-snapshot',{detail:{resolve:()=>alive&&setReady(true),reject:e=>alive&&setError(e)}}));return()=>{alive=false};},[]);
 return error?<p role="alert">{error.message}</p>:ready?<EditorialHistorical/>:<p role="status">Carregando as referências históricas…</p>;
}
function Catalog({manifest,maps=false}){
 // Catalog-only panels use the same aggregate service, without duplicating the studio tool.
 return <EditorialCatalog maps={maps}/>;
}
export default function Experience(){
 const shell=useDataApp();const page=shell.activeTabId in PAGES?shell.activeTabId:'dashboard';const meta=PAGES[page];
 const [drawer,setDrawer]=useState(false),[menu,setMenu]=useState(false),[share,setShare]=useState(''),[printing,setPrinting]=useState(false);
 const [theme,setTheme]=useState(()=>document.documentElement.dataset.theme??'light');
 const manifest=shell.snapshot.marketManifest;const chapters=CHAPTERS[page];
 const navigate=(e,id)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;e.preventDefault();setMenu(false);shell.exploreDashboard(id,{anchor:''});};
 useEffect(()=>{document.title=meta.label+' · Mercado Atlas';setDrawer(false);setMenu(false);},[page]);
 useEffect(()=>{
  const scroll=()=>{let anchor=location.hash.slice(1);if(!anchor)return;anchor=ANCHORS[anchor]??anchor;const el=document.getElementById(anchor)||document.getElementById(location.hash.slice(1));if(el){el.scrollIntoView({block:'start'});}};
  const timer=setTimeout(scroll,100);window.addEventListener('hashchange',scroll);window.addEventListener('atlas:navigate',scroll);
  return()=>{clearTimeout(timer);window.removeEventListener('hashchange',scroll);window.removeEventListener('atlas:navigate',scroll);};
 },[page]);
 const toggleTheme=()=>{const next=theme==='light'?'dark':'light';setTheme(next);document.documentElement.dataset.theme=next;try{localStorage.setItem('atlas-theme',next)}catch{}};
 const copy=async()=>{try{await navigator.clipboard.writeText(location.href);setShare('Link copiado');}catch{setShare('Copie o endereço desta página');}setTimeout(()=>setShare(''),3000);};
 const print=async()=>{setPrinting(true);window.dispatchEvent(new Event('atlas:prepare-print'));window.dispatchEvent(new Event('atlas:pause-players'));const deadline=Date.now()+60000;await new Promise(resolve=>{const timer=setInterval(()=>{if(!document.querySelector('[aria-busy="true"],.am-loading,.am-scenario-loading')||Date.now()>deadline){clearInterval(timer);resolve();}},250);});setPrinting(false);window.print();};
 const active=(shell.snapshot.filters??[]).filter(f=>{const v=shell.filters[f.id];return f.id!=='date'&&v!=null&&v!==f.defaultValue&&v!=='all'&&!(Array.isArray(v)&&!v.length)});
 const navItem=(id)=> <a key={id} href={'/'+PAGES[id].path} aria-current={page===id?'page':undefined} onClick={e=>navigate(e,id)}>{PAGES[id].label}</a>;
 return <div className="editorial-app">
  <a className="editorial-skip" href="#conteudo">Ir para o conteúdo</a>
  <header className="editorial-header">
   <a className="editorial-brand" href="/panorama" onClick={e=>navigate(e,'dashboard')}><span className="editorial-brand-index">{String(Object.keys(PAGES).indexOf(page)+1).padStart(2,'0')}</span><span>Mercado<span className="editorial-brand-atlas"> Atlas</span></span></a>
   <nav className="editorial-nav" aria-label="Navegação principal">{Object.keys(PAGES).slice(0,6).map(navItem)}<details className="editorial-explore-menu"><summary>Explorar</summary><div>{navItem('explore')}{navItem('animations')}{navItem('quality')}</div></details></nav>
   <div className="editorial-header-actions"><button className="editorial-theme" aria-label={theme==='light'?'Usar tema escuro':'Usar tema claro'} onClick={toggleTheme}>{theme==='light'?'◐':'◑'}</button><button className="editorial-filter-button" onClick={()=>setDrawer(true)}><Icon name="more"/><span>Filtrar dados</span>{active.length>0&&<b>{active.length}</b>}</button><button className="editorial-menu-button" onClick={()=>setMenu(true)} aria-label="Abrir menu">☰</button></div>
  </header>
  <main id="conteudo" key={page}>
   <header className="editorial-hero"><p className="editorial-eyebrow">Mercado automotivo brasileiro</p><h1>{meta.title}</h1><p>{meta.description}</p></header>
   {page==='models'&&<p className="editorial-fixed-badge">Base fixa · filtros globais não recalculam estes capítulos · projeções experimentais</p>}
   {page!=='quality'&&<div className="editorial-filterbar"><EditorialPeriod manifest={manifest}/><EditorialFilters manifest={manifest} only={['marca','regiao']}/><button className="editorial-all-filters" onClick={()=>setDrawer(true)}>Todos os filtros <span>↗</span></button></div>}
   {active.length>0&&<div className="editorial-chips" aria-label="Filtros ativos">{active.map(f=><button key={f.id} onClick={()=>shell.setFilter(f.id,f.defaultValue??'all')}>{f.label}: {Array.isArray(shell.filters[f.id])?shell.filters[f.id].join(', '):shell.filters[f.id]} <Icon name="close" size={12}/></button>)}<button onClick={()=>shell.replaceFilters({date:shell.filters.date})}>Limpar filtros</button></div>}
   {chapters.length>1&&<nav className="editorial-chapter-nav" aria-label="Seções desta página">{chapters.map(([id,title])=><a key={id} href={'#'+id}>{title||meta.label}</a>)}</nav>}
   <div className="editorial-chapters">{chapters.map((entry,index)=><Chapter key={entry[0]} entry={entry} index={index} manifest={manifest}/>)}</div>
  </main>
  <footer className="editorial-footer"><a href="/dados-metodologia" onClick={e=>navigate(e,'quality')}>Dados e metodologia ↗</a><span>Mesma base. Novas perspectivas.</span><div><button onClick={copy}>{share||'Copiar link'}</button><button onClick={print} disabled={printing}>{printing?'Preparando impressão…':'Imprimir / PDF'}</button></div></footer>
  <Dialog open={drawer} onClose={()=>setDrawer(false)} title="Filtrar dados"><div className="editorial-drawer-content"><p>Os recortes ativos ficam visíveis na página. Busca e Top N dos gráficos mantêm seus próprios controles.</p><EditorialFilters manifest={manifest}/><button className="editorial-filter-button" onClick={()=>setDrawer(false)}>Concluir</button></div></Dialog>
  <Dialog open={menu} onClose={()=>setMenu(false)} title="Explorar o mercado"><nav className="editorial-mobile-nav">{Object.keys(PAGES).map(navItem)}</nav></Dialog>
 </div>;
}
