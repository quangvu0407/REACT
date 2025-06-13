import React, { useState } from 'react';
import './DisplayInfor.scss';
import logo from './../logo.svg';
import { use } from 'react';

// class DisplayInfor extends React.Component {

//     handleShowHide = () => {
//         this.setState({
//             isShow: !this.state.isShow
//         })
//     }

//     render() {
//         console.log("render: ")
//         const { listUser } = this.props
//         // console.log(listUser)
//         // console.table(listUser)
//         return (
//             <div className='Display-infor-container'>
//                 { true  &&
//                     <>
//                         {listUser.map((user, index) => {
//                             return (
//                                 <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
//                                     <div>
//                                         <div>My name's {user.name}</div>
//                                         <div>My age's {user.age}</div>

//                                     </div>
//                                     <div>
//                                         <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
//                                     </div>
//                                     <hr />
//                                 </div>

//                             )
//                         })}
//                     </>
//                 }
//             </div>
//         );
//     }
// }

const DisplayInfor = (props) => {
    const { listUser } = props

    const [isShowHideListUser, setShowHideListUser] = useState(true);
    
    // this.State{
    //     isShowHideListUser: true;
    // }

    const HandleShowHideListUser = () => {
        alert("Click me to show/hide list user");
        setShowHideListUser(!isShowHideListUser);
    }
    return (
        <div className='Display-infor-container'>
            <div>
                <span onClick={() => HandleShowHideListUser()}>
                    {isShowHideListUser ? "Hide list user" : "Show list user"}
                </span>
            </div>
            {isShowHideListUser &&
                <>
                    {listUser.map((user, index) => {
                        return (
                            <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                <div>
                                    <div>My name's {user.name}</div>
                                    <div>My age's {user.age}</div>

                                </div>
                                <div>
                                    <button onClick={() => props.handleDeleteUser(user.id)}>Delete</button>
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


export default DisplayInfor
