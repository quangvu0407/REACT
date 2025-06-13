import React from 'react';
import './DisplayInfor.scss';
import logo from './../logo.svg';

class DisplayInfor extends React.Component {

    constructor(props) {
        console.log("constructor: ")
        super(props);
        this.state = {
            isShow: true
        };
    }
    handleShowHide = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    componentDidMount() {
        console.log("componentDidMount: ")
        setTimeout(() =>{
            document.title = "quangquang"
        }, 3000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {  
        console.log("componentDidUpdate: ", this.props, prevProps)
        if(this.props.listUser !== prevProps.listUser) {
            if(this.props.listUser.length === 4){
                alert('You have 4 users')
            }
        }   
    }   

    render() {
        console.log("render: ")
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
