import React from 'react';
import { connect } from 'react-redux';

import { init, getTours } from 'actions/homeActions';

class Home extends React.Component {
  componentDidMount() {
    this.props.init();
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
                <h5 className="card-title">Giá vé: {props.tour.cost} đ </h5>
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
      <Tour tour={tour} />
    )
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">K Tour</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link active" href="#">Trang chủ <span className="sr-only">(current)</span></a>
            </div>
          </div>
          <div className="form-inline my-2 my-lg-0">
            <div className="navbar-nav">
              <a className="nav-item nav-link" href="#">Đăng nhập</a>
              <a className="nav-item nav-link" href="#">Đăng ký</a>
            </div>
          </div>
        </nav>
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
    tours: state.storeState.tours
  };
};

export default connect(
  mapStateToProps,
  { init, getTours }
)(Home);
