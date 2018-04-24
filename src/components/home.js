import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { init, getTours, login, getCurrentUser, logout } from 'actions/homeActions';
import TopMenu from './topMenu';

class Home extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    // this.props.init();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      this.props.getTours();
    }
  }

  render() {
    const itemStyle = {
      marginTop: '10px',
      marginBottom: '10px'
    }
  
    function Tour(props){
      return (
        <div className="col-md-4" style={itemStyle}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Tour {props.tour.startLocation} - {props.tour.endLocation}</h5>
                <h5 className="card-title">Thời gian: {props.tour.startTime} - {props.tour.endTime}</h5>
                <h5 className="card-title">Giá tour: {props.tour.cost} đ </h5>
                <h5 className="card-title">Số người tham gia: {props.tour.currentMember}/{props.tour.maxMember}</h5>
                <p className="card-text">
                {props.tour.description}
                </p>
                <a href="#" className="btn btn-primary">Đặt tour</a>
              </div>
            </div>
        </div>
      );
    };

    const tours = this.props.tours.map((tour)=>
      <Tour tour={tour} key={tour.id} />
    );
    const { user } = this.props;
    return (
      <div>
        <TopMenu />
        <br/>
        <div className="row">
         {tours}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.storeState.token,
    tours: state.storeState.tours,
    user: state.storeState.user
  };
};

export default connect(
  mapStateToProps,
  { init, getTours }
)(Home);
