export const WeatherAPiUrl = "http://api.openweathermap.org/data/2.5/weather?"
export const ForecastWeatherAPiUrl = "http://api.openweathermap.org/data/2.5/forecast?"
export const GRANTEDTEXT = "granted"
export const LOCATION_PERMISSION_DENIED = "Permission to access location was denied"
export const WAITING_TEXT = "Waiting"
export const WeatherAPIKey = "9cc5ffe72b9723d59453dc9f58b4552f"
export const FetchingWeather = "Fetching Your Weather"
export const FetchingSevendaysWeather = 'Fetching Your 7 days Weather'
export const SomethingWentWrong = "Oh no, something went wrong"
export const ShowSevenDaysWeatherForecast ='Show 7 Days Weather forecast'
export  function fomatNextDays(index,moment) {
        let nextDaysCalendar = moment().add(index, 'days').calendar(); 
        let nextfiveDaysDate = nextDaysCalendar.toString().substring(0,3);
          return nextfiveDaysDate; 
        }

            
