import Preloader from '../../common/Preloader/Preloader'
import s from './ProfileInfo.module.css'

const ProfileInfo = (props) => {
    
    return (
        <div>
            <div className={s.bg}>
                <img src={`../${props.profile.backgroundUrl}`} alt="Картинка обоев" />
            </div>

            <div className={s.info}>
                <div className={s.avatar__wrap}>
                    <img src={`../${props.profile.photoUrl}`} alt="Аватарка" />
                </div>

                <div className={s.user}>
                    <div className={s.user__name}>{props.profile.fullname}</div>

                    <dl>
                        <div className={s.user__item}>
                            <dd>Дата рождения:</dd>
                            <dt>{props.profile.desc.birthday}</dt>
                        </div>
                        <div className={s.user__item}>
                            <dd>Город:</dd>
                            <dt>{props.profile.location.city}</dt>
                        </div>
                        <div className={s.user__item}>
                            <dd>Образование:</dd>
                            <dt>{props.profile.desc.education}</dt>
                        </div>
                        <div className={s.user__item}>
                            <dd>Веб-страница:</dd>
                            <dt><a href={props.profile.desc.website} rel="noopener noreferrer" target='_blank'>{props.profile.desc.website}</a></dt>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo