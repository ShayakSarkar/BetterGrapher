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
        this.printedLoops={};
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
            weight: null,
            directed: true
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
                    weight: this.state.edgeList[i].weight,
                    directed: this.state.edgeList[i].directed
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
                    weight: this.state.edgeList[i].weight,
                    directed: this.state.edgeList[i].directed
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
        for(var node in this.nodeList){
            if(this.props.currentNumberingScheme==='a'){
                this.nodeList[node].data=String.fromCharCode(65+parseInt(node));
            }
            else if(this.props.currentNumberingScheme==='1'){
                this.nodeList[node].data=String(parseInt(node)+1)
            }
        }
    }
    
    rightClickHandler(e){
        console.log('GRAPH: right click handler called');
        if(e.target.className==='Edge' || e.target.className==='SelfLoop'){
            console.log('GRAPH: right click got from edge');
            this.setState({
                rightClickMenu: {
                    show: true,
                    posx: e.clientX,
                    posy: e.clientY,
                    caller: 'Edge'
                }
            });
        }
        else if(e.target.className==='Node' || e.target.className==='NodePayload'){
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
    }
    match(obj1,obj2){
        console.log('GRAPH (match): trying to match',obj1,obj2);
        if(obj1.from.data===obj2.fromData && obj1.to.data===obj2.toData && obj1.weight===obj2.weight && obj1.directed===obj2.directed){
            console.log('GRAPH: match found ',obj1);
            return true;
        }
        return false;
    }
    deleteNode(id){
        console.log('GRAPH: ',id, 'needs to be deleted');
        if(this.nodeList.length===1){
            console.log('this.nodeList length is 1');
            this.nodeList=[];
            this.state.edgeList=[];
            this.props.pageResetNewNode({
                data: null,
                posx: null,
                posy: null
            });
        }
        else if(this.nodeList.length>1){
            var newNodeList=[];
            for(var i in this.nodeList){
                var node=this.nodeList[i];
                if(node.data===id){
                    continue;
                }
                else{
                    newNodeList.push(node);
                }
            }
            this.nodeList=newNodeList;
            var newEdgeList=[];
            for(var i in this.state.edgeList){
                var edge=this.state.edgeList[i];
                if(edge.to.data===id || edge.from.data===id){
                    continue;
                }
                else{
                    newEdgeList.push(edge);
                }
            } 
            this.state.edgeList=newEdgeList;
            //this will cause the rerender
            this.props.pageResetNewNode({...this.nodeList[this.nodeList.length-1]}); 
        }
    }
    deleteEdge(edgeToDelete){
        var newEdgeList=[];
        var deleted=false;
        for(var i in this.state.edgeList){
            var edge=this.state.edgeList[i];
            if(this.match(edge,edgeToDelete) && !deleted){
                deleted=true;
                continue;
            } 
            newEdgeList.push(edge);
        }
        this.setState({
            edgeList: newEdgeList
        });
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
        if(e.target.value==='delete node'){
            //console.log('GRAPH: node needs to be deleted');
            this.deleteNode(this.selectedNode.data);
        }
        else if(e.target.value==='delete edge'){
            this.deleteEdge(this.selectedEdge);
        }
        else if(e.target.value==='make undirected' || e.target.value==='make directed'){
            if(e.target.value==='make directed'){
                console.log('GRAPH: within make directed');
                for(var i in this.state.edgeList){
                    var edge=this.state.edgeList[i];
                    if(this.match(edge,this.selectedEdge)){
                        this.state.edgeList[i].directed=true;
                        console.log('GRAPH: ',this.state.edgeList);
                        break; 
                    }
                } 
            }
            else if(e.target.value==='make undirected'){
                console.log('GRAPH: within undirected');
                console.log('GRAPH: selected edge: ',this.selectedEdge);
                for(var i in this.state.edgeList){
                    var edge=this.state.edgeList[i];
                    if(this.match(edge,this.selectedEdge)){
                        this.state.edgeList[i].directed=false;
                        console.log('GRAPH: ',this.state.edgeList);
                        break;
                    }
                }
            }
            this.selectedEdge={
                fromData: null,
                toData: null,
                weight: null,
                directed: null
            };
            this.forceUpdate();
            return;
        }
        else if(e.target.className!=='Edge' && e.target.className!=='EdgeArrow' && e.target.className!=='SelfLoop'){
            this.selectedEdge={
                fromData: null,
                toData: null,
                weight: null,
                directed: true
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
                    y: this.currentFrom.posy,
                },
                to: {
                    data: this.currentTo.data,
                    x: this.currentTo.posx,
                    y: this.currentTo.posy,
                },
                weight: 1,
                directed: true
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
            weight: edgeDetails.weight,
            directed: edgeDetails.directed
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
        for(var i in this.state.edgeList){
            if(this.match(this.state.edgeList[i],this.selectedEdge)){
                this.state.edgeList[i].weight=newWeight;
                console.log('GRAPH: changed edge to ',this.state.edgeList[i]);
                break;
            }
        }
        this.selectedEdge={
            fromData: null,
            toData: null,
            weight: null,
            directed: true
        };
    }
    render(){
        async function postData(){
            //send the node ids instead of the number of nodes
            //as that would remove the obligation of renumbering
            //the nodes on deletion
            var payloadEdgeList=[];
            var payloadNodeList=[];
            for(var i in this.state.edgeList){
                var edge=this.state.edgeList[i];
                payloadEdgeList.push({
                    from: edge.from.data,
                    to: edge.to.data,
                    weight: edge.weight,
                    directed: edge.directed
                });
            }
            for(var i in this.nodeList){
                var node=this.nodeList[i];
                payloadNodeList.push({
                    data: node.data
                });
            }
            var payload={
                graphData:{
                    edgeList: payloadEdgeList,
                    nodes: payloadNodeList
                }
            }
            console.log(JSON.stringify(payload));
            var res=await fetch('http://localhost:5000/export_graph/',{
                method: 'POST',
                mode: 'no-cors',
                referrerPolicy: 'no-referrer',
                credentials: 'same-origin',
                body: JSON.stringify(payload), 
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Access-Control-Allow-Origin": "*"
                }
            });
            if(!res.ok){
                console.log('failed');
            }

        }
        if(this.props.export){
            console.log('GRAPH: ready to export',this.state.edgeList);
            postData.call(this);
            this.props.pageResetExportToFalse();
        }
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
        if(this.props.directedness.change){
            for(var i in this.state.edgeList){
                this.state.edgeList[i].directed=this.props.directedness.isEdgeDirected;
            }
            this.props.pageResetDirectedness();
        }
        var modifiedRightClickMenuRenderDetails= {   
            show: this.props.pageAllowGraphRightClickMenu && this.state.rightClickMenu.show,
            posx: this.state.rightClickMenu.posx,
            posy: this.state.rightClickMenu.posy,
            caller: this.state.rightClickMenu.caller
        }
        var modifiedEdgeWeightFormRenderDetails={
            show: this.props.pageAllowEdgeWeightForm && this.state.edgeWeightForm.show,
            posx: this.state.edgeWeightForm.posx,
            posy: this.state.edgeWeightForm.posy
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
        if (((this.nodeList.length === 0 && this.props.newNode.data!=null) || this.props.newNode.data !== this.nodeList[this.nodeList.length - 1].data ) && !this.props.reRenderGraph) {
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
            var loopNo=null;
            if(obj.from.data===obj.to.data){
                if(!this.printedLoops[obj.from.data]){
                    this.printedLoops[obj.from.data]=0;
                }
                loopNo=this.printedLoops[obj.from.data]+1; 
                this.printedLoops[obj.from.data]=loopNo;
            }
            return <Edge
                key={(obj.from.x*obj.from.y/obj.to.x*obj.to.y)+Math.random()*10000}
                from={obj.from}
                to={obj.to}
                weight={obj.weight}
                directed={obj.directed}
                loopNo={loopNo}
                graphSelectEdge={this.selectEdge.bind(this)}>
            </Edge>
        }
        var nodeElms=this.nodeList.map(getReactObjectsFromNodes.bind(this));
        var edgeElms=this.state.edgeList.map(getReactObjectsFromEdges.bind(this));
        this.printedLoops={};
        //console.log('nodeElms: ',nodeElms);
        this.cachedRender=<div
            onContextMenu={this.rightClickHandler.bind(this)}
            onClick={this.clickHandler.bind(this)}>
            {nodeElms}
            {edgeElms}
            <RightClickMenu 
                renderDetails={modifiedRightClickMenuRenderDetails}
                directed={this.selectedEdge.directed}>
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