export const PAGES = {
 dashboard: {path:'panorama', label:'Panorama', title:'O mercado em perspectiva.', description:'Volumes, marcas e movimentos do mercado brasileiro.'},
 history: {path:'evolucao', label:'Evolução', title:'Como o mercado se move.', description:'Trajetórias, ritmos e mudanças ao longo do tempo.'},
 competition: {path:'concorrencia', label:'Concorrência', title:'Marcas, modelos e escolhas.', description:'Compare posições, participações e conjuntos competitivos.'},
 segments: {path:'composicao', label:'Composição', title:'O que compõe o mercado.', description:'Segmentos, tecnologias e origens, em uma mesma perspectiva.'},
 geography: {path:'territorios', label:'Territórios', title:'Cada região, uma perspectiva.', description:'Do Brasil aos municípios, com dados e malhas reais.'},
 models: {path:'perspectivas', label:'Perspectivas', title:'O mercado e seu contexto.', description:'Economia, retratos regionais e cenários com seus limites explícitos.'},
 explore: {path:'estudio', label:'Estúdio', title:'Encontre novas perspectivas.', description:'Crie comparações e explore todos os formatos de análise.'},
 animations: {path:'movimento', label:'Movimento', title:'O mercado em movimento.', description:'Percorra o tempo no seu ritmo. Cada animação começa pausada.'},
 quality: {path:'dados-metodologia', label:'Dados e metodologia', title:'Os dados por trás do mercado.', description:'Cobertura, fontes e regras para uma leitura transparente.'}
};
export const LEGACY = {
 dashboard:['dashboard','pulso'], history:['history','volume-participacao'],competition:['competition','participacao-crescimento'],ranking:['competition','ranking'],
 segments:['segments','segmentos-carrocerias'],structure:['segments','piramide'],technology:['segments','propulsao'],origin:['segments','nacionais-importados'],
 geography:['geography','brasil-municipios'],explore:['explore','criar-grafico'],models:['models','contexto'],animations:['animations','corridas'],quality:['quality','cobertura']
};
const scenarioAnchors={context:'contexto',diagnostic:'distribuicoes',economy:'economia-mercado',regional:'retrato-regional',forecasts:'projecoes',simulations:'cenarios'};
const exploreAnchors={chart:'criar-grafico',ranking:'ranking-comparado',structure:'piramide-parametrizavel',mitsubishi:'perfil-mitsubishi'};
export function resolveRoute(url,sections={}) {
 const path=url.pathname.replace(/^\/+|\/+$/g,'');
 const explicit=Object.keys(PAGES).find(k=>PAGES[k].path===path);
 const legacy=url.searchParams.get('tab'); const [page,defaultAnchor]=LEGACY[legacy]??['dashboard','pulso'];
 let anchor=defaultAnchor;
 if(legacy==='models')anchor=scenarioAnchors[sections['models:scenarios-workspace']?.tab]??anchor;
 if(legacy==='explore')anchor=exploreAnchors[sections['explore:market-exploration']?.view]??anchor;
 return {page:explicit??page,anchor:url.hash.slice(1)||(!explicit?anchor:''),legacy};
}
export function routeTarget(tab,sections={}) {
 if(!LEGACY[tab]&&!PAGES[tab])throw new Error('Área desconhecida: '+tab);
 const url=new URL('https://local.invalid/');url.searchParams.set('tab',tab);
 const {page,anchor}=resolveRoute(url,sections);
 return {page,path:'/'+PAGES[page].path,anchor};
}
