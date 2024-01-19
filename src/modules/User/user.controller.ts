import { NextFunction, Request, Response } from "express";
import { deleteUser, find, insertUser, updateUser } from "./user.service";
import { handleResponse, validateKeys } from "../../shared/utils";
import HttpException from "../../shared/models/HttpException.model";
import { getToken } from "../../shared/service/auth.service";
import passport from "../../core/config/passport.config";

/**
 * Register New User
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function register(req: Request, res: Response, next: NextFunction) {
  insertUser(req.body.rank, req.body.name, req.body.username, req.body.password, req.body.role)
    .then((user) => {
      passport.authenticate("local")(req, res, () => {
        handleResponse(res, 201, true, "Register Successfully");
      });
    })
    .catch((err: Error) => {
      if (err.message === "Username already exists")
        return next(new HttpException(409, err.message));
      next(new HttpException(500, err.message));
    });
}

/**
 * Login Controller
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    "local",
    (err: any, user: Express.User, info: { message: string }) => {
      if (err) return next(new HttpException(500, "Server Error"));
      if (!user) {
        if (info.message === "User Not Found.")
          return next(new HttpException(404, "User Not Found"));
        else return next(new HttpException(404, "Incorrect Password."));
      }

      let token = getToken(user);

      req.login(user, function (err) {
        if (err) {
          return next(new HttpException(500, err.message));
        }
        handleResponse(res, 200, true, "Login Successfully", [{ token }]);
      });
    }
  )(req, res, next);
}

/**
 * Logout Controller
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function logout(req: Request, res: Response, next: NextFunction) {
  req.session.destroy(() =>
    handleResponse(res, 200, true, "Logout Successfully")
  );
}

/**
 * Get Registed Users
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getUsers(req: Request, res: Response, next: NextFunction) {
  find()
    .then((results: any) => {
      handleResponse(res, 200, true, "Retrieved Successfully", results);
    })
    .catch((err: Error) => {
      next(new HttpException(500, err.message));
    });
}

/**
 * Edit User
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function editUser(req: Request, res: Response, next: NextFunction) {
  updateUser(
    req.body.id,
    req.body as { rank?: string; name?: string; username?: string }
  )
    .then((result) => {
      if (!result) return next(new HttpException(404, "User Not Found"));
      handleResponse(res, 200, true, "Updated Successfully");
    })
    .catch((err) => {
      next(new HttpException(500, err.message));
    });
}

/**
 * Remove User
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function removeUser(req: Request, res: Response, next: NextFunction) {
  deleteUser(req.body.id)
    .then((result) => {
      if (!result) next(new HttpException(404, "User Not Found"));
      handleResponse(res, 200, true, "Deleted Successfully");
    })
    .catch((err) => {
      next(new HttpException(500, err.message));
    });
}

/**
 * Validate If Inputs Exists 
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function validate(req: Request, res: Response, next: NextFunction) {
  if (!validateKeys(req.body, ["rank", "name", "username", "password",  "role"]))
    return next(new HttpException(422, "Please Fill All Inputs"));
  next();
}

export default {
  register,
  validate,
  login,
  logout,
  getUsers,
  editUser,
  removeUser,
};
