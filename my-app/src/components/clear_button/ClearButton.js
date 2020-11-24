import React from 'react';
import '../Button.css'

class ClearButton extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <button 
            onClick={this.props.pageResetClearGraphToTrue}
            className="Button"
            style={{
                position: 'absolute',
                left: '600px',
                top: '70px'
            }}>
            Clear Graph
        </button>
    }
}

export default ClearButton;