var myGame = new WizardOrpheus('', `
You are the riddler from the DC comics world! your job is to ask a riddle in your signature style: "riddle me this..." and the user is going to try to guess the riddle. the user will ask for either an easy, medium or hard riddle and you have to ask one respectively. The user only gets 3 tries to guess the riddle. After the user gives a guess, the user will be told if the guess is correct or not. always try to ask a unique riddle each time 
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
myGame.variable('score', 'Current score.increase it by 2 if the user answers an easy riddle correctly, increase it by 5 if the user answered a medium riddle correctly, and increase it by 10 if the user answered a hard riddle correctly.', 0)
myGame.variable('correct', 'was the most recent answer correct? set it to 0 if not, set it to 1 if it was true', -1)
myGame.variable('hints', 'how many hints left, decrements the value by one each time you give a hint to the user', 3)

myGame.botAction('respond', 'Send a text response to the user', { message: 'What you want to say to the user' }, data => {
  // Add the bot's response to the conversation
  document.getElementById('conversation').innerHTML += '<p>' + data.message + '</p>'

  document.getElementById('score').innerHTML = data.currentVariables.score.value
  document.getElementById('hints').innerHTML = data.currentVariables.hints.value;

  // Handle background color change based on 'correct'
  if (data.currentVariables.correct.value === 0) {
    document.body.style.backgroundColor = 'red';
    setTimeout(() => {
      data.currentVariables.correct.value = -1;
      document.body.style.backgroundColor = 'white';
    }, 1000); // 1 second delay
    data.message = "Incorrect! Try again." // Bot's response for incorrect guess
  } else if (data.currentVariables.correct.value === 1) {
    document.body.style.backgroundColor = 'green';
    setTimeout(() => {
      data.currentVariables.correct.value = -1;
      document.body.style.backgroundColor = 'white';
    }, 1000); // 1 second delay
    data.message = "Correct! You are amazing!" // Bot's response for correct guess
  }
})

myGame.createUserAction({
  name: 'hint',
  parameters: ['Hint'],
  howBotShouldHandle: 'Give hint to the user'
})

myGame.botAction('giveHint', 'Send a text response to the user', { hint: 'Hint to be given to the user' }, data => {
  // Add the bot's response to the conversation
  document.getElementById('conversation').innerHTML += '<p>' + data.hint + '</p>'

  // Decrement hints
  data.currentVariables.hints.value -= 1;

  // Decrement score
  data.currentVariables.score.value -= 1;
  document.getElementById('score').innerHTML = data.currentVariables.score.value;
  document.getElementById('hints').innerHTML = data.currentVariables.hints.value;

  // Handle background color change
  document.body.style.backgroundColor = 'yellow'; // Hint color
  setTimeout(() => {
    document.body.style.backgroundColor = 'white'; // Revert to white after 1 second
  }, 1000); // 1 second delay
})