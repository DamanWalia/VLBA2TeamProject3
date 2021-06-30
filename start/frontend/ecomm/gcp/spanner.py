import re

# TODO: Import the spanner module

from google.cloud import spanner

# END TODO

"""
Get spanner management objects
"""

# TODO: Create a spanner Client

spanner_client = spanner.Client()

# END TODO


# TODO: Get a reference to the Cloud Spanner ecomm-instance

instance = spanner_client.instance('ecomm-instance')

# END TODO

# TODO: Get a referent to the Cloud Spanner ecomm-database

database = instance.database('ecomm-database')

# END TODO

"""
Takes an email address and reverses it (to be used as primary key)
"""
def reverse_email(email):
    return '_'.join(list(reversed(email.replace('@','_').
                        replace('.','_').
                        split('_'))))

"""
Persists feedback data into Spanner
- create primary key value
- do a batch insert (even though it's a single record)
"""
def save_feedback(data):
    # TODO: Create a batch object for database operations

    with database.batch() as batch:
        # TODO: Create a key for the record
        # from the email, quiz and timestamp

        feedback_id = '{}_{}_{}'.format(reverse_email(data['email']),
                                        data['ecomm'],
                                        data['timestamp'])

        # END TODO

        # TODO: Use the batch to insert a record
        # into the feedback table
        # This needs the columns and values

        batch.insert(
            table='feedback',
            columns=(
                'feedbackId',
                'email',
                'ecomm',
                'timestamp',
                'rating',
                'score',
                'feedback'
            ),
            values=[
                (
                    feedback_id,
                    data['email'],
                    data['ecomm'],
                    data['timestamp'],
                    data['rating'],
                    data['score'],
                    data['feedback']
                )
            ]
        )