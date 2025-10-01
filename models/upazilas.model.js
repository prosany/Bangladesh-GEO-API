const { Schema, model } = require('mongoose');

const upazilaSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    district_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bn_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

upazilaSchema.index({ id: 1, district_id: 1 });
upazilaSchema.index({ name: 'text', bn_name: 'text' });

const Upazila = model('upazila', upazilaSchema);

module.exports = Upazila;
