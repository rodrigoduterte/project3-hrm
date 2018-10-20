//clean
import {
  HRMApplicationsPage,
  HRMAttendancePage,
  HRMBirthdaysPage,
  HRMEmployeesPage,
  HRMListsPage,
  HRMVacationsPage
} from "./index";
import React from "react";
let pages = {
  hrm: {
    "Employees": {},
    "Applications": {},
    "Lists": {},
    "Birthdays": {},
    "Vacations": {},
    "Attendance": {}
  }
};

pages["hrm"]["Applications"] = <HRMApplicationsPage/>;
pages["hrm"]["Attendance"] = <HRMAttendancePage/>;
pages["hrm"]["Birthdays"] = <HRMBirthdaysPage/>;
pages["hrm"]["Employees"] = <HRMEmployeesPage/>;
pages["hrm"]["Lists"] = <HRMListsPage/>;
pages["hrm"]["Vacations"] = <HRMVacationsPage/>;

export default pages;
