const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
      image :{ 
          type: String,
          required : true
      },

      title: {
          type: String,
          required: true
      },

      info: {
          type: String,
          required: true
      }
})


const Project = mongoose.model('project' , projectSchema);

module.exports = Project;