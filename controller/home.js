import Student from "../models/studentSchema.js";

/** * GET / 
 * Displays the main table with all student records
 */
const home = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5; // Number of records per page

  try {
    const totalStudents = await Student.countDocuments();
    const totalPages = Math.ceil(totalStudents / limit);
    const skip = (page - 1) * limit;
    const records = await Student.find().sort({ _id: -1 }).skip(skip).limit(limit);
   res.render("index", { records, currentPage: page, totalPages });
  } catch (error) {
    console.error("Home Error:", error.message);
    res.status(500).send("Database Error: Could not fetch records.");
  }
};

/** * GET /student_new_record 
 * Renders the form to add a new student
 */
const student_new_record = async (req, res) => {
  try {
    res.render('student_new_record');
  } catch (error) {
    console.error("Render Error:", error.message);
    res.status(500).send("Error loading the registration form.");
  }
};

/** * POST /new_record 
 * Processes the form submission and saves a new student to MongoDB
 */
const add_new_record = async (req, res) => {
  try {
    const record = new Student({
      name: req.body.name,
      email: req.body.email,
      city: req.body.city,
      contact: req.body.contact
    });

    await record.save();
    console.log("Record saved successfully!");
    res.redirect('/');
  } catch (error) {
    console.error("Save Error:", error.message);
    // If saving fails (like a duplicate email), we send them back to the form
    res.redirect('/new_record');
  }
};

/** * GET /edit/:id 
 * Finds a specific student and opens the edit form
 */
const edit_student_record = async (req, res) => {
  try {
    const record = await Student.findById(req.params.id);

    if (!record) {
      return res.status(404).send("Student record not found.");
    }

    res.render('update_record', { record });
  } catch (error) {
    console.error("Fetch Error:", error.message);
    res.status(500).send("Error retrieving record for editing.");
  }
};

/** * POST /update/:id 
 * Updates the existing student record
 */
const update_record = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // runValidators ensures the new data is valid
    );

    if (!updated) {
      return res.status(404).send("Update failed: Record not found.");
    }

    console.log("Record updated successfully!");
    res.redirect('/');
  } catch (error) {
    console.error("Update Error:", error.message);
    res.status(500).send("Error updating record: " + error.message);
  }
};

/** * POST /delete/:id 
 * Removes the student record from the database
 */
const delete_student = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    console.log("Record deleted.");
    res.redirect('/');
  } catch (error) {
    console.error("Delete Error:", error.message);
    res.status(500).send("Error deleting record.");
  }
};

const search_student = async (req, res) => {
  try {
    const searchQuery = req.body.search;
    const students = await Student.find({
      name: { $regex: searchQuery, $options: 'i' }
    });
    res.render('result', { students, searchQuery });
  } catch (error) {
    console.error("Search Error:", error.message);
    res.status(500).send("Error searching records.");
  }
};

// Exporting all functions for use in routes/route.js
export {
  home,
  student_new_record,
  add_new_record,
  edit_student_record,
  update_record,
  delete_student,
  search_student
};