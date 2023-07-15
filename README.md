# Libzy - A Library Management System

This applications is following stack:

- [React](https://react.dev/) and [vite](https://vitejs.dev/) for frontend rendering.
- [Daisy UI](https://daisyui.com/) for it's pre-made components
- [Tailwind](https://tailwindcss.com/) for styling and css
- [JSON-server](https://www.npmjs.com/package/json-server) is utilized as a DB.
- [RTK-Query](https://redux-toolkit.js.org/rtk-query/overview) for data fetching and caching tool.
- [Email-JS](https://www.emailjs.com/) for sending mails.

## How to run the Application

Pre-requisites - *npm should be installed*

1. Install the dependencies - `npm i`
2. Bring up the server - `npm run server`
3. Run the frontend application - `npm run dev`

## Features the application

- The app has role based authorization (*admin ,Librarian , member*)

- **Member Role** (Creds: email - *<member@libzy.com>* & pass - *1234*)
  - Access for search books
    - Borrow books and return books
  - See the books that they have already borrowed.

- **Librarian Role** (Creds: email - *<librarian@libzy.com>* & pass - *1234*)
  - All the *member role* accesses.
  - Access for Adding Books, Editing Books, Updating Books, Removing Books
  - Change the role of a user from a Member to Librarian / Librarian to a member
  - Able to see the list of books and User
  - Can ask a member to request for returning the borrowed books

- **Admin Role** (Creds: email - *<admin@libzy.com>* & pass - *1234*)
  - All the *Librarian role* accesses
  - Change the role of a user from a Librarian to Admin/User / Admin/User to Librarian

## FAQs

<details>
<summary> If Admin/Librarian creates an user what will be the password? </summary>
The default password is `12345`
</details>

### Designed & Developed with 💛 by [Vignesh-Gupta](mailto:vignesh.gupta@hcl.com)
