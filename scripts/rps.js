const savedScore = JSON.parse(localStorage.getItem('score'));
        const score = {
            win: 0,
            lose: 0,
            tie: 0
        } || savedScore;

        
        let gameResult = 'Please click "rock", "paper" or "scissor" to start!';
        const scoreScreen = document.querySelector('.score-screen');

        scoreScreen.innerHTML = `${gameResult}` + `<br><br>Win: ${score.win}, Lose: ${score.lose}, Tie: ${score.tie}`;

        console.log(score);

        const computerPick = document.querySelector('.com-move');
        const afterPick = document.querySelector('.after_pick');

        computerPick.innerHTML = '<i class="fa fa-question" aria-hidden="true"></i>';

        //sample of how opponent move
        function pickComputerMove(){
            const randomNumber = Math.random();
            console.log(randomNumber);

            let computerMove = "";

            if (randomNumber >= 0 && randomNumber < 1/3) {
                computerMove = 'Rock!';
            } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
                computerMove = 'Paper!';
            } else if (randomNumber >= 2/3 && randomNumber < 1) {
                computerMove = 'Scissor!';
            };
            
            console.log('Computer use ' + computerMove); 
            
            
            return computerMove;
            
        }

        document.body.addEventListener('keydown' , (event) => {
            if (event.key === 'r'){
                UserMove('Rock!');
            } else if (event.key === 'p'){
                UserMove('Paper!');
            } else if (event.key === 's'){
                UserMove('Scissor!');
            }
        });

        function UserMove(move){
            const computerMove = pickComputerMove();
            const userMove = move;

            //Result of game
            if (move === 'Rock!') {
                if (computerMove === userMove){
                    gameResult = 'Tie!';
                } else {
                    if (computerMove === 'Paper!'){
                        gameResult = 'You Lose!';
                    } else {
                        gameResult = 'You Win!';
                    }
                }
                afterPick.innerHTML = 'User: <i class="fa fa-hand-rock-o" aria-hidden="true"></i>';
            } else if (move === 'Paper!') {
                if (computerMove === userMove){
                    gameResult = 'Tie!';
                } else {
                    if (computerMove === 'Scissor!'){
                        gameResult = 'You Lose!';
                    } else {
                        gameResult = 'You Win!';
                    }
                }
                afterPick.innerHTML = 'User: <i class="fa fa-hand-paper-o" aria-hidden="true"></i>';
            } else if (move === 'Scissor!'){
                if (computerMove === userMove){
                    gameResult = 'Tie!';
                } else {
                    if (computerMove === 'Rock!'){
                        gameResult = 'You Lose!';
                    } else {
                        gameResult = 'You Win!';
                    }
                }
                afterPick.innerHTML = 'User: <i class="fa fa-hand-peace-o" aria-hidden="true"></i>';
            }

            if (gameResult === 'You Win!') {
                score.win += 1 ;
            } else if (gameResult === 'You Lose!') {
                score.lose += 1 ;
            } else if (gameResult === 'Tie!') {
                score.tie += 1 ;
            }

            
            localStorage.setItem('score',JSON.stringify(score));

            scoreScreen.innerHTML = `${gameResult} <br><br>Win: ${score.win}, Lose: ${score.lose}, Tie: ${score.tie}`;

            console.log('You use ' + userMove);
            // alert('Computer use ' + computerMove + '\nYou use ' + userMove + '\n' + gameResult + `\n` + `Win : ${score.win} , Loss : ${score.lose} , Tie : ${score.tie} `);

            if (computerMove === 'Rock!') {
                computerPick.innerHTML = '<i class="fa fa-hand-rock-o" aria-hidden="true"></i>';
            } else if (computerMove === 'Scissor!') {
                computerPick.innerHTML = '<i class="fa fa-hand-peace-o" aria-hidden="true"></i>';
                
            } else if (computerMove === 'Paper!') {
                computerPick.innerHTML = '<i class="fa fa-hand-paper-o" aria-hidden="true"></i>';
                
            }
        }


        document.querySelector('.js-rock-button').addEventListener('click', () => {UserMove('Rock!');});
        document.querySelector('.js-paper-button').addEventListener('click', () => {UserMove('Paper!');});
        document.querySelector('.js-scissor-button').addEventListener('click', () => {UserMove('Scissor!');});

        function reset(){
            score.win = 0;
            score.lose = 0;
            score.tie = 0;

            gameResult = 'Please click "rock", "paper" or "scissor" to start!';

            localStorage.removeItem('score');
            //or 
            //localStorage.setItem('score',JSON.stringify(score));

            scoreScreen.innerHTML = `${gameResult} <br><br>Win: ${score.win}, Lose: ${score.lose}, Tie: ${score.tie}`;

            computerPick.innerHTML = '<i class="fa fa-question" aria-hidden="true"></i>';

            afterPick.innerHTML ='';
        }

        let isAutoPlay = false;
        let intervalId;

        function autoPlay() {
            const autoBtn = document.querySelector('.auto-btn');
            const userButtons = document.querySelectorAll('.userChoice button');

            if (!isAutoPlay) {
                autoBtn.innerHTML = 'Stop to Play';
                intervalId = setInterval(
                    //arrow function used below
                    () => {
                    const userMove = pickComputerMove();
                    UserMove(userMove);
                    } , 2000
                );
                isAutoPlay = true;
                userButtons.forEach(btn => btn.disabled = true);
            } else {
                clearInterval(intervalId);
                autoBtn.innerHTML = 'Auto Play';
                isAutoPlay = false;
                userButtons.forEach(btn => btn.disabled = false);
            }            
        }
