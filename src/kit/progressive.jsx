import { Component, useEffect, useRef, useState } from 'react';

// Reserve space and prepare before arrival, without a click or a closed disclosure.
export function Progressive({children,id,className='',height=440,eager=false}) {
 const ref=useRef(null);const [ready,setReady]=useState(eager);
 useEffect(()=>{
  if(ready)return;
  const reveal=()=>setReady(true);
  const onAnchor=()=>{const target=document.getElementById(location.hash.slice(1));if(target&&(target===ref.current||ref.current?.contains(target)||target.contains(ref.current)))reveal();};
  const onPrint=()=>reveal();
  if(!globalThis.IntersectionObserver){reveal();return;}
  const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){reveal();observer.disconnect();}},{rootMargin:'700px 0px'});
  const near=()=>{const box=ref.current?.getBoundingClientRect();if(box&&box.top<innerHeight+700&&box.bottom>-700)reveal();};
  observer.observe(ref.current);near();globalThis.addEventListener('scroll',near,{passive:true});globalThis.addEventListener('resize',near);globalThis.addEventListener('beforeprint',onPrint);globalThis.addEventListener('atlas:prepare-print',onPrint);globalThis.addEventListener('hashchange',onAnchor);onAnchor();
  return()=>{observer.disconnect();globalThis.removeEventListener('scroll',near);globalThis.removeEventListener('resize',near);globalThis.removeEventListener('beforeprint',onPrint);globalThis.removeEventListener('atlas:prepare-print',onPrint);globalThis.removeEventListener('hashchange',onAnchor);};
 },[ready]);
 return <div ref={ref} id={id} className={'editorial-progressive '+className} style={!ready?{minHeight:height}:undefined} data-prepared={ready}>{ready?children:<div className="editorial-skeleton" role="status">Preparando a análise…</div>}</div>;
}
export class AnalysisBoundary extends Component {
 state={error:null,attempt:0};
 static getDerivedStateFromError(error){return {error};}
 render(){return this.state.error?<section role="alert" className="editorial-error"><h3>Esta análise não pôde ser exibida.</h3><p>{this.state.error.message}</p><button onClick={()=>this.setState(s=>({error:null,attempt:s.attempt+1}))}>Tentar novamente</button></section>:<div key={this.state.attempt}>{this.props.children}</div>;}
}
