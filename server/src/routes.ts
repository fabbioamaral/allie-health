import { Request, Response, Router } from "express";
import { db } from "./db";
import multer from "multer";
import os from "os";
import { User } from "./user.model";

const router = Router();

const upload = multer({ dest: os.tmpdir() });

router.get("/users", (req: Request, res: Response) => {
  const users = db.prepare("SELECT * FROM users").all();

  res.json({
    users: users,
  });
});

router.get("/user", (req: Request, res: Response) => {
  const userId = req.body.id;

  if (!userId) {
    res.sendStatus(400);
    return;
  }
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);

  if (!user) {
    res.sendStatus(404);
    return;
  }

  res.json({
    user,
  });
});

router.post("/users", (req: Request, res: Response) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.birthday
  ) {
    res.sendStatus(400);
    return;
  }

  const user = db
    .prepare(
      "INSERT INTO users (first_name, last_name, email, birthday) VALUES (@firstName, @lastName, @email, @birthday)",
    )
    .run({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthday: req.body.birthday,
    });

  res.json({
    id: user.lastInsertRowid,
  });
});

router.put("/user", (req: Request, res: Response) => {
  const userId = req.body.id;

  if (!userId) {
    res.sendStatus(400);
    return;
  }

  const getUserByIdQuery = db.prepare("SELECT * FROM users WHERE id = ?");
  const userToBeUpdated = getUserByIdQuery.get(userId) as User;

  if (!userToBeUpdated) {
    res.sendStatus(404);
    return;
  }

  const updateQueryTemplate = db.prepare(
    "UPDATE users SET first_name = ?, last_name = ?, email = ?, birthday = ? WHERE id = ?",
  );

  const updateUserQuery = updateQueryTemplate.run(
    req.body.firstName || userToBeUpdated.first_name,
    req.body.lastName || userToBeUpdated.last_name,
    req.body.email || userToBeUpdated.email,
    req.body.birthday || userToBeUpdated.birthday,
    userId,
  );

  res.json({
    id: updateUserQuery.lastInsertRowid,
  });
});

router.post(
  "/users/bulk",
  upload.single("file"),
  (req: Request, res: Response) => {
    const file = req.file;

    console.log(file);

    res.sendStatus(200);
  },
);

export default router;
