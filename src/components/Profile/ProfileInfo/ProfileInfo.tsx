import { ProfileType } from 'types/types'
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus/ProfileStatus'
import { FC } from 'react'


type PropsType = {
    profile: ProfileType,
    getStatus: (status: string) => void
}
const ProfileInfo: FC<PropsType> = ({profile, getStatus}) => {
    return (
        <div>
            <div className={s.bg}>
                <img src={profile.backgroundUrl} alt="Картинка обоев" />
            </div>

            <div className={s.info}>
                <div className={s.avatar__wrap}>
                    <img src={profile.photoUrl} alt="Аватарка" />
                </div>

                <div className={s.user}>
                    <div className={s.user__name}>{profile.fullname}</div>

                    <ProfileStatus status={profile.status} getStatus={getStatus} />

                    <dl>
                        <div className={s.user__item}>
                            <dd>Дата рождения:</dd>
                            <dt>{profile.desc.birthday}</dt>
                        </div>
                        <div className={s.user__item}>
                            <dd>Город:</dd>
                            <dt>{profile.location.city}</dt>
                        </div>
                        <div className={s.user__item}>
                            <dd>Образование:</dd>
                            <dt>{profile.desc.education}</dt>
                        </div>
                        <div className={s.user__item}>
                            <dd>Веб-страница:</dd>
                            <dt><a href={profile.desc.website} rel="noopener noreferrer" target='_blank'>{profile.desc.website}</a></dt>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo