class Job {
  constructor(id, companyId, jobCategoryId, title, description, location, dates, ){
    this.id = id;
    this.companyId = companyId;
    this.jobCategoryId = jobCategoryId;
    this.title = title;
    this.description = description;
    this.location = location;
    this.dates = dates;
  }
}

export default Job;
