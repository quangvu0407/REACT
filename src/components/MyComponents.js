// Class component
//functional component
import React from 'react';


class MyComponents extends React.Component {
    //JSX

    state = {
        name: "quangquang",
        address: "Ha Noi",
        age: 26
    }
    render() {
        return (
            <div>
                My name is{this.state.name}
                {Math.random()}
            </div>

        );
    }
}

export default MyComponents;