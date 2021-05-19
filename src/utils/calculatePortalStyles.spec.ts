import calculatePortalStyles from './calculatePortalStyles';

it('should return correct width', () => {
  let values: object = calculatePortalStyles(60);
  expect(values.minWidth).toBe(244);
  expect(values.maxWidth).toBe(244);
});

it('should return correct height', () => {
  let values: object = calculatePortalStyles(60);
  expect(values.minHeight).toBe(120);
  expect(values.maxHeight).toBe(120);
});

it('should throw an error for a value too small', () => {
  expect(() => { calculatePortalStyles(29); }).toThrow();
});

it('should throw an error for a value too large', () => {
  expect(() => { calculatePortalStyles(91); }).toThrow();
});
