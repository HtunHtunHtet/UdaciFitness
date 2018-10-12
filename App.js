import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Slider

} from 'react-native'
import AddEntry from './components/AddEntry'

export default class App extends React.Component {
    handlePress = () => {
        alert('Hello')
    }

    render() {
        return (
            <View style={styles.container}>
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
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop:200,
        padding:20
    },
    btn: {
        backgroundColor:'#E53224',
        padding:10,
        paddingLeft:50,
        paddingRight:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 5
    },
    btnText: {
        color: '#fff'
    }
})