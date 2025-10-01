const express = require('express');
const router = express.Router();
const geoController = require('../controllers/geo.controller');
const apiKeyAuth = require('../middlewares/auth.middleware');

// Division routes
router.post('/divisions', apiKeyAuth, geoController.createDivision);
router.post('/divisions/bulk', apiKeyAuth, geoController.createDivisionsBulk);
router.get('/divisions', geoController.getAllDivisions);
router.get('/divisions/:id', geoController.getDivisionById);

// District routes
router.post('/districts', apiKeyAuth, geoController.createDistrict);
router.post('/districts/bulk', apiKeyAuth, geoController.createDistrictsBulk);
router.get('/districts', geoController.getAllDistricts);
router.get('/districts/:id', geoController.getDistrictById);
router.get(
  '/districts/by-division/:division_id',
  geoController.getDistrictsByDivisionId
);

// Upazila routes
router.post('/upazilas', apiKeyAuth, geoController.createUpazila);
router.post('/upazilas/bulk', apiKeyAuth, geoController.createUpazilasBulk);
router.get('/upazilas', geoController.getAllUpazilas);
router.get(
  '/upazilas/by-district/:district_id',
  geoController.getUpazilaByDistrictId
);

// Post Office routes
router.post('/postoffices', apiKeyAuth, geoController.createPostOffice);
router.post(
  '/postoffices/bulk',
  apiKeyAuth,
  geoController.createPostOfficesBulk
);
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
