(function () {

    var module = angular.module('qiqEcomm');

    module.factory('ecommFactory', ecommFactory);


    ecommFactory.$inject = ['$http']

    function ecommFactory($http) {
        var answers = [];

        return {
            getQuestions: getQuestions,
            sendAnswers: sendAnswers, 
            sendFeedback: sendFeedback, 
            addAnswer: addAnswer
        };

        function getQuestions(ecommName) {
            return $http.get('/api/ecomm/' + ecommName).then(function (response) {
                return response.data.questions;
            });
        }

        function addAnswer(email, questionId, selectedAnswer) {
            var answer = {
                email: email,
                id: questionId,
                answer: selectedAnswer,
                timestamp: Date.now()
            };
            answers.push(answer);
        }

        function sendAnswers(ecommName) {
            return $http.post('/api/ecomm/' + ecommName, answers).then(function (response) {
                return response.data;
            });
        }

        function sendFeedback(email, ecomm, rating, feedback) {
            return $http.post('/api/ecomm/feedback/' + ecomm, {
                email: email,
                ecomm: ecomm,
                timestamp: Date.now(),
                rating: rating,
                feedback: feedback
            }).then(function (response) {
                return response.data; 
            });
        }
    }


})();