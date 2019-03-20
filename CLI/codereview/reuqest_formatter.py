'''
This file contains the code neccesary for proper formatting of the users request, when they use the
command 'codereview status'
'''
def format_requests(requests_json):
    return '\n' + '\n'.join([
        '________________________________________________________________________________',
        'Inbox (Code for you to review):',
        '\n\t      From:         |          Subject:            |      Status:       \n\t\n',
        _formatted_inbox(requests_json['inbox']),
        '________________________________________________________________________________',
        'Outbox (Code you asked peers to review):',
        '\n\t       To:          |          Subject:            |      Status:       \n\t\n',
        _formatted_outbox(requests_json['outbox']),
        
    ]) + '\n'

def _formatted_inbox(message_lst):
    return '\n\t\n\n'.join([
        '\t{name}|{subject}|{status}'.format(
            name =    _centered_text(message['asker']['name'], 20),
            subject = _centered_text(message['subject'], 30),
            status =  _centered_text(str(message['opened']), 20)
        )
        for message in message_lst
    ])
def _formatted_outbox(message_lst):
    return '\n\t\n\n'.join([
        '\t{name}|{subject}|{status}'.format(
            name =    _centered_text(message['answerer']['name'], 20),
            subject = _centered_text(message['subject'], 30),
            status =  _centered_text(message['status'], 20)
        )
        for message in message_lst
    ])

def _centered_text(text, max_length):
    ''' Returns the given text, prefixed and suffixed with the amount of spaces that make it's length equal max_length.\n 
        If the supplied text's length is greater than max_length, the text will be shortened and returned with an elipcis.
        If the supplied text's length equals max_length, the text will be returne unaltered. '''

    if len(text) > max_length:
        return text[:max_length - 3] + '...'
    if len(text) == max_length:
        return text
    
    char_diff = max_length - len(text)
    leading_spaces = " "*(char_diff // 2)

    centered_text = leading_spaces + text + leading_spaces

    if char_diff % 2 == 1:
        centered_text += ' '
    
    return centered_text
