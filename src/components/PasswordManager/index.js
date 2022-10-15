import './index.css'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import PasswordList from '../PasswordList'

class PasswordManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchIn: '',
      webIn: '',
      PList: [],
      userIn: '',
      passIn: '',
      isOK: false,
    }
  }

  changePass = e => {
    this.setState({passIn: e.target.value})
  }

  clicked = e => {
    const {isOK} = this.state
    if (e.target.checked) {
      this.setState({isOK: true})
    } else {
      this.setState({isOK: false})
    }
  }

  // click

  changeUser = e => {
    this.setState({userIn: e.target.value})
  }

  changeWeb = e => {
    this.setState({webIn: e.target.value})
  }

  onSearch = e => {
    this.setState({searchIn: e.target.value})
  }

  addUser = event => {
    event.preventDefault()
    const {userIn, webIn, passIn, PList, searchIn} = this.state

    const Ini = userIn ? userIn[0].toUpperCase() : ''

    const newUser = {
      id: uuidv4(),
      web: webIn,
      pass: passIn,
      user: userIn,
      initial: Ini,
    }

    this.setState(prevState => ({
      PList: [...prevState.PList, newUser],
      userIn: '',
      passIn: '',
      webIn: '',
    }))
  }

  getList = () => {
    const {searchIn, PList} = this.state
    const filList = PList.filter(Each =>
      Each.web.toLowerCase().includes(searchIn.toLowerCase()),
    )
    return filList
  }

  onDel = id => {
    const {PList} = this.state

    this.setState({
      PList: PList.filter(Each => Each.id !== id),
    })
  }

  render() {
    const {webIn, userIn, passIn, isOK, PList} = this.state

    const filList = this.getList()
    return (
      <div className="container">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="AddBox">
          <div className="User">
            <form>
              <h1 className="heading">Add New Password</h1>
              <div className="InputBox">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  className="icon"
                  alt="website"
                />
                <input
                  value={webIn}
                  className="Input"
                  placeholder="Enter Website"
                  type="text"
                  onChange={this.changeWeb}
                />
              </div>
              <div className="InputBox">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  className="icon"
                  alt="username"
                />
                <input
                  value={userIn}
                  className="Input"
                  placeholder="Enter Username"
                  type="text"
                  onChange={this.changeUser}
                />
              </div>
              <div className="InputBox">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  className="icon"
                  alt="password"
                />
                <input
                  className="Input"
                  value={passIn}
                  placeholder="Enter Password"
                  type="password"
                  onChange={this.changePass}
                />
              </div>
              <button type="submit" className="btn" onClick={this.addUser}>
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="Img"
          />
        </div>
        <div className="ListBox">
          <div className="line">
            <h1 className="heading">Your Passwords</h1>
            <p className="count">{PList.length}</p>
            <div className="search">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                alt="search"
                className="icon"
              />
              <input
                type="search"
                className="Input"
                onChange={this.onSearch}
                placeholder="Search"
              />
            </div>
          </div>
          <hr className="Hline" />
          <div className="Last">
            <div className="link">
              <input
                type="checkbox"
                id="check"
                onChange={this.clicked}
                className="Check"
              />
              <label className="Para" htmlFor="check" onClick={this.click}>
                Show Passwords
              </label>
            </div>
            {filList.length > 0 ? (
              <ul className="List">
                {filList.map(Each => (
                  <PasswordList
                    Item={Each}
                    onDel={this.onDel}
                    key={Each.id}
                    isOK={isOK}
                  />
                ))}
              </ul>
            ) : (
              <div className="ImgBox">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="Img"
                />
                <p className="Para">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
