// May not need this...
class JobPost {
  constructor(id, jobId, companyId, jobCategoryId, title, description, location, dates, ){
    this.id = id;
    this.jobId = jobId;
    this.companyId = companyId;
    this.jobCategoryId = jobCategoryId;
    this.title = title;
    this.description = description;
    this.location = location;
    this.dates = dates;
  }
}

export default JobPost;
