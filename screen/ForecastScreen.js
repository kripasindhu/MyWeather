import React, { useState, useEffect,useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { WeatherCondition } from '../utils/WeatherCondition';
import { WeatherAPIKey,fomatNextDays,SomethingWentWrong,FetchingSevendaysWeather,ForecastWeatherAPiUrl } from '../utils/Const';
import {Card } from 'react-native-paper';
import moment from "moment";

const ForecastScreen = ({location }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [listData, setListData] = useState(null);
    const [message, setmessage] = useState(FetchingSevendaysWeather);

    useEffect(() => {
     
      fetchForecast()
        }, []);

        function fetchForecast(){
          let lat = location.coords.latitude;
          let lon = location.coords.longitude;
          try{
             fetch(
              ForecastWeatherAPiUrl+`lat=${lat}&lon=${lon}&APPID=${WeatherAPIKey}&units=metric&cnt=7`
             )
               .then(res => res.json())
               .then(json => {
                setIsLoading(false)
                 setListData(json.list)
                 console.log(json.list)
               });
              }catch(error){
                setmessage(SomethingWentWrong)
              }
        }
      
    return (
      <Card testID="fetching" style={[
        styles.cardContainer,
        { backgroundColor: '#ADD8E6' }
      ]}>
       {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text   style={styles.loadingText}>{message}</Text>
          </View> ) : ( <FlatList 
        data={listData}
        renderItem={({ item,index }) =>
        <View style={styles.rowitem}>
            <Text style={styles.title}>{fomatNextDays(index,moment)}</Text>
          <MaterialCommunityIcons
          style={styles.iconsize}
            size={30}               
            name={WeatherCondition[item.weather[0].main].icon}
            color={'#fff'}
          />
          <Text  numberOfLines={1} ellipsizeMode={'tail'} style={styles.title}>{item.weather[0].description}</Text>
          <Text style={styles.title}>{Number(item.main.temp_max).toFixed() +' / '+Number(item.main.temp_min).toFixed() }</Text> 
          </View>
        }
        keyExtractor={(item) => item.dt}
      />)}
    
      </Card>
    
    );
};

ForecastScreen.propTypes = {
  weatherdata :PropTypes.object,
  location :PropTypes.object
};
const styles = StyleSheet.create({

  rowitem: {
    flexDirection: 'row',
    padding :10,
    justifyContent: 'space-between'
  },
  
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    color: '#000',
    width:100
  },
  iconsize:{
    width:50
  },
  locationContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 30
  }
});

export default ForecastScreen;