from django.core.mail import BadHeaderError
from templated_mail.mail import BaseEmailMessage


def send_invitation(emails, server):
    try:

        message = BaseEmailMessage(
            template_name="emails/server_invitation.html", context={"server": server}
        )
        message.send(emails)

        return True
    except BadHeaderError:
        return False
