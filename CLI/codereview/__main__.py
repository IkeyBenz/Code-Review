import sys

from .commands import signin, sign_out, get_my_requests, create_code_review_request, open_dashboard

commands = {
    'signin': signin,
    'signout': sign_out,
    'status': get_my_requests,
    'create': create_code_review_request,
    'open': open_dashboard
}

def main():
    args = sys.argv[1:]

    if len(args) == 0:
        return describe()
    if args[0] in commands:
        commands[args[0]]()
    else:
        print("That is not a valid command.")


def describe():
    ''' Prints a description of the code-review cli and its usage. '''
    print('''
    Hello, this is the code-review CLI.
    Usage:
        code-review signin: Signs you in.
        code-review signout: Signs you out.
        code-review status: Displays updates about your current review requests.
        code-review request: Asks for an email address and a file path. Creates a 'code-review-request'.
        code-review open: Launches the user dashboard on code-review.com in your default browser
    ''')

if __name__ == '__main__':
    main()

