import preloader from './img/loader_icon.svg'
import s from './Preloader.module.css'

const Preloader = () => {
    return (
        <div>
            <img className={`${s.rotate} ${s.preloader}`} src={preloader} alt="Картинка загрузки" />
        </div>
    )
}

export default Preloader