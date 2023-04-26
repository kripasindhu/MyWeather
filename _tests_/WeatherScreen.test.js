import React from "react";
import WeatherScreen from "../screen/WeatherScreen";
import {cleanup, render,screen} from '@testing-library/react-native';
import { ShowSevenDaysWeatherForecast } from '../utils/Const';

afterEach(cleanup);

describe('<WeatherScreen />', () => {
  test('Fetching Your 7 days Weather Button', () => {
    const { queryByTestId } = render(<WeatherScreen />);

    const nextButton = queryByTestId(ShowSevenDaysWeatherForecast)
    expect(nextButton).toBeTruthy

  })
  test('Fetching Your 7 days Weather Button', () => {
    const { queryByTestId } = render(<WeatherScreen />);

    const nextButton = queryByTestId(ShowSevenDaysWeatherForecast)
    expect(nextButton).toBeTruthy

  })
  test('show rain weather condition', () => {
    render(<WeatherScreen />);
    expect(screen.queryByText(`Rain`)).toBeTruthy
  })
  test('show current location', () => {
    render(<WeatherScreen />);
    expect(screen.queryByText(`Wroclaw`)).toBeDefined
  })
  });