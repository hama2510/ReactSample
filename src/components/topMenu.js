import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { init, login, getCurrentUser, logout, deposit } from 'actions/userActions';

class TopMenu extends React.Component {

  constructor() {
    super();
    this.state = {
      logginModalIsOpen: false,
      depositModalIsOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openDepositModal = this.openDepositModal.bind(this);
    this.closeDepositModal = this.closeDepositModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.logout= this.logout.bind(this);
    this.deposit= this.deposit.bind(this);
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
    }
  }

  openModal() {
    this.setState({logginModalIsOpen: true});
  }

  closeModal() {
    this.setState({logginModalIsOpen: false});
  }

  openDepositModal() {
    this.setState({depositModalIsOpen: true});
  }

  closeDepositModal() {
    this.setState({depositModalIsOpen: false});
  }

  deposit(){
    const code = document.getElementById('cardCode').value;
    this.props.deposit(code);
  }

  login(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value
    this.props.login(username, password);
  }

  logout(){
    this.props.logout();
    window.location.replace('/');
  }
  
  handleChange(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  render() {
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
    
    const { user } = this.props;
    let loggedIn = false;
    if(user){
      loggedIn = true;
    }
    return (
      <div>
        <Modal
          isOpen={this.state.logginModalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyles}
          shouldCloseOnOverlayClick={true}>
          <h2>Đăng nhập</h2>
          <div>
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
        <Modal
          isOpen={this.state.depositModalIsOpen}
          onRequestClose={this.closeDepositModal}
          style={modalStyles}
          shouldCloseOnOverlayClick={true}>
          <h2>Nạp thẻ</h2>
          <div>
            <div className="form-group">
              <label htmlFor="cardCode">Mã thẻ</label>
              <input type="text" className="form-control" id="cardCode" 
               placeholder="Mã thẻ" onChange={this.handleChange}/>
            </div>
            <button className="btn btn-primary" onClick={this.deposit}>Nạp thẻ</button>
          </div>
        </Modal>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">K Tour</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            <a className="nav-item nav-link active" href="/">Trang chủ <span className="sr-only">(current)</span></a>
            { loggedIn &&
            <a className="nav-item nav-link" href="/user.html">Thông tin cá nhân</a>
            }
            { loggedIn &&
            <a className="nav-item nav-link" href="javascript:;" onClick={this.openDepositModal}>Nạp tiền</a>
            }
            </div>
          </div>
          <div className="form-inline my-2 my-lg-0">
          { !loggedIn &&
            <div className="navbar-nav">
              <a className="nav-item nav-link" href="javascript:;" onClick={this.openModal}>Đăng nhập</a>
              <a className="nav-item nav-link" href="#">Đăng ký</a>
            </div>

          }
          { loggedIn &&
            <div className="navbar-nav">
              <a className="nav-item nav-link" href="javascript:;" onClick={this.logout}>Đăng xuất</a>
            </div>
          }
          </div>
        </nav>
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
  { init, login, getCurrentUser, logout, deposit }
)( TopMenu );
