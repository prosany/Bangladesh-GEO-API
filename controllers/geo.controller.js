const District = require('../models/districts.model');
const Division = require('../models/divisions.model');
const PostOffice = require('../models/postOffice.model');
const Upazila = require('../models/upazilas.model');

// Controller to create new division
exports.createDivision = async (req, res, next) => {
  try {
    const { id, name, bn_name } = req.body;
    // Logic to create a division
    const division = new Division({ id, name, bn_name });
    await division.save();

    res.status(201).json({ success: true, data: division });
  } catch (error) {
    next(error);
  }
};

// Controller to create new divisions in bulk
exports.createDivisionsBulk = async (req, res, next) => {
  try {
    const divisions = req.body; // Expecting an array of divisions
    // Logic to create divisions in bulk
    const createdDivisions = await Division.insertMany(divisions);

    res.status(201).json({ success: true, data: createdDivisions });
  } catch (error) {
    next(error);
  }
};

// Controller to get all divisions with pagination and search capabilities
// 15 items per page
exports.getAllDivisions = async (req, res, next) => {
  try {
    const { page = 1, limit = 15, search = '' } = req.query;
    const skip = (page - 1) * limit;

    const query = search ? { $text: { $search: search } } : {};

    const divisions = await Division.find(query).skip(skip).limit(limit);

    const total = await Division.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: divisions,
      pagination: {
        total,
        page: Number(page),
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Controller to get a division by ID
exports.getDivisionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const division = await Division.findById(id);
    if (!division) {
      return res
        .status(404)
        .json({ success: false, message: 'Division not found' });
    }
    res.status(200).json({ success: true, data: division });
  } catch (error) {
    next(error);
  }
};

// Controller to create new district
exports.createDistrict = async (req, res, next) => {
  try {
    const { id, division_id, name, bn_name } = req.body;
    // Logic to create a district
    const district = new District({ id, division_id, name, bn_name });
    await district.save();

    res.status(201).json({ success: true, data: district });
  } catch (error) {
    next(error);
  }
};

// Controller to create new districts in bulk
exports.createDistrictsBulk = async (req, res, next) => {
  try {
    const districts = req.body; // Expecting an array of districts
    // Logic to create districts in bulk
    const createdDistricts = await District.insertMany(districts);

    res.status(201).json({ success: true, data: createdDistricts });
  } catch (error) {
    next(error);
  }
};

// Controller to get all districts with pagination and search capabilities
// 15 items per page
exports.getAllDistricts = async (req, res, next) => {
  try {
    const { page = 1, limit = 15, search = '' } = req.query;
    const skip = (page - 1) * limit;

    const query = search ? { $text: { $search: search } } : {};

    const districts = await District.find(query).skip(skip).limit(limit);

    const total = await District.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: districts,
      pagination: {
        total,
        page: Number(page),
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Controller to get a district by ID
exports.getDistrictById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const district = await District.find({ id });
    if (!district) {
      return res
        .status(404)
        .json({ success: false, message: 'District not found' });
    }
    res.status(200).json({ success: true, data: district });
  } catch (error) {
    next(error);
  }
};

// Controller to get a district by Division Id
exports.getDistrictsByDivisionId = async (req, res, next) => {
  try {
    const { division_id } = req.params;
    const districts = await District.find({ division_id });
    if (!districts) {
      return res
        .status(404)
        .json({ success: false, message: 'District not found' });
    }

    res.status(200).json({ success: true, data: districts });
  } catch (error) {
    next(error);
  }
};

// Controller to create new upazila
exports.createUpazila = async (req, res, next) => {
  try {
    const { id, district_id, name, bn_name } = req.body;
    // Logic to create an upazila
    const upazila = new Upazila({ id, district_id, name, bn_name });
    await upazila.save();

    res.status(201).json({ success: true, data: upazila });
  } catch (error) {
    next(error);
  }
};

// Controller to create new upazilas in bulk
exports.createUpazilasBulk = async (req, res, next) => {
  try {
    const upazilas = req.body; // Expecting an array of upazilas
    // Logic to create upazilas in bulk
    const createdUpazilas = await Upazila.insertMany(upazilas);

    res.status(201).json({ success: true, data: createdUpazilas });
  } catch (error) {
    next(error);
  }
};

// Controller to get all upazilas with pagination and search capabilities
// 15 items per page
exports.getAllUpazilas = async (req, res, next) => {
  try {
    const { page = 1, limit = 15, search = '' } = req.query;
    const skip = (page - 1) * limit;

    const query = search ? { $text: { $search: search } } : {};

    const upazilas = await Upazila.find(query).skip(skip).limit(limit);

    const total = await Upazila.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: upazilas,
      pagination: {
        total,
        page: Number(page),
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Controller to get an upazila by District ID
exports.getUpazilaByDistrictId = async (req, res, next) => {
  try {
    const { district_id } = req.params;
    const upazila = await Upazila.find({ district_id });
    if (!upazila) {
      return res
        .status(404)
        .json({ success: false, message: 'Upazila not found' });
    }
    res.status(200).json({ success: true, data: upazila });
  } catch (error) {
    next(error);
  }
};

// Controller to create new post office
exports.createPostOffice = async (req, res, next) => {
  try {
    const { division_id, district_id, upazila, postOffice, postCode } =
      req.body;
    // Logic to create a post office
    const newPostOffice = new PostOffice({
      division_id,
      district_id,
      upazila,
      postOffice,
      postCode,
    });
    await newPostOffice.save();

    res.status(201).json({ success: true, data: newPostOffice });
  } catch (error) {
    next(error);
  }
};

// Controller to create new post offices in bulk
exports.createPostOfficesBulk = async (req, res, next) => {
  try {
    const postOffices = req.body; // Expecting an array of post offices
    // Logic to create post offices in bulk
    const createdPostOffices = await PostOffice.insertMany(postOffices);

    res.status(201).json({ success: true, data: createdPostOffices });
  } catch (error) {
    next(error);
  }
};

// Controller to get all post offices with pagination and search capabilities
// 15 items per page
exports.getAllPostOffices = async (req, res, next) => {
  try {
    const { page = 1, limit = 15, search = '' } = req.query;
    const skip = (page - 1) * limit;

    const query = search ? { $text: { $search: search } } : {};

    const postOffices = await PostOffice.find(query).skip(skip).limit(limit);

    const total = await PostOffice.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: postOffices,
      pagination: {
        total,
        page: Number(page),
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Controller to get a post office by Division ID
exports.getPostOfficeByDivisionIdAndDistrictId = async (req, res, next) => {
  try {
    const { division_id, district_id } = req.query;

    if (!division_id || !district_id) {
      return res.status(400).json({
        success: false,
        message: 'Division ID and District ID are required',
      });
    }

    const postOffice = await PostOffice.find({ division_id, district_id });
    if (!postOffice) {
      return res
        .status(404)
        .json({ success: false, message: 'Post Office not found' });
    }
    res.status(200).json({ success: true, data: postOffice });
  } catch (error) {
    next(error);
  }
};

// Controller to get post offices by upazila name
exports.getPostOfficesByUpazilaName = async (req, res, next) => {
  try {
    const { upazilaName } = req.params;
    const upazila = await Upazila.findOne({ name: upazilaName });
    if (!upazila) {
      return res
        .status(404)
        .json({ success: false, message: 'Upazila not found' });
    }

    const postOffices = await PostOffice.find({ upazila: upazilaName });
    res.status(200).json({ success: true, data: postOffices });
  } catch (error) {
    next(error);
  }
};
