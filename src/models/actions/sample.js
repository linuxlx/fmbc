/* ------------- plain Actions Sample ------------- */
/**
 * 关闭通用模态框
 *
 *
 */
/*
export function closeModal() {
  return {
    type: 'common/closeModal'
  }
}
*/


/* ------------- thunk Actions Sample ------------- */

/*
export const openDetaiIssueLayerThunk = (orderType, orderId) =>
  (dispatch, getState) => {
    const state = getState()
    const dataList = get(state, 'ticketData.dataList')
    if(!dataList){
      dispatch(Creators.loadTicketDetail(orderType, orderId));
    }
    dispatch(Creators.detailIssueLayerOpen())
  }
*/
