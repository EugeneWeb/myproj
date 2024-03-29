import { Component, useEffect, useState } from "react";
import * as React from 'react'
import s from './ProfileStatus.module.css'

type PropsType = {
    status: string,
    getStatus: (status: string) => void 
}
const ProfileStatus: React.FC<PropsType> = ({status, getStatus}) => {
    const [editMode, setEditMode] = useState(false)
    const [localStatus, setLocalStatus] = useState(status)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        getStatus(localStatus)
    }

    const onStatusChange = (e) => {
        setLocalStatus(e.currentTarget.value)
    }

    useEffect(() => {
        setLocalStatus(status)
    }, [status])

    return <div>
            {!editMode && <p className={s.status} onDoubleClick={activateEditMode}>{status}</p>}
            {editMode && <input onChange={onStatusChange} className={s.statusInput} autoFocus={true} onBlur={deactivateEditMode} value={localStatus} />}
        </div>;
}

export default ProfileStatus;
