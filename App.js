import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { WeatherAPIKey,SomethingWentWrong,FetchingWeather,LOCATION_PERMISSION_DENIED,GRANTEDTEXT,WeatherAPiUrl } from './utils/Const';
import Weather from './screen/WeatherScreen';
import * as Location from 'expo-location';

export default class App extends React.Component {
  state = {
    isLoading: true,
    message: FetchingWeather,
    weatherdata :null,
    location : null
  };
  
    getLocation = async() => {
    let { status } = await Location.requestForegroundPermissionsAsync();
  if(status !=GRANTEDTEXT){
    this.setState({
      message: LOCATION_PERMISSION_DENIED
    });
    return;
  }
  const location = await Location.getCurrentPositionAsync();
  this.setState({ location : location})
 this.fetchWeather(location.coords.latitude, location.coords.longitude);
  }
 
  componentDidMount() {
    this.getLocation(); 
  }


  fetchWeather(lat, lon) {
    try{
    fetch(
      WeatherAPiUrl+`lat=${lat}&lon=${lon}&APPID=${WeatherAPIKey}&units=metric`
    )
    .then(async response => {
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await response.json() : null;
       // check for error response
      if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          this.setState({
            message: error,
          }); 
          return Promise.reject(error);
      }
      this.setState({
        isLoading: false,
        weatherdata :data
      })
        
  })
  .catch(error => {
    this.setState({
      message: error
    }); 
  });
  
    }catch(error){
      this.setState({
        message: SomethingWentWrong
      });    
    }
  }

  render() {
    const { isLoading,weatherdata,location,message } = this.state;
    return (
      <View  style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>{message}</Text>
          </View> ) : (
          <Weather weatherdata ={weatherdata} location = {location}/>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
