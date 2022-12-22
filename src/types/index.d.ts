export {};
declare global {
  namespace Express {
    export interface Request {
      user?: Express.User;
    }
    export interface User {
      id: string;
      role: {
        id: number;
        name: string;
      };
    }
  }
}
