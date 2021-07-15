import crypto from 'crypto';

const generete = (): string => crypto.randomBytes(20).toString('hex');
export default generete;
