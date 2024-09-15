import mongoose, { Schema, Document } from 'mongoose';

export interface IScope extends Document {
  name: string;
}

const ScopeSchema: Schema = new Schema({
  name: { type: String, required: true },
});

export default mongoose.model<IScope>('Scope', ScopeSchema);
