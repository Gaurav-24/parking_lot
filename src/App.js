import { useState } from 'react';
import { ReportComponent } from './ReportComponent';
import Select from "react-select";
import { cloneDeep } from 'lodash';
import './App.css';
import './car.css';
class Car {
  constructor(parkingTicketId, registrationNumber, carColor) {
    this.parkingTicketId = parkingTicketId;
    this.registrationNumber = registrationNumber;
    this.carColor = carColor;
  }
}
const colorData = [{
  label: "White",
  value: "white"
}, {
  label: "Grey",
  value: "grey"
}, {
  label: "Silver",
  value: "silver"
}, {
  label: "Red",
  value: "red"
}, {
  label: "Black",
  value: "black"
}];


let id = 0;
function CarParkingSystem() {
  const parkingSlots = 20;
  const [parkingData, setParkingData] = useState(Array(parkingSlots));
  const [carColor, setCarColor] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");

  const colorChange = (e) => {
    setCarColor(e.value)
  };

  const addParkingData = () => {
    const currId = id++;
    const indexToBeAdded = parkingData.findIndex((el) => !el);
    const localData = [...parkingData];
    localData[indexToBeAdded] = new Car(currId, registrationNumber, carColor);
    setParkingData(localData);
    setRegistrationNumber("");
  };

  const mappedCarParkings = () => {
    const renderedParkingRes = [];
    for (let spotNo = 0; spotNo < parkingSlots; spotNo++) {
      const currCarData = parkingData[spotNo];
      renderedParkingRes.push(
        <div className="parking-spot">
          {currCarData ?
            <>
              <div>Ticket Id: {currCarData.parkingTicketId}</div>
              <div className='car-container'>
                <div className="car">
                  <div className={`car__body ${currCarData.carColor}`}>
                  </div>
                </div>
                <div className='registration-number'>{currCarData.registrationNumber}</div>
              </div>
              <button
                className='exit-parking'
                onClick={() => {
                  exitParking(spotNo)
                }}
              >Exit Parking</button>
            </>
            : spotNo + 1}
        </div >
      )
    }
    return renderedParkingRes;
  };

  const exitParking = (id) => {
    const localParkingData = cloneDeep(parkingData);
    delete localParkingData[id];
    setParkingData(localParkingData);
  };

  return (
    <div className="parking-container">
      <div className='parking-input-container'>
        <div className='registration-number-container'>
          <label htmlFor="registrationNumber">Registration Number:</label>
          <input
            id={"registrationNumber"}
            name={"registrationNumber"}
            className={"registration-number-input"}
            value={registrationNumber}
            onChange={(e) => { setRegistrationNumber(e.target.value) }}
            placeholder={"Please enter.."}
          />
        </div>
        <div className='registration-number-container'>
          <Select
            className={"car-color-selector"}
            // value={carColor}
            onChange={colorChange}
            options={colorData}
          />
        </div>
      </div>
      <div className='parking-input-container'>
        <button
          className={"park-car-btn"}
          onClick={addParkingData}
          disabled={!registrationNumber || !carColor}
        >
          Park the Car
        </button>
      </div>
      <ReportComponent
        parkingData={parkingData}
        carColor={carColor}
        registrationNumber={registrationNumber}
      />
      <div className='parking-input-container'>
        <h2>Enterance/Exit</h2>
      </div>
      <div className='parking-lot-container'>
        <div className='parking-lot'>
          {mappedCarParkings()}
        </div>
      </div>
    </div>
  );
}

export default CarParkingSystem;
