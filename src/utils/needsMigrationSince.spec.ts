import needsMigrationSince from './needsMigrationSince';
import { VERSION } from '../models/constants';

it('should return true for null input', () => {
  expect(needsMigrationSince(null)).toBe(true);
});

it('should return true for major version 0', () => {
  expect(needsMigrationSince('0.1.0')).toBe(true);
  expect(needsMigrationSince('0.8.1')).toBe(true);
  expect(needsMigrationSince('0.50.0')).toBe(true);
});

it('should return true for versions < 1.5.1', () => {
  expect(needsMigrationSince('1.3.0')).toBe(true);
  expect(needsMigrationSince('1.3.1')).toBe(true);
  expect(needsMigrationSince('1.4.0')).toBe(true);
  expect(needsMigrationSince('1.5.0')).toBe(true);
});

it('should return false for latest version', () => {
  expect(needsMigrationSince(VERSION)).toBe(false);
});
