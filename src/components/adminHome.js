import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { toastr } from 'react-redux-toastr';
import { init, login, getCurrentUser, logout } from 'actions/userActions';
import { getLocations } from 'actions/locationActions';
import { createCard } from 'actions/cardActions';
import { createTour } from 'actions/tourActions';

class AdminHome extends React.Component {

  constructor() {
    super();
    this.state = {
      logginModalIsOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.login = this.login.bind(this);
    this.createTour = this.createTour.bind(this);
    this.createCard = this.createCard.bind(this);
  }

  componentDidMount() {
    this.props.init();
    if(this.props.token){
      this.props.getCurrentUser();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      this.props.getCurrentUser();
    }
    if (newProps.user !== this.props.user) {
      this.closeModal();
      this.props.getLocations();      
    }
  }

  openModal() {
    this.setState({logginModalIsOpen: true});
  }

  closeModal() {
    this.setState({logginModalIsOpen: false});
  }

  login(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value
    this.props.login(username, password);
  }

  createTour(){
    const startLocation = document.getElementById('startLocation').value;
    const endLocation = document.getElementById('endLocation').value
    const startDate = document.getElementById('startDate').value
    const endDate = document.getElementById('endDate').value
    const cost = document.getElementById('cost').value
    const maxMember = document.getElementById('maxMember').value  
    if(startLocation === endLocation){
      toastr.error('Thông báo', 'Điểm xuất phát và nơi đến không được trùng nhau!');
    }else {
      const tour = {
        startLocation,
        endLocation,
        startDate,
        endDate,
        cost,
        maxMember
      }
      this.props.createTour(tour);
    }
  }

  createCard(){
    const money = document.getElementById('money').value;
    const data = {
      money
    }
    this.props.createCard(data);
  }

  render() {
    const { user } = this.props;
    let loggedIn = false;
    if(user){
      loggedIn = true;
      this.state.logginModalIsOpen = false;
    } else{
      this.state.logginModalIsOpen = true;
    }
    const modalStyles = {
      content : {
        width                 : '500px',
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        transform             : 'translate(-50%, -50%)'
      }
    };
    const formStyle = {
      padding: '10px'
    }
    function Location(props){
      return (
        <option value={props.location.code}>{props.location.name}</option>
      );
    };
    let locations = null;
    if(this.props.locations){
      locations = this.props.locations.map((location, index)=>
      <Location location={location} key={location.code} index={index} />
      );
      console.log(locations)
    }
    return (
      <div style={formStyle}>
         <Modal
          isOpen={this.state.logginModalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyles}
          shouldCloseOnOverlayClick={false}>
          <h2>Đăng nhập</h2>
          <div >
            <div className="form-group">
              <label htmlFor="username">Tên đăng nhập</label>
              <input type="text" className="form-control" id="username" 
              placeholder="Tên đăng nhập" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input type="password" className="form-control" id="password"
               placeholder="Mật khẩu"  />
            </div>
            <button className="btn btn-primary" onClick={this.login}>Đăng nhập</button>
          </div>
        </Modal>
        { loggedIn &&
        <div>
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <a className="nav-item nav-link active" id="nav-tour-tab" data-toggle="tab" href="#nav-tour" role="tab" aria-controls="nav-home" aria-selected="true">Quản lý tour</a>
              <a className="nav-item nav-link" id="nav-card-tab" data-toggle="tab" href="#nav-card" role="tab" aria-controls="nav-profile" aria-selected="false">Quản lý thẻ</a>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-tour" role="tabpanel" aria-labelledby="nav-home-tab">
            <h2>Tạo mới tour</h2>
            <div>
              <div className="form-group">
                <label htmlFor="startLocation">Nơi xuất phát</label>
                <select className="form-control" id="startLocation">
                  {locations}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="endLocation">Điểm đến</label>
                <select className="form-control" id="endLocation">
                  {locations}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="startDate">Ngày bắt đầu</label>
                <input type="text" id="startDate" placeholder="Ngày bắt đầu" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">Ngày kết thúc</label>
                <input type="text" id="endDate" placeholder="Ngày kết thúc" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="cost">Giá (đ)</label>
                <input type="number" id="cost" placeholder="Giá" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="maxMember">Số lượng người tham gia</label>
                <input type="number" id="maxMember" placeholder="Số lượng người tham gia" className="form-control" />
              </div>
              <button className="btn btn-primary" onClick={this.createTour}>Tạo mới</button>
            </div>
            </div>
            <div className="tab-pane fade" id="nav-card" role="tabpanel" aria-labelledby="nav-profile-tab">
              <div>
                <div className="form-group">
                  <label htmlFor="money">Mệnh giá</label>
                  <input type="number" id="money" placeholder="Mệnh giá" className="form-control" />
                </div>
                <button className="btn btn-primary" onClick={this.createCard}>Tạo mới</button>
              </div>
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
    user: state.storeState.user,
    locations: state.storeState.locations
  };
};

export default connect(
  mapStateToProps,
  { init, login, getCurrentUser, createTour, getLocations, createCard }
)( AdminHome );
