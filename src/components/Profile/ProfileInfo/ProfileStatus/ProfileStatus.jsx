import React, { Component, useEffect, useState } from "react";
import s from './ProfileStatus.module.css'


// class ProfileStatus extends Component {
//     state = {
//         editMode: false,
//         status: this.props.status
//     }
    
//     activateEditMode = () => {
//         this.setState({
//             editMode: true
//         })
//     }
//     deactivateEditMode = (e) => {
//         this.setState({
//             editMode: false
//         })

        
//         this.props.getStatus(this.state.status)
//     }

//     onStatusChange = (e) => {
//         this.setState({
//             status: e.currentTarget.value
//         })
//     }

//     componentDidUpdate(prevProps, prevState) {
        
//         if(prevProps.status !== this.props.status) {
//             this.setState({
//                 status: this.props.status
//             })
//         }
//     }

//     render() {
//         return <div>
//             {!this.state.editMode && <p className={s.status} onDoubleClick={this.activateEditMode}>{this.props.status}</p>}
//             {this.state.editMode && <input onChange={this.onStatusChange} className={s.statusInput} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} />}
//         </div>;
//     }
// }

const ProfileStatus = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.getStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    return <div>
            {!editMode && <p className={s.status} onDoubleClick={activateEditMode}>{props.status}</p>}
            {editMode && <input onChange={onStatusChange} className={s.statusInput} autoFocus={true} onBlur={deactivateEditMode} value={status} />}
        </div>;
}

export default ProfileStatus;
