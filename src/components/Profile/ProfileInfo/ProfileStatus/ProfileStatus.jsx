import React, { Component } from "react";
import s from './ProfileStatus.module.css'


class ProfileStatus extends Component {
    state = {
        editMode: false
    }

    toggleEditMode = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    render() {
        return <div>
            {!this.state.editMode && <p className={s.status} onDoubleClick={this.toggleEditMode}>{this.props.status}</p>}
            {this.state.editMode && <input className={s.statusInput} autoFocus='true' onBlur={this.toggleEditMode} value={this.props.status} />}
        </div>;
    }
}

export default ProfileStatus;
