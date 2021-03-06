/* @flow */

const BROWSE_HISOTRY_APPEND = 'BROWSE_HISOTRY_APPEND'
const BROWSE_HISOTRY_REMOVE = 'BROWSE_HISOTRY_REMOVE'
const BROWSE_HISOTRY_REMOVE_ALL = 'BROWSE_HISOTRY_REMOVE_ALL'

/*
{
  url,
  title,
  time,
}
*/
const initialState = {
  list: []
}

export default function reducer (state: any = initialState, action: any) {
  switch (action.type) {
    case BROWSE_HISOTRY_APPEND:
      if (!action.url) {
        return;
      }
      // 如果当前网页已经浏览过, 将其移到列表最前面
      // 否则, 添加该网页条目
      let newState = {...state}
      let browseInfo = {
        url: action.url,
        title: action.title,
        favIcon: action.favIcon,
        time: Date.now()
      }

      let existItem = {found: false, index: -1}
      for (let i in newState.list) {
        if (action.url === newState.list[i].url) {
            existItem = {found: true, index: i}
            break;
        }
      }
      if (existItem.found) {
        newState.list.splice(existItem.index, 1)
      }
      return {
        ...state,
        list: [
          browseInfo,
          ...state.list
        ]
      }

    case BROWSE_HISOTRY_REMOVE:
      return {
        ...state,
        // value: state.list.remove(action.id)
      }
    case BROWSE_HISOTRY_REMOVE_ALL:
      return {
        ...state,
        list: []
      }
    default:
      return state
  }
}

export function append (webInfo: Object) {
  console.log('webInfo: ' + JSON.stringify(webInfo, null, 2));
  return {
    type: BROWSE_HISOTRY_APPEND,
    url: webInfo.url,
    title: webInfo.title,
    favIcon: webInfo.favIcon,
  }
}

export function remove (id: number) {
  return {
    type: BROWSE_HISOTRY_REMOVE,
    id
  }
}

export function removeAll () {
  return {
    type: BROWSE_HISOTRY_REMOVE_ALL,
  }
}
