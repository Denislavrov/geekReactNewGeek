import React from 'react';
import Message from './Message';

export default class MessageField extends React.Component{
    state = {
        messages: ['mess1', 'mess2', 'mess3']
    };

    componentDidMount() {
        const newMessages = [...this.state.messages, 'mess'];
        setTimeout(()=>this.setState({ messages: newMessages }),1000);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevState);
        console.log(this.state);
        console.log(this.state.messages);
        if(prevState === this.state.messages[key % 2 === 0]) {
             const newMessages = [...this.state.messages, 'mess'];
             this.setState({ messages: newMessages });
        }

    }
    handleClick = () => {
        const newMessages = [...this.state.messages, 'myMessage'];
        this.setState({ messages: newMessages });
    };

    render() {
        const messages = this.state.messages.map((message, index) =>
            <Message key={ index } text={  message}/>
        );

        return (
            <div>{ messages }
            <button onClick={ this.handleClick }>send message</button>
            </div>
        )
    }
}