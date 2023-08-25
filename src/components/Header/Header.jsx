import s from './styles/Header.module.css'
const Header = () => {
    return (
        <header className={s.header}>
            <ul>
                <li>item1</li>
                <li>item2</li>
                <li>item3</li>
                <li>item4</li>
            </ul>
        </header>
    )
}

export default Header