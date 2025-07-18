import React, { useState } from 'react';

// class AddUserInfor extends React.Component {

//     state = {
//         name: '',
//         address: 'Ha Noi',
//         age: ''
//     }

//     handleClick(event) {
//         console.log(event)
//         // console.log("random " + Math.floor((Math.random() * 100)) + 1)
//         this.setState({
//             name: 'viet',
//             age: Math.floor((Math.random() * 100) + 1)
//         }
//         )
//     }

//     handleMouseOver(event) {
//         // console.log(event.pageX)
//     }

//     handleOnChangeInput = (event) => {
//         this.setState({
//             name: event.target.value
//         })
//         // console.log(event.target.value)
//     }

//     handleOnChangeInputAge = (event) => {
//         this.setState({
//             age: event.target.value
//         })
//         // console.log(event.target.value)
//     }

//     handleOnSubmit = (event) => {
//         event.preventDefault();
//         this.props.handleAddNewUser({
//             id: Math.floor((Math.random() * 100) + 1) + '-random',
//             name: this.state.name,
//             age: this.state.age,
//         });
//     }
//     render() {
//         return (
//             <div>
//                 My name is {this.state.name} and I am from {this.state.age}
//                 {/* {Math.random()} */}
//                 {/* <button onMouseOver={this.handleMouseOver}>handle me</button> */}
//                 <button onClick={(event) => { this.handleClick(event) }}>Click me</button>
//                 <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
//                     <label>your name: </label>
//                     <input
//                         value={this.state.name}
//                         type="text"
//                         onChange={(event) => { this.handleOnChangeInput(event) }}
//                     />
//                     <button>Submit</button>

//                     <label>your age: </label>
//                     <input
//                         value={this.state.age}
//                         type="text"
//                         onChange={(event) => { this.handleOnChangeInputAge(event) }}
//                     />
//                     <button>Submit</button>
//                 </form>
//             </div>
//         );
//     }
// }



const AddUserInfor = (props) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('Ha Noi');

    const handleOnChangeInput = (event) => {
        // this.setState({
        //     name: event.target.value
        // })
        // console.log(event.target.value)
        setName(event.target.value);
    }

    const handleOnChangeInputAge = (event) => {
        // this.setState({
        //     age: event.target.value
        // })
        // // console.log(event.target.value)
        setAge(event.target.value);
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        props.handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1) + '-random',
            name: name,
            age: age,
        });
    }
    return (
        <div>
            My name is {name} and I am from {age}
            {/* {Math.random()} */}
            {/* <button onMouseOver={this.handleMouseOver}>handle me</button> */}
            {/* <button onClick={(event) => { handleClick(event) }}>Click me</button> */}
            <form onSubmit={(event) => { handleOnSubmit(event) }}>
                <label>your name: </label>
                <input
                    value={name}
                    type="text"
                    onChange={(event) => { handleOnChangeInput(event) }}
                />
                <button>Submit</button>

                <label>your age: </label>
                <input
                    value={age}
                    type="text"
                    onChange={(event) => { handleOnChangeInputAge(event) }}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}
export default AddUserInfor;