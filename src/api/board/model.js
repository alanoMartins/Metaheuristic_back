import mongoose, { Schema } from 'mongoose'

const childSchema = new Schema({
height: {
  type: Number
},
width: {
  type: Number
}})

const boardSchema = new Schema({
  height: {
    type: Number
  },
  width: {
    type: Number
  },
  pierces: [childSchema]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

boardSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      height: this.height,
      width: this.width,
      pierces: this.pierces,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Board', boardSchema)

export const schema = model.schema
export default model
