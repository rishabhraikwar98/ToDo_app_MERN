import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
  task: string;
  completed: boolean;
}

const TodoSchema: Schema = new Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
},{timestamps:true});

export default mongoose.model<ITodo>('Todo', TodoSchema);
