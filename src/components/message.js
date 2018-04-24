import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import ReduxToastr from 'react-redux-toastr';
import { clearMessage } from 'actions/messageActions';
import * as messageConstant from 'constants/messageConstant';

class Message extends React.Component {
  componentWillReceiveProps(newProps) {
    if (newProps.message.content) {
      if (newProps.message.type === messageConstant.SUCCESS) {
        toastr.success('Thông báo', newProps.message.content);
      } else if (newProps.message.type === messageConstant.ERROR) {
        toastr.error('Thông báo', newProps.message.content);
      } else if (newProps.message.type === messageConstant.MESSAGE) {
        toastr.message(newProps.message.title, newProps.message.content);
      } else if (newProps.message.type === messageConstant.WARNING) {
        toastr.warning('Thông báo', newProps.message.content);
      }
      this.props.clearMessage();
    }
  }

  render() {
    return (<ReduxToastr timeOut={1000} />);
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.storeState.message
  };
};


export default connect(
  mapStateToProps, { clearMessage }
)(Message);