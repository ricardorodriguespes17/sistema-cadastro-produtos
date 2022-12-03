import { v4 as generator } from 'uuid';

export function generateUniqueCod(): string {
  return generator();
}