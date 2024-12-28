import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { lookup } from "zipcodes";

import { FormWrapper } from "./Form.style";
import { FormData } from "../types";
import { fetchWeatherData, setUnitType } from "../store/reducers/weatherSlice";
import { AppDispatch } from "../store/store";

const Form = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<FormData>({
    zipPostal: "90001",
    days: "1",
    // units: "imperial",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "units") {
      dispatch(setUnitType(value));
    }
    setFormData((prevState: FormData) => ({ ...prevState, [name]: value }));
  };

  const validateInputs = () => {
    let error = "";
    if (isNaN(+formData.zipPostal) || formData.zipPostal.length !== 5) {
      error = "Postal code must be 5 digits long.";
    } else if (!lookup(formData.zipPostal)) {
      error = "Couldn't find postal code.";
    } else if (
      +formData.days !== 1 &&
      +formData.days !== 3 &&
      +formData.days !== 7
    ) {
      error = "Invalid day number.";
    }
    // else if (formData.units !== "imperial" && formData.units !== "metric") {
    //   error = "Invalid unit type.";
    // }
    setError(error);
    return error;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validateInputs();
    if (!error) {
      dispatch(fetchWeatherData(formData));
    } else {
      alert(error);
    }
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <div>
          <label>US Zip:</label>
          <input
            type="text"
            name="zipPostal"
            value={formData.zipPostal}
            onChange={handleChange}
            pattern="[0-9]{5}"
            title="Codes must be five digits long."
          />
        </div>
        <div>
          <label>Days:</label>
          <select name="days" value={formData.days} onChange={handleChange}>
            <option value={1}>One</option>
            <option value={3}>Three</option>
            <option value={7}>Seven</option>
          </select>
        </div>
        {/* <div>
          <label>Units:</label>
          <select name="units" value={formData.units} onChange={handleChange}>
            <option value="metric">Metric</option>
            <option value="imperial">Imperial</option>
          </select>
        </div> */}

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {error}
    </FormWrapper>
  );
};
export default Form;
