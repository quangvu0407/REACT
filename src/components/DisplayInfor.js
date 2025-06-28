import React, { useEffect, useState } from 'react';
import './DisplayInfor.scss';
import logo from './../logo.svg';

const DisplayInfor = (props) => {
    const { listUser } = props

    const [isShowHideListUser, setShowHideListUser] = useState(true);

    // this.State{
    //     isShowHideListUser: true;
    // }

    const HandleShowHideListUser = () => {
        // alert("Click me to show/hide list user");
        setShowHideListUser(!isShowHideListUser);
    }

    console.log("call me render");

    useEffect(
        () => {
            // setTimeout(() => { document.title = "quang" }, 3000)
            if(listUser.length === 0){
                alert("listuser is none");  
            }
            console.log("call me useEffect");
            
        },[listUser]
    );

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
