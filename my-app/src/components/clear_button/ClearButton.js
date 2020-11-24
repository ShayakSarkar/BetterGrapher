import React from 'react';
import '../Button.css'

class ClearButton extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <button 
            onClick={this.props.pageClearGraph}
            className="Button">
        </button>
    }
}

export default ClearButton;