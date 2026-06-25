import { expect } from 'vitest'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { QuestionRepository } from '../repositories/question-repository'
import { MakeQuestion } from 'test/repositories/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let inMemoryQuestionsRepository: QuestionRepository
let sut: FetchRecentQuestionsUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      MakeQuestion({
        createdAt: new Date(2022, 0, 20),
      }),
    )
    await inMemoryQuestionsRepository.create(
      MakeQuestion({
        createdAt: new Date(2022, 0, 18),
      }),
    )
    await inMemoryQuestionsRepository.create(
      MakeQuestion({
        createdAt: new Date(2022, 0, 23),
      }),
    )

    const { question } = await sut.execute({
      page: 1,
    })

    expect(question).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it('shoutd be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(MakeQuestion())
    }

    const { question } = await sut.execute({
      page: 2,
    })
    expect(question).toHaveLength(2)
  })
})
