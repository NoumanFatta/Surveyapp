const initialState = {
    answers: null
}

const reducer = (state = initialState, action) => {
    if (action.type === 'addanswer') {
        return {
            ...state, answers: action.payload
        }
    } else {
        return state;
    }
}
export default reducer