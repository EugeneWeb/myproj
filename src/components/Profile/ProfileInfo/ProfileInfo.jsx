import s from './ProfileInfo.module.css'

const ProfileInfo = () => {
    return (
        <div>
            <div className={s.bg}>
                <img src='./img/backgrounds/profile1.jpg' alt="Картинка обоев" />
            </div>

            <div className={s.info}>
                <div className={s.avatar__wrap}>
                    <img src='./img/avatars/avatar1.svg' alt="Аватарка" />
                </div>

                <div className={s.user}>
                    <div className={s.user__name}>Dmitry K.</div>

                    <dl>
                        <div className={s.user__item}>
                            <dd>Дата рождения:</dd>
                            <dt>2 января</dt>
                        </div>
                        <div className={s.user__item}>
                            <dd>Город:</dd>
                            <dt>Минск</dt>
                        </div>
                        <div className={s.user__item}>
                            <dd>Образование:</dd>
                            <dt>МФТИ</dt>
                        </div>
                        <div className={s.user__item}>
                            <dd>Веб-страница:</dd>
                            <dt><a href="https://google.com" rel="noopener noreferrer" target='_blank'>https://google.com</a></dt>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo