import {
  ABSOLUTE_PORTAL_MIN_SIZE,
  ABSOLUTE_PORTAL_MAX_SIZE
} from '../models/constants';

export default function calculatePortalStyles(size: number): object {
  function validatePortalCalcInput(size: number): void {
    if (size < ABSOLUTE_PORTAL_MIN_SIZE ||
      size > ABSOLUTE_PORTAL_MAX_SIZE) {
      throw new Error('Input size must be from ' +
        `${ABSOLUTE_PORTAL_MIN_SIZE} to ${ABSOLUTE_PORTAL_MAX_SIZE}.`);
    }
  }

  function calculatePortalWidth(size: number): number {
    return 124 + (2 * size);
  }

  function calculatePortalHeight(size: number): number {
    return 2 * size;
  }

  validatePortalCalcInput(size);

  return {
    minWidth: calculatePortalWidth(size),
    maxWidth: calculatePortalWidth(size),
    minHeight: calculatePortalHeight(size),
    maxHeight: calculatePortalHeight(size)
  };
};
