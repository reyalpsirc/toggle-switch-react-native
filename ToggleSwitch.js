/**
 * toggle-switch-react-native
 * Toggle Switch component for react native, it works on iOS and Android
 * https://github.com/aminebenkeroum/toggle-switch-react-native
 * Email:amine.benkeroum@gmail.com
 * Blog: https://medium.com/@aminebenkeroum/
 * @benkeroumamine
 */

import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  ViewPropTypes
} from 'react-native'

import PropTypes from 'prop-types'

class ToggleSwitch extends React.Component{

    constructor(props){
        super(props)
        this.props = props
        this.state = {
            isOn: this.props.isOn,
            label: this.props.label,
            animVal: new Animated.Value(this.props.isOn ? 1 : 0)
        }
    }

    static propTypes = {
        isOn: PropTypes.bool.isRequired,
        label: PropTypes.string,
        onColor: PropTypes.string,
        offColor: PropTypes.string,
        borderTrackOnColor: PropTypes.string,
        borderTrackOffColor: PropTypes.string,
        circleOnColor: PropTypes.string,
        circleOffColor: PropTypes.string,
        trackStyle: ViewPropTypes.style,
        size: PropTypes.string,
        labelStyle: PropTypes.object,
        width: PropTypes.number,
        height: PropTypes.number,
        circleWidth: PropTypes.number,
        circleHeight: PropTypes.number,
        onImageSource: Image.propTypes.source,
        offImageSource: Image.propTypes.source,
        onToggle: PropTypes.func.isRequired
    }

    static defaultProps = {
        isOn : false,
        onColor: '#634fc9',
        offColor: '#ecf0f1',
        borderTrackOnColor: 'transparent',
        borderTrackOffColor: 'transparent',
        circleOnColor: 'green',
        circleOffColor: 'green',
        width: 60,
        height: 24,
        circleWidth: 18,
        circleHeight: 18,
        onImageSource: null,
        offImageSource: null,
        labelStyle: {}
    }

    onToggle(){
        toValue = this.state.isOn ? 0 :1
        Animated.timing(
            this.state.animVal,
            {
              toValue: toValue,
              useNativeDriver: true,
              duration: 300,
            }
        ).start();

        let newState = !this.state.isOn

        this.setState({
            ...this.state,
            isOn : newState
        })

        this.props.onToggle(newState)
    }


    render(){
        return (
            <View style={styles.container}>
                { (this.props.label) ? <Text style={[styles.labelStyle, this.props.labelStyle]}>{this.props.label}</Text> : null}
                <TouchableOpacity onPress={this.onToggle.bind(this)}>
                  <View style={{width: this.props.width, height: this.props.height}}>
                    <View style={[styles.defaultParent, {position: 'absolute', top: 0, left: 0, width: this.props.width, height: this.props.height}]}>
                      <View style={[styles.defaultTrack, this.props.trackStyle, {
                        width: this.props.width, height: this.props.height,
                        borderColor: (this.state.isOn) ? this.props.borderTrackOnColor : this.props.borderTrackOffColor,
                        backgroundColor: (this.state.isOn) ? this.props.onColor : this.props.offColor
                      }]}/>
                    </View>
                    <View style={[styles.defaultParent, {position: 'absolute', top: 0, left: 0, width: this.props.width, height: this.props.height }]}>
                      <Animated.View style={{
                        width: this.props.circleWidth,
                        height: this.props.circleHeight,
                        borderRadius: this.props.circleHeight / 2,
                        position: 'absolute',
                        left: 0,
                        transform: [{translateX: this.state.animVal.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, this.props.width - this.props.circleWidth]
                        })}],
                        backgroundColor: (this.state.isOn) ? this.props.circleOnColor : this.props.circleOffColor
                      }}/>
                    </View>
                    {this.props.offImageSource
                      ? (
                        <View style={[styles.defaultParent, {position: 'absolute', top: 0, left: 0, width: this.props.width, height: this.props.height }]}>
                          <Animated.Image source={this.props.offImageSource} style={{
                            opacity: this.state.animVal.interpolate({
                              inputRange: [0, 1],
                              outputRange: [1, 0]
                            }),
                            width: this.props.circleWidth,
                            height: this.props.circleHeight,
                            position: 'absolute',
                            left: 0,
                            transform: [{translateX: this.state.animVal.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, this.props.width - this.props.circleWidth]
                            })}]
                          }} />
                        </View>
                      ) : null
                    }
                    {this.props.onImageSource
                      ? (
                        <View style={[styles.defaultParent, {position: 'absolute', top: 0, left: 0, width: this.props.width, height: this.props.height }]}>
                          <Animated.Image source={this.props.onImageSource} style={{
                            opacity: this.state.animVal,
                            width: this.props.circleWidth,
                            height: this.props.circleHeight,
                            position: 'absolute',
                            left: 0,
                            transform: [{translateX: this.state.animVal.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, this.props.width - this.props.circleWidth]
                            })}]
                          }} />
                        </View>
                      ) : null
                    }
                  </View>
                </TouchableOpacity>
            </View>
        )
    }

}

export default ToggleSwitch

const styles = {
    container: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    defaultParent: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 60
    },
    labelStyle:{
      marginHorizontal: 10,
    },
    defaultTrack: {
      top: 0,
      justifyContent: 'center',
      padding: 0,
      margin: 0,
      borderRadius: 20,
    }
};
