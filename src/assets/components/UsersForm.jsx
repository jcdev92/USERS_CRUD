import React, {useState, useEffect} from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {MdOutlineEmail, MdPassword, MdDriveFileRenameOutline, MdChangeCircle} from "react-icons/md";
import {FaBirthdayCake} from "react-icons/fa";
import {IoMdContact} from "react-icons/io";
import {AiFillPlusCircle} from "react-icons/ai";

const UsersForm = ({getAllUsers, setUpdateUsers, updateUsers, handleModalOff}) => {

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if(updateUsers){
          reset(updateUsers);
        }
    }, [updateUsers])

    const defaultValues = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        birthday: ""
    }

    const createUser = data => {
        const URL = "https://users-crud1.herokuapp.com/users/"
        axios.post(URL, data)
            .then(res => getAllUsers())
            .catch(error => console.log(error))
    }

    const updateUser = data => {
        const URL = `https://users-crud1.herokuapp.com/users/${updateUsers.id}/`
        axios.patch(URL, data)
            .then(res => getAllUsers())
            .catch(error => console.log(error))
            setUpdateUsers(null)
            reset(defaultValues)
    }

    const submit = data => {
        if(updateUsers){
          updateUser(data)
        }
        else{
        createUser(data);
        reset(defaultValues);
        }
    }



  return (
    <form className="form" onSubmit={handleSubmit(submit)}>
      <h1 className="form-title">{updateUsers ? 'Update User' : 'New User'}</h1>
      <div className="form__group">
        <label htmlFor="first_name" className="form__label"><MdDriveFileRenameOutline/> </label>
        <input {...register("first_name")} type="text" className="form__input" id="first_name" placeholder="First Name"/>
      </div>
      <div className="form__group">
        <label htmlFor="last_name" className="form__label"> <IoMdContact/> </label>
        <input {...register("last_name")} type="text" className="form__input" id="last_name" placeholder="Last Name"/>
      </div>
      <div className="form__group">
        <label htmlFor="email" className="form__label"> <MdOutlineEmail/> </label>
        <input {...register("email")} type="email" className="form__input" id="email" placeholder="Email"/>
      </div>
      <div className="form__group">
        <label htmlFor="password" className="form__label"> <MdPassword/> </label>
        <input {...register("password")} type="password" className="form__input" id="password" placeholder="Password"/>
      </div>
      <div className="form__group">
        <label htmlFor="birthday" className="form__label"> <FaBirthdayCake/> </label>
        <input {...register("birthday")} type="date" className="form__input" id="birthday" placeholder="birthday"/>
      </div>
      <button className="form__btn" onClick={() => handleModalOff()}>{updateUsers ? <MdChangeCircle className="form__btn__add"/>: <AiFillPlusCircle className="form__btn__add"/> }</button>
    </form>
  );
};

export default UsersForm;
