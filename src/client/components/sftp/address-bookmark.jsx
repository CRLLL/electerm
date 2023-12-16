import { Component } from '../common/react-subx'
import {
  StarOutlined,
  PlusSquareOutlined
} from '@ant-design/icons'
import {
  Popover
} from 'antd'
import AddrBookmarkItem from './address-bookmark-item'
import { typeMap } from '../../common/constants'
import uid from '../../common/uid'
import './address-bookmark.styl'

export default class AddrBookmark extends Component {
  onDel = (item) => {
    this.props.store.delAddressBookmark(item)
  }

  handleAddAddr = () => {
    const {
      store, host, realPath, type,bookmarkId
    } = this.props
    store.addAddressBookmark(
      {
        addr: realPath,
        host: type === typeMap.local ? '' : host,
        id: uid(),
        bookmarkId: bookmarkId
      }
    )
  }

  render () {
    //console.log(this.props)
    const { type, onClickHistory, store, host,bookmarkId } = this.props
    // const cls = classnames(
    //   'sftp-history',
    //   'animated',
    //   `sftp-history-${type}`
    // )
    const addrs = type === typeMap.local
      ? store.addressBookmarksLocal
      : store.addressBookmarks.filter(
        g => g.bookmarkId === bookmarkId
      )
    const inner = addrs.length
      ? addrs.map(o => {
        return (
          <AddrBookmarkItem
            handleClick={onClickHistory}
            type={type}
            key={o.id}
            handleDel={this.onDel}
            item={o}
          />
        )
      })
      : null
    const content = (
      <div>
        {inner}
      </div>
    )
    const title = (
      <div>
        <PlusSquareOutlined
          className='add-addr-bookmark'
          onClick={this.handleAddAddr}
        />
      </div>
    )
    return (
      <Popover
        content={content}
        title={title}
        placement='bottom'
        trigger='click'
      >
        <StarOutlined />
      </Popover>
    )
  }
}
