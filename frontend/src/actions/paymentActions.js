import axios from 'axios'
import {
    PAYMENT_CREATE_REQUEST,
    PAYMENT_CREATE_SUCCESS,
    PAYMENT_CREATE_FAIL,
    PAYMENT_CREATE_RESET,
} from '../constants/paymentConstants'

export const createPayment = (payment) => async (dispatch, getState) => {
    try {
        dispatch({ type: PAYMENT_CREATE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/payments/add/`, payment, config)
        dispatch({ type: PAYMENT_CREATE_SUCCESS, payload: data })
        dispatch({ type: PAYMENT_CREATE_RESET })
    } catch (error) {
        dispatch({ type: PAYMENT_CREATE_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })
    }
}