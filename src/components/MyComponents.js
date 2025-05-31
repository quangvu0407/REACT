// Class component
//functional component
import React from 'react';


class MyComponents extends React.Component {
    //JSX
    render() {
        return (
            <div>my components
                {Math.random()}
            </div>

        );
    }
}

export default MyComponents;