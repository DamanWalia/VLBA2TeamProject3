(function () {

    var module = angular.module('qiqEcomm');

    module.controller('EcommController', EcommController);

    EcommController.$inject = ['$routeParams', 'ecommFactory', 'authFactory'];

    function EcommController($routeParams, ecommFactory, authFactory) {
        var qc = this;
        var currentQuestionIndex = 0;

        qc.ecommName = $routeParams.name || 'gcp';
        qc.user = authFactory.user;
        qc.selectAnswer = selectAnswer;
        qc.sendFeedback = sendFeedback;
        qc.questions = null;
        qc.gameOver = false;
        qc.feedbackSent = false;
        qc.rating = -1;

        init();

        function init() {
            ecommFactory.getQuestions(qc.ecommName).then(function (data) {
                qc.questions = data;
                qc.question = qc.questions[currentQuestionIndex];
            });
        }

        function selectAnswer() {
            ecommFactory.addAnswer(qc.user.email, qc.question.id, qc.selectedAnswer);
            qc.selectedAnswer = -1;
            currentQuestionIndex++;
            if (currentQuestionIndex == qc.questions.length) {
                ecommFactory.sendAnswers(qc.ecommName).then(function (data) {
                    qc.correct = data.correct;
                    qc.total = data.total;
                    qc.gameOver = true;
                });
            } else {
                qc.question = qc.questions[currentQuestionIndex];
            }
        }

        function sendFeedback() {
            console.log({email:qc.user.email, ecommName:qc.ecommName, rating:qc.rating, feedback:qc.feedback});
            ecommFactory.sendFeedback(qc.user.email, qc.ecommName, qc.rating, qc.feedback).then(function (data) {
                qc.feedbackSent = true;
            });
        }
    }
})();
