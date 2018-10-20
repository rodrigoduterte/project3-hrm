//deprecated and for deletion possibly
import data from './data';

const members = {
  "employees": {"modelp": "Hshremployees",
  "filter": "?filter=%7B%22fields%22%3A%20%7B%22empfirstname%22%3A%20true%2C%20%22empmiddlename%22%3A%20true%2C%20%22emplastname%22%3A%20true%7D%7D"},
  "get": (keyword,cb) => {
    data.getp(members[keyword].modelp)
    .then(res => {
      cb(keyword, res.data);
    })
  }
}

export default members;
