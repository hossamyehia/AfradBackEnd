import bcrypt from "bcryptjs";
import { db } from "../../core";
import User from "./user.model";
import Role from "../Role/role.model";
import SQLError from "../../shared/models/SQLError.model";

/**
 * Insert New User
 * @param username Username
 * @param password Password
 * @param name Name
 * @param role Role Tag "ID"
 * @returns Success MSG || Error Object
 */
export function insertUser(
  rank: string,
  name: string,
  username: string,
  password: string,
  
  role: string
) {
  return new Promise(async (resolve, reject) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    await db<User>("user")
      .insert({
        rank,
        name,
        username,
        password: hash,
        role,
      })
      .then((user) => {
        resolve(user);
      })
      .catch((err: SQLError | any) => {
        if (err.errno === 1062) reject(new Error("Username already exists"));

        reject(new Error(err));
      });
  });
}

/**
 * Find User Information And Role By ID
 * @param id User`s ID
 * @returns User Object || Error Object
 */
export function findById(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<User>("user")
      .join<Role>("role", "role.tag", "user.role")
      .select("id", "rank", "name", "title", "permission" ,"user.role as role")
      .where({ id: id })
      .first()
      .then((user) => {
        resolve(user);
      })
      .catch((err: SQLError | any) => {
        reject(new Error(err));
      });
  });
}

/**
 * Find User Information And Role By Username
 * @param username Username
 * @returns User Object || Error Object
 */
export function findByUsername(username: string) {
  return new Promise(async (resolve, reject) => {
    await db<User>("user")
      .join<Role>("role", "role.tag", "user.role")
      .select("*")
      .where({ username })
      .first()
      .then((user) => {
        resolve(user);
      })
      .catch((err: SQLError | any) => {
        reject(new Error(err));
      });
  });
}

/**
 * Find ALL Users Information
 * @returns Array of Users || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<User>("user")
      .select("id", "rank", "name", "username", "role")
      .then((users) => {
        resolve(users);
      })
      .catch((err: SQLError | any) => {
        reject(new Error(err));
      });
  });
}

/**
 * Update User 
 * @param id User`s ID
 * @param data New Information
 * @returns Operation Result || Error Object
 */
export function updateUser(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<User>("user")
      .where({ id })
      .first()
      .update(data as { rank?: string; name?: string; username?: string })
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(new Error(err));
      });
  });
}

/**
 * Delete User
 * @param id User`s ID
 * @returns Operation Result || Error Object
 */
export function deleteUser(id: number){
  return new Promise(async (resolve, reject) => {
    await db<User>("user")
      .where({ id })
      .first()
      .delete()
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(new Error(err));
      });
  });
}

