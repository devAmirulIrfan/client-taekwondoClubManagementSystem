export interface ResposneClassSchedule {
    id: number;
    day: string;
    startTime: string;
    endTime: string;
    centerName: string;
    session: string;
  }

  export interface RequestClassSchedule {
    classId: number
    date: string
  }