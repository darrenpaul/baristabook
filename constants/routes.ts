export const homeRoute = {
  path: "/",
  name: "Home",
};

export const loginRoute = {
  path: "/auth",
  name: "Login",
};

export const signupRoute = {
  path: "/signup",
  name: "Signup",
};

export const recipeCreateRoute = {
  path: "/recipe/create",
  name: "Recipe Create",
};

export const recipeViewRoute = {
  path: (id: string) => `recipe/${id}`,
  name: "Recipe View",
};

export const collectionViewRoute = {
  path: "/collection/view",
  name: "Collection View",
};

export const accountViewRoute = {
  path: "/account/view",
  name: "Account View",
};
