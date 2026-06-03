import { randomUUID } from "node:crypto"
import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique-entity-id"
interface QuestionProps {
     title: string,
     bestAnswerId?: UniqueEntityID
     content: string,
     slug: Slug,
     authorId: UniqueEntityID
    createdAt: Date
    updateAt?: Date
}
export class Question extends Entity<QuestionProps> {
}
