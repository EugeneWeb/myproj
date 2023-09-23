import React, { Component } from "react";
import s from './ProfileStatus.module.css'


class ProfileStatus extends Component {
    state = {
        editMode: false,
        status: this.props.status
    }
    
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = (e) => {
        this.setState({
            editMode: false
        })

        
        this.props.getStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return <div>
            {!this.state.editMode && <p className={s.status} onDoubleClick={this.activateEditMode}>{this.props.status}</p>}
            {this.state.editMode && <input onChange={this.onStatusChange} className={s.statusInput} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} />}
        </div>;
    }
}

export default ProfileStatus;
