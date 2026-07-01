import { expect } from 'vitest'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionCommentRepository } from '../repositories/question-comment-repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comments-repository'
import { MakeQuestionComment } from 'test/repositories/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: QuestionCommentRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch recent questions questioncomments', async () => {
    await inMemoryQuestionCommentsRepository.create(
      MakeQuestionComment({ questionId: new UniqueEntityID('question-1') }),
    )

    await inMemoryQuestionCommentsRepository.create(
      MakeQuestionComment({ questionId: new UniqueEntityID('question-1') }),
    )

    await inMemoryQuestionCommentsRepository.create(
      MakeQuestionComment({ questionId: new UniqueEntityID('question-1') }),
    )

    const { questionsComments } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(questionsComments).toHaveLength(3)
  })

  it('shoutd be able to fetch paginated question questioncomments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        MakeQuestionComment({
          questionId: new UniqueEntityID('question-1'),
        }),
      )
    }

    const { questionsComments } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })
    expect(questionsComments).toHaveLength(2)
  })
})
