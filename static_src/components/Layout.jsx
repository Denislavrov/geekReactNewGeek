import React from 'react';
import Header from './Header';
import LeftList from './LeftList';
import MessageField from './MessageField';
import '../styles/layout.scss';

export default class Layout extends React.Component {

    state = {
        messageList: [],
        messages: {1: {'text': 'asdasdasd', 'sender': 'bot'}},
        curId: 1,
        input: '',
        counter: 1
    };

    componentDidMount() {
        this.handleReply();
    }

    componentDidUpdate(prevProps, prevState) {
        const {messageList, messages, curId} = this.state;
        const lastMessageSender = messages[curId - 1] ? messages[curId - 1].sender : '';
        if(prevState.messageList.length < messageList.length && lastMessageSender === 'me') {
            setTimeout(() => this.handleReply(),1000);
        }
    }

    handleSendMessage = () => {
        const {messageList, messages, curId,input} = this.state;
        if (input.length > 0) {
            const newMessageList = [...messageList, curId];
            const newMessages = {...messages, [curId]: {text: input, sender: 'me'}};
            this.setState({
                messages: newMessages,
                messageList: newMessageList,
                curId: curId + 1,
                input: '',
                counter: messageList.length + 1,
            });
        }
    };

    handleReply = () => {
        const {messageList, messages, curId} = this.state;
        const newMessageList = [...messageList, curId];
        const newMessages = {...messages, [curId]: {text: 'Hello I\'m bot!', sender: 'bot'}};

        this.setState({
            messages: newMessages,
            messageList: newMessageList,
            curId: curId + 1,
            counter: messageList.length + 1,
        });
    };

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleKeyUp = (evt) => {
        evt.preventDefault();
        if (evt.keyCode === 13) { //ENTER
            this.handleSendMessage();
        }
    };

    handleTitle = () => {
        alert('hello hello');
    };

    render() {
        return(
            <div className={ 'main' }>
                <Header messageCounter = {this.state.counter} />
                <div className={ 'massage-main' }>
                    <LeftList/>
                    <MessageField
                        messageList={this.state.messageList}
                        messages={this.state.messages}
                        curId={this.state.curId}
                        input={this.state.input}
                        handleInput={this.handleInput}
                        handleKeyUp={this.handleKeyUp}
                        handleSendMessage={this.handleSendMessage}
                    />
                </div>
            </div>
        )
    };
}

