import { NewPortalForm } from '../models/interfaces';
import { isUri } from 'valid-url';

export default function validatePortal(portal: NewPortalForm):
  Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (!portal.title?.length) {
      reject('ERROR: Please enter a name.');
    }
    if (!portal.url?.length) {
      reject('ERROR: Please enter a URL.');
    }
    if (!isUri(portal.url)) {
      reject('ERROR: Invalid URL.')
    }
    resolve('');
  });
};

export function validateAllPortals(portals: NewPortalForm[]):
  Promise<string> {
  return new Promise<string>((resolve, reject) => {
    Promise.all(portals.map((portal) => {
      return validatePortal(portal);
    }))
    .then(() => {
      resolve('');
    })
    .catch((err) => {
      reject('ERROR: Malformed data.');
    });
  });
}

export function validateAllPortalsFromStr(portals: string):
  Promise<string> {
  return new Promise<string>((resolve, reject) => {
    let portalsJson: any = null;
    try {
      portalsJson = JSON.parse(portals);
    } catch {
      reject('ERROR: Could not parse data.');
    }

    if (!Array.isArray(portalsJson)) {
      reject('ERROR: Malformed data.');
    }

    validateAllPortals(portalsJson)
    .then(() => {
      resolve('');
    })
    .catch((err) => {
      reject('ERROR: Malformed data.');
    });
  });
}
