mport api

from flask import request, Blueprint

api_blueprint = Blueprint('api', __name__)

"""
API endpoint for ecomm
- GET will return list of questions for ecomm
- POST will do grading
"""
@api_blueprint.route('/ecomm/<ecomm_name>', methods=['GET', 'POST'])
def ecomm_methods(ecomm_name):
    if request.method == 'GET':
        return api.get_questions(ecomm_name)
    elif request.method == 'POST':
        answers = request.get_json()
        return api.get_grade(ecomm_name, answers)
    else:
        return "The Ecomm API only supports GET and POST requests"

"""
API endpoint for feedback
"""
@api_blueprint.route('/ecomm/feedback/<ecomm_name>', methods=['POST'])
def feedback_method(ecomm_name):
    feedback = request.get_json()
    return api.publish_feedback(feedback)