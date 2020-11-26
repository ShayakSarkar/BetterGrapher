import React from 'react';
import Node from '../node/Node';
import RightClickMenu from '../right_click_menu/RightClickMenu';
import Edge from '../edge/Edge';
import EdgeWeightForm from '../edge_weight_form/EdgeWeightForm';

class Graph extends React.Component{
    constructor(props){
        super(props);
        this.state={
            edgeList: [],
            edgeWeightForm: {
                show: true,
                posx: null,
                posy: null
            },
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
        };
        this.selectedEdge={
            fromData: null,
            toData: null,
            weight: null
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
    transformEdgeList(){
        console.log('called transform list');
        console.log(this.state.edgeList);
        var newEdgeList=[];
        if(this.props.currentNumberingScheme==='1' && this.state.edgeList.length>0 && this.state.edgeList[0].from.data.charCodeAt(0)>=65){
            //The additional conditions need to be checked because the reRendering phase
            //happens unnecessarily multiple times. It is a bug
            for(var i in this.state.edgeList){
               var fromData=this.state.edgeList[i].from.data;
               var toData=this.state.edgeList[i].to.data;
               //console.log('GRAPH: fromData: ',fromData.charCodeAt(0)-64);
               //console.log('GRAPH: toData: ',toData.charCodeAt(0)-64);
               newEdgeList.push({
                    from: {
                        data: String(fromData.charCodeAt(0)-64),
                        x: this.state.edgeList[i].from.x,
                        y: this.state.edgeList[i].from.y
                    },
                    to: {
                        data: String(toData.charCodeAt(0)-64),
                        x: this.state.edgeList[i].to.x,
                        y: this.state.edgeList[i].to.y
                    },
                    weight: this.state.edgeList[i].weight
               });
               console.log('GRAPH: 1 edge pushed into newEdgeList',newEdgeList);
           } 
           this.state.edgeList=[];
           for(i in newEdgeList){
               this.state.edgeList.push(newEdgeList[i]);
           }
           console.log('GRAPH: new state of edge list',this.state.edgeList);
        }
        else if(this.props.currentNumberingScheme==='a' && this.state.edgeList.length>0 && this.state.edgeList[0].from.data.charCodeAt(0)>=48 && this.state.edgeList[0].from.data.charCodeAt(0)<=57){
            //The additional conditions need to be checked because the reRendering phase
            //happens unnecessarily multiple times. It is a bug
            for(var i in this.state.edgeList){
               var fromData=this.state.edgeList[i].from.data;
               var toData=this.state.edgeList[i].to.data;
               //console.log('GRAPH: fromData: ',fromData.charCodeAt(0)-64);
               //console.log('GRAPH: toData: ',toData.charCodeAt(0)-64);
               newEdgeList.push({
                    from: {
                        data: String.fromCharCode(64+parseInt(fromData)),
                        x: this.state.edgeList[i].from.x,
                        y: this.state.edgeList[i].from.y
                    },
                    to: {
                        data: String.fromCharCode(64+parseInt(toData)),
                        x: this.state.edgeList[i].to.x,
                        y: this.state.edgeList[i].to.y
                    },
                    weight: this.state.edgeList[i].weight
               });
               console.log('GRAPH: 1 edge pushed into newEdgeList',newEdgeList);
           } 
           this.state.edgeList=[];
           for(i in newEdgeList){
               this.state.edgeList.push(newEdgeList[i]);
           }
           console.log('GRAPH: new state of edge list',this.state.edgeList)
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
        this.selectedEdge={
            fromData: null,
            toData: null,
            weight: null
        };
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
        if(e.target.className!=='Edge' && e.target.className!=='EdgeArrow'){
            this.selectedEdge={
                fromData: null,
                toData: null,
                weight: null
            };
        }
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
    selectEdge(edgeDetails,e){
        console.log('GRAPH: got click event from edge, edge details are: ',edgeDetails);
        console.log('GRAPH:',e);
        this.selectedEdge={
            fromData: edgeDetails.fromData,
            toData: edgeDetails.toData,
            weight: edgeDetails.weight
        };
        this.setState({
            edgeWeightForm: {
                show: true,
                posx: e.clientX,
                posy: e.clientY
            }
        });
    }
    changeEdgeWeight(newWeight){
        console.log('GRAPH: new weight receieved from edge weight form', newWeight);
        function match(obj1,obj2){
            console.log('GRAPH (match): trying to match',obj1,obj2);
            if(obj1.from.data===obj2.fromData && obj1.to.data===obj2.toData && obj1.weight===obj2.weight){
                console.log('GRAPH: match found ',obj1);
                return true;
            }
            return false;
        }
        for(var i in this.state.edgeList){
            if(match(this.state.edgeList[i],this.selectedEdge)){
                this.state.edgeList[i].weight=newWeight;
                console.log('GRAPH: changed edge to ',this.state.edgeList[i]);
                break;
            }
        }
        this.selectedEdge={
            fromData: null,
            toData: null,
            weight: null
        };
    }
    render(){
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
        if(!this.props.pageAllowEdgeWeightForm){
            this.selectedEdge={
                fromData: null,
                toData: null,
                weight: null
            };
        }
        var modifiedRightClickMenuRenderDetails= {   
            show: this.props.pageAllowGraphRightClickMenu && this.state.rightClickMenu.show,
            posx: this.state.rightClickMenu.posx,
            posy: this.state.rightClickMenu.posy,
            caller: 'Graph'                            
        }
        var modifiedEdgeWeightFormRenderDetails={
            show: this.props.pageAllowEdgeWeightForm && this.state.edgeWeightForm.show,
            posx: this.state.edgeWeightForm.posx,
            posy: this.state.edgeWeightForm.posy,
        }
        if(this.props.newNode.data===null){
            //the modifiedRenderDetails object takes into account if the Paper component
            //allows the right click menu from the graph to be shown
            return <div>
                <RightClickMenu
                    renderDetails={modifiedRightClickMenuRenderDetails}>
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
            this.transformEdgeList.call(this);
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
                to={obj.to}
                weight={obj.weight}
                graphSelectEdge={this.selectEdge.bind(this)}>
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
                renderDetails={modifiedRightClickMenuRenderDetails}>
            </RightClickMenu>
            <EdgeWeightForm
                renderDetails={modifiedEdgeWeightFormRenderDetails}
                graphChangeEdgeWeight={this.changeEdgeWeight.bind(this)}>
            </EdgeWeightForm>
        </div>;
        return this.cachedRender;
    }
}

export default Graph;