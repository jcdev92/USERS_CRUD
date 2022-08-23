import React from 'react'
import axios from 'axios'
import {MdDelete, MdModeEditOutline} from 'react-icons/md'

const CardUsers = ({user, getAllUsers, setUpdateUsers, handleModalOn}) => {

  const deleteCardUsers = () => {
    const URL = `https://users-crud1.herokuapp.com/users/${user.id}/`
      axios.delete(URL)
          .then(res => getAllUsers())
          .catch(err => console.log(err))
    }

  return (
    <article>
      <div className="card">
          <h1 className="car__title">{user.first_name} {user.last_name}</h1>
          <ul className="card__list">
            <li className="card__item"><span className="card__span">Email: </span><a className="card__a">{user.email}</a></li>
            <li className="card__item"><span className="card__span">Birthday: </span><a className="card__a">{user.birthday}</a></li>
          </ul>
          <footer className="card__footer">
            <button className="card__btn" onClick={deleteCardUsers}><MdDelete className='card__btn__icon'/></button>
            <button className="card__btn" onClick={() => {setUpdateUsers(user); handleModalOn()}}><MdModeEditOutline className='card__btn__icon'/></button>
          </footer>
      </div>
    </article>
  )
}

export default CardUsers