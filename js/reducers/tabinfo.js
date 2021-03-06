// @flow

const CREATE_TAB = 'CREATE_TAB'
const REMOVE_TAB = 'REMOVE_TAB'
const RESET_TAB = 'RESET_TAB'

const initialState = {
  tabIds: [], // tab index集合
}

export default function reducer (state: any = initialState, action: any) {
  switch (action.type) {
    case CREATE_TAB:
      return handleCreateTab(state, action);
    case REMOVE_TAB:
      return handleRemoveTab(state, action);
    case RESET_TAB:
      return handleResetTab(state, action);
    default:
      return state
  }
}

function handleCreateTab(state: any = initialState, action: any) {
  console.log('==== createTab: actionId: ' + action.id);
  return {
    ...state,
    tabIds: [
      ...state.tabIds,
      action.id
    ]
  }
}

function handleRemoveTab(state: any, action: any) {
  var newState = {...state};
  let index = newState.tabIds.findIndex(tabId => tabId === action.id )
  console.log('handleRemoveTab: ' + index);
  newState.tabIds.splice(index, 1);
  return newState;
}

function handleResetTab(state: any = initialState, action: any) {
  return {
    ...state,
    tabIds: []
  }
}

export function createTab(id: number) {
  return {
    type: CREATE_TAB,
    id: id,
  }
}

export function removeTab(id: number) {
  return {
    type: REMOVE_TAB,
    id: id,
  }
}

export function resetTab() {
  return {
    type: RESET_TAB,
  }
}
