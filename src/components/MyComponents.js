// Class component
//functional component
import React from 'react';
import UserInfor from './UserInfor';
import DisplayInfor from './DisplayInfor';
class MyComponents extends React.Component {
    //JSX
    render() {
        return (
            <div>
                <UserInfor />
                <br/>
                <DisplayInfor name="quang" age="26"/>
                <hr/>
                <DisplayInfor name="eric" age="18"/>
            </div>
        );
    }
}

export default MyComponents;