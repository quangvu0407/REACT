import React from 'react';

class DisplayInfor extends React.Component {
    render() {
        const { listUser } = this.props
        console.log(listUser)
        return (
            <div>
                {listUser.map((user, index) => {
                    // console.log(user)
                    return (
                        <div key={user.id}>
                            <div>My name's {user.name}</div>
                            <div>My age's {user.age}</div>
                            <hr />
                        </div>
                    )
                })}
                <div>My name is {this.props.name}</div>
                <div>My age is {this.props.age}</div>
            </div>
        );
    }
}
export default DisplayInfor
