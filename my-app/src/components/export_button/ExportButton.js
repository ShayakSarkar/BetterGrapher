import React from 'react';
import '../Button.css'
import './ExportButton.css'

class ExportButton extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div>
            <button
                className="Button ExportButton"
                onClick={this.props.pageExportHandler}>
                Export
            </button>
        </div>
    }
}

export default ExportButton;