import os
project_id = os.getenv('GCLOUD_PROJECT')

from flask import current_app
from google.cloud import datastore

datastore_client = datastore.Client(project_id)

"""
Returns a list of question entities for a given ecomm
- filter by ecomm name, defaulting to gcp
- no paging
- add in the entity key as the id property 
- if redact is true, remove the correctAnswer property from each entity
"""
def list_entities(ecomm='gcp', redact=True):
    query = datastore_client.query(kind='Question')
    query.add_filter('ecomm', '=', ecomm)
    results =list(query.fetch())
    for result in results:
        result['id'] = result.key.id
    if redact:
        for result in results:
            del result['correctAnswer']
    return results

"""
Create and persist and entity for each question
"""
def save_question(question):
    key = datastore_client.key('Question')
    q_entity = datastore.Entity(key=key)
    for q_prop, q_val in question.iteritems():
        q_entity[q_prop] = q_val
    datastore_client.put(q_entity)
