import 'server-only';

import swell from 'swell-node';

const storeId = process.env.NEXT_PUBLIC_STORE_ID;
const secretKey = process.env.SWELL_SCRETE_KEY;

if (!storeId || !secretKey) {
  throw new Error('Swell store ID or secret key is missing');
}

swell.init(storeId, secretKey);

export default swell;
