import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { init, login, getCurrentUser, logout } from 'actions/homeActions';

class TopMenu extends React.Component {

  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      username: '',
      password: ''
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.logout= this.logout.bind(this);
  }

  componentDidMount() {
    this.props.init();
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
    this.setState({modalIsOpen: true});
    console.log(this.state);
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  login(){
    this.props.login(this.state.username, this.state.password);
  }

  logout(){
    this.props.logout();
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
    
    const { username, password } = this.state;
    const { user } = this.props;
    let loggedIn = false;
    if(user){
      loggedIn = true;
    }
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyles}
          shouldCloseOnOverlayClick={true}>
          <h2>Đăng nhập</h2>
          <div>
            <div className="form-group">
              <label htmlFor="username">Tên đăng nhập</label>
              <input type="text" className="form-control" id="username" 
              value={username} placeholder="Tên đăng nhập" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input type="password" className="form-control" id="password"
               value={password} placeholder="Mật khẩu" onChange={this.handleChange} />
            </div>
            <button className="btn btn-primary" onClick={this.login}>Đăng nhập</button>
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
            <a className="nav-item nav-link active" href="/user.html">Thông tin cá nhân</a>
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
  { init, login, getCurrentUser, logout }
)( TopMenu );
