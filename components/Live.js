import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity,StyleSheet } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import { Location, Permissions } from 'expo'
import { calculateDirection } from "../utils/helpers";

export default class Live extends Component {
    state ={
        cords: null,
        status: null,
        direction: '',
        altitude: 1, speed: 1
    }

    componentDidMount(){
        Permissions.getAsync(Permissions.LOCATION)
            .then(({status}) => {
                if (status === 'granted') {
                    return this.setLocation()
                }

                this.setState(() => ({status}))
            })
            .catch((error) => {
                console.warn('Error getting Location Permission: ', error)

                this.setState(() => ({
                    status:'undetermined'
                }) )
            })
    }

    askPermission = () => {
        Permissions.askAsync(Permissions.LOCATION)
            .then(({status}) => {
                if (status === 'granted') {
                    return this.setLocation()
                }

                this.setState(() => ({ status }))
            })
            .catch((error) => console.warn('error asking Location Permission : ', error))
    }

    setLocation = () =>{
        Location.watchPositionAsync({
            enableHighAccuracy: true,
            timerInterval: 1,
            distanceInterval: 1
        },  ({ coords }) =>{
            const newDirection  = calculateDirection(coords.heading)
            const { direction } = this.state

            this.setState(() => ({
                coords,
                status: 'granted',
                direction: newDirection
            }))
        })
    }

    render() {
        const {coords, status, direction} = this.state

        if (status === null){
            return <ActivityIndicator style={{marginTop:30}} />
        }

        if(status === 'denied') {
            return(
                <View style={styles.center}>
                    <Foundation name='alert' size={50} />

                    <Text>
                        You denied your location. You can fix this by visiting your settings and enabling location services for this app.
                    </Text>
                </View>
            )
        }

        if(status === 'undetermined') {
            return(
                <View style={styles.center}>
                    <Foundation name='alert' size={50} />
                    <Text>
                        You need to enable location service for this app.
                    </Text>

                    <TouchableOpacity onPress={this.askPermission} style={styles.button}>
                        <Text style={{color:white, fontSize: 20}}>
                            Enable
                        </Text>
                    </TouchableOpacity>

                </View>
            )
        }

        return(
            <View style={styles.container}>
                {/*<Text>{JSON.stringify(this.state)}</Text>*/}

                <View style={{color: purple, fontSize: 120, textAlign:'center'}}>
                    <Text style={{fontSize: 35,  textAlign: 'center'}}>You're heading</Text>
                    <Text style={{color: purple ,  fontSize: 120 ,textAlign: 'center'}}>{direction}</Text>
                </View>

                {/*Metrics*/}
                <View style={styles.metricContainer}>
                    <View style={styles.metric}>
                        <Text style={{color:white,fontSize: 35 , textAlign: 'center'}}>
                            Altitude
                        </Text>
                        <Text style={{color:white, fontSize: 25,  textAlign: 'center'}}>
                            {coords && Math.round(coords.altitude * 3.2808)} Feet
                        </Text>
                    </View>

                    <View style={styles.metric}>
                        <Text style={ {color:white,fontSize:35, textAlign: 'center'} }>
                            Speed
                        </Text>
                        <Text style={{color:white, fontSize: 25 , textAlign:'center'}}>
                            {coords && (coords.speed * 2.2369).toFixed(1)} MPH
                        </Text>
                    </View>
                </View>

            </View>
        )


    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
    button: {
        padding: 10,
        backgroundColor: purple,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    },
    metricContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: purple,
    },
    metric: {
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    subHeader: {
        marginTop: 5,
    }
})