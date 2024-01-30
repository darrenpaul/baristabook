export const homeRoute = {
  path: "/",
  name: "Home",
};

export const loginRoute = {
  path: "/login",
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
