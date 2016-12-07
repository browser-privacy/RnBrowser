/* @flow */

import React, { Component, PropTypes} from 'react'

import {
  Image,
  View,
  Text,
  StyleSheet,
  Navigator,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Modal,
  TouchableHighlight,
  Platform
} from 'react-native'

import {connect} from 'react-redux'
import TouchableButton from './TouchableButton'
import BottomMenuPopup from '../bottompopup/BottomMenuPopup'
import TabIndicatorPopup from '../tabs/tabindicator/TabIndicatorPopup'
import {BOTTOM_BAR_HEIGHT} from '../utils/Consts'
import {Emitter} from '../events/Emitter'
import * as IMG from '../assets/imageAssets'


const style = StyleSheet.create({
  bottombar: {
    height: BOTTOM_BAR_HEIGHT,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  }
})


const bg='bottombar_bg_with_shadow'

class BottomBar extends Component {
  static propTypes = {
    navigator: PropTypes.object,
  };

  state = {
    showMenu: false,
    showTabIndicator: false
  }

  constructor() {
    super()
  }

  render() {
    const {navigator} = this.props
    return (
      <View>
        <View style={style.bottombar}>
          <TouchableButton
            enabled = {this.props.canBack}
            pressFn = {this.back}
            normalBg = {IMG.ICON_BACK_NORMAL}
            pressBg = {IMG.ICON_BACK_PRESSED} />

          <TouchableButton
            enabled = {this.props.canForward}
            pressFn = {this.forward}
            normalBg = {IMG.ICON_FORWARD_NORMAL}
            pressBg = {IMG.ICON_FORWARD_PRESSED} />

          <TouchableButton
            pressFn={this.toggleMenu}
            normalBg = {IMG.ICON_MENU_NORMAL}
            pressBg = {IMG.ICON_MENU_PRESSED} />

          <TouchableButton
            pressFn={this.toggleTabIndicator}
            normalBg = {IMG.ICON_NEW_ADD_NORMAL}
            pressBg = {IMG.ICON_NEW_ADD_PRESSED} />

          <TouchableButton
            pressFn = {() => alert('主页')}
            normalBg = {IMG.ICON_HOME_NORMAL}
            pressBg = {IMG.ICON_HOME_PRESSED} />
        </View>
        <BottomMenuPopup isVisible={this.state.showMenu}/>
        <TabIndicatorPopup isVisible={this.state.showTabIndicator}/>
        { this.resetStates() }
      </View>
    )
  }

  back = () => {
    Emitter.emit('web_back', this.props.tabId);
  }

  forward = () => {
    Emitter.emit('web_forward', this.props.tabId);
  }

  toggleMenu = () => {
    this.setState({
      showMenu: true,
      showTabIndicator: false
    })
  }

  toggleTabIndicator = () => {
    this.setState({
      showMenu: false,
      showTabIndicator: true
    })
  }

  // 只重置, 不刷新页面
  resetStates = () => {
    this.state.showMenu = false;
    this.state.showTabIndicator = false;
  }
}

function mapStateToProps(state) {
  return {
    tabId: state.webnavigator.tabId,
    canBack: state.webnavigator.canBack || false,
    canForward: state.webnavigator.canForward || false,
  }
}

module.exports = connect(mapStateToProps, null)(BottomBar)
