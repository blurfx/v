import { Selector } from 'testcafe';

fixture`Typing Game`
  .page`http://localhost:4000`;

const words = [
  'hello', 'world', 'this', 'is', 'kakaopay',
  'we', 'are', 'kakaopay', 'frontend', 'developers',
  'join', 'us',
];

test('Game Flow', async (t) => {
  const playButton = Selector('.index-link');
  await t
    .expect(playButton.exists).ok()
    .click(playButton);

  const timeoutLabel = Selector('.timeout');
  const scoreLabel = Selector('.score');
  const canvas = Selector('canvas');
  const input = Selector('.word-input');

  await t
    .expect(timeoutLabel.exists).ok()
    .expect(scoreLabel.exists).ok()
    .expect(canvas.exists)
    .ok()
    .expect(input.exists)
    .ok();

  const averageTimeLabel = Selector('.avg-time');
  const resultTitle = Selector('.title');

  let wordsIndex = 0;
  while (!(await averageTimeLabel.exists)) {
    await t
      .typeText(input, words[wordsIndex])
      .pressKey('enter');
    wordsIndex += 1;
    if (wordsIndex === words.length) {
      wordsIndex = 0;
    }
  }

  await t
    .expect(resultTitle.exists).ok()
    .expect(scoreLabel.exists).ok()
    .expect(averageTimeLabel.exists)
    .ok()
    .expect(playButton.exists)
    .ok()

    .click(playButton)

    .expect(timeoutLabel.exists)
    .ok()
    .expect(scoreLabel.exists)
    .ok()
    .expect(playButton.exists)
    .ok();
});
