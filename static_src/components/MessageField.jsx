import React from 'react';

import {List, ListItem} from "material-ui";
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider'
import ActionInfo from 'material-ui/svg-icons/action/info';


import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import SendIcon from 'material-ui/svg-icons/content/create';

import TextField from 'material-ui/TextField';

import Message from './Message';
import '../styles/message.scss';

export default class MessageField extends React.Component{
    state = {
        messageList: [],
        messages: {1: {'text': 'asdasdasd', 'sender': 'bot'}},
        curId: 1,
        input: '',
        counter: 0
    };


    componentDidMount() {
        this.handleReply();
    }
    // componentDidMount() {
    //     const newMessages = [...this.state.messages, 'mess'];
    //     setTimeout(()=>this.setState({ messages: newMessages }),1000);
    // }

    componentDidUpdate(prevProps, prevState) {
        const {messages, messageList, curId} = this.state;
        const lastMessageSender = messages[curId - 1] ? messages[curId - 1].sender : '';
        if(prevState.messageList.length < messageList.length && lastMessageSender === 'me') {
            setTimeout(() => this.handleReply(),1000);
        }
        // const newMessages = [...this.state.messages, 'mess'];
        // setTimeout(() => this.setState({ messages: newMessages }), 1000);
    }
    handleSendMessage = () => {
        const {messageList, messages, curId, input} = this.state;
        if (input.length > 0) {
            const newMessageList = [...messageList, curId];
            const newMessages = {...messages, [curId]: {text: input, sender: 'me'}};
            this.setState({messages: newMessages, messageList: newMessageList, curId: curId + 1, input: ''});
        }
    };
    handleReply = () => {
        const {messageList, messages, curId} = this.state;
        const newMessageList = [...messageList, curId];
        const newMessages = {...messages, [curId]: {text: 'Hello I\'m bot!', sender: 'bot'}};
        this.setState({ messages: newMessages, messageList: newMessageList, curId: curId + 1 });
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

    messageCounter = () => {
        const { messageList } = this.state;
        let count = messageList.length;
        //this.setState({counter: count});
        return count;

    };

    render() {
        const {messageList, messages} = this.state;
        const messageComponents = messageList.map((messageId, index) =>
            <Message
                key = { index }
                text = { messages[messageId].text }
                sender = { messages[messageId].sender }
            />
        );


        //window.addEventListener('keyup', this.handleKeyUp);

        return (
            <div className={ "main" }>
                <AppBar
                    title={ <span className={ "main-title" }>Messaged</span> }
                    onTitleClick={ this.handleTitle }
                    iconElementLeft={ <IconButton><NavigationClose /></IconButton> }
                    iconElementRight={ <Badge
                        badgeContent={this.messageCounter()}
                        primary={true}
                        badgeStyle={{top: 12, right: 12, background: 'red', borderRadius: 50 }}
                    >
                        <NotificationsIcon />
                    </Badge> }
                />
                <div className={ "message-main" }>
                    <div className={ "message-lists" }>
                        <List>
                            <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                            <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
                            <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
                            <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
                            <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                        </List>
                        <Divider />
                        <List>
                            <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
                            <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
                            <ListItem primaryText="Spam" rightIcon={<ActionInfo />} />
                            <ListItem primaryText="Follow up" rightIcon={<ActionInfo />} />
                        </List>
                    </div>
                    <div className={'message-box'}>
                        <div className={ "message-field" }>
                            { messageComponents }
                        </div>
                        <TextField
                            className={ "massage-input" }
                            hintText = 'hintText'
                            name = { 'input' }
                            value = { this.state.input }
                            onChange = { this.handleInput }
                            onKeyUp = { this.handleKeyUp }
                        />
                        <FloatingActionButton onClick= { this.handleSendMessage }>
                            <SendIcon/>
                        </FloatingActionButton>
                    </div>
                </div>
            </div>
        )
    }
}