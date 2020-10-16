import { Schema, SchemaDefinition, SchemaOptions } from 'mongoose';

export class DefaultSchema extends Schema {
  constructor(definition: SchemaDefinition, options?: SchemaOptions) {
    super(definition, {
      ...options,
      id: true,
      timestamps: true,
      toJSON: {
        virtuals: true,
      },
      toObject: {
        getters: true,
      },
    });
  }
}
