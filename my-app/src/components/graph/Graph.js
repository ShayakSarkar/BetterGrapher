import React from 'react';
import Node from '../node/Node';

class Graph extends React.Component{
    constructor(props){
        super(props);
        this.nodeList=[];
    }
    componentDidMount(){
        this.cachedRender=<div></div>
    }
    componentDidUpdate(){
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
                console.log(this.nodeList[i],'to be deleted');
                break;
            }
        }
        console.log('Changing node values');
        while(i<this.nodeList.length-1){
            this.nodeList[i]={
                posx: this.nodeList[i+1].posx,
                posy: this.nodeList[i+1].posy,
                data: this.nodeList[i+1].data
            };
            i=i+1;
        }
        console.log('list before popping',this.nodeList)
        var poppedNode=this.nodeList.pop();
        console.log('popped node: ',poppedNode);
        console.log('list after popping',this.nodeList);
        this.props.pageResetReRenderGraphToTrue();
    }
    render(){
        //console.log('graph props');
        //console.log(this.props);
        //console.log('Called graph render');
        //console.log(this.nodeList);
        if(this.props.clearGraph){
            this.nodeList=[];
        }
        if(this.props.newNode.data===null){
            return <div></div>
        }
        if(!this.props.reRenderGraph && this.nodeList.length!==0 && this.props.newNode.data===this.nodeList[this.nodeList.length-1].data){
            return this.cachedRender;
        }
        //console.log('rendering list....');
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
        this.props.pageResetReRenderGraphToFalse();
        //console.log('nodeElms: ',nodeElms);
        this.cachedRender=nodeElms;
        return <div>{nodeElms}</div>;
    }
}

export default Graph;