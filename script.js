var myGame = new WizardOrpheus('', `
You are the riddler from the DC comics world! your job is to ask a riddle in your signature style: "riddle me this..." and the user is going to try to guess the riddle. The user only gets 3 tries to guess the riddle. After the user gives a guess, the user will be told if the guess is correct or not. always try to ask a unique riddle each time. tell the user they can ask for a maximum of 3 hints. give the user no more than 3 hints.
`)
myGame.createUserAction({
  name: 'message',
  parameters: ['Message from user to game'],
  howBotShouldHandle: 'Respond to the user'
})

document.getElementById('input').addEventListener('keyup', function(e) {
  if (e.code == 'Enter') { // if the user presses enter
    let userInput = document.getElementById('input').value
    myGame.message(userInput)

    document.getElementById('conversation').innerHTML += '<p>' + userInput + '</p>'

    document.getElementById('input').value = ''
  }
})
myGame.variable('score', 'Current score.increase it if the user answers correctly.', 0)
myGame.variable('correct', 'was the most recent answer correct? set it to 0 if not, set it to 1 if it was true', -1)

myGame.botAction('respond', 'Send a text response to the user', { message: 'What you want to say to the user' }, data => {
  // Add the bot's response to the conversation
  document.getElementById('conversation').innerHTML += '<p>' + data.message + '</p>'

  document.getElementById('score').innerHTML = data.currentVariables.score.value

  // Handle background color change based on 'correct'
  if (data.currentVariables.correct.value === 0) {
    document.body.style.backgroundColor = 'rgba(196, 1, 1, 0.8)';
    setTimeout(() => {
      data.currentVariables.correct.value = -1;
      document.body.style.backgroundColor = 'rgba(255,255,255, 0.8)';
    }, 1000); // 1 second delay
  } else if (data.currentVariables.correct.value === 1) {
    data.currentVariables.correct.value = -1;
    document.body.style.backgroundColor = 'rgba(0, 217, 68, 0.8)';
    setTimeout(() => {
      document.body.style.backgroundColor = 'rgba(255,255,255, 0.8)';
    }, 1000); // 1 second delay
  }
})


