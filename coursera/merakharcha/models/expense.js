import moment from 'moment';


class Expense {
  constructor(id, title,time, imageUri, amount,comment) {
    this.id = id;
    this.title = title;
    this.time=time;
    this.imageUri = imageUri;
    this.amount = amount;
    this.comment = comment;
  }
  get readableDate() {
    return moment(this.time).format('MMMM Do YYYY, hh:mm A');
  }
}

export default Expense;
