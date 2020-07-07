class Job {
  constructor(id, companyId, jobCategoryId, title, description, location, dates, pay,){
    this.id = id;
    this.companyId = companyId;
    this.jobCategoryId = jobCategoryId;
    this.title = title;
    this.description = description;
    this.location = location;
    this.dates = dates;
    this.pay = pay;

  }
}

export default Job;
