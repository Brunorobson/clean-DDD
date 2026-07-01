import { expect } from 'vitest'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerCommentRepository } from '../repositories/answer-comment-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { MakeAnswerComment } from 'test/repositories/factories/make-answer-comment'

let inMemoryAnswerCommentsRepository: AnswerCommentRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch recent answers answercomments', async () => {
    await inMemoryAnswerCommentsRepository.create(
      MakeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
    )

    await inMemoryAnswerCommentsRepository.create(
      MakeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
    )

    await inMemoryAnswerCommentsRepository.create(
      MakeAnswerComment({ answerId: new UniqueEntityID('answer-1') }),
    )

    const { answersComments } = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(answersComments).toHaveLength(3)
  })

  it('shoutd be able to fetch paginated answer answercomments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        MakeAnswerComment({
          answerId: new UniqueEntityID('answer-1'),
        }),
      )
    }

    const { answersComments } = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })
    expect(answersComments).toHaveLength(2)
  })
})
