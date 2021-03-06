import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditScreen(props) {
    const userId = props.match.params.id;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSeller, setIsSeller] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if(successUpdate) {
            dispatch({type: USER_UPDATE_RESET});
            props.history.push('/userlist');
        }
        if(!user){
            dispatch(detailsUser(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsSeller(user.isSeller);
            setIsAdmin(user.isAdmin);
        }
    },[dispatch, props.history, successUpdate, user, userId]);

    const submitHandler = (e) => {
        e.preventDefault();
        //dispatch update user
        dispatch(updateUser({_id:userId, name, email, isSeller, isAdmin}));
    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>사용자 수정 {name}</h1>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                </div>
                {loading? (<LoadingBox/> ):
                error? (<MessageBox variant="danger"> {error} </MessageBox> ): (
                <>
                <div>
                    <label htmlFor="name">이름</label>
                    <input id="name" type="text" placeholder="이름을 입력해주세요" value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="email">이메일</label>
                    <input id="email" type="email" placeholder="이메일을 입력해주세요" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="isSeller">셀러</label>
                    <input id="isSeller" type="checkbox" checked={isSeller}  onChange={(e) => setIsSeller(e.target.checked)}></input>
                </div>
                <div>
                    <label htmlFor="isAdmin">관리자</label>
                    <input id="isAdmin" type="checkbox" checked={isAdmin}  onChange={(e) => setIsAdmin(e.target.checked)}></input>
                </div>
                <div>
                    <button type="submit" className="primary">
                        수정하기
                    </button>
                </div>
                </>
                )}
            </form>
        </div>
    );
}