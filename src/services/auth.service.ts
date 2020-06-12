import { firestore as db } from "../firebase";
import { User } from "../store/ducks/auth/types";
import { SignInGithubSchema } from "../helpers/Forms/schemas";

export async function checkUserRegistered(email: string) {
  const snapshot = await db
    .collection("users")
    .where("email", "==", email)
    .get();

  if (snapshot.empty) {
    return;
  }

  const docs: User[] = [];

  snapshot.forEach((doc) => {
    const { name, email, image } = doc.data();

    const user = {
      id: doc.id,
      name,
      email,
      image,
    };

    docs.push(user);
  });

  return docs[0];
}

export async function createUser(payload: SignInGithubSchema): Promise<User> {
  const newUser = await db.collection("users").add({
    email: payload.email,
    name: payload.name,
    image: payload.image,
  });

  return {
    id: newUser.id,
    email: payload.email,
    name: payload.name || "",
    image: payload.image || "",
  };
}
