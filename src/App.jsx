import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import CardUsers from './assets/components/CardUsers'
import UsersForm from './assets/components/UsersForm'
import {AiFillPlusCircle} from "react-icons/ai";

function App() {
  const [users, setUsers] = useState()
  const [updateUsers, setUpdateUsers] = useState()
  const [modalState, setModal] = useState(false)

  const getAllUsers = () => {
    const URL = 'https://users-crud1.herokuapp.com/users/'
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUsers()
  } , [])

  console.log(users)

  const handleModalOn = () => setModal(true)
  const handleModalOff = () => setModal(false)

  return (
    <div className="App">
      <div className="container">
        <div className="navbar">
        <h1 className="title">Users Manager</h1>
          <button onClick={handleModalOn} className="add__btn"><h4 className='add__btn__title'>Add New User</h4> <AiFillPlusCircle className='add__btn__icon'/> </button>
        </div>
        <div className={modalState ? 'form__container__on' : 'form__container__off'}>
        <UsersForm getAllUsers={getAllUsers} setUpdateUsers={setUpdateUsers} updateUsers={updateUsers} handleModalOff={handleModalOff}/>
        </div>
        <div className="card__container">
        {
          users?.map(user => (
            <CardUsers key={user.id} user={user} getAllUsers={getAllUsers} setUpdateUsers={setUpdateUsers} handleModalOn={handleModalOn}/>
          ))
        }
        </div>
      </div>
    </div>
  )
}

export default App
