import { SetMetadata } from '@nestjs/common';
export const ROLE_KEY = 'ROLE_KEY';
export const Authorize = (role: string) => SetMetadata(ROLE_KEY, role);
