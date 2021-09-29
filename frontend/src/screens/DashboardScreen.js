import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { summaryOrder } from '../actions/orderActions';
import Chart from 'react-google-charts';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function DashboardScreen() {
  const orderSummary = useSelector((state) => state.orderSummary);
  const {loading, summary, error} = orderSummary;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(summaryOrder());
  }, [dispatch]);

  return (
    <div>
      <div className="row">
        <h1>대시보드</h1>
      </div>
      {
        loading ? <LoadingBox/>
        : error ? <MessageBox variant="danger">{error}</MessageBox>
        :
        (
          <>
            <ul className="row summary">
              <li>
                <div className="summary-title color1">
                  <span>
                    <i className="fa fa-users">총 사용자 수</i>
                  </span>
                </div>
                <div className="summary-body">{summary.users[0].numUsers}</div>
              </li>
              <li>
                <div className="summary-title color2">
                  <span>
                    <i className="fa fa-shopping-cart">총 주문 수</i>
                  </span>
                </div>
                <div className="summary-body">{summary.orders[0] ? summary.orders[0].numOrders : 0}</div>
              </li>
              <li>
                <div className="summary-title color3">
                  <span>
                    <i className="fa fa-money">총 주문 금액</i>
                  </span>
                </div>
                <div className="summary-body">{summary.orders[0] ? summary.orders[0].totalSales : 0}원</div>
              </li>
            </ul>
            <div>
              <div>
                <h2>판매 현황</h2>
                {
                  summary.dailyOrders.length === 0 ? 
                  (<MessageBox>No Sale</MessageBox>)
                  : 
                  (
                    <Chart width="100%" height="400px" chartType="AreaChart" loader={<div>Loading Chart</div>} data={[['Date', 'Sales'], ...summary.dailyOrders.map((x) => [x._id, x.sales])]}></Chart>
                  )
                }
              </div>
            </div>
            <div>
              <h2>카테고리</h2>
              {
                summary.productCategories.length === 0 ?
                (<MessageBox>No Category</MessageBox>)
                : 
                (
                  <Chart width="100%" height="400px" chartType="PieChart" loader={<div>Loading Chart</div>} data={[['Category', 'Products'], ...summary.productCategories.map((x) => [x._id, x.count])]}></Chart>
                )
              }
            </div>
          </>
        )
      }
    </div>
  )
}
