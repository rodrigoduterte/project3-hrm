import data from './data';

const table = {
  "users":{"modelp":"Ohrmusers","filter":""},
  "jobtitles":{"modelp":"Ohrmjobtitles","filter":""},
  "jobvacancies":{"modelp":"Ohrmjobvacancies","filter":""},
  "jobcandidates":{"modelp":"Ohrmjobcandidates","filter":""},
  "get": (keyword, cb) => {
    data.getp(table[keyword].modelp)
    .then(res => {
      cb(keyword,res.data);
    })
  }
}

export default table
