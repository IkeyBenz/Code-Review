import requests
import json
import pickle
import os

API_URL = "https://code-review-api1.herokuapp.com"
COOKIE_FILE_PATH = os.path.expanduser("~/code-review_data.pickle")

def signin():
    ''' Gets email & password from user, sends post request to API_URL + /signin, stores cookies in COOKIE_FILE_PATH '''
    
    res = requests.post(API_URL + '/signin', data={
        "email": input("Email: "),
        "password": input("Password: ")
    }, headers={ 'content-type': 'application/json' })
    print(res.text)
    body = json.loads(res.text)

    if 'success' in body:

        # Store received cookies in pickle
        with open(COOKIE_FILE_PATH, "wb") as f:
            pickle.dump(res.cookies, f)

        print(body["success"])

    else:
        print("Error:", body['error'])


def user_is_signed_in():
    ''' Ensures COOKIE_FILE_PATH exists and that it contains the code-review JWT token. '''

    return get_stored_JWT() is not None


def get_stored_JWT():
    ''' Returns the stored code-review JWT token. If COOKIE_FILE_PATH cannot be found, returns None. '''
    if os.path.isfile(COOKIE_FILE_PATH):

        with open(COOKIE_FILE_PATH, "rb") as f:
            return dict(pickle.load(f))['code-review']
    
    return None


def sign_out():
    ''' If COOKIE_FILE_PATH exists, it gets deleted. '''

    if user_is_signed_in():
        os.remove(COOKIE_FILE_PATH)

    print("You have been signed out of code-review.")
    

def get_my_requests():
    
    if user_is_signed_in():
        
        cookies = { 'code-review': get_stored_JWT() }
        res = requests.get(API_URL + '/my-requests', cookies=cookies)
        body = json.loads(res.text)

        print(body)

    else:
        print("You are not signed in. Run `codereview signin` to sign in.")

def formatted_requests(res_body):
    pass


def create_code_review_request():
    ''' Makes a post request to API_URL + /requests containing the code (to be reviewed) and the email address of the reviewer. '''
    if user_is_signed_in():

        with open(_get_valid_filepath(), "r") as f:
            code = f.read()
        
        d = {
            'cr_request': code,
            'answerer': input("Email address of responder: ")
        }

        cookies = { 'code-review': get_stored_JWT() }
        res = requests.post(API_URL + '/requests', cookies=cookies, data=d)
        body = json.loads(res.text)

        if 'success' in body:
            print(body['success'])
        else:
            print(body['error'])

    else:
        print("You are not signed in. Run `codereview signin` to sign in.")


def _get_valid_filepath():
    ''' Recursively prompts the user for a file path until a valid file path is entered. '''

    path = input("Enter file path: ")
    if os.path.isfile(path):
        return path
    else:
        print("Invalid Filepath:", path)
        return _get_valid_filepath()

def open_dashboard():
    dashboard_url = API_URL + '/dashboard'
    os.system("open " + dashboard_url)
    