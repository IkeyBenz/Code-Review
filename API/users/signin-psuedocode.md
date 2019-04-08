users > user.controller > signup()

Signup Process:

  Before:
    user submits the signup form, with their email, password, and name

  Check if user with (email) already exists

  If user exists, try to handle signin process:

    Check if given password matches found user’s password

    If password matches:
      Sign them in (respond with cookie, end request)

    If password doesn’t match:
      Respond with ‘incorrect username or password’

  If user doesn’t exist:
    Create new user using the submitted form values
    Sign in the newly created user
    Respond with success message
