import {Component,lazy,Suspense} from 'react';
const PlotGraphic=lazy(()=>import('./plot-graphic.jsx'));
class RendererFallback extends Component {
 state={failed:false};static getDerivedStateFromError(){return {failed:true};}
 render(){return this.state.failed?this.props.fallback:this.props.children;}
}
export function PlotRenderer({fallback,...props}){
 return <RendererFallback fallback={fallback}><Suspense fallback={fallback}><PlotGraphic {...props}/></Suspense></RendererFallback>;
}
