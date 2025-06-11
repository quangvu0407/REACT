import React from 'react';
import './DisplayInfor.scss';
import logo from './../logo.svg';

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
            <div className='Display-infor-container'>
                {/* <img src={logo}/> */}
                <div>
                    <span onClick={() => { this.handleShowHide() }}>
                        {this.state.isShow ? "Hide list user" : "Show list user"}
                    </span>
                </div>
                {this.state.isShow &&
                    <>
                        {listUser.map((user, index) => {
                            return (
                                <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                    <div>
                                        <div>My name's {user.name}</div>
                                        <div>My age's {user.age}</div>

                                    </div>
                                    <div>
                                        <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
                                    </div>
                                    <hr />
                                </div>

                            )
                        })}
                    </>
                }
            </div>
        );
    }
}
export default DisplayInfor
