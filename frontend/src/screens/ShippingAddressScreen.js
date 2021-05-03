import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    if(!userInfo) {
        props.history.push('/signin');
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));
        props.history.push('/payment');
        //TODO: dispatch save shipping address action
    };
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>배송지 주소</h1>
                </div>
                <div>
                    <label htmlFor="fullName">이름</label>
                    <input type="text" id="fullName" placeholder="이름을 입력하세요" value={fullName} onChange={(e) => setFullName(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="city">도/시</label>
                    <input type="text" id="city" placeholder="도/시를 입력하세요" value={city} onChange={(e) => setCity(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="country">군/구</label>
                    <input type="text" id="country" placeholder="군/구를 입력하세요" value={country} onChange={(e) => setCountry(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="postalCode">우편번호</label>
                    <input type="text" id="postalCode" placeholder="Enter postalcode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="address">상세 주소</label>
                    <input type="text" id="address" placeholder="상세주소를 입력하세요" value={address} onChange={(e) => setAddress(e.target.value)} required></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">
                        결제수단 선택하기
                    </button>
                </div>
            </form>
        </div>
    );
}
