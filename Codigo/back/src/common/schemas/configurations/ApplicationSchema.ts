import { Schema, SchemaOptions } from '@nestjs/mongoose';

export function ApplicationSchema(options?: SchemaOptions): ClassDecorator {
  return Schema({
    id: true,
    timestamps: true,
    ...options,
  });
}
