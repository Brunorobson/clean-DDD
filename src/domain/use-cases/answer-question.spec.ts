import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'
const fakeAnswersRepository: AnswersRepository = {
  create: async (answer) => {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)
  const answer = await answerQuestion.execute({
    questionId: 'question-1',
    instructorId: 'instructor-1',
    content: 'This is the answer',
  })

  expect(answer.content).toEqual('This is the answer')
})
