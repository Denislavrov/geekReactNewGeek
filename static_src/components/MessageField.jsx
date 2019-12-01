import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SendIcon from 'material-ui/svg-icons/content/create';
import TextField from 'material-ui/TextField';
import Message from './Message';
import '../styles/message.scss';


export default class MessageField extends React.Component{

    render() {
        const {
            messageList,
            messages,
            input,
            handleInput,
            handleKeyUp,
            handleSendMessage,
        } = this.props;
        const messageComponents = messageList.map((messageId, index) =>
            <Message
                key = { index }
                text = { messages[messageId].text }
                sender = { messages[messageId].sender }
            />
        );

        return (
                    <div className={'message-box'}>
                        <div className={ "message-field" }>
                            { messageComponents }
                        </div>
                        <TextField
                            className={ "massage-input" }
                            hintText = 'hintText'
                            name = { 'input' }
                            value = { input }
                            onChange = {handleInput}
                            onKeyUp = { handleKeyUp }
                        />
                        <FloatingActionButton onClick= {handleSendMessage}>
                            <SendIcon/>
                        </FloatingActionButton>
                    </div>
        )
    }
}