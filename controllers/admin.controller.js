import AdminModel from '../models/admin.model.js';
import UserModel from '../models/user.model.js';
import { validateCreateAdmin, validateUpdateAdmin } from '../validators/admin.validator.js';
import bcrypt from 'bcrypt';

function generateadminId(count) {
  // Assuming count is a number like 1, 2, 3, ...
  const formattedCount = count.toString().padStart(2, '0');
  return `ADMIN-${formattedCount}`;
}

// Insert New admin
export async function insertAdmin(req, res) {
  try {
    const adminData = req.body;

    // Validate admin data before insertion
    const { error } = validateCreateAdmin(adminData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Check if emailAddress already exists
    const existingAdmin = await AdminModel.findOne({
      emailAddress: adminData.emailAddress,
    });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ error: "Admin with the given emailAddress already exists" });
    }

    // Generate adminId
    const count = (await AdminModel.countDocuments()) + 1; // Get the count of existing documents
    const adminId = generateadminId(count);

    // Replace the plain password with the hashed one
    const saltRounds = 10; // Adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);

    // Insert Admin with adminId TopupModel
    const newAdmin = new AdminModel(adminData);

    newAdmin.password = hashedPassword;
    newAdmin.adminId = adminId;
    const savedAdmin = await newAdmin.save();

    // Send Response
    res.status(200).json({ message: "Admin data inserted", data: savedAdmin });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Something went wrong",
      });
  }
};

// Display List
export async function ListAdmins(req, res, next) {
  try {
    let admin = await AdminModel.find();
    if (!admin || admin.length === 0) {
      console.log('adminr not found');
      return res.status(404).json({ message: 'admin not found' });
    }
    res.status(200).json({ message: "success", admin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Display Single admin
export async function showAdmin(req, res, next) {
  try {
    let adminId = req.params.adminId; // Assuming the parameter is adminId
    let admin = await AdminModel.findOne({ adminId: adminId });

    if (!admin) {
      console.log('Admin not found');
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving admin' });
  }
};

// Update admin
export async function updateAdmin(req, res, next) {
  try {
    const adminId = req.params.adminId;
    const adminDataToUpdate = req.body;

    // Validate the update data
    const { error } = validateUpdateAdmin(adminDataToUpdate);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Get the existing admin by ID using Mongoose
    const existingAdmin = await AdminModel.findOne({ adminId: adminId });

    if (!existingAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Update only the fields that are present in the request body
    Object.assign(existingAdmin, adminDataToUpdate);

    // Save the updated admin
    const updatedAdmin = await existingAdmin.save();

    // Send the updated admin as JSON response
    res.status(200).json({ message: 'Admin updated successfully', admin: updatedAdmin });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


// Delete admin
export async function deleteAdmin(req, res, next) {
  try {
    let adminId = req.params.adminId;

    const deletedAdmin = await AdminModel.deleteOne(
      { adminId: adminId },
      { new: true }
    );

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Count userId 
export async function countUsers(req, res) {
  try {
    const userCount = await UserModel.countDocuments();
    res.status(200).json({ count: userCount });
  } catch (error) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}