// Class component
//functional component
import React from 'react';
import UserInfor from './UserInfor';
import DisplayInfor from './DisplayInfor';
class MyComponents extends React.Component {
    //JSX
    state = {
        listUser: [
            { id: 1, name: "quang", age: "16" },
            { id: 2, name: "devpro", age: "26" },
            { id: 3, name: "eric", age: "69" },
        ]
    }
    render() {
        return (
            <div>
                <UserInfor />
                <hr />
                <DisplayInfor
                    listUser={this.state.listUser}
                />
            </div>
        );
    }
}

export default MyComponents;