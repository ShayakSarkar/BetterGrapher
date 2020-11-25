import React from 'react';
import Node from '../node/Node';
import RightClickMenu from '../right_click_menu/RightClickMenu';
import Edge from '../edge/Edge';

class Graph extends React.Component{
    constructor(props){
        super(props);
        this.state={
            edgeList: [],
            rightClickMenu: {
                show: false,
                posx: null,
                posy: null,
                caller: 'Graph'
            }
        };
        this.nodeList=[];
        this.currentFrom={
            data: null,
            posx: null,
            posy: null
        };
        this.currentTo={
            data: null,
            posx: null,
            posy: null
        };
        this.selectedNode={
            data: null,
            posx: null,
            posy: null
        }
    }
    componentDidUpdate(){
        console.log('GRAPH: updated');
        if(this.props.clearGraph){
            this.props.resetClearGraphToFalse();
        }
        if(this.props.reRenderGraph){
            this.props.pageResetReRenderGraphToFalse();
        }
    }
    transformNodeList(){
        //console.log('started transfrom');
        for(var node in this.nodeList){
            //console.log('node=',node);
            if(this.props.currentNumberingScheme==='a'){
                this.nodeList[node].data=String.fromCharCode(65+parseInt(node));
            }
            else if(this.props.currentNumberingScheme==='1'){
                //console.log(parseInt(node)+1);
                this.nodeList[node].data=String(parseInt(node)+1)
            }
        }
        //console.log('ended transform');
    }
    
    deleteNode(id){
        var i=0;
        for(i=0;i<this.nodeList.length;i++){
            if(this.nodeList[i].data!==id){
                continue;
            }
            else{
                //console.log(this.nodeList[i],'to be deleted');
                break;
            }
        }
        console.log('GRAPH: Changing node values');
        while(i<this.nodeList.length-1){
            this.nodeList[i]={
                posx: this.nodeList[i+1].posx,
                posy: this.nodeList[i+1].posy,
                data: this.nodeList[i+1].data
            };
            i=i+1;
        }
        console.log('GRAPH: list before popping',this.nodeList)
        var poppedNode=this.nodeList.pop();
        console.log('GRAPH: popped node: ',poppedNode);
        console.log('GRAPH: list after popping',this.nodeList);
        this.props.pageResetReRenderGraphToTrue();
    }
    rightClickHandler(e){
        console.log('GRAPH: right click handler called');
        if(e.target.className!=='Node' && e.target.className!=='NodePayload'){
            return;
        }
        this.setState({
            rightClickMenu: {
                show: true,
                posx: e.clientX,
                posy: e.clientY,
                caller: 'Graph'       
            },
        });
        console.log('GRAPH: Right click state changed');
        console.log('GRAPH: current state');
        console.log('GRAPH: selected node: ',e.target);
        if(e.target.className==='NodePayload'){
            console.log('GRAPH: value of node: ',e.target.outerText);
            this.selectedNode={
                data: e.target.outerText,
                posx: e.clientX,
                posy: e.clientY
            }
        }
        else{
            console.log('GRAPH: value of node: ',e.target.children[0].outerText);
            this.selectedNode={
                data: e.target.children[0].outerText,
                posx: e.clientX,
                posy: e.clientY
            }
        }
        console.log(this.state);
    }
    clickHandler(e){
        this.setState({
            rightClickMenu: {
                show:false,
                posx: null,
                posy: null,
                caller: 'Graph'
            }
        });
        console.log('GRAPH: click receieved from ',e.target.className,'value: ',e.target.value);
        if(e.target.value==="set as 'from' node"){
            this.currentFrom={
                ...this.selectedNode
            };
        }
        else if(e.target.value==="set as 'to' node"){
            if(this.currentFrom.data===null){
                this.selectedNode={
                    data: null,
                    posx: null,
                    posy: null
                }
                return;
            }
            this.currentTo={
                ...this.selectedNode
            };
            this.state.edgeList.push({
                from: {
                    data: this.currentFrom.data,
                    x: this.currentFrom.posx,
                    y: this.currentFrom.posy
                },
                to: {
                    data: this.currentTo.data,
                    x: this.currentTo.posx,
                    y: this.currentTo.posy
                },
                weight: 1
            });
            var newEdgeList=this.state.edgeList;
            this.setState({
                edgeList: newEdgeList
            });
            console.log('GRAPH: new edge list: ',this.state.edgeList);
            this.currentFrom={
                data: null,
                posx: null,
                posy: null
            }
            this.currentTo={
                data: null,
                posx: null,
                posy: null
            }
        }
        
        this.selectedNode={
            data: null,
            posx: null,
            posy: null
        }
    }
    render(){
        //console.log('graph props');
        //console.log(this.props);
        //console.log('Called graph render');
        //console.log(this.nodeList);
        console.log('GRAPH: current nodeList: ',this.nodeList);
        if(this.props.clearGraph){
            this.nodeList=[];
            this.state.rightClickMenu={
                rightClickMenu: {
                    show: false,
                    posx: null,
                    posy: null,
                    caller: 'Graph'
                }
            };
            this.state.edgeList=[];
        }
        var modifiedRenderDetails= {   
            show: this.props.pageAllowGraphRightClickMenu && this.state.rightClickMenu.show,
            posx: this.state.rightClickMenu.posx,
            posy: this.state.rightClickMenu.posy,
            caller: 'Graph'                            
        }
        if(this.props.newNode.data===null){
            //the modifiedRenderDetails object takes into account if the Paper component
            //allows the right click menu from the graph to be shown
            return <div>
                <RightClickMenu
                    renderDetails={modifiedRenderDetails}>
                </RightClickMenu>
            </div>
        }
        //if(!this.props.reRenderGraph && this.nodeList.length!==0 && this.props.newNode.data===this.nodeList[this.nodeList.length-1].data){
        //    return this.cachedRender;
        //}
        console.log('GRAPH: rendering list....');
        if ((this.nodeList.length === 0 || this.props.newNode.data !== this.nodeList[this.nodeList.length - 1].data ) && !this.props.reRenderGraph) {
            this.nodeList.push(this.props.newNode);
        }
        if(this.props.reRenderGraph){
            this.transformNodeList.call(this);
        }
        function getReactObjectsFromNodes(obj){
            return <Node 
                key={obj.data}
                posx={obj.posx} 
                posy={obj.posy} 
                graphDeleteNode={this.deleteNode.bind(this)}
                nodePayload={obj.data}>
            </Node>
        }
        function getReactObjectsFromEdges(obj){
            return <Edge
                key={(obj.from.x*obj.from.y/obj.to.x*obj.to.y)+Math.random()*10000}
                from={obj.from}
                to={obj.to}>
            </Edge>
        }
        var nodeElms=this.nodeList.map(getReactObjectsFromNodes.bind(this));
        var edgeElms=this.state.edgeList.map(getReactObjectsFromEdges.bind(this));
        //console.log('nodeElms: ',nodeElms);
        this.cachedRender=<div
            onContextMenu={this.rightClickHandler.bind(this)}
            onClick={this.clickHandler.bind(this)}>
            {nodeElms}
            {edgeElms}
            <RightClickMenu 
                renderDetails={modifiedRenderDetails}>
            </RightClickMenu>
        </div>;
        return this.cachedRender;
    }
}

export default Graph;