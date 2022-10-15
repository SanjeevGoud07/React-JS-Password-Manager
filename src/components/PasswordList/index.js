/* eslint-disable react/no-unknown-property */
import './index.css'

const PasswordList = props => {
  const {Item, isOK, onDel} = props
  const {id, user, web, pass, initial} = Item
  const P =
    isOK === true ? (
      pass
    ) : (
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
        alt="stars"
      />
    )
  const Del = () => {
    onDel(id)
  }

  return (
    <li className="listI">
      <p className="DP">{initial}</p>
      <div className="PASS">
        <p className="para">{web}</p>
        <p className="para">{user}</p>
        <p className="para">{P}</p>
      </div>
      <button className="btn2" type="button" testid="delete" onClick={Del}>
        <img
          className="icon"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordList
