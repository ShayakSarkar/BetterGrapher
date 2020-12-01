import React from 'react';
import RightClickMenu from '../right_click_menu/RightClickMenu';
import './Edge.css';

class Edge extends React.Component{
    constructor(props){
        super(props);
        this.isRendered=1;
    }
    rightClickHandler(e){
        console.log('EDGE: got right click event');
        this.props.graphSelectEdge({
            fromData: this.props.from.data,
            toData: this.props.to.data,
            weight: this.props.weight,
            directed: this.props.directed
        },e);
    }
    clickHandler(e){
        console.log('EDGE: got click event');
        this.props.graphSelectEdge({
            fromData: this.props.from.data,
            toData: this.props.to.data,
            weight: this.props.weight,
            directed: this.props.directed
        },e);
    }
    makeSelfLoop(){
        var radius=this.props.loopNo*50;
        var posx=parseInt(this.props.from.x)-radius;
        var posy=parseInt(this.props.from.y)-radius;
        console.log('GRAPH (makeSelfLoop): ',posx,posy)
        var zIndex=100-this.props.loopNo;
        return <div
            className="SelfLoop"
            onContextMenu={this.rightClickHandler.bind(this)}
            onClick={this.clickHandler.bind(this)}
            style={{
                position: 'absolute',
                left: posx+'px',
                top: posy+'px',
                height: radius+'px',
                width: radius+'px',
                borderRadius: (radius/2)+'px',
                backgroundColor: 'transparent',
                zIndex: zIndex
            }}>
        </div>
    }
    render(){
        if(this.props.loopNo!=null){
            return this.makeSelfLoop();
        }
        var from=this.props.from; //object {x:, y:}
        var to=this.props.to;   //object {x:, y:}
        var theta=Math.atan((to.y-from.y)/(to.x-from.x))*(360/(2*Math.PI));
        var length=Math.sqrt((from.x-to.x)*(from.x-to.x) + (from.y-to.y)*(from.y-to.y)) 
        var posx=(to.x+from.x)/2-length/2;
        var posy=(to.y+from.y)/2;
        length=parseInt(length)-1;

        function isClockwise(p1,p2,p3){
            if(p2.y===p3.y){
                p2.y+=10;
            }
            p1.y=window.innerHeight-p1.y;
            p2.y=window.innerHeight-p2.y;
            p3.y=window.innerHeight-p3.y;
            //console.log('EDGE: ',p1,p2,p3);
            return ((p2.y-p1.y)*(p3.x-p2.x)-(p3.y-p2.y)*(p2.x-p1.x))>0;
        }
        function dist(p1,p2){
            return Math.sqrt((p2.y-p1.y)*(p2.y-p1.y)+(p2.x-p1.x)*(p2.x-p1.x));
        }
        function hasFirstQuad(p1,p2,p3){
            p1.y=window.innerHeight-p1.y;
            p2.y=window.innerHeight-p2.y;
            p3.y=window.innerHeight-p3.y;
            if(dist(p2,p1)<dist(p3,p1)){
                if(p2.y>p1.y){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                if(p3.y>p1.y){
                    return true;
                }
                else{
                    return false;
                }
            }
        }
        var firstRot=null;
        var secondRot=null;
        if(isClockwise({x: Math.min(from.x,to.x)-10,y: posy},{...from},{...to})){
            if(hasFirstQuad({x: Math.min(from.x,to.x)-10,y: posy},{...from},{...to})){
                console.log("EDGE: is clockwise and has in first quad");
                firstRot="rotate(-35deg)";
                secondRot="rotate(35deg)";
            }
            else{
                console.log("EDGE: is clockwise and has in second quad");
                firstRot="rotate(35deg)";
                secondRot="rotate(-35deg)";
            }
        }
        else{
            if(hasFirstQuad({x: Math.min(from.x,to.x)-10,y: posy},{...from},{...to})){
                console.log("EDGE: is anticlockwise and in first quad");
                firstRot="rotate(35deg)";
                secondRot="rotate(-35deg)";
            }
            else{
                console.log("EDGE: is clockwise and in second quad");
                firstRot="rotate(-35deg)";
                secondRot="rotate(35deg)";
            }
        }
        var edgeArrowDisplay="block";
        if(!this.props.directed){
            edgeArrowDisplay="none";
        }
        return <div
            className="Edge"
            onContextMenu={this.rightClickHandler.bind(this)}
            onClick={this.clickHandler.bind(this)}
            style={{
                position: 'absolute',
                left: posx+"px",
                top: posy+"px",
                width: length+"px",
                transform: "rotate("+theta+"deg)"
            }}>
                <div className="EdgeArrow"
                    style={{
                        display: edgeArrowDisplay,
                        position: 'absolute',
                        left: length/2+"px",
                        top: "4.3px",
                        transform: firstRot,
                        background: "white",
                        width: "10px",
                        height: "3px"
                    }}>
                </div>
                <div className="EdgeArrow"
                    style={{
                        display: edgeArrowDisplay,
                        position: 'absolute',
                        left: length/2+"px",
                        top: "-3.5px",
                        transform: secondRot,
                        background: "white",
                        width: "10px",
                        height: "3px"
                    }}>
                </div>
        </div>
    }
}

export default Edge;