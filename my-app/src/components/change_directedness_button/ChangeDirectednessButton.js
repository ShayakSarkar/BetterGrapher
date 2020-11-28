import React from 'react';
import '../Button.css'

class ChangeDirectednessButton extends React.Component{
    render(){
        return <button
            className="Button"
            onClick={this.props.pageChangeDirectedness}
            style={{
                position: 'absolute',
                left: '780px',
                top: '69px'
            }}>
            change edge directedness
        </button>
    }
}

export default ChangeDirectednessButton;