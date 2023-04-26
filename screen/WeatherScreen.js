import React, { useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { WeatherCondition } from '../utils/WeatherCondition';
import  ForecastScreen  from '../screen/ForecastScreen';
import {Button } from 'react-native-paper';
import {ShowSevenDaysWeatherForecast,SomethingWentWrong} from '../utils/Const'

const WeatherScreen = ({weatherdata, location }) => {
  const [buttonClicked, setbuttonClicked] = useState(false);
  if (weatherdata != null) {
    function showForeCast() { // Show forecast fo r next 7 dayas
      setbuttonClicked(true);
      };
    return (
      <View style={[
          styles.weatherContainer,
          { backgroundColor: WeatherCondition[weatherdata.weather[0].main].color }
        ]}
      >
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons
            size={72}
            name={WeatherCondition[weatherdata.weather[0].main].icon}
            color={'#fff'}
          />
          <Text style={styles.tempText}>{Number((weatherdata.main.temp).toFixed())}˚</Text>
        </View>
        <View style={styles.locationContainer}>
        <View style = {styles.locationIcon}>
        <MaterialCommunityIcons
            size={42}
            name={'map-marker'}
            color={'#fff'} />
        <Text style={styles.locationname}>{weatherdata.name}</Text>
        </View>
      <Text style={styles.weatherCondition}>{weatherdata.weather[0].description}</Text>
        </View>
          <View style={styles.bodyContainer}>
          <Button style={styles.button}  mode = 'contained-tonal'onPress={() => showForeCast()}> {ShowSevenDaysWeatherForecast}</Button>
          {buttonClicked ? (
           <ForecastScreen location={location}/> ) : (
            <View></View>
        )}
        
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>{SomethingWentWrong}</Text>
      </View>
    )
  };
};

WeatherScreen.propTypes = {
  weatherdata :PropTypes.object,
  location : PropTypes.object
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex:1,
  },
  headerContainer: {
    flex:2,
   flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tempText: {
    fontSize: 72,
    color: '#fff'
  },
  bodyContainer: {
    flex:4,
    alignItems: 'center',
    margin:8,
  },
  title: {
    fontSize: 60,
    color: '#fff'
  },
  locationname: {
    fontSize: 30,
    color: '#fff'
  },
  weatherCondition: {
    fontSize: 35,
    color: '#fff',
    marginLeft:8
  },
  locationContainer: {
    margin:8
  },
  locationIcon: {
    flexDirection :'row'
  },
  button: {
    fontSize: 50,
    color: '#fff',
    margin:10,
    padding:5
  
  },
});

export default WeatherScreen;