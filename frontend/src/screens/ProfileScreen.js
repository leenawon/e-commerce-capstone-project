import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_REQUEST } from '../constants/userConstants';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector(state => state.userDetails);
  const {loading, error, user} = userDetails;
  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const {success:successUpdate, error: errorUpdate, loading: loadingUpdate} = userUpdateProfile;
  const dispatch = useDispatch();

  useEffect(() => {
    if(!user) {
      dispatch({type: USER_UPDATE_PROFILE_REQUEST});
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      if(user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerDescription(user.seller.description);
      }
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      dispatch(updateUserProfile({userId: user._id, name, email, password, sellerName, sellerLogo, sellerDescription}));
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>내 프로필</h1>
        </div>
        {
          loading ? (<LoadingBox></LoadingBox>) 
          : error ? (<MessageBox variant="danger">{error}</MessageBox>)
          :
          <>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
          {successUpdate && (<MessageBox variant="success">프로필이 성공적으로 업데이트 되었습니다</MessageBox>)}
            <div>
              <label htmlFor="name">
                이름
              </label>
              <input id="name" type="text" placeholder="이름을 입력하세요" value={name}
              onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="email">
                이메일
              </label>
              <input id="email" type="email" placeholder="이메일을 입력하세요" value={email}
              onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="password">
                비밀번호
              </label>
              <input id="password" type="password" placeholder="비밀번호를 입력하세요"
              onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">
                비밀번호 확인
              </label>
              <input id="confirmPassword" type="password" placeholder="비밀번호를 다시 입력하세요"
              onChange={(e) => setConfirmPassword(e.target.value)}></input>
            </div>
            {
              user.isSeller && (
                <>
                  <h2>Seller</h2>
                  <div>
                    <label htmlFor="sellerName">판매자명</label>
                    <input id="sellerName" type="text" placeholder="판매자 명을 입력해주세요" value={sellerName} onChange = {(e) => setSellerName(e.target.value)}></input>
                  </div>
                  <div>
                    <label htmlFor="sellerLogo">판매자 로고</label>
                    <input id="sellerLogo" type="text" placeholder="판매자 로고를 입력해주세요" value={sellerLogo} onChange = {(e) => setSellerLogo(e.target.value)}></input>
                  </div>
                  <div>
                    <label htmlFor="sellerDescription">판매자 설명</label>
                    <input id="sellerDescription" type="text" placeholder="판매자 설명을 입력해주세요" value={sellerDescription} onChange = {(e) => setSellerDescription(e.target.value)}></input>
                  </div>
                </>
              )
            }
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
