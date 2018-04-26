import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import TopMenu from './topMenu';

class UserProfile extends React.Component {

  componentDidMount() {
    const user = sessionStorage.getItem('user');
    if(!user){
      window.location.replace('/');
    }
  }

  componentWillReceiveProps(newProps) {
   
  }

  render() {
    const tabStyle = {
      padding: '10px'
    }
    function Tour(props){
      return (
        <tr>
          <th scope="row"></th>
          <td>{props.tour.startLocation} - {props.tour.endLocation}</td>
          <td>{props.tour.startTime} - {props.tour.endTime}</td>
          <td>{props.tour.cost} đ</td>
        </tr>
      );
    };

    const { user } = this.props;
    let loggedIn = false;
    let tours = null;
    
    if(user){
      loggedIn = true;
      if(user.tours){
        tours = this.props.user.tours.map((tour)=>
        <Tour tour={tour} key={tour.id} />
        );
      }
    }
    return (
      <div>
        <TopMenu />
        {
        loggedIn &&
        <div>
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
              <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-tours" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</a>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-profile" 
            role="tabpanel" aria-labelledby="nav-home-tab" style={tabStyle}>
                  <div className="row">
                    <div className="col-md-2">Tên</div>
                    <div className="col-md-9">{user.name}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-2">Email</div>
                    <div className="col-md-9">{user.email}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-2">Số điện thoại</div>
                    <div className="col-md-9">{user.phone}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-2">Số dư tài khoản</div>
                    <div className="col-md-10">{user.balance}</div>
                  </div>
            </div>
            <div className="tab-pane fade" id="nav-tours" role="tabpanel" aria-labelledby="nav-profile-tab">
              <table className="table table-striped" style={tabStyle}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tour</th>
                    <th scope="col">Thời gian</th>
                    <th scope="col">Giá</th>
                  </tr>
                </thead>
                <tbody>
                  { tours }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.storeState.token,
    user: state.storeState.user
  };
};

export default connect(
  mapStateToProps,
  { }
)(UserProfile);
