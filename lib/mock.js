// Shapes mirror your Mongoose models. Replace with API calls later.
export const initialBatches = [
  { _id: "b1", batchName: "Full Stack 12", startDate: "2026-08-01", endDate: "2026-12-30", totalClass: 48 },
  { _id: "b2", batchName: "Web Design 07", startDate: "2026-09-10", endDate: "", totalClass: 32 },
];
const mk = (id, name, batchName, district, city) => ({
  _id: "s" + id, studentId: 1000 + id, fullName: name,
  email: name.split(" ")[0].toLowerCase() + id + "@mail.com", phone: "0177730" + (8000 + id),
  batch: batchName ? initialBatches.find((b) => b.batchName === batchName)?._id || "" : "",
  batchName: batchName || "",
  address: { disctrict: district, city, postCode: "1207", street: "Road 4", houseNo: "12" },
  dateOfBirth: "2002-05-1" + (id % 9),
});
export const initialStudents = [
  mk(1, "Riyad Hasan", "Full Stack 12", "Dhaka", "Mirpur"),
  mk(2, "Nusrat Jahan", "Full Stack 12", "Dhaka", "Uttara"),
  mk(3, "Tanvir Ahmed", "Full Stack 12", "Gazipur", "Tongi"),
  mk(4, "Mim Akter", "Web Design 07", "Dhaka", "Mohakhali"),
  mk(5, "Sakib Rahman", "Web Design 07", "Narayanganj", "Fatullah"),
  mk(6, "Farhana Islam", "", "Dhaka", "Dhanmondi"),
  mk(7, "Imran Hossain", "", "Cumilla", "Kotbari"),
  mk(8, "Sadia Khan", "", "Dhaka", "Badda"),
];
