// Class component
//functional component
import React from 'react';


class MyComponents extends React.Component {
    //JSX

    state = {
        name: 'quangquang',
        address: 'Ha Noi',
        age: 26
    }

    handleClick(event) {
        console.log(event)
        // console.log("random " + Math.floor((Math.random() * 100)) + 1)
        this.setState({
            name: 'viet',
            age: Math.floor((Math.random() * 100) + 1)
        }
        )
    }

    handleMouseOver(event) {
        // console.log(event.pageX)
    }

    handleOnChangeInput =(event) =>{
        this.setState({
            name: event.target.value
        })
        console.log(event.target.value)
    }

    handleOnSubmit = (event) =>{
        // event.preventDefault();
        // console.log(this.state)
    }

    render() {
        return (
            <div>
                My name is {this.state.name} and I am from {this.state.age}
                {/* {Math.random()} */}
                {/* <button onMouseOver={this.handleMouseOver}>handle me</button> */}
                <button onClick={(event) => { this.handleClick(event) }}>Click me</button>
                <form onSubmit={(event) => {this.handleOnSubmit(event)}}>
                    <input 
                    type="text"
                    onChange={(event) => {this.handleOnChangeInput(event)}} 
                    />
                    <button>Submit</button>
                </form>
            </div>

        );
    }
}

export default MyComponents;