const { Schema, model } = require('mongoose');

const postOfficeSchema = new Schema(
  {
    division_id: {
      type: String,
      required: true,
      unique: true,
    },
    district_id: {
      type: String,
      required: true,
    },
    upazila: {
      type: String,
      required: true,
    },
    postOffice: {
      type: String,
      required: true,
    },
    postCode: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

postOfficeSchema.index({ division_id: 1, district_id: 1, upazila: 1 });
postOfficeSchema.index({
  postOffice: 'text',
  postCode: 'text',
});

const PostOffice = model('postOffice', postOfficeSchema);

module.exports = PostOffice;
