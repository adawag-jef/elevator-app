import delay from "./delay";

export default class Elevator {
  constructor(building, config) {
    this.building = building;
    this.name = config.name;

    this.direction = null;
    this.floor = 0;

    this.queue = [];
    this.travelTime = 10 * 1000;
    this.doorDelay = 5 * 1000;
    this.canMove = true;

    this.interval = null;

    this.doorStatus = "boarding";
  }

  addQueue(floor) {
    this.queue.push(floor);
  }

  shiftQueue() {
    if (this.queue.length) {
      return this.queue.shift();
    }
    return 0;
  }

  setFloor(floor) {
    this.floor = floor;
  }

  getFloor() {
    return this.floor;
  }

  setCanMove(canMove) {
    this.canMove = canMove;
  }

  getCanMove() {
    return this.canMove;
  }

  getDirection() {
    return this.direction;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  getTravelTime() {
    return this.travelTime;
  }

  getDoorDelay() {
    return this.doorDelay;
  }

  getName() {
    return this.name;
  }

  getDoorStatus() {
    return this.doorStatus;
  }

  setDoorStatus(doorStatus) {
    this.doorStatus = doorStatus;
  }

  getNextQueue() {
    return this.queue[0];
  }

  async doorOpen() {
    const tmp = this.direction;
    this.direction = "idle";
    this.doorStatus = "opening";
    this.canMove = false;
    await delay(this.doorDelay);
    console.log(`Elevator : ${this.name} Door Opened.`);
    this.canMove = true;
    this.direction = tmp;
  }

  async doorClose() {
    const tmp = this.direction;
    this.direction = "idle";
    this.doorStatus = "closing";
    this.canMove = false;
    await delay(this.doorDelay);
    console.log(`Elevator : ${this.name} Door Closed.`);
    this.canMove = true;
    this.direction = tmp;
  }

  start(setBuildingElevators) {
    this.interval = setInterval(
      () => {
        this.move(this, setBuildingElevators);
      },
      800,
      this
    );
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  async move(elevator, setBuildingElevators) {
    try {
      setBuildingElevators((prev) => ({
        ...prev,
        [elevator.name]: {
          name: elevator.name,
          doorStatus: elevator.getDoorStatus(),
          floor: elevator.getFloor(),
          direction: elevator.getDirection(),
          destination: elevator.getNextQueue(),
        },
      }));
      if (elevator.queue.length !== 0 && elevator.canMove) {
        await elevator.doorClose();
        if (elevator.getCanMove()) {
          elevator.setCanMove(false);
          console.log(
            `Elevator : ${
              elevator.name
            } Moving From ${elevator.getFloor()} to ${elevator.getNextQueue()}`
          );

          elevator.setDirection(
            elevator.getNextQueue() < elevator.getFloor() ? "down" : "up"
          );

          setBuildingElevators((prev) => ({
            ...prev,
            [elevator.name]: {
              name: elevator.name,
              doorStatus: elevator.getDoorStatus(),
              floor: elevator.getFloor(),
              direction: elevator.getDirection(),
              destination: elevator.getNextQueue(),
            },
          }));

          const floorDifference = Math.abs(
            elevator.getFloor() - elevator.getNextQueue()
          );
          elevator.setDoorStatus("moving");
          if (floorDifference) {
            await delay(elevator.travelTime * floorDifference);
          }

          elevator.setFloor(elevator.shiftQueue());
          console.log(
            `Elevator : ${elevator.name} Arrived at ${elevator.getFloor()}`
          );

          elevator.setCanMove(true);
        }
        await elevator.doorOpen();
        setBuildingElevators((prev) => ({
          ...prev,
          [elevator.name]: {
            name: elevator.name,
            doorStatus: elevator.getDoorStatus(),
            floor: elevator.getFloor(),
            direction: elevator.getDirection(),
            destination: elevator.getNextQueue(),
          },
        }));
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static getAvailableElevator(elevators, floor, direction) {
    let timeTable = [];
    elevators.forEach((elevator) => {
      if (
        elevator.getDirection() === direction ||
        elevator.getDirection() === null
      ) {
        const floorDifference = Math.abs(elevator.getFloor() - floor);

        const duration =
          floorDifference *
          elevator.getTravelTime() *
          (2 * elevator.getDoorDelay());
        timeTable.push(duration);
      } else {
        timeTable.push(Number.POSITIVE_INFINITY);
      }
    });

    const index = timeTable.indexOf(Math.min(...timeTable));

    return elevators[index];
  }
}
