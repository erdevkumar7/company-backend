const db = require("../models/index.model");
const User = db.User;
const Company = db.Company;
require("dotenv").config();

exports.updateCompany = async (req, res) => {
    try {
      const companyId = req.params.id;
      const { company_name, company_email } = req.body;
  
      // Check if company ID is provided
      if (!companyId) {
        return res.status(400).json({ error: "Company ID is required" });
      }
  
      // Check if company exists
      const existingCompany = await Company.findById(companyId);
      if (!existingCompany) {
        return res.status(404).json({ error: "Company not found" });
      }
  
      // Update company details
      existingCompany.company_name = company_name;
      existingCompany.company_email = company_email;
      const updatedCompany = await existingCompany.save();
  
      // Send updated company details in the response
      return res.status(200).json(updatedCompany);
    } catch (error) {
      console.error("Error in updateCompany controller:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  