import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProfileScreen() {
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector(state => state.userDetails);
  const {loading, error, user} = userDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo._id]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch update profile
  }
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>내 프로필</h1>
        </div>
        {
          loading ? <LoadingBox></LoadingBox> 
          : error ? <MessageBox variant="danger">{error}</MessageBox> 
          :
          <>
            <div>
              <label htmlFor="name">
                이름
              </label>
              <input id="name" type="text" placeholder="이름을 입력하세요" value={user.name}></input>
            </div>
            <div>
              <label htmlFor="email">
                이메일
              </label>
              <input id="email" type="email" placeholder="이메일을 입력하세요" value={user.email}></input>
            </div>
            <div>
              <label htmlFor="password">
                비밀번호
              </label>
              <input id="password" type="password" placeholder="비밀번호를 입력하세요"></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">
                비밀번호 확인
              </label>
              <input id="confirmPassword" type="password" placeholder="비밀번호를 다시 입력하세요"></input>
            </div>
            <div>
              <label/>
              <button className="primary" type="submit">수정하기</button>
            </div>
          </>
        }
      </form>
    </div>
  )
};
