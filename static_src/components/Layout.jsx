import React from 'react';

import Header from './Header';
import LeftList from './LeftList';
import MessageField from './MessageField';

export default class Layout extends React.Component {

    state = {};

    render() {
        return(
            <div className={ 'main' }>
                <Header/>
                <div className={ 'massage-main' }>
                    <LeftList/>
                    <MessageField/>
                </div>
            </div>
        )
    };
}

