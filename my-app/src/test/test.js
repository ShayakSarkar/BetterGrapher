import React from 'react';

class Element extends React.Component{
    constructor(props){
        super(props);
    }
    clickHandler(e){
        console.log('PARENT: click receieved');
    }
    render(){
        var arr=[1,2,3,4];
        var elms=arr.map(i=><div onClick={e=>console.log('CHILD: click receieved')}>item</div>);
        return <div onClick={this.clickHandler.bind(this)}>{elms}</div>;   
    }
}

export default Element;
