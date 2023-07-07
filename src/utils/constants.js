export const BACKEND_URL = "http://localhost:3000"
export const DATE_FORMAT = "MM/DD/YYYY"

export const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Books",
    path: "/books",
  },
];

export const loggedInNavLinks = [
  {
    name: "Books Wishlist",
    path: "/books/wishlist",
  },
  {
    name: "Issued Books",
    path: "/books/issued",
  },
  {
    name: "Logout",
    path: "/logout",
    class: "hover:bg-error hover:text-white"
  },
]

export const libarianNavLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
    class: "hover:bg-primary hover:text-white"
  }
]