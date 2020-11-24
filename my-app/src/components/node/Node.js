import React from 'react';
import ReactDOM from 'react-dom';
import './Node.css'
import RightClickMenu from '../right_click_menu/RightClickMenu'

class Node extends React.Component{
    constructor(props){
        super(props);
        this.state={
            rightClickMenu: {
                show: false,
                posx: null,
                posy: null
            }
        }; 
    }

    clickHandler(e){
        console.log('clicked');
    }
    
    render(){
        return <div 
            className="Node"
            draggable="true"
            onClick={this.clickHandler.bind(this)}
            ref={this.nodeRef}
            style={{
                left: this.props.posx+"px",
                top: this.props.posy+"px"
            }}>
            <div 
                className="NodePayload">
                {this.props.nodePayload}        
            </div>
        </div>
    }
}

export default Node;