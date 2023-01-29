import React, { useEffect, useState } from "react";
import ElevatorSVG from "./ElevatorSVG";
import Building from "./modules/Building";
import Elevator from "./modules/Elevator";
const settings = {
  building: {
    count: 4,
    floors: 10,
    elevators: [
      {
        name: "A",
      },
      {
        name: "B",
      },
      {
        name: "C",
      },
      {
        name: "D",
      },
    ],
  },
};

const CYCLE = 2 * 1000;

const App = () => {
  const [buildingElevators, setBuildingElevators] = useState(null);

  useEffect(() => {
    const building = new Building(settings.building);

    settings.building.elevators.forEach((elev) => {
      const elevInstance = new Elevator(building, elev);
      building.addElevator(elevInstance);
      elevInstance.start(setBuildingElevators);
    });

    const interval = setInterval(() => {
      const floor = Math.floor(Math.random() * 10);
      const direction = Math.random() < 0.5 ? "up" : "down";
      building.floorSelect(floor, direction);
    }, CYCLE);

    return () => {
      clearInterval(interval);
      building.getElevators().forEach((elev) => {
        elev.stop();
      });
    };
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Elementary Elevator Simulation</h1>
      {buildingElevators ? (
        <>
          <table>
            <tr>
              <th>Name</th>
              <th>FLoor</th>
              <th>Status</th>
              <th>Direction</th>
              <th>Destination</th>
            </tr>
            {Object.keys(buildingElevators).map((key) => (
              <tr key={key} className="text-center">
                <td>{buildingElevators[key].name}</td>
                <td>{buildingElevators[key].floor}</td>
                <td>{buildingElevators[key].doorStatus}</td>
                <td>{buildingElevators[key].direction}</td>
                <td>{buildingElevators[key].destination}</td>
              </tr>
            ))}
          </table>
          <div className="elevators-img">
            {Object.keys(buildingElevators).map((key) => (
              <ElevatorSVG
                status={buildingElevators[key].doorStatus}
                name={buildingElevators[key].name}
              />
            ))}
          </div>
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};

export default App;
