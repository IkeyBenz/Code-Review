import sys

from .commands import commands_dict
from .color_scheme import colors


def main():
    args = sys.argv[1:]

    if len(args) == 0:
        return describe()
    if args[0] in commands_dict:
        commands_dict[args[0]]()
    else:
        print("That is not a valid command.")


def describe():
  # ink - cli in react
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
