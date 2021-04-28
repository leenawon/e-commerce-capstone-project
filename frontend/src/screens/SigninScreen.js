import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SigninScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    //sign in action
  }
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
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
          <label/>
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label/>
          <div>
            회원이 아니신가요? <Link to="/register">회원가입 하러가기</Link>
          </div>
        </div>
      </form>
    </div>
  )
}