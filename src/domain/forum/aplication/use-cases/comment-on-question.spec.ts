import { expect } from 'vitest'
import { MakeQuestion } from 'test/repositories/factories/make-question'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

let inMemoryQuestionsRepository: InMemoryQuestionRepository
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository()
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentRepository,
    )
  })

  it('should be able choose to comment on question', async () => {
    const question = MakeQuestion()

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentario teste',
    })

    expect(inMemoryQuestionCommentRepository.items).toEqual([
      expect.objectContaining({ content: 'Comentario teste' }),
    ])
  })
})
