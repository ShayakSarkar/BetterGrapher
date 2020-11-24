import React from 'react';
import './NumberingButton.css'
import '../Button.css'
/*
props: {
    currentNumberingScheme: use this to show the opposite scheme on the button    
    pageChangeNumberingScheme: a method on the page component to change the numbering scheme
                               of the nodes on the Graph
    disabled: if the numbering button is disabled (happens if more than 26 nodes are present)
              only numeric labelled nodes are allowed thereafter
}
*/
class NumberingButton extends React.Component{
    constructor(props){
        super(props);
    }
    handleClick(e){
        if(this.props.disabled){
            return;
        }
        if(this.props.currentNumberingScheme==='a'){
            this.props.pageChangeNumberingScheme('1');
        }
        else{
            this.props.pageChangeNumberingScheme('a');
        }
    }
    render(){
        //console.log(this.props);
        var buttonPayload=null;
        if(this.props.currentNumberingScheme==='a'){
            buttonPayload='1 - inf';
        }
        else{
            buttonPayload='A - Z';
        }
        var className="Button NumberingButton";
        if(this.props.disabled){
            className=className+" Disabled"
        }
        //console.log('NumberingButton class name',className);
        return <div className="Container"
            onClick={e=>{console.log('got click in container'); e.preventDefault();e.stopPropagation();}}
            onContextMenu={e=>{console.log('got context handler in container');e.preventDefault();e.stopPropagation()}}>
            <div className="Background">
            </div>
            <div className="NumberingHeader">
                Select Numbering Type<br/>
                <button
                    className={className}
                    onClick={this.handleClick.bind(this)}>
                    {buttonPayload}
                </button>
            </div>
            
        </div>
    }
}

export default NumberingButton;