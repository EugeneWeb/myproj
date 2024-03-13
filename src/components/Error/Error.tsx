import { FC } from 'react'
import s from './Error.module.css'

type PropsType = {}
const Error: FC<PropsType> = () => {
    return (
        <div>
            <h1>Страница не найдена</h1>
        </div>
    )
}

export default Error