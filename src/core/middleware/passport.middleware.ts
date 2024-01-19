import passport from "passport";

import { findById } from "../../modules/User/user.service";
import User from "../../modules/User/user.model";

type Token = {
    id?:number;
    name?:string;
    title?: string
    permission?:string;
}

export default () => {
  passport.serializeUser((token: Token, done) => {
    process.nextTick(function () {
      return done(null, token);
    });
  });

  passport.deserializeUser(
    async (token: { id: number; name: string; role: string }, done) => {
      await findById(token.id)
        .then((user: User | any) => {
          done(null, user);
        })
        .catch((err) => {
          done(err, null);
        });
    }
  );
};
