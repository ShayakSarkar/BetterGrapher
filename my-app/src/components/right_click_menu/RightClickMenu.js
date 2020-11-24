import React from 'react';
import './RightClickMenu.css'

class RightClickMenu extends React.Component{
    constructor(props){
        super(props);
    }
    showPageRightClickMenu(){
        var details=this.props.renderDetails;
        //console.log(details);
        if(!details.show){
            return <div display="none"></div>
        }
        var elm=<div 
            className="RightClickMenu" 
            id="rightClickMenu"
            style={{
                position: 'absolute',
                left: this.props.renderDetails.posx+'px',
                top: this.props.renderDetails.posy+'px'
            }}>
            <option 
                className="Option"
                onClick={this.props.pageAddNewNode}>
                Add node
            </option>
            <option className="Option">
                Placeholder
            </option>
        </div>
        return elm;
    }
    showNodeRightClickMenu(){
        var details=this.props.renderDetails;
        //console.log(details);
        if(!details.show){
            return <div display="none"></div>
        }
        var elm=<div 
            className="RightClickMenu" 
            style={{
                zIndex: "100",
                position: 'absolute',
                left: this.props.renderDetails.posx+"px",
                top: this.props.renderDetails.posy+"px"
            }}>
            <option 
                className="Option"
                onClick={this.props.nodeDeleteNode}>
                delete node
            </option>
            <option className="Option">
                set as 'from' node
            </option>
            <option className="Option">
                set as 'to' node
            </option>
        </div>
        return elm;
    }
    render(){
        console.log('RIGHT_CLICK_MENU: caller is',this.props.renderDetails.caller);
        if(this.props.renderDetails.caller==='Page'){
            return this.showPageRightClickMenu.call(this);
        }
        else if(this.props.renderDetails.caller==='Graph'){
            return this.showNodeRightClickMenu.call(this);
        }
        return <div></div>
    }
}

export default RightClickMenu;