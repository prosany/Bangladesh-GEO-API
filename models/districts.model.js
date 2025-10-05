const { Schema, model } = require('mongoose');

const districtsSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    division_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    bn_name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

districtsSchema.index({ id: 1, division_id: 1 });
districtsSchema.index({ name: 'text', bn_name: 'text' });

const District = model('district', districtsSchema);

module.exports = District;
