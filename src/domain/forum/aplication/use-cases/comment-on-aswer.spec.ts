import { expect } from 'vitest'
import { MakeAnswer } from 'test/repositories/factories/make-answer'
import { CommentOnAnswerUseCase } from './comment-on-aswers'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comments-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentRepository,
    )
  })

  it('should be able choose to comment on answer', async () => {
    const answer = MakeAnswer()

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comentario teste',
    })

    expect(inMemoryAnswerCommentRepository.items).toEqual([
      expect.objectContaining({ content: 'Comentario teste' }),
    ])
  })
})
