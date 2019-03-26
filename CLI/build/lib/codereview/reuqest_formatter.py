'''
This file contains the code neccesary for proper formatting of the users request, when they use the
command 'codereview status'
'''
def format_requests(request_json):
    return '\n' + '\n'.join([
        '________________________________________________________________________________',
        'Inbox (Code for you to review):',
        '\n\t      From:         |          Subject:            |      Status:       \n\t\n',
        _formatted_message(request_json['inbox']),
        '________________________________________________________________________________',
        'Outbox (Code you asked peers to review):',
        '\n\t       To:          |          Subject:            |      Status:       \n\t\n',
        _formatted_message(request_json['outbox'], opposite_person='answerer'),
        
    ]) + '\n'

def _formatted_message(message_lst, opposite_person='asker'):
    return '\n\t\n\n'.join([
        '\t{name}|{subject}|{status}'.format(
            name =    message[opposite_person]['name'].center(20, ' '),
            subject = message['subject'].center(30, ' '),
            status =  message['status'].center(20, ' ')
        )
        for message in message_lst
    ])