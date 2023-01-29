import Elevator from "./Elevator";

export default class Building {
  constructor(config) {
    this.count = config.count;
    this.floors = config.floors;
    this.elevators = [];
  }

  addElevator(elevator) {
    this.elevators.push(elevator);
  }

  getElevators() {
    return this.elevators;
  }

  floorSelect(currentFloor, direction) {
    const elevator = Elevator.getAvailableElevator(
      this.elevators,
      currentFloor,
      direction
    );
    elevator.addQueue(currentFloor);
  }
}
