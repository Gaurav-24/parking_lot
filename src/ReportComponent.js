import { get } from "lodash";
export const ReportComponent = ({ parkingData, carColor, registrationNumber }) => {
    const logRegistrationNumbersBasedOnColors = () => {
        const data = parkingData.reduce((res, curr) => {
            if (!curr) {
                return res;
            }
            if (!res[curr.carColor]) {
                res[curr.carColor] = [curr.registrationNumber];
                return res;
            }
            res[curr.carColor].push(curr.registrationNumber);
            return res;
        }, {});
        console.log(`Registration numbers of all cars of all colors: `, data);
    };

    const logTicketNumberBasedOnRegistrationNumber = () => {
        const carData = parkingData.filter((carData) => carData && carData.registrationNumber === registrationNumber);
        console.log(`Ticket Id for ${registrationNumber}: `, get(carData, `[0].parkingTicketId`, "No Ticket Id for this"));
    };

    const logTicketNumbersBasedOnColor = () => {
        const data = parkingData.reduce((res, curr) => {
            if (!curr) {
                return res;
            }
            if (curr.carColor === carColor) {
                res.push(curr.registrationNumber);
                return res;
            }
            return res;
        }, []);
        console.log(`Registration numbers of all cars of all colors: `, data);
    };

    return (
        <div className='parking-reports-container'>
            <button
                onClick={logRegistrationNumbersBasedOnColors}
            >
                Log Registration Numbers For All Colors
            </button>
            <button
                onClick={logTicketNumberBasedOnRegistrationNumber}
            >
                Log Ticket Numbers For Registration Number
            </button>
            <button
                onClick={logTicketNumbersBasedOnColor}
            >
                {`Log Ticket Numbers For ${carColor.toUpperCase()}`}
            </button>
        </div>
    );
};