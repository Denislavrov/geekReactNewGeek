import React from 'react';
import Message from './Message';

export default class MessageField extends React.Component{
    state = {
        messageList: [],
        messages: {1: {'text': 'asdasdasd', 'sender': 'bot'}},
        curId: 1,
    };

    // componentDidMount() {
    //     const newMessages = [...this.state.messages, 'mess'];
    //     setTimeout(()=>this.setState({ messages: newMessages }),1000);
    // }

    componentDidUpdate(prevProps, prevState) {
        const {messages, messageList} = this.state;
        if(messages[messageList[messageList.length - 1]].sender === 'me') {
            setTimeout(() => this.handlReply(),1000);
        }
        // const newMessages = [...this.state.messages, 'mess'];
        // setTimeout(() => this.setState({ messages: newMessages }), 1000);
    }
    handleClick = () => {
        const {messageList, messages, curId} = this.state;
        const newMessageList = [...messageList, curId];
        const newMessages = {...messages, [curId]: {text: 'Hello!', sender: 'me'}};
        this.setState({ messages: newMessages, messageList: newMessageList, curId: curId + 1 });
    };
    handlReply = () => {
        const {messageList, messages, curId} = this.state;
        const newMessageList = [...messageList, curId];
        const newMessages = {...messages, [curId]: {text: 'Hello motherfucker!', sender: 'bot'}};
        this.setState({ messages: newMessages, messageList: newMessageList, curId: curId + 1 });
    };

    render() {
        const {messageList, messages} = this.state;
        const messageComponents = messageList.map((messageId, index) =>
            <Message key={ index } text={ messages[messageId].text }/>
        );

        return (
            <div>{ messageComponents }
            <button onClick={ this.handleClick }>send message</button>
            </div>
        )
    }
}