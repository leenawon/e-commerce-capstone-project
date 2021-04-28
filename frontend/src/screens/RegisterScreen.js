import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const redirect = props.location.search 
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const {userInfo, loading, error} = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      alert('비밀번호가 틀렸습니다. 다시 입력해주세요')
    } else {
      dispatch(register(name, email, password));
    }
    dispatch(register(name, email, password));
  };

useEffect(() => {
  if(userInfo) {
    props.history.push(redirect);
  }
}, [props.history, redirect, userInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>회원가입</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Name</label>
          <input type="text" id="name" placeholder="이름을 입력하세요" required onChange={e => setName(e.target.value)}></input>
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="이메일을 입력하세요" required onChange={e => setEmail(e.target.value)}></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="비밀번호를 입력하세요" required onChange={e => setPassword(e.target.value)}></input>
        </div>
        <div>
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input type="password" id="confirmpassword" placeholder="비밀번호를 다시 입력하세요" required onChange={e => setConfirmPassword(e.target.value)}></input>
        </div>
        <div>
          <label/>
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label/>
          <div>
            이미 계정이 있으신가요? <Link to={`/signin? redirect=${redirect}`}>로그인 하러가기</Link>
          </div>
        </div>
      </form>
    </div>
  )
}