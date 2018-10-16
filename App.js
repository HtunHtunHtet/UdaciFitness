import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Slider,
    Platform

} from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

export default class App extends React.Component {
    handlePress = () => {
        alert('Hello')
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View  style={{flex: 1}}>
                    <AddEntry/>
                    {/*<TouchableOpacity
                    style={styles.btn} onPress={this.handlePress} underlayColor='#d4271b'>
                    <Text style={styles.btnText}>Touchable Highlight</Text>
                </TouchableOpacity>*/}

                    {/*<Slider
                    minimumValue={-10}
                    maximumValue={10}
                    step = {1}
                    value = {this.state.value}
                    onValueChange={(value) => this.setState(()=>({value}))}
                />

                <Text>
                    Value = {this.state.value}
                </Text>*/}

                </View>
            </Provider>
        )
    }
}
