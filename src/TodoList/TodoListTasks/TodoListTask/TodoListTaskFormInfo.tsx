import React from 'react';
import s from './TodoListTask.module.css';
import dateFormat from 'dateformat';

interface IProps {
    task: any
    deleteTask: () => void
    activateEditMode: () => void
    onChangeStatus: (e: React.FormEvent<HTMLInputElement>) => void
}

interface ISelectedOption {
    value: number
    label: string
}
class TodoListTaskFormInfo extends React.Component<IProps> {
    render = () => {
        let startDate = !this.props.task.startDate ? 'set start date' : dateFormat(this.props.task.startDate, 'longDate');
        let deadline = !this.props.task.deadline ? 'set deadline' : dateFormat(this.props.task.deadline, 'longDate');
        let addedDate = dateFormat(this.props.task.addedDate, 'longDate');
        let priority = ''
        switch (this.props.task.priority) {
            case 0: priority = 'Low'; break;
            case 1: priority = 'Middle'; break;
            case 2: priority = 'Hight'; break;
            case 3: priority = 'Urgently'; break;
            case 4: priority = 'Later'; break;
        }
        return (<div className={s.taskWrapperWord}>
            <div className={s.taskButtons}><a onClick={this.props.deleteTask}>
                <div className={s.taskSVG}><svg height="15px" viewBox="0 0 512 512" width="15px" fill='#c30202' xmlns="http://www.w3.org/2000/svg">
                    <path d="m176.8125 351.1875c-4.097656 0-8.195312-1.554688-11.308594-4.691406-6.25-6.25-6.25-16.382813 0-22.632813l158.378906-158.402343c6.25-6.25 16.382813-6.25 22.632813 0 6.253906 6.25 6.253906 16.382812 0 22.636718l-158.378906 158.398438c-3.132813 3.136718-7.230469 4.691406-11.324219 4.691406zm0 0" />
                    <path d="m335.1875 351.1875c-4.09375 0-8.191406-1.554688-11.304688-4.691406l-158.378906-158.378906c-6.25-6.25-6.25-16.382813 0-22.632813 6.25-6.253906 16.382813-6.253906 22.632813 0l158.378906 158.398437c6.253906 6.25 6.253906 16.382813 0 22.632813-3.132813 3.117187-7.230469 4.671875-11.328125 4.671875zm0 0" />
                    <path d="m453.332031 512h-394.664062c-32.363281 0-58.667969-26.304688-58.667969-58.667969v-394.664062c0-32.363281 26.304688-58.667969 58.667969-58.667969h394.664062c32.363281 0 58.667969 26.304688 58.667969 58.667969v394.664062c0 32.363281-26.304688 58.667969-58.667969 58.667969zm-394.664062-480c-14.699219 0-26.667969 11.96875-26.667969 26.667969v394.664062c0 14.699219 11.96875 26.667969 26.667969 26.667969h394.664062c14.699219 0 26.667969-11.96875 26.667969-26.667969v-394.664062c0-14.699219-11.96875-26.667969-26.667969-26.667969zm0 0" />
                </svg></div></a>
                <a onClick={this.props.activateEditMode}>
                    <div className={s.taskSVG}><svg height="15px" viewBox="0 -1 401.52289 401" width="15px" fill='blue' xmlns="http://www.w3.org/2000/svg">
                        <path d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0" />
                        <path d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0" />
                    </svg></div></a>
            </div>
            <span className={s.taskTitle}>{this.props.task.title}</span>
            <p>Description: <span>{!this.props.task.description ? 'set description' : this.props.task.description}</span></p>
            <p>Priority: <span>{!priority ? 'set priority' : priority}</span></p>
            <p>Added date: <span>{!addedDate ? 'no date added' : addedDate}</span></p>
            <p>Start date: <span>{!startDate ? 'set start date' : startDate}</span></p>
            <p>Deadline: <span>{!deadline ? 'set deadline' : deadline}</span></p>
            <p>Done: <input onChange={this.props.onChangeStatus} type='checkbox' checked={this.props.task.status}
                className={s.taskCheckbox} /></p>
        </div>);
    }
}

export default TodoListTaskFormInfo;
