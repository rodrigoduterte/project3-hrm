// use styles from here in the future https://hackernoon.com/accessing-nested-objects-in-javascript-f02f1bd6387f

import { store } from "react-easy-state";
import eachof from 'async/eachOf';
import data from "../utils/api/data/data";
import schema from "../utils/api/wids/schema";
import str from "../utils/ops/str/str";
import _ from "lodash";

export const appstore = store({
  common: {
    current: {
      userid: "",
      token: "",
      module: "",
      submodule: "",
      model: "",
      memberIDType: "",
      memberID: null,
      command: "",
      letter: "All",
      record: {}
    },
    widgets: {
      menu: {
        h: {
          "New": {},
          "Export to PDF": {},
          "Export to CSV": {},
          "Settings": {}
        },
        v: []
      }
    },
    store: {
      member: {
        all: [],
        filtered: [],
        one: {}
      },
      schema: {
        form: [],
        formui: [],
        table: [],
        ids: {}
      }
    },
    do: {
      assignCommonStorePatternToModels() {
        //populates each model with common store patterns // right now only available for hrm module
        //in the future will modify this function to accomodate other modules
        const appdo = appstore.common.do;
        const mod = appdo.getCurrentModule();
        const models = appdo.getModelKeys(mod);

        eachof(models,(key,idx) => {
          appstore[mod]["models"][key]["store"] = JSON.parse(JSON.stringify(appstore["common"]["store"]));
        });
      },
      assignVMenu () {
        //populates the vmenu widget with titles and subtitles
        const modules = appstore.common.do.getModules();
        modules.forEach(mod => {
          let modcase = (appstore[mod]['abbrev']) ? mod.toUpperCase() : str.toTitleCase(mod);
          let submodules = appstore.common.do.getSubmodulesOfModule(mod);
          if (submodules.length) {
            submodules.forEach(submodule => {
              let submoduleTitle = str.toTitleCase(submodule);
              appstore['common']['widgets']['menu']['v'].push( {'module': modcase, 'submodule': submoduleTitle} )
            })
          } else {
            appstore['common']['widgets']['menu']['v'].push( {'module': modcase} )
          }
        })
      },
      // activateSubModule() {
      //   const appdo = appstore.common.do;
      //   const mod = appdo.getCurrentModule();
      //   const submodules = appdo.getSubmodulesOfModule(mod);

      //   toDeactivate = submodules.find(submod => {return appstore[mod]['submodules'][submod]['active'] == true});
      //   toActivate = appdo.getCurrentSubModule();

      //   appstore[mod]['submodules'][toDeactivate]['active'] = false;
      //   appstore[mod]['submodules'][toActivate]['active'] = true;
      // },
      enableRun(run,command) {
        //run = true or false
        //command = name of command ex: New, Edit
        const appdo = appstore.common.do;
        const mod = appdo.getCurrentModule();
        const submodule = appdo.getCurrentSubModule();

        appstore[mod]['submodules'][submodule]['run'][command] = run;
      },
      hasModelData(model) {
        //returns true if model has data on its store keys
        const mod = appstore.common.do.getCurrentModule();
        const data = appstore[mod]['models'][model]['store']['member'];
        return Object.keys(data).map(dat => data[dat]).flat().length > 1;
      },
      isDisabled(title) {
        //returns true if module restricts access to its submodules
        const mod = title.toLowerCase();
        return appstore[mod]['disabled'];
      },
      isRunEnabledFor(command) {
        //checks whether command is enabled
        const appdo = appstore.common.do;
        const mod = appdo.getCurrentModule();
        const submodule = appdo.getCurrentSubModule();

        return appstore[mod]['submodules'][submodule]['run'][command];
      },
      records: {
        getAscRecords() {
          //returns ordered records of a model by all members or members with a Lastname starting with a chosen letter
          const appdo = appstore.common.do;
          const mod = appdo.getCurrentModule();
          const model = appdo.getCurrentModel();
          console.log(`model ${model}`);
          const currentLetter = appdo.getCurrentLetter();
          console.log(`currentLetter ${currentLetter}`);
          const records = appstore[mod]['models'][model]['store']['member']['all'];
          const orderBy = appstore[mod]['models'][model]['orderBy'];

          const filtered = _.filter(records, member => {
            if(currentLetter === "All"){
              return true;
            } else {
              return member.emplastname.charAt(0) === currentLetter;
            }});
          const ordered = _.orderBy(filtered, orderBy[0], orderBy[1]);
          return ordered;
        },
        getAllRecords(model) {
          //gets all fields and records of a given model FROM THE SERVER
          const mod = appstore.common.do.getCurrentModule();
          const singular = model;
          const plural = str.plurality(model);

          console.log(`plural form ${plural}`);

          data.getp(plural).then(res => {
            appstore[mod]["models"][singular]["store"]["member"]["all"] = res.data;

          }).catch(err => {console.log(`Problem with the spelling of the model or with the server ${err}`)});
        },
        getSomeFilteredFields(model) {
          //deprecated possibly
          //gets records of a given model based on a given filter FROM THE SERVER
          const appdo = appstore.common.do;
          const mod = appdo.getCurrentModule();
          const singular = model;
          const plural = str.plurality(model);
          const filter = appdo.getFilterOfModel(model);

          data.getpFilter(plural, filter).then(res=> {
            appstore[mod]["models"][singular]["store"]["member"]["filtered"] = res.data;
          }).catch(err => {
            console.log('Problem with the spelling of the model or with the server')})
        }
      },
      getMaxIDForModel() {
        const appdo = appstore.common.do;
        const mod = appdo.getCurrentModule();
        const model = appdo.getCurrentModel();
        return Math.max(...appstore[mod]["models"][model]["store"]["member"]["all"].map(record => record.empnumber));
      },
      getCurrentCommand() {
        //gets the current command after it was set
        return appstore["common"]["current"]["command"];
      },
      getCurrentModule() {
        //gets the current module after it was set
        return appstore["common"]["current"]["module"];
      },
      getCurrentModuleTitle() {
        //gets the module title of the current module
        return str.toTitleCase(appstore.common.do.getCurrentModule());
      },
      getCurrentSubModule() {
        //gets the current submodule after it was set
        return appstore["common"]["current"]["submodule"];
      },
      getCurrentSubModuleTitle() {
        //gets the submodule title of the current submodule
        return str.toTitleCase(appstore.common.do.getCurrentSubModule());
      },
      getCurrentModel() {
        //gets the current model after it was set
        return appstore["common"]["current"]["model"];
      },
      getCurrentMemberID() {
        //gets the current member id after it was set
        return appstore["common"]["current"]["memberID"];
      },
      getCurrentMemberIDType() {
        //gets the current member id type after it was set
        return appstore["common"]["current"]["memberIDType"];
      },
      getCurrentLetter() {
        //gets the current letter after it was set
        return appstore["common"]["current"]["letter"];
      },
      getAllHMenuTitles() {
        //informational
        //gets All Horizontal Menu Titles from the store
        return Object.keys(appstore['common']['widgets']['menu']['h']);
      },
      getHMenuTitlesOfSubModule() {
        //gets the first horizontal menu of a submodule
        const appdo = appstore.common.do;
        const mod = appdo.getCurrentModule();
        const submodule = appdo.getCurrentSubModule();
        const menu = submodule ? appstore[mod]['submodules'][submodule]['menu'] : [];
        return menu || [];
      },
      getVMenuTitlesAndSubtitles() {
        return appstore['common']['widgets']['menu']['v'];
      },
      getAllMembersOfCurrentModel() {
        //get all records of a model FROM THE STORE
        const appdo = appstore.common.do;
        const mod = appdo.getCurrentModule();
        const model = appdo.getCurrentModel();
        return appstore[mod]['models'][model]['store']['member']['all'];
      },
      getOneMemberOfCurrentModel() {
        //get one record with a model id FROM THE STORE

        const appdo = appstore.common.do;
        const mod = appdo.getCurrentModule();
        const model = appdo.getCurrentModel();
        const members = appdo.getAllMembersOfCurrentModel();
        console.log(`getAllMembersOfCurrentModel ${members}`);

        const idtype = appdo.getCurrentMemberIDType();
        const id = appdo.getCurrentMemberID();
        console.log(`getCurrentMemberIDType ${idtype}`);
        console.log(`getCurrentMemberID ${id}`);
        // console.log(`${JSON.stringify(appstore[mod]['models'][model]['store']['member']['all'])}`);
        const number = appdo.getMaxIDForModel() + 1;
        let memberfound = members.find(member => {
          return parseInt(member[idtype]) === parseInt(id);
        }) || {[idtype]: number};
        return memberfound
      },
      setObjectToForm(formData) {
        const appdo = appstore.common.do;
        const mod = appdo.getCurrentModule();
        const model = appdo.getCurrentModel();
        const notnullfields = appdo.getNonNullFormPairFields(formData);
        console.log(`${notnullfields}`)
        return notnullfields.forEach(column => {return
          formData[column[0]] = appdo.getSchema('formui')[column[0]]['typeahead']['options'].find(option => option.id === column[1]);
        })
      },
      getNonNullFormPairFields(formData){
        console.log(formData);
        const options = appstore.common.do.getOptionFieldsOfSchemaType('formui');
        console.log(`${options}`);
        const keys = _.filter(options,(opt) => formData[opt] !== null);
        console.log(`${keys}`)
        return _.map(keys,(key) => [key , formData[key]]);
      },
      getOptionFieldsOfSchemaType(type) {
        const appdo = appstore.common.do;

        const schema = appdo.schema.getSchema(type);
        const fields = appdo.schema.getFieldsOfSchema(type);
        console.log(schema,fields);
        return _.filter(fields,field => schema[field].hasOwnProperty('typeahead')  ? schema[field]['typeahead'] : false);
      },
      getSubmodulesOfModule(mod) {
        // derived
        //get an array of submodules of the current module
        return appstore[mod]['submodules'] ? Object.keys(appstore[mod]['submodules']) : []
      },
      getModelsOfCurrentModuleWithData() {
        // derived
        //get an array of models of the current module that have data
        const appdo = appstore.common.do;
        return appdo.getModelsOfCurrentModule().filter(model => appdo.hasModelData(model));
      },
      getModuleTitles() {
        // derived
        // gets all module titles in the order given by getModules()

        return appstore.common.do.getModules().map(mod => {
          let modcase = (appstore[mod]['abbrev']) ? mod.toUpperCase() : str.toTitleCase(mod);
          return modcase;
        });
      },
      getModules() {
        // derived
        // gets all modules. common is not a module but a property of the store to store shared data among modules
        return Object.keys(appstore).filter(key => key !== 'common');
      },
      getModulesWithModels() {
        // derived
        // gets an array of modules that have models // right now gets only hrm because others have no models
        return appstore.common.do.getModules().filter(key => appstore[key]['models'] || false);
      },
      getModelKeys(mod) {
        // derived
        // gets an array of models of a given module
        return Object.keys(appstore[mod]["models"]);
      },
      getModelsThatNeedLoading() {
        // derived
        // gets an array of models need to load data from the server
        // ignores models that have no filter
        const appdo = appstore.common.do;
        const mod = appdo.getCurrentModule();
        const models = appdo.getModelsOfCurrentModule();
        // console.log(models);
        const modz = models.filter(model=> model['filter']);
        console.log(`modz ${modz}`);
        return models.filter(model=> appstore[mod]['models'][model]['filter']);
      },
      getModelsOfCurrentModule() {
        // derived
        // gets an array of models belonging to the current model
        const appdo = appstore.common.do;
        const mod = appdo.getCurrentModule();

        return appdo.getModelKeys(mod);
      },
      getModelsByWidget() {
        // derived
        // get an object containing arrays of model names grouped according to the widget
        // example object returned
        // {
        //   form: ['model3','model1','model4']
        //   table: ['model6','model7','model8']
        // }
        const appdo = appstore.common.do;
        const mod = appdo.getCurrentModule();
        const models = appdo.getModelsThatNeedLoading();
        let modelsByWidget = {
          form: [],
          table: []
        }

        eachof(models, (model,idx) => {
          let widget = appstore[mod]['models'][model]['widget'];
          if(widget['form']) {
            modelsByWidget['form'].push(model);
          } else if (widget['table']) {
            modelsByWidget['table'].push(model);
          }
        });
        console.log(`modelsByWidget ${modelsByWidget}`)
        return modelsByWidget;
      },
      getSearchEnabled() {
        //getter
        // returns whether search is used on a given submodule
        const mod = appstore.common.do.getCurrentModule();
        const submodule = appstore.common.do.getCurrentSubModule();
        const search = submodule ? appstore[mod]['submodules'][submodule]['search'] : false
        return search;
      },
      getFilterOfModel(model) {
        //getter
        // in the future will provide for more filter options
        // returns the sole filter of the model
        const appdo = appstore.common.do;
        const mod = appdo.getCurrentModule();

        return appstore[mod]['models'][model]['filter'];
      },
      getVMenu(){
        //getter
        // returns the vertical menu to be used for the main page
        return appstore['common']['widgets']['menu']['v'];
      },
      getCurrentToken() {
        return appstore["common"]["current"]["token"];
      },
      schema: {
        // is an object tasked to retrieve schema data FROM THE SERVER used by the components
        // is also tasked to retrieve schema data FROM THE STORE after it retrieved data FROM THE SERVER
        getSchemaOfChosenModel(type, model) {
          return appstore.common.do.schema.getSchema(type, model);
        },
        getSchema(type,chosen) {
          //getter
          //get schema of the current model under a current module
          //parameter type = whether it is a form, formui or table schema
          //parameter chosen = if blank then there is no call from getSchemaOfChosenModel
          const appdo = appstore.common.do;
          const mod = appdo.getCurrentModule();
          const model = chosen ? chosen : appdo.getCurrentModel();
          return appstore[mod]['models'][model]['store']['schema'][type];
        },
        getFieldsOfSchema(type,current) {
          //derived
          //gets array of fields of schema
          //use getFieldsOfSchema('form')
          //use getFieldsOfSchema('form','Hshremployee')
          const appdo = appstore.common.do.schema;
          const schema = (current) ? appdo.getSchemaOfChosenModel(type, current) : appdo.getSchemaOfChosenModel(type);
          return Object.keys(schema);
        },
        loadform(model) {
          //ajax
          //loads form schema from server given a model
          console.log(`loadform ${model}`);
          const mod = appstore.common.do.getCurrentModule();
          const modelTitleCase = str.toTitleCase(model);
          console.log(modelTitleCase);
          console.log(JSON.stringify(appstore[mod]['models']));
          schema.getform(modelTitleCase).then(res => {
            appstore[mod]['models'][model]['store']['schema']['form'] = res.data.schema;
            console.log(JSON.stringify(appstore[mod]['models'][model]['store']['schema']['form']));
          });
        },
        loadformui(model) {
          //ajax
          //loads formui schema from server given a model
          // data for options are included in the schema loaded by this function
          console.log(`loadformui ${model}`);
          const mod = appstore.common.do.getCurrentModule();
          const modelTitleCase = str.toTitleCase(model);
          schema.getformui(modelTitleCase).then(res => {
            appstore[mod]['models'][model]['store']['schema']['formui'] = res.data.schema;
          });
        },
        loadtable(model) {
          //ajax
          //loads table schema from server given a model
          const mod = appstore.common.do.getCurrentModule();
          const modelTitleCase = str.toTitleCase(model);
          schema.gettable(modelTitleCase).then(res => {
            appstore[mod]['models'][model]['store']['schema']['table'] = res.data.schema;
          });
        }
      },
      setCurrentCommand(command) {
        //setter
        //sets current command with the given command
        appstore["common"]["current"]["command"] = command;
      },
      setCurrentModule(mod) {
        //setter
        //sets current module with the given module
        appstore["common"]["current"]["module"] = mod;
      },
      setCurrentSubModule(submod) {
        //setter
        //sets current submodule with the given submodule
        appstore["common"]["current"]["submodule"] = submod;
      },
      setCurrentModel(model) {
        //setter
        //sets current model with the given model
        appstore["common"]["current"]["model"] = model;
      },
      setCurrentMemberID(id) {
        //setter
        //sets current member id that belongs to a model with the given id
        appstore["common"]["current"]["memberID"] = parseInt(id);
      },
      setCurrentMemberIDType(type) {
        //setter
        //sets current member id type that belongs to a model with the given member id type
        appstore["common"]["current"]["memberIDType"] = type;
      },
      setCurrentLetter(letter) {
        //setter
        //sets current letter with the given letter
        appstore["common"]["current"]["letter"] = letter;
      },
      setCurrentToken(token) {
        appstore["common"]["current"]["token"] = token;
      },
      setCurrentUserId(id) {
        appstore["common"]["current"]["userid"] = id;
      },
      resetCurrent() {
        const appdo = appstore.common.do;
        appdo.setCurrentModule("");
        appdo.setCurrentSubModule("");
        appdo.setCurrentModel("");
        appdo.setCurrentMemberID(null);
        appdo.setCurrentMemberIDType("");
        appdo.setCurrentCommand("");
        appdo.setCurrentLetter("All");
      }
    }
  },
  hrm: {
    abbrev: true,
    disabled: false,
    do: {},
    submodules: {
      "employees":{
        "run": {
          "New": false,
          "Edit": false,
          "Export PDF": false
        },
        "active": false,
        "menu": [],
        "search": false,
        "page": ""
      }
      // "applications":{
      //   "run": {
      //     "New": false,
      //     "Edit": false
      //   },
      //   "active": false,
      //   "menu": ["New"],
      //   "search": false,
      //   "page": ""
      // },
      // "lists":{
      //   "run": {
      //     "New": false,
      //     "Edit": false
      //   },
      //   "active": false,
      //   "menu": ["New"],
      //   "search": true,
      //   "page": ""
      // },
      // "birthdays":{
      //   "run": {
      //     "New": false
      //   },
      //   "active": false,
      //   "menu": ["New"],
      //   "search": true,
      //   "page": ""
      // },
      // "vacations":{
      //   "run": {
      //     "New": false
      //   },
      //   "active": false,
      //   "menu": ["New"],
      //   "search": true,
      //   "page": ""
      // },
      // "attendance":{
      //   "run": {
      //     "New": false
      //   },
      //   "active": false,
      //   "menu": ["New"],
      //   "search": true,
      //   "page": ""
      // }
    },
    models: {
      AbstractDisplayField: {},
      HsHrConfig: {},
      HsHrCountry: {
        // "filter": '?filter=%7B"where"%3A%20%7B"numcode"%3A%20%7B"neq"%3A%20null%7D%7D%2C%20"fields"%3A%20%7B"iso3"%3A%20true%2C%20"name"%3A%20true%7D%7D',
        "keys":{"label": 'name',"value": 'iso3'},
        widget: {
          table: false,
          form: false
        }
      },
      HsHrCurrencyType: {
        // "filter": '?filter=%7B%22fields%22%3A%20%7B%22currencyid%22%3A%20true%2C%20%22currencyname%22%3A%20true%7D%7D',
        "keys":{"label": 'currencyname',"value": 'currencyid'},
        widget: {
          table: false,
          form: false
        }
      },
      HsHrCustomExport: {},
      HsHrCustomFields: {},
      HsHrCustomImport: {},
      HsHrDistrict: {},
      HsHrEmpAttachment: {},
      HsHrEmpBasicsalary: {},
      HsHrEmpChildren: {},
      HsHrEmpContractExtend: {},
      HsHrEmpDependents: {},
      HsHrEmpDirectdebit: {},
      HsHrEmpEmergencyContacts: {},
      HsHrEmpHistoryOfEalierPos: {},
      HsHrEmpLanguage: {},
      HsHrEmpLocations: {},
      HsHrEmployee: {
        "filter": "?filter=%7B%22fields%22%3A%20%7B%22empfirstname%22%3A%20true%2C%20%22empmiddlename%22%3A%20true%2C%20%22emplastname%22%3A%20true%7D%7D",
        "orderBy": [["emplastname", "empfirstname"],["asc", "asc"]],
        "widget": {
          table: false,
          form: true
        }
      },
      HsHrEmpMemberDetail: {},
      HsHrEmpPassport: {},
      HsHrEmpPicture: {},
      HsHrEmpReportto: {},
      HsHrEmpSkill: {},
      HsHrEmpUsTax: {},
      HsHrEmpWorkExperience: {},
      HsHrJobtitEmpstat: {},
      HsHrMailnotifications: {},
      HsHrModule: {},
      HsHrPayPeriod: {},
      HsHrPayPeriodcode: {
        // "filter": '?filter=%7B%22fields%22%3A%20%7B%22payperiodcode%22%3A%20true%2C%20%22payperiodname%22%3A%20true%7D%7D',
        "keys":{"label": 'payperiodname',"value": 'payperiodcode'},
        widget: {
          table: false,
          form: false
        }
      },
      HsHrProvince: {
        // "filter": '?filter=%7B%22fields%22%3A%20%7B%22coucode%22%3A%20true%2C%20%22id%22%3A%20true%2C%20%22provincename%22%3A%20true%7D%7D',
        "keys":{"label": 'provincename',"value": 'id'},
        widget: {
          table: false,
          card: false
        }
      },
      HsHrUniqueId: {},
      OhrmAdvancedReport: {},
      OhrmAttendanceRecord: {},
      OhrmAuthProviderExtraDetails: {},
      OhrmAvailableGroupField: {},
      OhrmBeaconNotification: {},
      OhrmCompositeDisplayField: {},
      OhrmCustomer: {},
      OhrmDataGroup: {},
      OhrmDataGroupScreen: {},
      OhrmDatapoint: {},
      OhrmDatapointType: {},
      OhrmDisplayField: {},
      OhrmDisplayFieldGroup: {},
      OhrmEducation: {},
      OhrmEmail: {},
      OhrmEmailConfiguration: {},
      OhrmEmailNotification: {},
      OhrmEmailProcessor: {},
      OhrmEmailSubscriber: {},
      OhrmEmailTemplate: {},
      OhrmEmpEducation: {},
      OhrmEmpLicense: {},
      OhrmEmployeeEvent: {},
      OhrmEmployeeWorkShift: {},
      OhrmEmploymentStatus: {},
      OhrmEmpReportingMethod: {},
      OhrmEmpTermination: {},
      OhrmEmpTerminationReason: {},
      OhrmFilterField: {},
      OhrmGroupField: {},
      OhrmHoliday: {},
      OhrmHomePage: {},
      OhrmJobCandidate: {},
      OhrmJobCandidateAttachment: {},
      OhrmJobCandidateHistory: {},
      OhrmJobCandidateVacancy: {},
      OhrmJobCategory: {},
      OhrmJobInterview: {},
      OhrmJobInterviewAttachment: {},
      OhrmJobInterviewInterviewer: {},
      OhrmJobSpecificationAttachment: {},
      OhrmJobTitle: {},
      OhrmJobVacancy: {},
      OhrmJobVacancyAttachment: {},
      OhrmKpi: {},
      OhrmLanguage: {},
      OhrmLeave: {},
      OhrmLeaveAdjustment: {},
      OhrmLeaveComment: {},
      OhrmLeaveEntitlement: {},
      OhrmLeaveEntitlementAdjustment: {},
      OhrmLeaveEntitlementType: {},
      OhrmLeaveLeaveEntitlement: {},
      OhrmLeavePeriodHistory: {},
      OhrmLeaveRequest: {},
      OhrmLeaveRequestComment: {},
      OhrmLeaveStatus: {},
      OhrmLeaveType: {},
      OhrmLicense: {},
      OhrmLocation: {},
      OhrmLogin: {},
      OhrmMembership: {},
      OhrmMenuItem: {},
      OhrmModule: {},
      OhrmModuleDefaultPage: {},
      OhrmNationality: {
        // "filter": '?filter=%7B%22fields%22%3A%20%7B%22id%22%3A%20true%2C%20%22name%22%3A%20true%7D%7D',
        "keys":{"label": 'name',"value": 'id'},
        widget: {
          table: false,
          form: false
        }
      },
      OhrmOauthAccessToken: {},
      OhrmOauthAuthorizationCode: {},
      OhrmOauthClient: {},
      OhrmOauthRefreshToken: {},
      OhrmOauthUser: {},
      OhrmOpenidProvider: {},
      OhrmOpenidUserIdentity: {},
      OhrmOperationalCountry: {},
      OhrmOrganizationGenInfo: {},
      OhrmPayGrade: {},
      OhrmPayGradeCurrency: {},
      OhrmPerformanceReview: {},
      OhrmPerformanceTrack: {},
      OhrmPerformanceTrackerLog: {},
      OhrmPerformanceTrackerReviewer: {},
      OhrmPlugin: {},
      OhrmProject: {},
      OhrmProjectActivity: {},
      OhrmProjectAdmin: {},
      OhrmReport: {},
      OhrmReportGroup: {},
      OhrmReviewer: {},
      OhrmReviewerGroup: {},
      OhrmReviewerRating: {},
      OhrmRoleUserSelectionRule: {},
      OhrmScreen: {},
      OhrmSelectedCompositeDisplayField: {},
      OhrmSelectedDisplayField: {},
      OhrmSelectedDisplayFieldGroup: {},
      OhrmSelectedFilterField: {},
      OhrmSelectedGroupField: {},
      OhrmSkill: {},
      OhrmSubunit: {},
      OhrmSummaryDisplayField: {},
      OhrmTimesheet: {},
      OhrmTimesheetActionLog: {},
      OhrmTimesheetItem: {},
      OhrmUpgradeHistory: {},
      OhrmUser: {},
      OhrmUserRole: {},
      OhrmUserRoleDataGroup: {},
      OhrmUserRoleScreen: {},
      OhrmUserSelectionRule: {},
      OhrmWorkflowStateMachine: {},
      OhrmWorkShift: {},
      OhrmWorkWeek: {},
      OhrmWsConsumer: {}
    }
  },
  crm : {
    abbrev: true,
    disabled: true
  },
  accounting: {
    disabled: true
  }
});

appstore.common.do.setCurrentModule("hrm");
appstore.common.do.assignCommonStorePatternToModels();
appstore.common.do.assignVMenu();


/// loadSchema() => loads all model schemas loadSchema(model) => loads a specific model schema
export const loadSchema = async (model) => {
  const appdo = appstore.common.do;
  const models = appdo.getModelsThatNeedLoading();
  console.log(models);
  if (model) {
    appdo.schema.loadform(model);
    appdo.schema.loadformui(model);
    appdo.schema.loadtable(model);
    console.log('loadSchema of Store called');
  } else {
    eachof(models,(model,idx)=>{
      appdo.schema.loadform(model);
      appdo.schema.loadformui(model);
      appdo.schema.loadtable(model);
    })
    console.log('loadSchema of Store called');
  }
}

/// loadData() => loads all records loadData(model) => loads a specific set of records
export const loadData = async (model) => {
  const appdo = appstore.common.do;
  const mod = appdo.getCurrentModule();
  const models = appdo.getModelsThatNeedLoading();
  console.log(`models ${JSON.stringify(models)}`);
  // const widget = model ? appstore[mod]['models'][model]['widget'] : null;

  if(model) {
    appdo.records.getAllRecords(model);
    console.log('loadData of Store called');
  } else {
    eachof(models, (model,idx) =>{
      console.log(`model ${JSON.stringify(model)}`);
      appdo.records.getAllRecords(model);
    })

    console.log('loadData of Store called');
  }
}

// export const updateMember = async (updatedVersion) => {
//   const appdo = appstore.common.do;
//   const mod = appdo.getCurrentModule();
//   const submodule = appdo.getCurrentSubModule();
//   const model = appdo.getCurrentModel();
//   const idType = appdo.getCurrentMemberIDType();

//   const members = appdo[mod]['models'][model]['store']['member']['all'];
//   const indexOfOldVersion = members.findIndex(member => parseInt(member['idType']) === parseInt(updatedVersion['idType']));
//   if (indexOfOldVersion > -1) {
//     appdo[mod]['models'][model]['store']['member']['all'][indexOfOldVersion] = updatedVersion;
//     return true;
//   } else {
//     return false;
//   }

// }

// export const createMember = async (newMember) => {
//   const appdo = appstore.common.do;
//   const mod = appdo.getCurrentModule();
//   const submodule = appdo.getCurrentSubModule();
//   const model = appdo.getCurrentModel();

//   if(newMember) {
//     appdo[mod]['models'][model]['store']['member']['all'].push(newMember);
//     return true;
//   }
// }

