import React from 'react';
import './Edge.css';

class Edge extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var from=this.props.from; //object {x:, y:}
        var to=this.props.to;   //object {x:, y:}
        var theta=Math.atan((to.y-from.y)/(to.x-from.x))*(360/(2*Math.PI));
        var length=Math.sqrt((from.x-to.x)*(from.x-to.x) + (from.y-to.y)*(from.y-to.y)) 
        var posx=(to.x+from.x)/2-length/2;
        var posy=(to.y+from.y)/2;
        length=parseInt(length)-1;
        return <div
            className="Edge"
            style={{
                position: 'absolute',
                left: posx+"px",
                top: posy+"px",
                width: length+"px",
                height: "2px",
                backgroundColor: "white",
                borderColor: "white",
                transform: "rotate("+theta+"deg)"
            }}>
        </div>
    }
}
