import s from './Dialogs.module.css'
import DialogsItem from './DialogsItem/DialogsItem'
import Message from './Message/Message'

const dialogs = [
    {id:1, name: 'Андрей'},
    {id:2, name: 'Александр'},
    {id:3, name: 'Михаил'},
    {id:4, name: 'Алексей'},
    {id:5, name: 'Максим'}
]

const messages = [
    {id:1, text: 'Далеко-далеко за словесными горами, в стране гласных и согласных живут рыбные тексты. Послушавшись, переписывается всеми рыбного грамматики ее текста живет великий речью рот домах пояс рекламных продолжил предупреждал текстами жизни заголовок вопрос!' }, 
    {id:2, text: 'Далеко-далеко за словесными горами, в стране гласных и согласных живут рыбные тексты. Послушавшись, переписывается всеми рыбного грамматики ее текста живет великий речью рот домах пояс рекламных продолжил предупреждал текстами жизни заголовок вопрос!' }, 
    {id:3, text: 'Далеко-далеко за словесными горами, в стране гласных и согласных живут рыбные тексты. Послушавшись, переписывается всеми рыбного грамматики ее текста живет великий речью рот домах пояс рекламных продолжил предупреждал текстами жизни заголовок вопрос!' }
]


const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <ul className={s.dialogs__items}>
                {dialogs.map(dialog => <DialogsItem id={dialog.id}  name={dialog.name}/>)}
            </ul>

            <ul className={s.messages}>
                {messages.map(message => <Message message={message.text} />)}
            </ul>
        </div>
    )
}

export default Dialogs