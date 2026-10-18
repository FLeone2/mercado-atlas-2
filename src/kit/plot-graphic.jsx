import * as Plot from '@observablehq/plot';
import {useLayoutEffect,useMemo,useRef,useState} from 'react';
const number=value=>value==null?'N/D':Number(value).toLocaleString('pt-BR',{maximumFractionDigits:2});
const month=new Intl.DateTimeFormat('pt-BR',{month:'short',timeZone:'UTC'});
export default function PlotGraphic({kind='trend',rows=[],height=330,title='Gráfico',colors=[]}){
 const host=useRef(null),[width,setWidth]=useState(0),[error,setError]=useState(null);
 const columns=useMemo(()=>[...new Set(rows.flatMap(row=>Object.keys(row)))],[rows]);
 useLayoutEffect(()=>{const observer=new ResizeObserver(([entry])=>setWidth(Math.round(entry.contentRect.width)));observer.observe(host.current);return()=>observer.disconnect();},[]);
 useLayoutEffect(()=>{
  if(!width||!host.current)return;
  try {
   let marks,axes={},prepared=rows;const palette=new Map(colors);
   if(kind==='trend'){
    prepared=rows.map(row=>({...row,time:new Date(row.date.length===4?row.date+'-01-01T12:00:00Z':row.date.slice(0,10)+'T12:00:00Z')}));
    const values={x:'time',y:'count'};
    marks=[Plot.ruleY([0],{stroke:'var(--line)'}),Plot.areaY(prepared,{...values,fill:'var(--chart-1)',fillOpacity:.09}),Plot.lineY(prepared,{...values,stroke:'var(--chart-1)',strokeWidth:2}),Plot.dot(prepared,Plot.pointerX({...values,r:4,fill:'var(--chart-1)'})),Plot.tip(prepared,Plot.pointerX({...values,title:d=>new Intl.DateTimeFormat('pt-BR',{timeZone:'UTC'}).format(d.time)+'\n'+number(d.count)+' emplacamentos'}))];
    axes={x:{type:'utc',label:null,ticks:Math.max(3,Math.floor(width/100)),tickFormat:d=>month.format(d)+' '+d.getUTCDate()},y:{label:'Emplacamentos',zero:true,grid:true,tickFormat:d=>d>=1000?number(d/1000)+' mil':number(d)}};
   }else if(kind==='slope'){
    prepared=rows.flatMap(row=>[{...row,period:'Ano anterior',value:row.a},{...row,period:'Atual',value:row.b}]);
    const stroke=d=>palette.get(d.name)??'var(--chart-1)';
    marks=[Plot.ruleY([0],{stroke:'var(--line)'}),Plot.line(prepared,{x:'period',y:'value',z:'name',stroke,strokeWidth:2}),Plot.dot(prepared,{x:'period',y:'value',fill:stroke,r:3,title:d=>d.name+' · '+d.period+'\n'+number(d.value)+'%'}),Plot.tip(prepared,Plot.pointer({x:'period',y:'value',title:d=>d.name+' · '+d.period+'\n'+number(d.value)+'%'}))];
    axes={x:{type:'point',domain:['Ano anterior','Atual'],label:null},y:{label:'Participação (%)',zero:true,grid:true}};
   }else{
    marks=[Plot.cell(rows,{x:'month',y:'year',fill:'var(--muted)',inset:1}),Plot.cell(rows.filter(d=>d.value!=null),{x:'month',y:'year',fill:'value',inset:1,title:d=>String(d.month).padStart(2,'0')+'/'+d.year+'\n'+number(d.value)+' emplacamentos'}),Plot.text(rows,{x:'month',y:'year',text:d=>d.value==null?'N/D':'',fill:'var(--ink-soft)',fontSize:11}),Plot.tip(rows,Plot.pointer({x:'month',y:'year',title:d=>String(d.month).padStart(2,'0')+'/'+d.year+'\n'+number(d.value)+' emplacamentos'}))];
    axes={x:{type:'band',domain:Array.from({length:12},(_,i)=>i+1),label:null,tickFormat:d=>['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'][d-1]},y:{type:'band',domain:[...new Set(rows.map(d=>d.year))].sort(),label:null},color:{type:'linear',scheme:'YlGn',legend:true,label:'Emplacamentos',zero:true}};
   }
   const chart=Plot.plot({width,height:Math.max(height,kind==='heatmap'?rows.length/12*30+90:height),marginLeft:65,marginRight:24,marginTop:30,marginBottom:45,style:{background:'transparent',color:'var(--text)',fontFamily:'var(--sans)',fontSize:'13px'},...axes,marks});
   chart.setAttribute('aria-label',title+'. Valores exatos na tabela abaixo.');chart.setAttribute('role','img');
   host.current.replaceChildren(chart);setError(null);
   return()=>chart.remove();
  }catch(error){setError(error);}
 },[rows,width,height,kind,title,colors]);
 if(error)throw error;
 return <div className="editorial-plot"><div ref={host} style={{minHeight:height}}/><details className="editorial-plot-data"><summary>Valores exatos</summary><div role="region" aria-label={'Tabela de '+title} tabIndex={0} style={{overflowX:'auto',maxHeight:360}}><table><caption>{title}</caption><thead><tr>{columns.map(c=><th key={c}>{c}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i}>{columns.map(c=><td key={c}>{row[c]==null?'N/D':typeof row[c]==='number'?number(row[c]):String(row[c])}</td>)}</tr>)}</tbody></table></div></details></div>;
}
