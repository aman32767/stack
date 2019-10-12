import * as actionTypes from '../actions/actionTypes';
import axios from '../../../src/axios-orders';

export const purchaseBurgerSuccess = (id,orderData) => {
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return  {
        type: actionTypes.PURCHASE_BURGER_FAILS,
        error:error
    }
}
export const purchaseBurgerStarting = () => {
    return {
        type:actionTypes.PURCHASE_BURGER_STARTING
    }
}
export const purchaseBurgerStart= (orderData) => {
    return dispatch =>{
        dispatch(purchaseBurgerStarting())
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name,orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            })
        }
    }

export const purchaseInit = () => {
    return {
        type:actionTypes.PURCHASE_INIT
    }
}


export const fetchOrderStart = () => {
    return {
        type:actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}

export const fetchOrderFails = (error) => {
    return {
         type:actionTypes.PURCHASE_BURGER_FAILS,
         error:error
    }
}

export const fetchOrders = () => {
    return dispatch => {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrder = [];
                for (let key in res.data) {
                    fetchedOrder.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrderSuccess(fetchedOrder))
                this.setState({ loading: false, orders: fetchedOrder })
            })
            .catch(err => {
                dispatch(fetchOrderFails(err))
            })
    }
}