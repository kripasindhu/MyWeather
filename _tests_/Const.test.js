import React from "react";
import renderer from "react-test-renderer";
import {fomatNextDays} from "../utils/Const";
import moment from "moment";
  test('the data is Tod', () => {
 const value = fomatNextDays(0,moment);
    expect(value).toBe('Tod');
  });
  test('the data is Tom', () => {
    const value = fomatNextDays(1,moment);
       expect(value).toBe('Tom');
     });