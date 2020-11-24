import React from 'react';
import './Node.css'
//import RightClickMenu from '../right_click_menu/RightClickMenu'

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
    handleRightClick(e){
        console.log('NODE: receieved right click');
    }
    handleClick(e){
        console.log('NODE: click event receieved', e);
    }
    render(){
        return <div 
            className="Node"
            draggable="true"
            ref={this.nodeRef}
            onContextMenu={this.handleRightClick.bind(this)}
            onClick={this.handleClick.bind(this)}
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