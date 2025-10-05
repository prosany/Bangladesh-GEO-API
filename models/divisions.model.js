const { Schema, model } = require('mongoose');

const divisionSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
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

divisionSchema.index({ id: 1 });
divisionSchema.index({ name: 'text', bn_name: 'text' });

const Division = model('division', divisionSchema);

module.exports = Division;
