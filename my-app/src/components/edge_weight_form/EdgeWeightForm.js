import React from 'react';
import './EdgeWeightForm.css';

class EdgeWeightForm extends React.Component{
    constructor(props){
        super(props);
    }
    submitWeight(e){
        var newWeight=parseInt(e.target.parentElement.children[0].value);
        console.log('EDGE_WEIGHT_FORM: new edge weight is',newWeight);
        this.props.graphChangeEdgeWeight(newWeight); //change the weight of the selected edge in graph
    }
    render(){
        var renderDetails=this.props.renderDetails;
        if(!renderDetails.show){
            return <div 
                style={{display: "none"}}>
            </div>;
        }
        return<div
            className="EdgeWeightForm"    
            style={{
                position: 'absolute',
                left: this.props.renderDetails.posx+'px',
                top: this.props.renderDetails.posy+'px',
            }}>
                Enter new weight
                <input 
                    type="text"
                    onClick={e=>e.stopPropagation()}
                    style={{
                        position: 'absolute',
                        top: '48%',
                        left: '15%',
                        width: '70%',
                        height: '20%',
                        fontFamily: 'arial',
                        borderRadius: '6px',
                        fontWeight: 'bolder'
                    }}>
                </input>
                <button 
                    className="EdgeFormButton"
                    onClick={this.submitWeight.bind(this)}
                    style={{
                        position: 'absolute',
                        top: '75%',
                        left: '25%',
                        fontFamily: 'arial',
                        fontWeight: 'bolder',
                        padding: '5px',
                        borderRadius: '6px'
                        
                    }}>
                    done
                </button>
        </div>;
    }
}

export default EdgeWeightForm;