import React from 'react';

class DisplayInfor extends React.Component {

    state = {
        isShow: true
    }

    handleShowHide = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    render() {
        const { listUser } = this.props
        // console.log(listUser)
        // console.table(listUser)
        return (
            <div>
                <div>
                    <span onClick={() => { this.handleShowHide() }}>
                        {this.state.isShow ? "Hide list user" : "Show list user"}
                    </span>
                </div>
                {this.state.isShow && 
                    <div>
                        {listUser.map((user, index) => {
                            return (
                                <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                    <div>My name's {user.name}</div>
                                    <div>My age's {user.age}</div>
                                    <hr />
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        );
    }
}
export default DisplayInfor
