# <div style="text-align: center;">Todo List Application with Infinite Nested Subtasks</div>

<span style="color:red">The application's backend is hosted on a free service, which may cause a delay during the first interaction due to server initialization.</span>

## <div style="text-align: center;">Overview</div>

<span style="font-weight:bold;">Organize Your Tasks Effectively with Todo List!</span>

With this Todo List application, you can:

- <span style="font-weight:bold;">Manage Your Tasks and Subtasks:</span> Create, edit, and delete tasks with support for infinitely nested subtasks.
- <span style="font-weight:bold;">Secure User Authentication:</span> Sign up, log in, and manage tasks securely with authorization features.
- <span style="font-weight:bold;">Email Validation During Registration:</span> Ensure secure and verified access through email validation.
- <span style="font-weight:bold;">Refresh Token Logic:</span> Maintain a seamless user experience with token-based authentication.

<span style="font-weight:bold;">Why Choose This Todo List Application?</span>

- Intuitive and user-friendly interface for task management.
- Infinite nesting for subtasks to organize your workflow effectively.
- Secure login system with JWT tokens for authorization and refresh.
- Email verification ensures account authenticity.

<div style="text-align: center; font-weight:bold;">Plan your day, track your progress, and never miss a deadline!</div>



## Table of Contents

- [Components](#components)
  - [Header](#header)
  - [Pages](#pages)
  - [Main Features](#main-features)
- [Modals](#modals)
  - [Task Management Modals](#task-management-modals)
  - [User Management Modal](#user-settings-modal)

## Components

### Header

#### Non-Authorized User
- Logo: Displays the application logo, redirects to the WelcomePage.
- UserAuth: Button for redirecting to the SignInPage or SignUpPage.

#### Authorized User
- Logo: Redirects to the HomePage for task management.
- UserMenu: Dropdown menu with user options including profile settings and logout.

<div style="padding: 20px; max-width: 800px; margin: 0 auto;">
    <img src="./src/img/screenshots/header.png" alt="Header Screenshot">
</div>

### Pages

#### WelcomePage
- Route: `/`
- Introduction to the application with CTA buttons for login or registration.
<div style="padding: 20px; max-width: 800px; margin: 0 auto;">
    <img src="./assets/media/home.png" alt="Todo list app welcome page">
</div>

#### SignupPage
- Route: `/signup`
- Secure registration form with email validation.
- Redirects to the HomePage upon successful signup and login.
<div style="padding: 20px; max-width: 800px; margin: 0 auto;">
    <img src="./assets/media/signup.png" alt="Todo list app signup page">
</div>

#### SigninPage
- Route: `/signin`
- Form for user authentication.
- Displays error messages for invalid login attempts.
<div style="padding: 20px; max-width: 800px; margin: 0 auto;">
    <img src="./assets/media/signin.png" alt="Todo list app signin page">
</div>

#### HomePage
- Route: `/tasks`
- Displays a list of tasks with options to create, edit, delete, and manage nested subtasks.
<div style="padding: 20px; max-width: 800px; margin: 0 auto;">
    <img src="./assets/media/taskpage.png" alt="Todo list app tasks page">
</div>


### Main Features
1. Task List: Displays all tasks and subtasks.
2. Add Task: Modal for creating new tasks or subtasks.
3. Task Details: View and edit task properties.
4. Secure Authentication: JWT-based token handling for login, logout, and session management.
5. Email Verification: Validates user email during registration.
6. Change user settings: Change avatar or password.

## Modals

### Task Management Modals

#### AddTaskModal
- Allows users to add a new task or subtask.
- Includes input fields for task name, description, and deadline.
<div style="padding: 20px; max-width: 800px; margin: 0 auto;">
    <img src="./assets/media/createtask.png" alt="Todo list app add task">
</div>

#### EditTaskModal
- Enables users to edit existing tasks or subtasks.
- Allows changing the task name, description, time.
<div style="padding: 20px; max-width: 800px; margin: 0 auto;">
    <img src="./assets/media/edittask.png" alt="Todo list app edit task">
</div>

#### ShowTaskModal
- Shows the task details.


#### DeleteTaskModal
- Confirms task deletion and ensures no accidental loss of data.

### User settings modal

#### EditUserModal
- Enables users to edit existing personal info.
- Allows changing the avatar, password.
<div style="padding: 20px; max-width: 800px; margin: 0 auto;">
    <img src="./assets/media/edituser.png" alt="Todo list app edit task">
</div>


## Technologies Used

- **Frontend:** React, TypeScript, React Router, Redux Toolkit
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT tokens, Refresh tokens
- **Styling:** CSS Modules, MUI
