export const addAnswer = (answers) => {
    return (dispatch) => {
        dispatch({
            type: 'addanswer',
            payload: answers
        })
    }
}