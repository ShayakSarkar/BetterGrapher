import React from 'react';
import Node from '../node/Node';
import RightClickMenu from '../right_click_menu/RightClickMenu';

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
            posx: null,
            posy: null
        };
        this.currentTo={
            posx: null,
            posy: null
        };
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
        console.log(this.state);
        this.forceUpdate();
    }
    clickHandler(e){
        console.log('GRAPH: click receieved');
    }
    render(){
        //console.log('graph props');
        //console.log(this.props);
        //console.log('Called graph render');
        //console.log(this.nodeList);
        console.log('GRAPH: current nodeList: ',this.nodeList);
        if(this.props.clearGraph){
            this.nodeList=[];
        }
        if(this.props.newNode.data===null){
            return <div>
                <RightClickMenu
                    renderDetails={this.state.rightClickMenu}>
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
        var nodeElms=this.nodeList.map(getReactObjectsFromNodes.bind(this));
        //console.log('nodeElms: ',nodeElms);
        this.cachedRender=<div
            onContextMenu={this.rightClickHandler.bind(this)}
            onClick={this.clickHandler.bind(this)}>
            {nodeElms}
            <RightClickMenu 
                renderDetails={this.state.rightClickMenu}>
            </RightClickMenu>
        </div>;
        return this.cachedRender;
    }
}

export default Graph;