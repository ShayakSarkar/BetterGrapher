import React from 'react';
import './Paper.css'
import NumberingButton from '../numbering_button/NumberingButton';
import Graph from '../graph/Graph';
import RightClickMenu from '../right_click_menu/RightClickMenu';
import ExportButton from '../export_button/ExportButton';
import ClearButton from '../clear_button/ClearButton';

//We need to add a grid pattern to the paper element later on
class Paper extends React.Component{
    constructor(props){
        super(props);
        this.state={
            newNode: {
                posx: null,
                posy: null,
                data: null
            },
            rightClickMenu: {
                show: false,
                posx: null,
                posy: null,
                caller: 'Page'
            },
            export: false,
            currentNumberingScheme: 'a',
            numberingSchemeButtonDisabled: false,
            numberOfNodes: 0,
            reRenderGraph: false,
            clearGraph: false
        }
    }
    resetClearGraphToTrue(){
        this.setState({
            clearGraph: true,
            numberOfNodes: 0,
            newNode: {
                data: null,
                posx: null,
                posy: null
            }
        });
    }
    resetClearGraphToFalse(){
        this.setState({
            clearGraph: false
        });
    }
    onRightClickHandler(e){
        e.preventDefault();
        //console.log('PAPER: got right click from ',e.target.className);
        if(e.target.className==='Node' || e.target.className==='NodePayload'){
            if(this.state.rightClickMenu.show){
                this.setState({
                    rightClickMenu: {
                        show: false,
                        posx: null,
                        posy: null,
                        caller: 'Page'
                    }
                });
            }
            return;
        }
        console.log('PAPER: event is ', e);
        this.setState({
            rightClickMenu:{
                show:true,
                posx: e.clientX,
                posy: e.clientY,
                caller: 'Page'
            }
        });
    }
    getNextNodeData(){
        //console.log('Printing state');
        //console.log(this.state); 
        if(this.state.currentNumberingScheme==='a'){
            return String.fromCharCode(65+this.state.numberOfNodes);
        }
        else if(this.state.currentNumberingScheme==='1'){
            return String(1+this.state.numberOfNodes);
        }
        
    }
    resetRightClickMenuDetailsToFalse(){
        this.setState({
            rightClickMenu: {
                show: false,
                posX: null,
                posY: null,
                caller: 'Page'
            }
        });
    }
    resetReRenderGraphToFalse(){
        this.setState({
            reRenderGraph: false
        });
    }
    resetReRenderGraphToTrue(){
        this.setState({
            reRenderGraph: true
        });
    }
    addNewNode(e){
        e.preventDefault();
        if(this.state.numberOfNodes>=26){
            this.setState({
                currentNumberingScheme: '1',
                reRenderGraph: true,
                numberingSchemeButtonDisabled: true
            });
        }
        var nextNodeData=this.getNextNodeData.call(this);
        //console.log(nextNodeData);
        var n=this.state.numberOfNodes+1;
        //console.log('number of nodes',n);
        this.setState({
            newNode: {
                posx: e.pageX,
                posy: e.pageY,
                data: nextNodeData
            },
            addNewNode: true,
            numberOfNodes: n,
            rightClickMenu: {
                show: false,
                posx: null,
                posy: null,
                caller: 'Page'
            }
        });
    }
    pageExportHandler(e){
        e.preventDefault();
        console.log('Export handler called');
        this.setState({
            export: true
        });
    }
    changeNumberingScheme(newScheme){
        //newScheme can be either 'a' or '1'
        this.setState({
            currentNumberingScheme: newScheme,
            reRenderGraph: true
        });
    }
    resetExportToFalse(){
        this.setState({
            export:false
        });
    }
    onClickHandler(e){
        console.log('PAPER: click event receieved',e.target.className);
        if(e.target.className==='Option'){
            return;
        }
        if(!this.state.rightClickMenu.show){
            return;
        }
        else{
            this.setState({
                rightClickMenu: {
                    show: false,
                    posX: null,
                    posY: null,
                    caller: 'Page'
                }
            });

        }
    }
    getBackgroundLines(type){
        function getLeft(type,i){
            if(type==='vertical'){
                return (i*10)+"px";
            }
            else if(type==='horizontal'){
                return "0px";
            }
        }
        function getTop(type, i){
            if(type==='vertical'){
                return "0px";
            }
            else if(type==='horizontal'){
                return (i*10)+"px";
            }
        }
        var details={
            height: null,
            width: null
        }
        if(type==='vertical'){
           details.height='100%';
           details.width='1.5%';
        }
        else if(type==='horizontal'){
            details.height='0.1px';
            details.width='100%';
        }
        var assistingArray=[];
        var length=null;
        if(type==='vertical'){
            length=122;
        }
        else if(type==='horizontal'){
            length=56;
        }
        for(var i=0;i<length;i++){
            assistingArray.push(i);
        }
        var backgroundLines=assistingArray.map((i)=><div 
            key={i}  
            style={{
            position: "absolute",
            height: details.height,
            width: details.width,
            borderStyle: 'solid',
            borderWidth: '2px',
            borderColor: '#00000007',
            backgroundColor: '#00000000',
            left: getLeft(type,i),
            top: getTop(type,i)
        }}> 
        </div>);
        return backgroundLines;
    }
    render(){
        //console.log('Paper props');
        //console.log(this.state);
        var backgroundVerticalLines=this.getBackgroundLines('vertical');
        var backgroundHorizontalLines=this.getBackgroundLines('horizontal'); 
        return <div 
            className="Paper"
            onContextMenu={this.onRightClickHandler.bind(this)}
            onClick={this.onClickHandler.bind(this)}>
            {backgroundVerticalLines}
            {backgroundHorizontalLines}
            <Graph 
                newNode={this.state.newNode} 
                export={this.state.export}
                currentNumberingScheme={this.state.currentNumberingScheme}
                pageChangeNumberingScheme={this.changeNumberingScheme.bind(this)}
                pageResetExportToFalse={this.resetExportToFalse.bind(this)}
                reRenderGraph={this.state.reRenderGraph}
                pageResetReRenderGraphToFalse={this.resetReRenderGraphToFalse.bind(this)}
                pageResetReRenderGraphToTrue={this.resetReRenderGraphToTrue.bind(this)}
                clearGraph={this.state.clearGraph}
                resetClearGraphToFalse={this.resetClearGraphToFalse.bind(this)}>
            </Graph>
            <RightClickMenu 
                renderDetails={this.state.rightClickMenu}
                pageAddNewNode={this.addNewNode.bind(this)}>
            </RightClickMenu>        
            
            <ExportButton 
                pageExportHandler={this.pageExportHandler.bind(this)}>
            </ExportButton>

            <NumberingButton 
                currentNumberingScheme={this.state.currentNumberingScheme}
                pageChangeNumberingScheme={this.changeNumberingScheme.bind(this)}
                disabled={this.state.numberingSchemeButtonDisabled}>
            </NumberingButton>
            <ClearButton
                pageResetClearGraphToTrue={this.resetClearGraphToTrue.bind(this)}>
            </ClearButton>
        </div>
    }
}

export default Paper;