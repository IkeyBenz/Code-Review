import sys

from .commands import signin, sign_out, get_my_requests, create_code_review_request, open_dashboard
from .color_scheme import colors

commands = {
    'signin': signin,
    'signout': sign_out,
    'status': get_my_requests,
    'request': create_code_review_request,
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
    {header}======= Code-Review Command Line Interface ======{norm}\n
    Usage:
        {blue}codereview{norm} {green}{bold}signin{norm}: {yellow}Signs you in{norm}.

        {blue}codereview{norm} {green}{bold}signout{norm}: {yellow}Signs you out{norm}.

        {blue}codereview{norm} {green}{bold}status{norm}: {yellow}Displays updates about your current review requests{norm}.

        {blue}codereview{norm} {green}{bold}request{norm}: {yellow}Asks for an email address, file path, and a subject{norm} 
                            {yellow}Creates a 'code-review-request'{norm}.

        {blue}codereview{norm} {green}{bold}open{norm}: {yellow}Launches the user dashboard on our website in your default browser{norm}.
    '''.format(**colors))

if __name__ == '__main__':
    main()

