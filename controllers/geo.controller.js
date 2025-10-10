const District = require('../models/districts.model');
const Division = require('../models/divisions.model');
const PostOffice = require('../models/postOffice.model');
const Upazila = require('../models/upazilas.model');
const { getOrSetCache } = require('../utils/cache'); // ✅ added

// Controller to create new division
exports.createDivision = async (req, res, next) => {
  try {
    const { id, name, bn_name } = req.body;
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
    const divisions = req.body;
    const createdDivisions = await Division.insertMany(divisions);

    res.status(201).json({ success: true, data: createdDivisions });
  } catch (error) {
    next(error);
  }
};

// ✅ Cached get all divisions
exports.getAllDivisions = async (req, res, next) => {
  try {
    const { page = 1, limit = 15, search = '' } = req.query;
    const key = `divisions:page=${page}:limit=${limit}:search=${search}`;

    const data = await getOrSetCache(key, async () => {
      const skip = (page - 1) * limit;
      const query = search ? { $text: { $search: search } } : {};
      const divisions = await Division.find(query).skip(skip).limit(limit);
      const total = await Division.countDocuments(query);
      const totalPages = Math.ceil(total / limit);
      return {
        success: true,
        data: divisions,
        pagination: { total, page: Number(page), totalPages },
      };
    });

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// ✅ Cached get a division by ID
exports.getDivisionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const key = `division:${id}`;

    const data = await getOrSetCache(key, async () => {
      const division = await Division.findById(id);
      if (!division) {
        return { success: false, message: 'Division not found' };
      }
      return { success: true, data: division };
    });

    res.status(data.success ? 200 : 404).json(data);
  } catch (error) {
    next(error);
  }
};

// Controller to create new district
exports.createDistrict = async (req, res, next) => {
  try {
    const { id, division_id, name, bn_name } = req.body;
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
    const districts = req.body;
    const createdDistricts = await District.insertMany(districts);

    res.status(201).json({ success: true, data: createdDistricts });
  } catch (error) {
    next(error);
  }
};

// ✅ Cached get all districts
exports.getAllDistricts = async (req, res, next) => {
  try {
    const { page = 1, limit = 15, search = '' } = req.query;
    const key = `districts:page=${page}:limit=${limit}:search=${search}`;

    const data = await getOrSetCache(key, async () => {
      const skip = (page - 1) * limit;
      const query = search ? { $text: { $search: search } } : {};
      const districts = await District.find(query).skip(skip).limit(limit);
      const total = await District.countDocuments(query);
      const totalPages = Math.ceil(total / limit);
      return {
        success: true,
        data: districts,
        pagination: { total, page: Number(page), totalPages },
      };
    });

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// ✅ Cached get a district by ID
exports.getDistrictById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const key = `district:${id}`;

    const data = await getOrSetCache(key, async () => {
      const district = await District.find({ id });
      if (!district) {
        return { success: false, message: 'District not found' };
      }
      return { success: true, data: district };
    });

    res.status(data.success ? 200 : 404).json(data);
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
    const upazilas = req.body;
    const createdUpazilas = await Upazila.insertMany(upazilas);

    res.status(201).json({ success: true, data: createdUpazilas });
  } catch (error) {
    next(error);
  }
};

// ✅ Cached get all upazilas
exports.getAllUpazilas = async (req, res, next) => {
  try {
    const { page = 1, limit = 15, search = '' } = req.query;
    const key = `upazilas:page=${page}:limit=${limit}:search=${search}`;

    const data = await getOrSetCache(key, async () => {
      const skip = (page - 1) * limit;
      const query = search ? { $text: { $search: search } } : {};
      const upazilas = await Upazila.find(query).skip(skip).limit(limit);
      const total = await Upazila.countDocuments(query);
      const totalPages = Math.ceil(total / limit);
      return {
        success: true,
        data: upazilas,
        pagination: { total, page: Number(page), totalPages },
      };
    });

    res.status(200).json(data);
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
    const postOffices = req.body;
    const createdPostOffices = await PostOffice.insertMany(postOffices);

    res.status(201).json({ success: true, data: createdPostOffices });
  } catch (error) {
    next(error);
  }
};

// ✅ Cached get all post offices
exports.getAllPostOffices = async (req, res, next) => {
  try {
    const { page = 1, limit = 15, search = '' } = req.query;
    const key = `postOffices:page=${page}:limit=${limit}:search=${search}`;

    const data = await getOrSetCache(key, async () => {
      const skip = (page - 1) * limit;
      const query = search ? { $text: { $search: search } } : {};
      const postOffices = await PostOffice.find(query).skip(skip).limit(limit);
      const total = await PostOffice.countDocuments(query);
      const totalPages = Math.ceil(total / limit);
      return {
        success: true,
        data: postOffices,
        pagination: { total, page: Number(page), totalPages },
      };
    });

    res.status(200).json(data);
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

// ✅ Cached get post offices by upazila name
exports.getPostOfficesByUpazilaName = async (req, res, next) => {
  try {
    const { upazilaName } = req.params;
    const key = `postOffices:upazila:${upazilaName}`;

    const data = await getOrSetCache(key, async () => {
      const upazila = await Upazila.findOne({ name: upazilaName });
      if (!upazila) {
        return { success: false, message: 'Upazila not found' };
      }
      const postOffices = await PostOffice.find({ upazila: upazilaName });
      return { success: true, data: postOffices };
    });

    res.status(data.success ? 200 : 404).json(data);
  } catch (error) {
    next(error);
  }
};
