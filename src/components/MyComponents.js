// Class component
//functional component
import React from 'react';
import AddUserInfor from './AddUserInfor';
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

    handleAddNewUser = (userobj) => {
        // console.log("<<<check data from parent: ", userobj)
        // let listUserNews = this.state.listUser;
        // listUserNews.unshift(userobj);
        // this.setState({
        //     listUser: listUserNews
        // })
        this.setState({
            listUser: [userobj, ...this.state.listUser]
        })
    }

    handleDeleteUser = (userId) => {
        let listUserClone = this.state.listUser;
        listUserClone = listUserClone.filter(item => item.id !== userId);
        this.setState({
            listUser: listUserClone
        })
    }

    render() {

        return (
            <>
                <br />
                <div className='a'>
                    <AddUserInfor
                        handleAddNewUser={this.handleAddNewUser}
                    />
                    <hr />
                    <DisplayInfor
                        listUser={this.state.listUser}
                        handleDeleteUser={this.handleDeleteUser}
                    />
                </div>
                <div className='b'>

                </div>
            </>

        );
    }
}

export default MyComponents;