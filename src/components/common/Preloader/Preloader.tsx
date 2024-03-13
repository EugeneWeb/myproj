import { FC } from 'react'
import preloader from './img/loader_icon.svg'
import s from './Preloader.module.css'

type PropsType = {}
const Preloader: FC<PropsType> = () => {
    return (
        <div>
            <img className={`${s.rotate} ${s.preloader}`} src={preloader} alt="Картинка загрузки" />
        </div>
    )
}

export default Preloader