import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

export default class Header extends React.Component {

    render() {
        return(
            <AppBar
                title={<span className={"main-title"}>Messaged</span>}
                onTitleClick={this.handleTitle}
                iconElementLeft={<IconButton><NavigationClose/></IconButton>}
                iconElementRight={<Badge
                    badgeContent={this.props.messageCounter }
                    primary={true}
                    badgeStyle={{top: 12, right: 12, background: 'red', borderRadius: 50}}
                >
                    <NotificationsIcon/>
                </Badge>}
            />
        )
    }
}
