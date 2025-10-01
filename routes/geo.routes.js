const express = require('express');
const router = express.Router();
const geoController = require('../controllers/geo.controller');

// Division routes
router.post('/divisions', geoController.createDivision);
router.post('/divisions/bulk', geoController.createDivisionsBulk);
router.get('/divisions', geoController.getAllDivisions);
router.get('/divisions/:id', geoController.getDivisionById);

// District routes
router.post('/districts', geoController.createDistrict);
router.post('/districts/bulk', geoController.createDistrictsBulk);
router.get('/districts', geoController.getAllDistricts);
router.get('/districts/:id', geoController.getDistrictById);
router.get(
  '/districts/by-division/:division_id',
  geoController.getDistrictsByDivisionId
);

// Upazila routes
router.post('/upazilas', geoController.createUpazila);
router.post('/upazilas/bulk', geoController.createUpazilasBulk);
router.get('/upazilas', geoController.getAllUpazilas);
router.get(
  '/upazilas/by-district/:district_id',
  geoController.getUpazilaByDistrictId
);

// Post Office routes
router.post('/postoffices', geoController.createPostOffice);
router.post('/postoffices/bulk', geoController.createPostOfficesBulk);
router.get('/postoffices', geoController.getAllPostOffices);
router.get(
  '/postoffices/by-division-district',
  geoController.getPostOfficeByDivisionIdAndDistrictId
);
router.get(
  '/postoffices/by-upazila-name/:upazilaName',
  geoController.getPostOfficesByUpazilaName
);

module.exports = router;
