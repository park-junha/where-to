import needsMigrationSince from './needsMigrationSince';
import { VERSION } from '../models/constants';

it('should return true for null input', () => {
  expect(needsMigrationSince(null)).toBe(true);
});

it('should return false for latest version', () => {
  expect(needsMigrationSince(VERSION)).toBe(false);
});
