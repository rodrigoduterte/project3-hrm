import React, {Component} from 'react';

export default {
  "menu": {
    "h": [
      {
        "title": "New",
        "state": {modal: {open: true, title: "new"}}
      },
      {
        "title": "Edit"
      },
      {
        "title": "Export to PDF"
      },
      {
        "title": "Export to CSV"
      },
      {
        "title": "Settings"
      },
      {
        "title": "Save"
      },
      {
        "title": "Delete"
      },
      {
        "title": "Employees info"
      },
      {
        "title": "Main"
      },
      {
        "title": "Personal"
      },
      {
        "title": "Job"
      },
      {
        "title": "Notes"
      }
    ],
    "v": [
      {
        "title": "CRM",
        "disabled": true,
        "subtitles": ["Leads","Opportunities","Persons","Companies","Orders","Invoices","Payments","Invoice Aging","Tasks"]
      },
      {
        "title": "HRM",
        "disabled": false,
        "subtitles": ["Employees","Applications","Lists","Birthdays","Vacations","Attendance"],
        "h.title": {
          "Employees": [0,3,2],
          "Applications": [0],
          "Lists": [0]
        },
        "search": {
          "Employees": true
        }
      },
      {
        "title": "Integrations",
        "disabled": true,
        "subtitles": []
      },
      {
        "title": "Purchases",
        "disabled": true,
        "subtitles": ["Orders","Invoices","Payments"]
      },
      {
        "title": "Accounting",
        "disabled": true,
        "subtitles": ["Manual Entry","Chart of Accounts","Journal","Journal Entries","Cash Flow","Balance Sheet","Profit and Loss","Trial Balance","Close Month"]
      },
      {
        "title": "Manufacturing",
        "disabled": true,
        "subtitles": ["Work Centers","Routing","Bill of Materials","Orders"]
      },
      {
        "title": "Inventory",
        "disabled": true,
        "subtitles": ["Products","Goods-out","Stock Correction","Stock Returns","Transfers"]
      },
      {
        "title": "Reports",
        "disabled": true,
        "subtitles":[]
      },
      {
        "title": "Settings",
        "disabled": true,
        "subtitles": []
      }
    ]
  },
  "pages": {
    "HRM": {
      "Employees":{},
      "Applications":{},
      "Job Positions":{},
      "Birthdays":{},
      "Vacations":{},
      "Attendance":{}
    }
  },
  "kanban": {
    "lanes": [
      {
        "id": "intialQualification",
        "title": "Initial Qualification",
        "label": "",
        "cards": []
      },
      {
        "id": "readyToTeach",
        "title": "Ready to teach",
        "label": "",
        "cards": []
      },
      {
        "id": "firstInterview",
        "title": "First Interview",
        "label": "",
        "cards": []
      },
      {
        "id": "Second Interview",
        "title": "Ready to teach",
        "label": "",
        "cards": []
      },
      {
        "id": "internship",
        "title": "Internship",
        "label": "",
        "cards": []
      },
      {
        "id": "contractsigned",
        "title": "Contract Signed",
        "label": "",
        "cards": []
      },
      {
        "id": "contractend",
        "title": "Contract End",
        "label": "",
        "cards": []
      },
      {
        "id": "refused",
        "title": "Refused",
        "label": "",
        "cards": []
      }
    ]
  },
  "select": [
    "Hshrcountry",
    "Hshrcurrencytype",
    "Hshrpayperiodcode",
    "Hshrprovince"
    ],
  "tables": ["Ohrmjobtitle","Ohrmjobvacancy","Ohrmuser","Ohrmjobcandidate"],
  "cards": ["HshrEmployee"],
  "forms": {
    "HsHrEmployee": {
      "": [],
      "tables" : [
        "HsHrEmpAttachment",
        "HsHrEmpBasicsalary",
        "HsHrEmpChildren",
        "HsHrEmpContractExtend",
        "HsHrEmpDependents",
        "HsHrEmpEmergencyContacts",
        "HsHrEmpHistoryOfEalierPos",
        "HsHrEmpLanguage",
        "HsHrEmpLocations",
        "HsHrEmpMemberDetail",
        "HsHrEmpPassport",
        "HsHrEmpPicture",
        "HsHrEmpReportto",
        "HsHrEmpSkill",
        "HsHrEmpUsTax",
        "HsHrEmpWorkExperience",
        "OhrmEmpEducation",
        "OhrmEmpLicense",
        "OhrmEmpTermination",
        "OhrmEmployeeWorkShift",
        "OhrmJobCandidate",
        "OhrmJobCandidateHistory",
        "OhrmJobInterviewInterviewer",
        "OhrmJobVacancy",
        "OhrmLeaveAdjustment",
        "OhrmLeaveComment",
        "OhrmLeaveEntitlement",
        "OhrmLeaveRequest",
        "OhrmLeaveRequestComment",
        "OhrmPerformanceReview",
        "OhrmPerformanceTrack",
        "OhrmPerformanceTrackerLog",
        "OhrmPerformanceTrackerReviewer",
        "OhrmProjectAdmin",
        "OhrmUser"
    ]},
      "OhrmUser" : {
        "tables" : [
        "HsHrMailnotifications"
        ,"OhrmLeaveAdjustment"
        ,"OhrmLeaveComment"
        ,"OhrmLeaveEntitlement"
        ,"OhrmLeaveRequestComment"
        ,"OhrmOpenidUserIdentity"
        ,"OhrmPerformanceTrackerLog"
        ,"OhrmTimesheetActionLog"
      ]},
      "OhrmReport" : {
        "tables" : [
        "OhrmSelectedCompositeDisplayField",
        "OhrmSelectedDisplayField",
        "OhrmSelectedDisplayFieldGroup",
        "OhrmSelectedFilterField",
        "OhrmSelectedGroupField"
      ]},
      "OhrmReportGroup" : {
        "tables" : [
          "OhrmCompositeDisplayField",
          "OhrmDisplayField",
          "OhrmDisplayFieldGroup",
          "OhrmFilterField",
          "OhrmReport"
      ]},
      "OhrmDisplayFieldGroup" : {
        "fields" : [
        "OhrmCompositeDisplayField",
        "OhrmDisplayField",
        "OhrmSelectedDisplayFieldGroup",
        "OhrmSummaryDisplayField"
      ]}

  }
}
